"use client";
import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "@/graphql/entities/auth/refreshToken";
import { FetchResult, Observable } from "@apollo/client";
import store from "@/store/store";
import { logoutUser } from "@/store/reducers/userSlice";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const handleUserLogout = async () => {
  store.dispatch(logoutUser());
};

const refreshTokenApolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new NextSSRInMemoryCache(),
  credentials: "include",
});

const refreshAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");

  console.log(refreshToken);
  if (!refreshToken) return;

  const headers = {
    authorization: `Bearer ${refreshToken}`,
  };

  await refreshTokenApolloClient.mutate({
    mutation: REFRESH_TOKEN,
    context: {
      headers,
    },
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.log("ERR=>>", error);
      switch (error.extensions.code) {
        case "UNAUTHENTICATED":
          return new Observable<FetchResult<Record<string, unknown>>>(() => {
            (async () => {
              try {
                refreshAccessToken();
              } catch (err) {
                console.error(`[Unauthenticated error]: ${err}`);
                await handleUserLogout();
              }
            })();
          });
        default: {
          console.error(
            `[GraphQL Error]: Message: ${error.message}, Path: ${error.path}`
          );
        }
      }
    }
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError}`);
  }
});

const authHeader = setContext(async (_operation, { headers }) => {
  const accessToken = getCookie("access_token") || "";

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const client = () => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([
      authHeader,
      errorLink,
      new SSRMultipartLink({
        stripDefer: true,
      }),
      httpLink,
    ]),
    credentials: "include",
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}

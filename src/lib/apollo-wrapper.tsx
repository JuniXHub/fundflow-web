"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
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

import { GraphQLError } from "graphql";
import { redirect } from "next/navigation";
import ROUTES from "@/utils/routes";
import store from "@/store/store";
import { userSlice } from "@/store/reducers/userSlice";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const accessToken = getCookie("access_token");

const handleUserLogout = async () => {
  store.dispatch(userSlice.actions.logoutUser());
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.log("ERR=>>", error);
        switch (error.extensions.code) {
          case "UNAUTHENTICATED":
            return new Observable<FetchResult<Record<string, unknown>>>(
              (observer) => {
                (async () => {
                  try {
                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
                    }

                    operation.setContext(({ headers }: any) => ({
                      headers: {
                        ...headers,
                        authorization: `Bearer ${accessToken}`,
                      },
                    }));

                    const observable = forward(operation);
                    observable.subscribe(observer);
                  } catch (err) {
                    console.error(`[Unauthenticated error]: ${err}`);
                    await handleUserLogout();
                  }
                })();
              }
            );
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
  }
);

const authHeader = setContext(async (headers) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const client = () => {
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
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}

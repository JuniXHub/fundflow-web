import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export const USER_LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

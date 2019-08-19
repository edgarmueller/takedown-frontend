//import withApollo from 'next-with-apollo'
import { ApolloClient } from "apollo-boost/lib/index";
import { InMemoryCache } from "apollo-client-preset";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import withApollo from "next-with-apollo";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
  uri: "https://takedown-backend.herokuapp.com/graphql"
});

const authLink = setContext((operation, { headers }) => {
  if (process.browser) {
    const token = localStorage.getItem("x-token");
    if (token && operation.operationName === "authGoogle") {
      localStorage.removeItem("x-token");
    }
    if (token && operation.operationName !== "authGoogle") {
      return {
        headers: {
          ...headers,
          "x-token": token || undefined
        }
      };
    }
  }
});

const errorHandlingLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: errorHandlingLink.concat(authLink).concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    })
);

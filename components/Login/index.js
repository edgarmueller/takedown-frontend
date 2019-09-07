import { Mutation, ApolloConsumer, Query } from "react-apollo";
import gql from "graphql-tag";
import GoogleLogin from "react-google-login";
import { Fragment } from "react";
import { allLinks } from "../AllLinks";

const responseGoogle = response => {};

const IS_LOGGED_IN = gql`
  query {
    userStatus @client {
      isLoggedIn
    }
  }
`;

function Login() {
  return (
    <Fragment>
      <Query query={allLinks}>
        {({ loading, error }) => {
          return (
            <Mutation mutation={signInGoogle}>
              {(authGoogle, { loading, error }) => {
                return (
                  <ApolloConsumer>
                    {client => {
                      return (
                        <GoogleLogin
                          clientId={process.env.GOOGLE_CLIENT_ID}
                          buttonText="Login"
                          onSuccess={async resp => {
                            if (resp.Zi.access_token) {
                              const res = await authGoogle({
                                variables: {
                                  token: resp.Zi.access_token
                                }
                              });
                              localStorage.setItem(
                                "x-token",
                                res.data.authGoogle.token
                              );
                              const data = await client.query({
                                query: allLinks
                              });
                              client.writeQuery({
                                query: allLinks,
                                data: { ...data.data }
                              });
                              client.writeData({
                                data: {
                                  userStatus: {
                                    __typename: "UserStatus",
                                    isLoggedIn: true
                                  }
                                }
                              });
                              client.reFetchObservableQueries();
                            }
                          }}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      );
                    }}
                  </ApolloConsumer>
                );
              }}
            </Mutation>
          );
          return null;
        }}
      </Query>
      <Query query={IS_LOGGED_IN}>
        {({ data }) => (
          <div>
            {data.userStatus && data.userStatus.isLoggedIn
              ? "connected"
              : "nope"}
          </div>
        )}
      </Query>
    </Fragment>
  );
}

const signInGoogle = gql`
  mutation authGoogle($token: String!) {
    authGoogle(input: { accessToken: $token }) {
      token
      name
    }
  }
`;

export default Login;

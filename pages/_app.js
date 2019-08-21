import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

class TakedownApp extends App {
  UNSAFE_componentWillMount() {
    if (process.browser) {
      this.props.apollo.cache.writeData({
        data: {
          userStatus: {
            __typename: "UserStatus",
            isLoggedIn: localStorage.getItem("x-token") != null
          }
        }
      });
    }
  }

  componentDidUpdate() {
    if (process.browser) {
      this.props.apollo.cache.writeData({
        data: {
          userStatus: {
            __typename: "UserStatus",
            isLoggedIn: localStorage.getItem("x-token") != null
          }
        }
      });
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(TakedownApp);

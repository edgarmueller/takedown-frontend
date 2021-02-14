import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link,
} from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  fromPromise,
  ApolloLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import "./App.css";
import { Bookmarks } from "./Bookmarks";
import { AddBookmark } from "./AddBookmark";

const noInterceptAxios = axios.create();

const baseUrl = process.env.REACT_APP_API_URL;
const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
  credentials: "include",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHORIZED":
            fromPromise(
              noInterceptAxios
                .get(`${baseUrl}/auth/refresh`, {
                  withCredentials: true,
                  credentials: "include",
                })
                .then(() => {
                  // retry the request, returning the new observable
                  return forward(operation);
                })
            );
            break;
          default:
            console.error(err);
        }
      }
    }
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
});

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => response,
  function (error) {
    if (!error.response) {
      return;
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return noInterceptAxios
        .get(`${baseUrl}/auth/refresh`, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          if (!res) {
            return;
          }
          if (res.status === 200) {
            return noInterceptAxios(originalRequest);
          }
        })
        .catch((err) => console.error(err));
    }
    return Promise.reject(error);
  }
);

const fetchMe = async () => {
  const resp = await axios.get(`${baseUrl}/auth/me`, {
    withCredentials: true,
    credentials: "include",
  });
  if (!resp) {
    return;
  }
  return resp.status === 200;
};

const logout = async (whenDone) => {
  await axios(`${baseUrl}/auth/logout`, {
    method: "post",
    withCredentials: true,
    credentials: "include",
  });
  whenDone();
};

const Outline = ({ children }) => {
  const [isSignedIn, setSignedIn] = useState(false);
  useEffect(() => {
    fetchMe().then((signedIn) => setSignedIn(signedIn));
  }, []);
  return (
    <div className="px-5 flex-col max-w-3xl mx-auto flex ">
      {isSignedIn ? (
        <>
          <Link to="/" className="fixed top-2 left-5 font-bold">
            tkdwn
          </Link>
          <Link to="/add-bookmark" className="fixed top-14 left-5 underline">
            Add bookmark
          </Link>
          <button
            className="fixed top-28 left-5"
            onClick={() => logout(() => setSignedIn(false))}
          >
            Logout
          </button>
          {children}
        </>
      ) : (
        <div className="max-w-md pt-6">
          Welcome to <span className="font-bold">tkdwn</span>. Please sign in
          via
          <span className="px-1 underline">
            <a href={`${baseUrl}/google`}>Google</a>
          </span>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <CloudinaryContext cloudName={cloudinaryCloudName}>
        <Router>
          <Outline>
            <Switch>
              <Route path="/login/success">
                <div>Hold on...</div>
                <Redirect to="/"></Redirect>
              </Route>
              <Route path="/login/failure">
                <div>:(</div>
              </Route>
              <Route path="/add-bookmark">
                <AddBookmark />
              </Route>
              <Route path="/">
                <Bookmarks />
              </Route>
            </Switch>
          </Outline>
        </Router>
      </CloudinaryContext>
    </ApolloProvider>
  );
}

export default App;

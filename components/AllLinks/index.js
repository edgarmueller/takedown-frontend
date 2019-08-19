import { useState, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Switch from "react-switch";
import ErrorMessage from "../ErrorMessage";
import { Container } from "./styles";
import CompletedList from "../CompletedList";
import LinkList from "../LinkList";

export const allLinks = gql`
  query {
    links {
      edges {
        id
        title
        description
        url
        createdAt
        updatedAt
        done
        tags
        thumbnailId
      }
    }
    tags {
      edges {
        name
      }
    }
  }
`;

function AllLinks() {
  const [displayDone, setDisplayDone] = useState(false);

  return (
    <Container>
      <Query query={allLinks}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading...</div>;
          if (error)
            return (
              <ErrorMessage
                message={`Error loading your links: ${error.message}`}
              />
            );

          if (data && data.links && data.links.edges) {
            const allTags =
              (data.tags &&
                data.tags.edges.reduce((set, tag) => {
                  set.add(tag);
                  return set;
                }, new Set())) ||
              [];

            // TODO
            const todoLinks = data.links.edges.filter(link => !link.done);
            const doneLinks = data.links.edges.filter(
              link => link.done === true
            );

            return (
              <Fragment>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Switch
                    checked={displayDone}
                    onChange={checked => setDisplayDone(checked)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                  {!displayDone ? <h1>TODO</h1> : <h1>DONE</h1>}
                </div>
                <div>
                  {!displayDone ? (
                    <LinkList links={todoLinks} tags={allTags} />
                  ) : (
                    <CompletedList links={doneLinks} tags={allTags} />
                  )}
                </div>
              </Fragment>
            );
          } else {
            return null;
          }
        }}
      </Query>
    </Container>
  );
}
export default AllLinks;

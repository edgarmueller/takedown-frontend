import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { allLinks } from "../AllLinks";

const complete = gql`
  mutation complete($id: ID!, $done: Boolean) {
    complete(id: $id, done: $done) {
      url
      createdAt
      tags
      done
    }
  }
`;

const Done = ({ link }) => {
  return (
    <Mutation mutation={complete} refetchQueries={[{ query: allLinks }]}>
      {(complete, loading, error) => {
        if (error)
          return (
            <ErrorMessage message={`An error occurred: ${error.message}`} />
          );
        return (
          <input
            type="checkbox"
            checked={link.done === true}
            onChange={() => {
              complete({ variables: { id: link.id, done: !link.done } });
            }}
          />
        );
      }}
    </Mutation>
  );
};

export default Done;

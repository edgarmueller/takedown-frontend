import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { allLinks } from "../AllLinks";
import { Switch, Checkbox } from "antd";

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
          <Checkbox
            checked={link.done === true}
            unCheckedChildren={'READ'}
            size={"default"}
            onChange={() => {
              complete({ variables: { id: link.id, done: !link.done } });
            }}
          >
            Mark As Read
            </Checkbox>
        );
      }}
    </Mutation>
  );
};

export default Done;

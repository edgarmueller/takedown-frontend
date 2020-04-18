import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Chips from "react-chips";
import { allLinks } from "../AllLinks";

export const addTag = gql`
  mutation addTag($id: ID!, $tag: String!) {
    addTag(id: $id, tag: $tag) {
      tags
    }
  }
`;
export const setTags = gql`
  mutation setTags($id: ID!, $tags: [String]!) {
    setTags(id: $id, tags: $tags) {
      tags
    }
  }
`;

const Tags = ({ link, tags }) => {
  return (
    <Mutation mutation={setTags} refetchQueries={[{ query: allLinks }]}>
      {(setTags, { loading, error }) => {
        return (
          <Chips
            value={link.tags}
            onChange={tags => {
              setTags({ variables: { id: link.id, tags } });
            }}
            suggestions={tags.map(t => t.name)}
          />
        );
      }}
    </Mutation>
  );
};

export default Tags;

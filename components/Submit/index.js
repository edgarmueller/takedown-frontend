import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Form, H1, Input } from "./styles";
import { allLinks } from "../AllLinks";

const handleSubmit = createLink => e => {
  e.preventDefault();

  let url = e.target.elements.url.value;
  let tags = e.target.elements.tags.value.split(" ");

  if (url === "") {
    window.alert("URL is required.");
    return false;
  }

  // prepend http if missing from url
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = `http://${url}`;
  }

  createLink({ variables: { url, tags } });

  // reset form
  e.target.elements.url.value = "";
  e.target.elements.tags.value = "";
};

function Submit() {
  return (
    <Mutation mutation={CREATE_LINK} refetchQueries={[{ query: allLinks }]}>
      {(createLink, { loading, error }) => {
        if (error) {
          return "an error occurred";
        }

        return (
          <Form onSubmit={handleSubmit(createLink)} style={{ display: "flex" }}>
            <Input placeholder="url" name="url" />
            <Input placeholder="tags" name="tags" />
            <button type="submit">Add link</button>
          </Form>
        );
      }}
    </Mutation>
  );
}

const CREATE_LINK = gql`
  mutation createLink($url: String!, $tags: [String]) {
    createLink(url: $url, tags: $tags) {
      url
      createdAt
      tags
    }
  }
`;

export default Submit;

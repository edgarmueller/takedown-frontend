import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { allLinks } from "../AllLinks";
import { useEffect, useState } from "react";
import { notification, Form, Input } from "antd";

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
};

function Submit({ onSubmit }) {
  const [createLink, { loading, error }] = useMutation(CREATE_LINK, {
    refetchQueries: [{ query: allLinks }]
  });
  useEffect(() => {
    //setIsError(error !== undefined);
    if (error) {
      notification.error({
        message: "Notification Title",
        description: error.message
      });
    }
  }, [error]);
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  return (
    <Form
      layout="vertical"
      onSubmit={e => {
        handleSubmit(createLink)(e);
        setUrl("");
        setTags("");
        onSubmit();
      }}
    >
      <Form.Item>
        <Input
          placeholder="url"
          name="url"
          value={url}
          onChange={({ target: { value } }) => {
            setUrl(value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="tags"
          name="tags"
          value={tags}
          onChange={({ target: { value } }) => {
            setTags(value);
          }}
        />
      </Form.Item>
      <button type="submit">Add link</button>
    </Form>
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

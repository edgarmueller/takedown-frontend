import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tags } from "./Tags";
import { InputForm } from "./InputForm";

const ADD_BOOKMARK = gql`
  mutation AddBookmark($url: String!, $tags: [String!]) {
    createBookmark(input: { url: $url, tags: $tags }) {
      url
      title
    }
  }
`;

export const AddBookmark = () => {
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tags, setTags] = useState([]);
  return (
    <div>
      <InputForm
        label="Add the URL that you want to bookmark"
        onSubmit={(value) => {
          if (!value) {
            return;
          }
          addBookmark({ variables: { url: value, tags } });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 4000);
        }}
        primaryButton
      />

      <InputForm
        id="tags"
        onSubmit={(value) => {
          if (!value) {
            return;
          }
          setTags(tags.concat(value));
        }}
        label="Add any tags"
        buttonLabel="Add tag"
      />
      <div className="m-1 mt-2">
        <Tags tags={tags}></Tags>
      </div>
      <div className="m-1 flex flex-row">
        <Link className="py-2 sm:text-sm underline" to="/">
          BACK TO OVERVIEW
        </Link>
        <div className="py-2 pl-10 text-green-300 sm:text-sm">
          {showSuccess && "Bookmark added"}
        </div>
      </div>
    </div>
  );
};

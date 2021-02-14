import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tags } from "./Tags";

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
  let urlInput;
  let tagInput;
  return (
    <>
      <form
        className="col-span-3 sm:col-span-2 pt-10"
        onSubmit={(e) => {
          e.preventDefault();
          addBookmark({ variables: { url: urlInput.value, tags } });
          urlInput.value = "";
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 4000);
        }}
      >
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          Add the URL that you want to bookmark
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="url"
            id="url"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder="https://www.example.com"
            ref={(node) => {
              urlInput = node;
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTags(tags.concat(tagInput.value));
          tagInput.value = "";
        }}
      >
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Add any tags:
        </label>
        <input
          type="text"
          id="tags"
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          ref={(node) => {
            tagInput = node;
          }}
        ></input>
        <button type="submit"></button>
      </form>
      <Tags tags={tags}></Tags>
      <div className="to flex flex-row">
        <Link className="py-2 sm:text-sm" to="/">
          Back to overview
        </Link>
        <div className="py-2 pl-10 text-green-300 sm:text-sm">
          {showSuccess && "Bookmark added"}
        </div>
      </div>
    </>
  );
};

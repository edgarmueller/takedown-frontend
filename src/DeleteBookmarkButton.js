import { gql, useMutation } from "@apollo/client";

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($bookmarkId: String!) {
    deleteBookmark(input: { bookmarkId: $bookmarkId }) {
      deleted
      bookmarkId
    }
  }
`;

export const DeleteBookmarkButton = ({ bookmarkId, onCompleted }) => {
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK, {
    onCompleted,
  });
  return (
    <button
      className="w-full md:w-1/3 text-red-500 text-sm font-medium"
      onClick={(e) => {
        e.preventDefault();
        deleteBookmark({ variables: { bookmarkId } });
      }}
    >
      DELETE
    </button>
  );
};

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
    onCompleted: () => {
      onCompleted();
    },
  });
  return (
    <button
      className="text-sm font-medium text-left"
      onClick={(e) => {
        e.preventDefault();
        deleteBookmark({ variables: { bookmarkId } });
      }}
    >
      DELETE
    </button>
  );
};

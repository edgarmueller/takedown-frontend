import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Image } from "cloudinary-react";

const GET_BOOKMARKS = gql`
  query Bookmarks {
    bookmarks {
      id
      url
      title
      thumbnailId
    }
  }
`;

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($bookmarkId: String!) {
    deleteBookmark(input: { bookmarkId: $bookmarkId }) {
      deleted
      bookmarkId
    }
  }
`;

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { error, data, refetch } = useQuery(GET_BOOKMARKS, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    errorPolicy: "all",
  });
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK, {
    refetchQueries: [{ query: GET_BOOKMARKS }],
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (data?.bookmarks?.length > 0) {
      setBookmarks(data.bookmarks);
    }
  }, [data]);

  if (error) {
    return <>{error}</>;
  }

  if (!bookmarks) {
    return <>No bookmarks yet. Add one via 'Add bookmark'</>;
  }

  return (
    <>
      <div className="object-top text-6xl font-bold text-purple-600 mt-7 mb-7">
        Hello!
      </div>
      <ul className="list-none">
        {bookmarks.map((b) => (
          <li key={b.id} className="pt-3 pb-3">
            <a key={b.url} href={b.url} className="underline">
              {b.title}
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("deleting", b.id);
                deleteBookmark({ variables: { bookmarkId: b.id } });
              }}
              className="ml-1 bg-red-400 rounded text-white text-xs pl-1 pr-1"
            >
              DEL
            </button>
            <Image publicId={b.thumbnailId} />
          </li>
        ))}
      </ul>
    </>
  );
};

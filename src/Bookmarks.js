import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { BookmarkCard } from "./BookmardCard";
import { InputForm } from "./InputForm";

const GET_BOOKMARKS = gql`
  query Bookmarks {
    bookmarks {
      id
      url
      title
      thumbnailId
      tags
    }
  }
`;

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentTag, setCurrentTag] = useState(undefined);
  const { error, data, refetch } = useQuery(GET_BOOKMARKS, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    errorPolicy: "all",
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
      <div className="object-top text-6xl font-bold text-blac mt-7 mb-7">
        Hello!
      </div>
      <InputForm
        id="current-tag"
        label="Filter tag"
        onChange={(ev) => {
          setCurrentTag(ev.target.value);
        }}
        buttonLabel="Apply filter"
        clearInput={false}
        showButton={false}
      />
      <ul className="list-none">
        {bookmarks
          .filter((bookmark) =>
            currentTag
              ? bookmark.tags.filter((tag) => tag.startsWith(currentTag))
                  .length > 0
              : true
          )
          .map((b) => (
            <li key={b.id} className="pt-3 pb-3">
              <div className="flex flex-row">
                <BookmarkCard
                  url={b.url}
                  bookmarkId={b.id}
                  title={b.title}
                  thumbnailId={b.thumbnailId}
                  tags={b.tags}
                  onDeleteCompleted={refetch}
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

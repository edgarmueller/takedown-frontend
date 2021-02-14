import { Image } from "cloudinary-react";
import { DeleteBookmarkButton } from "./DeleteBookmarkButton";
import { Tags } from "./Tags";

export const BookmarkCard = ({
  bookmarkId,
  url,
  title,
  tags,
  thumbnailId,
  timestamp,
  onDeleteCompleted,
}) => (
  <div class="w-full justify-center md:px-4 lg:px-6 py-5">
    <h1 class="text-lg">{title}</h1>
    <div className="flex flex-row space-x-4">
      <a href={url} target="_blank" rel="noreferrer">
        <Image
          className="h-56 border-white border-8 hover:opacity-25"
          publicId={thumbnailId}
          width="auto"
          responsive
        />
      </a>
      <div class="flex flex-col justify-items-start space-y-4 align-middle mt-5">
        <div class="text-sm font-medium">{timestamp}</div>
        <Tags tags={tags} />
        <button class="-rounded text-sm font-medium text-left">
          MARK AS READ
        </button>
        <DeleteBookmarkButton
          bookmarkId={bookmarkId}
          onCompleted={onDeleteCompleted}
        />
      </div>
    </div>
  </div>
);

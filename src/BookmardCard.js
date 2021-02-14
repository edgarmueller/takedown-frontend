import { Image } from "cloudinary-react";
import { DeleteBookmarkButton } from "./DeleteBookmarkButton";
import { Tags } from "./Tags";

export const BookmarkCard = ({
  bookmarkId,
  title,
  tags,
  thumbnailId,
  onDeleteCompleted,
}) => (
  <div class="w-full md:px-4 lg:px-6 py-5">
    <div>
      <div>
        <Image
          className="h-56 w-full border-white border-8 hover:opacity-25"
          publicId={thumbnailId}
        />
      </div>
      <div class="px-4 py-4 md:px-10">
        <h1 class="font-bold text-lg">{title}</h1>
        {/*<p class="py-4">*TODO}</p>*/}
        <div class="flex flex-wrap pt-8">
          <div class="w-full md:w-1/3 text-sm font-medium">NOVEMBER 1,2019</div>
          <div class="w-full md:w-1/3 text-green-500 text-sm font-medium">
            MARK AS READ
          </div>
          <DeleteBookmarkButton
            bookmarkId={bookmarkId}
            onCompleted={onDeleteCompleted}
          />
        </div>
        <div className="flex flex-wrap pt-8">
          <div class="w-full md:w-2/3">
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

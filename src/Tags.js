export const Tags = ({ tags = [] }) => {
  return (
    <div class="text-sm font-medium text-gray-400">
      APPLIED TAGS:
      {tags.length > 0 ? (
        (tags || []).map((t) => <span className="text-blue-700 px-1">{t}</span>)
      ) : (
        <span className="ml-2">NONE</span>
      )}
    </div>
  );
};

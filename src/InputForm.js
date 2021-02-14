export const InputForm = ({
  id,
  label,
  onChange,
  onSubmit,
  buttonLabel = "Submit",
  clearInput = true,
  showButton = true,
  primaryButton = false,
}) => {
  let input;
  return (
    <form
      className="grid grid-cols-3 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input.value);
        if (clearInput) {
          input.value = "";
        }
      }}
    >
      <input
        type="text"
        id={id}
        className="w-full m-1 p-2 appearance-none text-gray-700 text-sm focus:outline-none col-span-2"
        placeholder={label}
        onChange={onChange}
        ref={(node) => {
          input = node;
        }}
      />
      {showButton && (
        <button
          type="submit"
          className={`w-full m-1 p-2 text-sm rounded-lg font-semibold uppercase lg:w-auto ${
            primaryButton ? "text-blue-400" : "text-gray-800"
          }`}
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
};

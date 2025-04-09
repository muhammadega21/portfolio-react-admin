function Input({
  label,
  id,
  placeholder,
  type,
  inputStyle,
  labelColor,
  group,
}) {
  return (
    <div className={group ? "" : "col-span-2"}>
      <label
        htmlFor={id}
        className={` block text-sm font-medium mb-2 ${
          labelColor ? labelColor : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={
          inputStyle
            ? inputStyle
            : "w-full px-4 py-3 rounded-lg border border-gray-300 outline-none  transition duration-150 ease-in-out"
        }
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

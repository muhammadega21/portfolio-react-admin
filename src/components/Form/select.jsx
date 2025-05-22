function Select({
  label,
  id,
  defaultValue,
  labelColor,
  group,
  category,
  inputStyle,
  value,
  onChange,
  error,
}) {
  return (
    <div className={group ? "" : "md:col-span-2"}>
      <label
        className={` block text-sm font-medium mb-2 ${
          error ? "text-red-600" : labelColor ? labelColor : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <select
        value={value || ""}
        onChange={onChange}
        className={`select select-lg rounded-lg w-full border cursor-pointer ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none ${inputStyle}`}
        id={id}
        name={id}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {category.data?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-start block text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
}

export default Select;

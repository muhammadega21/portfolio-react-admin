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
}) {
  return (
    <div className={group ? "" : "md:col-span-2"}>
      <label
        className={` block text-sm font-medium mb-2 ${
          labelColor ? labelColor : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`select select-lg rounded-lg w-full border border-gray-300 focus:outline-none ${inputStyle}`}
        id={id}
        name={id}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

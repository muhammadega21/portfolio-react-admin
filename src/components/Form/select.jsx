function Select({
  label,
  id,
  defaultValue,
  labelColor,
  group,
  data,
  inputStyle,
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
        defaultValue={defaultValue}
        className={`select select-lg rounded-lg w-full border border-gray-300 focus:outline-none ${inputStyle}`}
        id={id}
        name={id}
      >
        <option disabled={true}>{defaultValue}</option>
        {data.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

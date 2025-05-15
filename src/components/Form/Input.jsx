import { HelpCircle } from "lucide-react";

function Input({
  label,
  id,
  placeholder,
  type,
  inputStyle,
  labelColor,
  group,
  value,
  onChange,
  toolTip,
  toolTipImg,
  error,
}) {
  return (
    <div className={group ? "" : "col-span-2"}>
      <div className="flex gap-x-1">
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2  ${
            error ? "text-red-600" : labelColor ? labelColor : "text-gray-700"
          }`}
        >
          {label}
        </label>
        {toolTip && (
          <div className="tooltip tooltip-right">
            <div className="tooltip-content ">
              <div>
                <img src={`/img/${toolTipImg}.png`} alt={toolTipImg} />
              </div>
            </div>
            <div className="cursor-pointer">
              <HelpCircle size={14} />
            </div>
          </div>
        )}
      </div>
      <input
        type={type}
        id={id}
        className={
          inputStyle
            ? inputStyle
            : `w-full px-4 py-3 rounded-lg border ${
                error ? "border-red-500" : "border-gray-300"
              }  outline-none  transition duration-150 ease-in-out`
        }
        placeholder={placeholder}
        value={type !== "file" ? value : undefined}
        onChange={onChange}
      />
      {error && (
        <span className="text-red-500 text-start block text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;

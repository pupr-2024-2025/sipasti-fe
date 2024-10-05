const InputField = ({ label, placeholder, state, value, onChange }) => {
  const baseClasses = "p-2 w-full border rounded-[16px] text-Small"; // Rounded border with 16px
  let stateClasses = "";

  switch (state) {
    case "enabled":
      stateClasses = "border-outline";
      break;
    case "hovered":
      stateClasses = "border-blue-500";
      break;
    case "pressed":
      stateClasses = "border-blue-700";
      break;
    case "focused":
      stateClasses = "border-blue-500 ring-2 ring-blue-300";
      break;
    case "disabled":
      stateClasses = "border-gray-200 bg-gray-100 cursor-not-allowed";
      break;
    default:
      stateClasses = "border-outline";
  }

  return (
    <div className="mb-4">
      <label className="text-B2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${stateClasses}`} // Combined classes
        disabled={state === "disabled"}
      />
    </div>
  );
};

export default InputField;

const InputField = ({ label, placeholder, state }) => {
    const baseClasses = "p-2 w-full border rounded-lg text-Small";
    let stateClasses = "";
  
    switch (state) {
      case "enabled":
        stateClasses = "border-gray-300";
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
        stateClasses = "border-gray-300";
    }
  
    return (
      <div className="mb-4">
        <label className="text-B2">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          className={`${baseClasses} ${stateClasses}`}
          disabled={state === "disabled"}
        />
      </div>
    );
  };
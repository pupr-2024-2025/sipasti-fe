import React from 'react';

const InputField = ({ label, placeholder, value, onChange, state = 'enabled', type = 'text' }) => {
  // Base styles for the input container
  const containerClasses = "flex items-center align-self-stretch gap-[12px] h-[48px] p-[12px] rounded-[16px]";

  // Handling different state classes based on the input state
  let stateClasses = "";
  switch (state) {
    case "enabled":
      stateClasses = "border-[1.5px] border-outline";
      break;
    case "hovered":
      stateClasses = "border-[1.5px] border-blue-500";
      break;
    case "pressed":
      stateClasses = "border-[1.5px] border-blue-700";
      break;
    case "focused":
      stateClasses = "border-[1.5px] border-blue-500 ring-2 ring-blue-300";
      break;
    case "disabled":
      stateClasses = "border-[1.5px] border-gray-200 bg-gray-100 cursor-not-allowed";
      break;
    default:
      stateClasses = "border-[1.5px] border-outline";
  }

  return (
    <div className="w-80 h-16 flex flex-col justify-end items-start mb-4">
      {/* Label */}
      <label className="text-black/90 text-sm font-normal font-poppins leading-snug mb-1">{label}</label>

      {/* Input field */}
      <div className={`${containerClasses} ${stateClasses}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-full text-Small font-poppins text-base leading-tight placeholder-black/40"
          disabled={state === 'disabled'}
        />
        {/* Optional: Add icon or additional element */}
        <div className="w-6 h-6 relative">
          {/* Icon space, if needed */}
        </div>
      </div>
    </div>
  );
};

export default InputField;

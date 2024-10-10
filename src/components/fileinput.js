import React, { useRef } from "react";
import Button from "./button";

const FileInput = ({
  onFileSelect,
  buttonText = "Upload File",
  iconLeft = null,
  iconRight = null,
  multiple = false,
  accept = "*",
  className = "",
  Label = "",
  HelperText = "",
  state = "default", // New prop for state
  progress = 0, // New prop for progress percentage
  onCancel, // New prop for handling cancel action
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  return (
    <div className={className}>
      {/* Hidden file input field */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      />

      {/* Custom button for file upload */}
      <div>
        {Label && (
          <p className="text-B2 text-emphasis-on_surface-high">{Label}</p>
        )}

        {/* State-based rendering */}
        {state === "default" && (
          <div className="border-2 border-dashed border-emphasis-on_surface-small px-3 py-2 rounded-[16px] flex justify-left items-center space-x-3">
            <Button
              onClick={handleButtonClick}
              variant="solid_blue"
              size="Small"
              iconLeft={iconLeft}
              iconRight={iconRight}>
              {buttonText}
            </Button>
            <p className="text-Small text-emphasis-on_surface-small text-left">
              Tidak ada berkas terpilih.
            </p>
          </div>
        )}

        {state === "processing" && (
          <div className="border-2 border-dashed border-yellow-500 px-3 py-2 rounded-[16px] flex justify-left items-center space-x-3">
            <Button
              variant="solid_blue"
              size="Small"
              disabled // Disable button during processing
            >
              Memproses... {progress}%
            </Button>
            <p className="text-Small text-yellow-600 text-left">
              Harap tunggu, kami sedang memproses berkas Anda.
            </p>
          </div>
        )}

        {state === "done" && (
          <div className="border-2 border-solid border-green-500 px-3 py-2 rounded-[16px] flex justify-left items-center space-x-3">
            <Button
              variant="solid_blue"
              size="Small"
              disabled // Disable button after processing is done
            >
              Selesai
            </Button>
            <p className="text-Small text-green-600 text-left">
              Berkas berhasil diunggah.
            </p>
            {onCancel && (
              <Button
                variant="solid_red" // You can choose a different variant for the cancel button
                size="Small"
                onClick={onCancel} // Call the onCancel function when the button is clicked
                iconLeft={null}
                iconRight={null}>
                X
              </Button>
            )}
          </div>
        )}

        {HelperText && (
          <p className="text-Small text-emphasis-on_surface-medium">
            {HelperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileInput;

import React, { useRef, useEffect, useState } from "react";
import Button from "./button";
import { DocumentText1 } from "iconsax-react";
import colors from "../styles/colors";

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
  state = "default",
  progress = 0,
  onCancel,
  selectedFile,
}) => {
  const fileInputRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (onFileSelect) {
      onFileSelect(files);
    }
  };

  useEffect(() => {
    if (state === "processing") {
      setStartTime(Date.now());
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Calculate elapsed time in seconds
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [state]);

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

        {state === "processing" && selectedFile && (
          <div className="border-2 border-dashed border-yellow-500 px-3 py-2 rounded-[16px] flex flex-col space-y-2">
            <div className="flex items-center justify-between w-full">
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

            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-yellow-500 rounded-full"
                style={{ width: `${progress}%` }}></div>
            </div>

            {/* Additional File Information */}
            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0">
                {/* File Icon instead of Preview */}
                <DocumentText1 size="32" color="#FFC107" />
              </div>
              <div className="ml-2">
                <p className="text-Small font-semibold">{selectedFile?.name}</p>
                <p className="text-Small">
                  Size:{" "}
                  {selectedFile
                    ? (selectedFile.size / (1024 * 1024)).toFixed(2)
                    : "0.00"}{" "}
                  MB
                </p>
                <p className="text-Small">Waktu berlalu: {elapsedTime} detik</p>
              </div>
            </div>
          </div>
        )}

        {state === "done" && (
          <div className="border-2 border-solid border-green-500 px-3 py-2 rounded-[16px] flex justify-left items-center space-x-3">
            <Button variant="solid_blue" size="Small" disabled>
              <div className="mt-2 flex items-top content-start space-x-3">
                <div className="flex-shrink-0">
                  <DocumentText1
                    size="32"
                    color={colors.Emphasis.Light.On_Surface.High}
                  />
                </div>
                <div className="space-y-1 flex justify-left flex-col">
                  <p className="text-Small font-semibold">
                    {selectedFile?.name}
                  </p>
                  <p className="text-Small">
                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <p className="text-Small text-green-600 text-left">
                    Berkas berhasil diunggah.
                  </p>
                </div>
              </div>
            </Button>
            {onCancel && (
              <Button
                variant="solid_red"
                size="Small"
                onClick={onCancel}
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

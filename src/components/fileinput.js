import React, { useRef, useEffect, useState } from "react";
import Button from "./button";
import { DocumentText1, Trash } from "iconsax-react";
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
  totalProcessingTime = 30, // Total waktu pemrosesan dalam detik
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
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Menghitung waktu berlalu dalam detik
      }, 1000); // Memperbarui setiap detik

      return () => clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    }
  }, [state, startTime]);

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
            {/* Additional File Information */}
            <div className="mt-2 flex items-center">
              <div className="flex-shrink-0">
                {/* File Icon instead of Preview */}
                <DocumentText1 size="32" color="#FFC107" />
              </div>
              <div className="ml-2">
                <p className="text-Small font-semibold">{selectedFile?.name}</p>
                <div className="flex flex-row justify-between items-center custom-padding">
                  <p className="text-Small items-center gap-1 inline-flex">
                    <p className="text-Small">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div className="Ellipse1 w-0.5 h-0.5 bg-black/40 rounded-full" />
                    <p className="text-Small">
                      {totalProcessingTime - elapsedTime} Detik Tersisa
                    </p>
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <Button
                      variant="solid_blue"
                      size="Small"
                      disabled // Disable button during processing
                    >
                      {progress}%
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-yellow-500 rounded-full"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {state === "done" && (
          <div className="border-2 border-solid border-green-500 px-3 py-4 rounded-[16px] flex justify-self-stretch items-left space-x-3">
            <Button
              variant="solid_blue"
              size="Small"
              className="items-start w-full custom-padding"
              disabled>
              <div className="flex items-start content-start space-x-3 w-full">
                <div className="flex-shrink-0">
                  <DocumentText1
                    size="32"
                    color={colors.Emphasis.Light.On_Surface.High}
                  />
                </div>
                <div className="space-y-1 flex flex-col text-left w-full">
                  <div className="justify-between items-center inline-flex">
                    <p className="text-Medium w-full">{selectedFile?.name}</p>
                    {onCancel && (
                      <Button
                        variant="solid_red"
                        size="Small"
                        className="custom-padding"
                        onClick={onCancel}
                        iconLeft={null}
                        iconRight={null}>
                        <Trash
                          size="32"
                          color={colors.Emphasis.Light.On_Surface.High}
                        />
                      </Button>
                    )}
                  </div>
                  <div className="items-center gap-1 inline-flex">
                    <p className="text-Small">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div className="Ellipse1 w-0.5 h-0.5 bg-black/40 rounded-full" />
                    <p className="text-Small text-green-600">
                      Berkas berhasil diunggah.
                    </p>
                  </div>
                </div>
              </div>
            </Button>
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

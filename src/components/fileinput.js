import React, { useRef, useEffect, useState } from "react";
import Button from "./button";
import { DocumentText1, Trash, CloseCircle } from "iconsax-react";
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
  // totalProcessingTime = 30,
  required = false, // Tambahkan prop untuk mengatur apakah field ini wajib
}) => {
  const fileInputRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Jika field required, periksa jika tidak ada file yang dipilih
    if (required && files.length === 0) {
      setErrorMessage("File wajib dipilih.");
    } else {
      setErrorMessage(""); // Kosongkan pesan kesalahan jika valid
      if (onFileSelect) {
        onFileSelect(files);
      }
    }
  };

  useEffect(() => {
    if (state === "processing") {
      setStartTime(Date.now());
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state, startTime]);

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      />
      <div>
        {Label && (
          <p className="text-B2 text-emphasis-on_surface-high">
            {Label} {required && <span className="text-red-500">*</span>}
          </p>
        )}

        {/* Tampilkan pesan kesalahan */}
        {errorMessage && (
          <p className="text-red-500 text-Small">{errorMessage}</p>
        )}

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
          <div className="bg-custom-neutral-100 px-3 py-2 rounded-[16px] flex flex-col space-y-2">
            <div className="flex items-start content-start space-x-3 w-full">
              <div className="flex-shrink-0">
                <DocumentText1
                  size="32"
                  color={colors.Emphasis.Light.On_Surface.High}
                />
              </div>
              <div className="space-y-1 flex flex-col text-left w-full">
                <div className="justify-between items-center inline-flex">
                  <p className="text-Medium">{selectedFile?.name}</p>
                  {onCancel && (
                    <div
                      className="custom-padding cursor-pointer"
                      onClick={onCancel}>
                      <CloseCircle
                        size="32"
                        color={colors.Emphasis.Light.On_Surface.High}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center w-full custom-padding">
                  <div className="inline-flex items-center gap-1">
                    <p className="text-Small text-emphasis-on_surface-small">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <div className="text-Small text-emphasis-on_surface-medium rounded-md py-1 px-3">
                      {progress}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-1 bg-custom-neutral-0 rounded-full">
              <div
                className="absolute h-full bg-custom-blue-500 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        {state === "done" && (
          <div className="border-2 border-solid border-custom-blue-500 px-3 py-4 rounded-[16px] flex justify-self-stretch items-left space-x-3">
            <div className="flex items-start content-start space-x-3 w-full cursor-default">
              <div className="flex-shrink-0">
                <DocumentText1
                  size="32"
                  color={colors.Emphasis.Light.On_Surface.High}
                />
              </div>
              <div className="space-y-1 flex flex-col text-left w-full">
                <div className="justify-between items-center inline-flex">
                  <p className="text-Medium w-full">{selectedFile?.name}</p>
                  <Button
                    variant="solid_red"
                    size="Small"
                    className="custom-padding relative z-10"
                    onClick={onCancel}
                    iconLeft={null}
                    iconRight={null}>
                    <Trash
                      size="32"
                      color={colors.Emphasis.Light.On_Surface.High}
                    />
                  </Button>
                </div>
                <div className="items-center gap-1 inline-flex">
                  <p className="text-Small">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <p className="text-Small text-custom-blue-500">
                    Berkas berhasil diunggah.
                  </p>
                </div>
              </div>
            </div>
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

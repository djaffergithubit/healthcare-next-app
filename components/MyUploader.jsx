import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "@/assets/upload-cloud-02.svg";
import docIcon from "@/assets/upload-cloud-02.svg";
import Image from "next/image";
import pdfIcon from "@/assets/pdfjpg.jpg";
import closeIcon from "@/assets/close.png";

export default function MyUploader({ preview, setPreview }) {
  const [fileInfo, setFileInfo] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (preview) return; // Prevent uploading if already uploaded
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Size in KB
      });
    }
  }, [preview]);

  const removeFile = () => {
    setPreview(null);
    setFileInfo(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
    multiple: false,
    noClick: !!preview, // Prevents click to open file dialog if preview exists
    noDrag: !!preview,  // Prevents dragging files if preview exists
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl overflow-hidden p-4 transition-all duration-200 w-full flex items-center justify-center ${
          isDragActive ? "border-blue-400 bg-blue-100" : "border-gray-400 h-40 bg-[#1A1D21]"
        } ${preview ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} disabled={!!preview} />
        {!preview && (
          <div className="text-white flex flex-col items-center px-4 text-center">
            <Image src={uploadIcon} alt="Upload Icon" priority />
            <p className="font-medium text-[#76828D]">
              <span className="text-[#24AE7C]">Click to upload </span>or drag and drop
            </p>
            <p className="text-sm text-[#76828D] mt-1">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        )}
        {preview && fileInfo && (
          <section className="py-4 mx-16 px-12 flex items-center justify-between w-full">
            <div className="flex items-center gap-4 text-white w-full justify-start">
              <div className="shrink-0">
                <Image
                  src={pdfIcon}
                  alt="Document Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium text-white truncate max-w-[250px]">
                  {fileInfo.name}
                </span>
                <span className="text-xs text-[#9CA3AF]">{fileInfo.size} KB</span>
              </div>
            </div>
            <button onClick={removeFile} className=" cursor-pointer">
              <Image src={closeIcon} alt="Close Icon" width={20} height={20} />
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

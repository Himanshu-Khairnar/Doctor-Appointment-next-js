"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const convertFileToUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
    if (acceptedFiles.length > 0) {
      setPreviewUrl(convertFileToUrl(acceptedFiles[0]));
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="file-upload border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center"
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <Image
          src={previewUrl}
          width={1000}
          height={1000}
          alt="Uploaded Image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <Image
          src='/assets/icons/upload.svg' // Adjust path as necessary
          height={100}
          width={100}
          alt="Upload Icon"
        />
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;

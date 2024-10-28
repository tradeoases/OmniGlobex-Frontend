import React, { useState, useRef, DragEvent, ChangeEvent } from "react";

// Convert file to base64 string
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface SingleImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  fieldName: string;
  image_url?: string;
  className?: string; // Add this line
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  setImage,
  fieldName,
  image_url,
  className,
}: SingleImageUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const [imageData, setImageData] = useState<{
    name: string;
    type: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const base64Image = await toBase64(file);
    setImageData({
      name: file.name,
      type: file.type,
    });
    setImage(base64Image);
  };

  // Handle drag and drop events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0]; // Only allow one image
    if (file) {
      handleFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageData(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Simulate click on file input when the image is clicked
  };

  return (
    <div className={`border-blue-400 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold">
        {fieldName ? fieldName : "Upload an Image"}
      </h2>

      {/* Drag and drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 ${
          dragging ? "border-blue-200 bg-blue-50" : "border-gray-300 bg-white"
        } 
          p-0 flex flex-col w-52 h-52 items-center justify-center rounded-full`}
      >
        <div className="relative w-full h-full m-0">
          <img
            src={image || image_url}
            alt={imageData?.name}
            className="w-full h-full rounded-full  object-cover cursor-pointer border-2 p-0 m-0"
            onClick={handleImageClick}
          />

          {image && (
            <button
              className="absolute bottom-0 right-0 mb-4 mr-4 bg-red-500 text-white p-1 rounded-full text-xl"
              onClick={removeImage}
            >
              ✕
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden max-w-0 max-h-0 p-0 m-0"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleImageUpload;

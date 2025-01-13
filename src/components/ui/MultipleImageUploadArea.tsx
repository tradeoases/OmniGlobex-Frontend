import React, { useState, DragEvent, ChangeEvent } from "react";

// Convert file to base64 string
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const MultipleImageUpload: React.FC<{
  images: { [k: string]: string };
  setImages: (images: { [k: string]: string }) => void;
}> = ({ images, setImages }) => {
  const [dragging, setDragging] = useState(false);

  // Handle image selection
  const handleFiles = async (files: FileList) => {
    const uploadedImages: { [k: string]: string } = { ...images };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Only process image files
      if (file.type.startsWith("image/")) {
        const base64Image = await toBase64(file);
        uploadedImages[`${file.name}-${Date.now()}`] = base64Image;
      }
    }

    setImages(uploadedImages);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const removeImage = (id: string) => {
    const updated: { [k: string]: string } = { ...images };
    delete updated[id];
    setImages(updated);
  };

  return (
    <div>
      <h2>Upload Images</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: dragging ? "#f0f8ff" : "#fff",
          transition: "background-color 0.3s ease",
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div>
          {Object.keys(images).length === 0 ? (
            <p>No images uploaded yet</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Object.entries(images).map(([key, image]) => (
                <div key={key} style={{ margin: "10px", textAlign: "center" }}>
                  <img
                    src={image}
                    alt={key}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <p>{key}</p>
                  <button onClick={() => removeImage(key)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleImageUpload;

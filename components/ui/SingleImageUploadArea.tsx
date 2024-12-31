interface SingleImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  fieldName: string;
  image_url?: string;
  className?: string;
}

const SingleImageUpload = ({
  image,
  setImage,
  fieldName,
  image_url,
  className,
}: SingleImageUploadProps) => {
  return (
    <div className={className}>
      {/* ... existing component code ... */}
    </div>
  );
};

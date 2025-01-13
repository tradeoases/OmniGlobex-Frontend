import { useState } from "react";

import { IProduct } from "@/service/apis/product-services";

export const StoreFrontCardProducts: React.FC<
  IProduct & {
    onPreview?: () => void;
    isPreview?: boolean;
  }
> = ({
  name,
  description,
  // product_id,
  cover_image,
  price_currency,
  product_price,
  onPreview,
  isPreview,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full rounded-xl p-6 relative shadow space-y-4 bg-white">
      <div className="w-full rounded-xl flex items-center justify-center bg-gray-300">
        <img
          className="object-cover rounded-xl w-full h-full"
          src={cover_image?.thumbnail_url}
          alt={name}
        />
      </div>

      <p className="font-bold line-clamp-2 text-lg hover:text-main relative">
        {name}
      </p>

      <p className="font-bold line-clamp-2 text-sm hover:text-main relative">
        {description}
      </p>

      <p className="text-base font-semibold flex gap-x-4">
        <span className="text-red-600">
          {price_currency} {product_price}
        </span>
      </p>

      {!isPreview && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview?.();
          }}
          className="w-full bg-main hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          Preview Product
        </button>
      )}

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute -top-4 left-0 w-full bg-black/5 border rounded-xl h-full p-6"
        ></div>
      )}
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/service/apis/product-services";

export const ProductPageProductCard: React.FC<IProduct> = ({
  name,
  description,
  product_id,
  cover_image,
  price_currency,
  product_price,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-full rounded-xl p-6 relative shadow space-y-4 bg-white"
      onMouseEnter={() => setOpen(true)}
      onClick={() => navigate(`details/${product_id}`)}
    >
      <div className="w-full h-52 rounded-xl flex items-center justify-center bg-gray-300">
        <img
          className="object-cover rounded-xl w-full h-full"
          src={cover_image?.thumbnail_url}
          alt={name}
        />
      </div>

      {/* <div className="flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-xl text-main">
            ★
          </span>
        ))}
      </div> */}

      <p className="font-bold line-clamp-2 text-lg hover:text-main relative">
        {name}
      </p>

      <p className="font-bold line-clamp-2 text-sm hover:text-main relative">
        {description}
      </p>

      <p className="text-base font-semibold flex gap-x-4">
        {/* <span className="text-gray-400 line-through">$28.27</span> */}
        <span className="text-red-600">
          {price_currency} {product_price}
        </span>
      </p>

      <div>
        {/* <span className="text-xs bg-green-500 uppercase right-7 px-3 rounded-full text-white absolute top-7">
          popular
        </span> */}
        {/* <div className="w-full  absolute top-5 left-0 px-6">
          <p className="h-1 w-2/3 bg-main"></p>
        </div> */}
      </div>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute -top-4 left-0 w-full bg-black/5 border rounded-xl h-full p-6"
        ></div>
      )}
    </div>
  );
};

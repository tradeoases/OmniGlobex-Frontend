import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { HiArrowPath } from "react-icons/hi2";
import { IoExpandOutline } from "react-icons/io5";

import { Button } from "./ui/button";
import { IProduct } from "@/service/apis/product-services";

export const ProductCard: React.FC<IProduct> = ({
  name,
  description,
  product_id,
  cover_image,
  price_currency,
  product_price,
}) => {
  const [fav, setFav] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-full rounded-xl p-6 relative shadow space-y-4 bg-white"
      onClick={() => navigate(`/single-product/?product_id=${product_id}`)}
    >
      <div className="w-full h-52 rounded-xl flex items-center justify-center bg-gray-300">
        <img
          className="object-cover rounded-xl w-full h-full"
          src={cover_image?.thumbnail_url}
          alt={name}
        />
        <div className="w-14 h-52 absolute  p-2 flex items-center gap-2 flex-col justify-center right-6">
          <Button
            onClick={() =>
              navigate(`/single-product/?product_id=${product_id}`)
            }
            className="w-10 h-10"
            variant="outline"
            size="icon"
          >
            <IoExpandOutline className="text-2xl" />
          </Button>
          <Button
            onClick={() => setFav(!fav)}
            className="w-10 h-10"
            variant="outline"
            size="icon"
          >
            {fav ? (
              <IoMdHeart className="text-2xl text-main" />
            ) : (
              <IoIosHeartEmpty className="text-2xl" />
            )}
          </Button>
          <Button className="w-10 h-10" variant="outline" size="icon">
            <HiArrowPath className="text-2xl" />
          </Button>
        </div>
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

      <div>
        <span className="text-xs bg-green-500 uppercase right-7 px-3 rounded-full text-white absolute top-7">
          popular
        </span>
      </div>
    </div>
  );
};

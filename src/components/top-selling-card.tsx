import { IProduct } from "@/service/apis/product-services";
import { useNavigate } from "react-router-dom";

export const TopSellingCard: React.FC<IProduct> = ({
  product_id,
  cover_image,
  name,
  description,
  price_currency,
  product_price,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/single-product/?product_id=${product_id}`)}
      className="px-2 rounded-xl md:px-6 relative p-4 md:py-6 grid grid-cols-12 gap-x-4 xl:gap-x-6 bg-white"
    >
      <div className="col-span-5 h-32 md:h-40 lg:h-48 p-2 flex items-center justify-center lg:text-3xl">
        <img
          src={cover_image?.thumbnail_url}
          alt={name}
          className="object-cover w-full rounded-xl lg:w-32 xl:w-48 h-32 md:h-40 xl:h-48"
        />
      </div>

      <div className="space-y-1 h-32 col-span-7 md:h-40 xl:h-48 md:space-y-3 lg:space-y-2 xl:space-y-4">
        {/* <div className="flex items-center gap-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span className="text-lg text-main" key={i}>
              ★
            </span>
          ))}
        </div> */}

        <p className="font-semibold text-xs line-clamp-6 md:text-sm">
          {description}
        </p>
        <p className="text-sm lg:text-base font-bold flex items-center gap-x-3">
          {/* <span className="text-gray-400 line-through">$20.64</span>{" "} */}
          <span className="text-red-600">
            {price_currency} {product_price}
          </span>
        </p>
      </div>
    </div>
  );
};

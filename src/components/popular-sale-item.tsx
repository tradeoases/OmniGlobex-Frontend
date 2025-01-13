import { IProduct } from "@/service/apis/product-services";
import { Link } from "lucide-react";

export const PopularSaleItem: React.FC<IProduct> = ({
  description,
  cover_image,
  product_id,
  name,
}) => {
  return (
    <Link
      to={`/single-product/?product_id=${product_id}`}
      className="p-4 py-3 rounded-xl border-b border-light w-full grid grid-cols-12 bg-white gap-x-3"
    >
      <img
        className="object-cover rounded-xl col-span-3"
        src={cover_image?.thumbnail_url}
        alt={name}
      />

      <div className="col-span-9 flex flex-col justify-center">
        <p className="line-clamp-2 text-xs font-bold">{description}</p>
        <p className="text-sm font-bold flex items-center gap-2">
          <span className="line-through text-gray-400">$ 20.12</span>
          <span className=" text-red-500">$18</span>
        </p>
      </div>
    </Link>
  );
};

import { HiOutlineXMark } from "react-icons/hi2";

import { IOrder } from "@/store/order-store";
import { Button } from "./ui/button";

interface Props extends IOrder {
  onClose: () => void;
  loading: boolean;
}

export const CartHeaderItem: React.FC<Props> = ({
  Product,
  onClose,
  loading,
}) => {
  return (
    <div className="w-full flex justify-between py-2">
      <div className="flex gap-x-2">
        <div>
          <img
            src={Product.cover_image?.thumbnail_url}
            alt={Product.name}
            className="w-16 h-16 object-cover"
          />
        </div>
        <div className="space-y-1 flex flex-col font-medium">
          <p className="hover:text-blue-700">{Product.name}</p>
          <p className="text-red-500">200.01 UGX</p>
        </div>
      </div>

      <div>
        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
          className="cursor-pointer  hover:bg-white p-0 m-0 hover:text-red-500"
          onClick={onClose}
        >
          <HiOutlineXMark />
        </Button>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HiOutlineXMark } from "react-icons/hi2";
import { IWishLists, wishlistData, wishListHeader } from "@/data/data";

const WishList = () => {
  const [wishList, setWishList] = useState<IWishLists[]>([]);

  useEffect(() => {
    //TODO: Fetch wishlists from api

    setWishList(wishlistData);
  }, []);

  const incrementQuantity = (index: number) => {
    const wishListItems = [...wishList];
    wishListItems[index].quantity += 1;
    wishListItems[index].total =
      wishListItems[index].quantity * wishListItems[index].price;
    setWishList(wishListItems);
  };

  const decrementQuantity = (index: number) => {
    const wishListItems = [...wishList];
    if (wishListItems[index].quantity > 1) {
      wishListItems[index].quantity -= 1;
      wishListItems[index].total =
        wishListItems[index].quantity * wishListItems[index].price;
      setWishList(wishListItems);
    }
  };

  return (
    <div className="col-span-3 bg-white p-8 space-y-8  relative w-full overflow-x-auto ">
      <table className="min-w-full text-xs text-left text-gray-500 dark:text-gray-400 ">
        <tbody className="">
          <tr className="text-gray-500 bg-gray-100 border-t whitespace-nowrap px-2 border-b default-border-bottom">
            {wishListHeader.map((header, i) => (
              <th
                key={i}
                className={`py-4  whitespace-nowrap text-sm  ${
                  i === 0 ? " text-left pl-2" : " text-center "
                }`}
              >
                {header}
              </th>
            ))}
          </tr>

          {wishList.map((item, i) => (
            <tr
              key={i}
              className="bg-white text-center border-b hover:bg-gray-50"
            >
              <td className="pl-4 py-4 min-w-[250px]">
                <div className="flex items-center max-w-lg">
                  <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-20 overflow-hidden flex justify-center items-center border">
                    img
                  </div>
                  <div className="pl-4">
                    <p className="font-medium text-xs text-qblack">
                      {item.product}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-center py-4 px-4 min-w-[150px]">
                <span className="text-xs font-normal">{item.stockStatus}</span>
              </td>
              <td className="text-center py-4 px-4">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-xs font-normal">
                    {item.currency}
                    {item.price}
                  </span>
                </div>
              </td>
              <td className=" py-4 px-4">
                <div className="border w-32 flex items-center justify-between">
                  <Button
                    className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                    onClick={() => decrementQuantity(i)}
                  >
                    -
                  </Button>
                  <span className="text-gray-500 border-l border-r px-4">
                    {item.quantity}
                  </span>
                  <Button
                    className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                    onClick={() => incrementQuantity(i)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-xs font-normal">
                    {item.currency}
                    {item.total}
                  </span>
                </div>
              </td>
              <td className="text-right py-4 px-4">
                <div className="flex pr-4 items-center hover:text-red-500 justify-center cursor-pointer">
                  <HiOutlineXMark className="text-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex items-center justify-end gap-x-2">
        <Button
          variant="link"
          // onClick={handleRemoveAll}
          className="text-sm font-semibold text-red-500 py-2 px-4"
        >
          Clean Wishlist
        </Button>

        <Button className="rounded-none shadow-none bg-main h-12 text-black">
          Add To Cart All
        </Button>
      </div>
    </div>
  );
};

export default WishList;

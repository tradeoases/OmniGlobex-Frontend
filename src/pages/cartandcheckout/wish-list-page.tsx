import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { tableHeader, wishlistItems } from "@/data/data";

const WishListPage: React.FC = () => {
  const [wishlist, setWishlist] = useState(wishlistItems);

  const handleDecreaseQuantity = (itemId: number) => {
    const updatedWishlist = wishlist.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setWishlist(updatedWishlist);
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const updatedWishlist = wishlist.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setWishlist(updatedWishlist);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  const handleRemoveAll = () => {
    setWishlist([]);
  };

  return (
    <div className="bg-white w-full">
      <PageHeader route="/ wishlist" name="Wishlist" />
      {wishlist.length > 0 ? (
        <div className="w-10/12 text-center xl:w-8/12 mx-auto space-y-8 my-8">
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {tableHeader.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishlist.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.icon}
                        alt="Product Icon"
                        className="w-24 h-20"
                      />
                      <span className="font-medium text-[15px] text-qblack">
                        {item.product}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span
                      className="w-5 h-5 inline-block rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="px-2 inline-block text-xs leading-5 font-semibold rounded-full text-gray-500">
                      {item.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="border w-32 flex items-center justify-between">
                      <Button
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="text-gray-500 border-l border-r px-4">
                        {item.quantity}
                      </span>
                      <Button
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      {item.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right">
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <HiOutlineXMark />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full flex items-center justify-end gap-x-2">
            <Button
              variant="link"
              onClick={handleRemoveAll}
              className="text-sm font-semibold text-red-500 py-2 px-4"
            >
              Clean Wishlist
            </Button>

            <Button className="rounded-none shadow-none bg-main h-12 text-black">
              Add To Cart All
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-10/12 xl:w-8/12 my-8 flex items-center justify-center mx-auto">
          <p className="text-lg font-medium text-gray-400">
            Wish list is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default WishListPage;

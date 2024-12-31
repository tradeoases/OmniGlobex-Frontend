import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRecoilState } from "recoil";
import { AxiosResponse, HttpStatusCode } from "axios";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { tableHeader } from "@/data/data";
import { Input } from "@/components/ui/input";
import { IOrder, OrdersStore } from "@/store/order-store";
import {
  deleteOneOrderByUser,
  getAllUserOrders,
  IUpdateOrderData,
  updateOrderQuantity,
} from "@/service/apis/order-service";

export const ShoppingCartPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(
    OrdersStore
  );

  const fetchOrdersByUser = async () => {
    try {
      const response: AxiosResponse = await getAllUserOrders();

      if (response.status === HttpStatusCode.Ok) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const removeToCart = async (order_id: string) => {
    if (!cartItems) {
      return;
    }

    try {
      setLoading(true);

      const response: AxiosResponse = await deleteOneOrderByUser(order_id);

      if (response.status === HttpStatusCode.Ok) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDecreaseQuantity = async (orderId: string, quantity: number) => {
    if (quantity <= 1) {
      return;
    }

    try {
      setLoading(false);
      const data: IUpdateOrderData = {
        order_id: orderId,
        quantity: quantity - 1,
      };
      const response: AxiosResponse = await updateOrderQuantity(data);

      if (response.status === HttpStatusCode.Ok) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (orderId: string, quantity: number) => {
    try {
      setLoading(false);
      const data: IUpdateOrderData = {
        order_id: orderId,
        quantity: quantity + 1,
      };
      const response: AxiosResponse = await updateOrderQuantity(data);

      if (response.status === HttpStatusCode.Ok) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full">
      <PageHeader route="/ cart" name="Your Cart" />

      {!cartItems || (cartItems && cartItems.length > 0) ? (
        <div className="w-10/12 text-center xl:w-8/12 mx-auto space-y-8 my-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                {tableHeader.map((header, i) => (
                  <td
                    key={i}
                    className={`py-4 whitespace-nowrap text-center ${
                      header === " Product " ? " min-w-[300px] pl-10 " : " "
                    }`}
                  >
                    {header}
                  </td>
                ))}
              </tr>

              {cartItems?.map((item) => (
                <tr
                  key={item.order_id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="pl-10 py-4 w-[380px]">
                    <div className="flex space-x-6 items-center">
                      <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
                        <span className="box-border block overflow-hidden w-auto h-auto opacity-100 border-none m-0 p-0 absolute inset-0">
                          <img
                            src={item.Product.cover_image?.thumbnail_url}
                            alt={item.Product.name}
                            className="w-full h-full object-contain absolute inset-0 box-border p-0 border-none m-auto block min-w-[100%] min-h-[100%] max-h-[100%]"
                          />
                        </span>
                      </div>

                      <div className="flex-1 fle flex-col">
                        <Link
                          to={`/single-product/?product_id=${item.product_id}`}
                          className="font-medium text-[15px] hover:text-blue-700 text-gray-800"
                        >
                          {item.Product.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      price
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center whitespace-no-wrap">
                    <div className="border w-32 flex items-center justify-between">
                      <Button
                        disabled={loading}
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() =>
                          handleDecreaseQuantity(item.order_id, item.quantity)
                        }
                      >
                        -
                      </Button>
                      <span className="text-gray-500 border-l border-r px-4">
                        {item.quantity}
                      </span>
                      <Button
                        disabled={loading}
                        className="text-base shadow-none border-none rounded-none text-gray-500 px-4 bg-white hover:bg-gray-50"
                        onClick={() =>
                          handleIncreaseQuantity(item.order_id, item.quantity)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 text-center py-4 whitespace-no-wrap">
                    <span className="text-xs leading-5 font-semibold text-gray-500">
                      total
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center whitespace-no-wrap text-right">
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => removeToCart(item.order_id)}
                    >
                      <HiOutlineXMark />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full gap-8 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-2 xl:col-span-3">
              <div className="border xl:w-72 w-full flex items-center">
                <Input
                  className="py-2 border-none shadow-none rounded-none"
                  placeholder="Discount code"
                />
                <Button className="border-none shadow-none rounded-none h-11">
                  Apply
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 xl:col-span-1 space-y-8">
              <div className="w-full flex justify-between gap-x-2">
                <Button
                  variant="secondary"
                  className="rounded-none shadow-none w-full h-12"
                >
                  Continue Shopping
                </Button>

                <Button
                  variant="secondary"
                  className="rounded-none shadow-none w-full h-12"
                >
                  Update Cart
                </Button>
              </div>

              <div className="border p-4 space-y-8">
                <p className="flex items-center border-b justify-between font-medium pb-4">
                  <span>Subtotal</span>
                  <span className="text-red-500">$321</span>
                </p>

                <p className="font-medium text-left">Shopping</p>

                <form className="flex text-xs flex-col space-y-6">
                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2  items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="1"
                      />
                      <span className="">Free Shipping</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2  items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="2"
                      />
                      <span className="">Flat Rate</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="inline-flex gap-x-2 items-center">
                      <input
                        type="radio"
                        className="custom-radio"
                        name="option"
                        value="3"
                      />
                      <span className="">Local Delivery</span>
                    </span>
                    <span>+$00.00</span>
                  </label>

                  <p className="font-medium text-left text-base">
                    Calculate Shopping
                  </p>

                  <Input
                    placeholder="Select Country"
                    className="h-11 rounded-none shadow-none"
                  />
                  <Input
                    placeholder="Postcode / ZIP"
                    className="h-11 rounded-none shadow-none"
                  />
                  <Button
                    variant="secondary"
                    className="rounded-none shadow-none w-full h-11"
                  >
                    Update Cart
                  </Button>

                  <p className="flex text-base items-center justify-between font-medium">
                    <span>Total</span>
                    <span className="text-red-500">$321</span>
                  </p>

                  <Link
                    to="/checkout"
                    className="rounded-none shadow-none w-full h-11"
                  >
                    Checkout
                  </Link>
                </form>
              </div>
            </div>
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

export default ShoppingCartPage;

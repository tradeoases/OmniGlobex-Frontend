import { useEffect, useState } from "react";
import { SlHandbag } from "react-icons/sl";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { CartHeaderItem } from "./cart-header-item";
import { OrdersStore, IOrder } from "@/store/order-store";
import {
  deleteOneOrderByUser,
  getAllUserOrders,
} from "@/service/apis/order-service";
import { IUser, userStore } from "@/store/user-store";

export const HeaderCartNav = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useRecoilValue<IUser | null>(userStore);
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(
    OrdersStore
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      !cartItems && fetchOrdersByUser();
    }
  }, []);

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
        fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="relative p-0 m-0">
          {cartItems ? (
            <span className="bg-white w-5 h-5 rounded-full text-xs flex items-center justify-center absolute top-0 -right-3">
              {cartItems.length}
            </span>
          ) : (
            <></>
          )}
          <SlHandbag className="text-sm text-white" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 rounded-none p-0">
        <div className="bg-main w-full h-1" />
        <div className="px-4 text-xs">
          <div className="h-72 scrollbar pr-2 mb-4 space-y-4 overflow-y-scroll">
            {cartItems ? (
              cartItems.map((product, i) => (
                <CartHeaderItem
                  {...product}
                  onClose={() => removeToCart(product.order_id)}
                  key={i}
                  loading={loading}
                />
              ))
            ) : (
              <div>no cart item</div>
            )}
          </div>

          <div className="border-t py-2 space-y-4">
            <p className="flex text-sm font-medium items-center justify-between">
              <span>Subtotal</span>
              <span className="text-red-500 font-medium">$234</span>
            </p>

            <div className="w-full flex space-y-2 flex-col">
              <Button
                onClick={() => navigate("/cart")}
                variant="secondary"
                className="rounded-none shadow-none w-full h-12"
              >
                View Cart
              </Button>
              <Button
                onClick={() => navigate("/checkout")}
                className="rounded-none bg-main text-black hover:bg-main/80 shadow-none w-full h-12"
              >
                Checkout Now
              </Button>
            </div>

            <div className="border-t text-gray-500 pt-4 text-sm text-center">
              <p>
                Get Return within{" "}
                <span className="text-black font-medium">30 days</span>
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

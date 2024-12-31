import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { BiLoader } from "react-icons/bi";
import { TbShoppingBag, TbShoppingBagCheck } from "react-icons/tb";
import { IProduct } from "@/service/apis/product-services";
import { Button } from "./ui/button";
import { IOrder, OrdersStore } from "@/store/order-store";
import { IUser, userStore } from "@/store/user-store";
import {
  createOrder,
  deleteOneOrderByUser,
  getAllUserOrders,
  ICreateOrder,
} from "@/service/apis/order-service";

export const HeaderProductCard: React.FC<IProduct> = ({
  cover_image,
  description,
  name,
  product_id,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddedToCart, setIsAddToCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(OrdersStore);
  const navigate = useNavigate();
  const userData = useRecoilValue<IUser | null>(userStore);

  useEffect(() => {
    if (cartItems) {
      cartItems.some((item) => item.product_id === product_id)
        ? setIsAddToCart(true)
        : setIsAddToCart(false);
    }
  }, [cartItems]);

  const addToCart = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const data: ICreateOrder = {
        product_id,
        quantity: 1,
      };
      const response: AxiosResponse = await createOrder(data);

      if (response.status === HttpStatusCode.Created) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

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

  const removeToCart = async () => {
    if (!cartItems) {
      return;
    }

    try {
      setLoading(true);
      const orderId: string = cartItems?.filter(
        (item) => item.product_id === product_id
      )[0]?.order_id || "";
      const response = await deleteOneOrderByUser(orderId);

      if (response.status === HttpStatusCode.NoContent) {
        await fetchOrdersByUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClick = () => {
    isAddedToCart ? removeToCart() : addToCart();
  };

  return (
    <div className="flex w-[200px] flex-col items-center rounded-md border p-2 shadow-md transition-all duration-300 hover:scale-105">
      <img
        src={cover_image?.thumbnail_url}
        alt={name}
        className="h-40 w-full object-cover rounded-t-md"
      />
      <div className="mt-2 flex flex-col items-center justify-between">
        <h3 className="text-center text-sm font-semibold">{name}</h3>
        <p className="text-center text-xs">{description}</p>
        <Button
          onClick={handleClick}
          className="mt-2 w-full"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <BiLoader className="animate-spin" />
          ) : (
            <span>{isAddedToCart ? <TbShoppingBagCheck /> : <TbShoppingBag />}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

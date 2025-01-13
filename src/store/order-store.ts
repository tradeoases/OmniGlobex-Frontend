import { RecoilState, atom } from "recoil";

import { TOrderType } from "@/service/apis/order-service";
import { IProduct } from "@/service/apis/product-services";

export interface IOrder {
  Product: IProduct;
  order_id: string;
  product_id: string;
  status: TOrderType;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface INewOrder {
  title: string;
  count: number;
  icon: JSX.Element;
}

export const OrdersStore: RecoilState<IOrder[] | null> = atom<IOrder[] | null>({
  key: "orders-store",
  default: null,
});

export const NewOrderStore = atom<INewOrder[]>({
  key: "NewOrderStore",
  default: [],
});

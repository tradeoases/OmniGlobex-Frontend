import request from "../base.service";

const PATH = "order/";

export interface ICreateOrder {
  product_id: string;
  quantity: number;
}

export type TOrderType = "PENDING" | "CANCELED" | "DELIVERED" | "PAID";

export interface IOrderParams {
  status?: TOrderType;
  page?: number;
  pageSize?: number;
}

export interface IDeleteMultipleOrder {
  order_id: string[];
}
export interface IUpdateOrderData {
  order_id: string;
  quantity?: number;
  status?: TOrderType;
}

export const createOrder = async (data: ICreateOrder) =>
  await request.post(PATH, data);

export const getAllUserOrders = async (params?: string) =>
  await request.get(`${PATH}user${params ? params : ""}`);

export const deleteOneOrderByUser = async (order_id: string) =>
  await request.delete(`${PATH}one${order_id}`);

// export const deleteManyOrdersByUser = async(data: IDeleteMultipleOrder) => await request.delete(`${PATH}multiple`, data)

export const updateOrderQuantity = async (data: IUpdateOrderData) =>
  await request.put(`${PATH}quantity`, data);

export const updateOrderStatus = async (data: IUpdateOrderData) =>
  await request.put(`${PATH}/status`, data);

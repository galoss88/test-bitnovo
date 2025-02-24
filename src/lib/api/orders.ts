import apiClient from "@/api/apiClient";
import { CreateOrderParams, IGetOrderInfo, IOrder } from "./types";

export async function getOrderInfo(orderId: string): Promise<IGetOrderInfo> {
  try {
    const response = await apiClient.get(`/orders/info/${orderId}`);
    return response.data[0];
  } catch (error) {
    console.error("❌ Error obteniendo información del pedido:", error);
    throw error;
  }
}

export async function createOrder(params: CreateOrderParams): Promise<IOrder> {
  try {
    const response = await apiClient.post("/orders/", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creando el pedido:", error);
    throw error;
  }
}

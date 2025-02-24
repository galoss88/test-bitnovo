import apiClient from "@/api/apiClient";
import { CreateOrderParams, IOrder } from "@/lib/api/types";

function savePaymentData(order: IOrder) {
  if (order.identifier && order.payment_uri) {
    localStorage.setItem(`payment_uri`, order.payment_uri);
  }
}

export async function createPayment(
  params: CreateOrderParams
): Promise<IOrder> {
  try {
    const response = await apiClient.post("/orders/", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order: IOrder = response.data;

    savePaymentData(order);

    return order;
  } catch (error) {
    console.error("❌ Error creando el pedido:", error);
    throw error;
  }
}

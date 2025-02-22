import apiClient from "@/lib/apiClient";
import { CreateOrderParams, IOrder } from "@/lib/api/types";

// ✅ Función para guardar `payment_uri` en `localStorage`
function savePaymentData(order: IOrder) {
  if (order.identifier && order.payment_uri) {
    localStorage.setItem(`payment_uri`, order.payment_uri);
  }
}

// ✅ Función de servicio para crear un pago
export async function createPayment(params: CreateOrderParams): Promise<IOrder> {
  try {
    const response = await apiClient.post("/orders/", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order: IOrder = response.data;

    // 🔹 Guardamos `payment_uri` en localStorage
    savePaymentData(order);

    return order;
  } catch (error) {
    console.error("❌ Error creando el pedido:", error);
    throw error;
  }
}

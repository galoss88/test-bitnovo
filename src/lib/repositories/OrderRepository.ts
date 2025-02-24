"use server"; // 🚀 Ejecuta este código en el servidor

import { IGetOrderInfo } from "@/lib/api/types";
import { getOrderInfo } from "@/lib/api/orders";

export async function getOrderById(id: string): Promise<IGetOrderInfo | null> {
  try {
    return await getOrderInfo(id);
  } catch (error) {
    console.error("❌ Error obteniendo la orden:", error);
    return null;
  }
}

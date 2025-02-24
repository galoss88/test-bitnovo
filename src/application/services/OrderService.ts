import { IGetOrderInfo } from "@/lib/api/types";
import { getOrderInfo } from "@/lib/api/orders";

export class OrderService {
  static async fetchOrder(id: string): Promise<IGetOrderInfo | null> {
    try {
      console.log(`📡 Obteniendo información de la orden ${id}`);
      const data = await getOrderInfo(id);
      return data;
    } catch (error) {
      console.error("❌ Error obteniendo la orden:", error);
      return null;
    }
  }
}

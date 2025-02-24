import { getOrderInfo } from "@/lib/api/orders";
import { IGetOrderInfo } from "@/lib/api/types";

export class OrderService {
  static async fetchOrder(id: string): Promise<IGetOrderInfo | null> {
    try {
      const data = await getOrderInfo(id);
      return data;
    } catch (error) {
      console.error("❌ Error obteniendo la orden:", error);
      return null;
    }
  }
}

import { useEffect, useState } from "react";
import { OrderService } from "@/services/OrderService";
import { IGetOrderInfo } from "@/lib/api/types";

export function useOrder(id: string) {
  const [order, setOrder] = useState<IGetOrderInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      setLoading(true);
      const data = await OrderService.fetchOrder(id);
      setOrder(data);
      setLoading(false);
    }

    fetchOrder();
  }, [id]);

  return { order, loading };
}

import { IGetOrderInfo } from "@/lib/api/types";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { useOrder } from "@/hooks/useOrder";
import useWebSocket from "@/hooks/useWebSocket";
import OrderContext from "../OrderContext";

export function OrderProvider({
  children,
  orderId,
}: {
  children: ReactNode;
  orderId: string;
}) {
  const { order, loading } = useOrder(orderId);
  const [updatedOrder, setUpdatedOrder] = useState<IGetOrderInfo | null>(null);
  const [paymentUri, setPaymentUri] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setUpdatedOrder(order);
      setPaymentUri(localStorage.getItem(`payment_uri`) || null);
    }
  }, [order]);

  // WebSocket para recibir actualizaciones en tiempo real
  useWebSocket(updatedOrder?.identifier ?? "", (data) => {
    setUpdatedOrder((prev) =>
      prev ? { ...prev, ...data } : (data as IGetOrderInfo)
    );
  });

  const contextValue = useMemo(
    () => ({
      order: updatedOrder,
      paymentUri,
      loading,
      setOrder: setUpdatedOrder,
      setPaymentUri,
    }),
    [updatedOrder, paymentUri, loading]
  );

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

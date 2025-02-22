"use client";

import QRPayment from "@/components/QRPayment";
import { getOrderInfo } from "@/lib/api/orders";
import { IGetOrderInfo } from "@/lib/api/types";
import useWebSocket from "@/lib/useWebSocket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const [order, setOrder] = useState<IGetOrderInfo | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        const data = await getOrderInfo(id);
        setOrder(data);
      } catch (error) {
        console.error("❌ Error obteniendo la orden:", error);
      }
    }

    fetchOrder();
  }, [id]);
  const onUpdate = (updatedOrder: Partial<IGetOrderInfo>) => {
    setOrder((prevOrder: any) => {
      if (!prevOrder) return { ...updatedOrder } as IGetOrderInfo;

      return {
        ...prevOrder,
        ...updatedOrder,
        // payment_uri: updatedOrder.payment_uri ?? prevOrder.payment_uri,
        // address: updatedOrder.address ?? prevOrder.address,
      };
    });
  };
  useWebSocket(order?.identifier ?? "", order?.identifier ?? "", onUpdate);

  // useWebSocket(id, order?.identifier ?? "", (updatedOrder: Partial<IOrder>) => {
  //   setOrder((prevOrder) => {
  //     if (!prevOrder) return { ...updatedOrder } as IOrder;

  //     return {
  //       ...prevOrder,
  //       ...updatedOrder,
  //       payment_uri: updatedOrder.payment_uri ?? prevOrder.payment_uri,
  //       address: updatedOrder.address ?? prevOrder.address,
  //     };
  //   });
  // });

  if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

  return <QRPayment order={order} />;
}

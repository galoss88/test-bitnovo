"use client";

import QRPayment from "@/components/QRPayment";
import { getOrderInfo } from "@/lib/api/orders";
import useWebSocket from "@/lib/useWebSocket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Hacer que algunas propiedades de Order sean opcionales para evitar errores
interface Order {
  id: string;
  status: string;
  amount: number;
  currency: string;
  qrCodeUrl?: string; // ✅ Ahora es opcional
  paymentAddress?: string;
  expirationTime?: string;
}

export default function PaymentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        const data = await getOrderInfo(id ?? "");
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }
    fetchOrder();
  }, [id]);

  useWebSocket(id as string, (updatedOrder: Partial<Order>) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return { ...updatedOrder } as Order;

      return {
        ...prevOrder,
        ...updatedOrder,
        qrCodeUrl: updatedOrder.qrCodeUrl ?? prevOrder.qrCodeUrl,
        paymentAddress: updatedOrder.paymentAddress ?? prevOrder.paymentAddress,
        expirationTime: updatedOrder.expirationTime ?? prevOrder.expirationTime,
      };
    });
  });

  if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

  return <QRPayment order={order} />;
}

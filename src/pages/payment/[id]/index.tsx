"use client";

import useWebSocket from "@/application/hooks/useWebSocket";
import MakePayment from "@/components/MakePayment";
import ResumeOrder from "@/components/Resume";
import OrderContext from "@/context/OrderContext";
import { getOrderInfo } from "@/lib/api/orders";
import { IGetOrderInfo } from "@/lib/api/types";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const params = useParams();

  //Obtenemos identificador del pago
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [order, setOrder] = useState<IGetOrderInfo | null>(null);

  const [identifier, setIdentifier] = useState<string>("");

  const [paymentUri, setPaymentUri] = useState<string | null>(null);

  console.log("id", id);
  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        if (!id) return;
        console.log(`📡 Obteniendo información de la orden ${id}`);
        const data = await getOrderInfo(id);
        console.log("data order info", data);
        setOrder(data);
        setIdentifier(data.identifier);

        // ✅ Intentar recuperar `payment_uri` desde localStorage si no está en la orden
        const storedPaymentUri = localStorage.getItem(`payment_uri`);
        if (storedPaymentUri) {
          setPaymentUri(storedPaymentUri);
        }
      } catch (error) {
        console.error("❌ Error obteniendo la orden:", error);
      }
    }

    fetchOrder();
  }, [id]);

  // ✅ Llamar `useWebSocket` correctamente después de obtener el `identifier`
  useWebSocket(identifier, (updatedOrder: Partial<IGetOrderInfo>) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return { ...updatedOrder } as IGetOrderInfo;

      return {
        ...prevOrder,
        ...updatedOrder,
        address: updatedOrder.address ?? prevOrder.address,
      };
    });
  });

  if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

  const resumeOrderItems = [
    { label: "Importe", value: order.fiat_amount },
    {
      label: "Moneda seleccionada",
      value: (
        <div className="flex items-center">
          {/* <img
            // src={selectedCurrency.image}
            // alt={selectedCurrency.name}
            className="w-6 h-6 mr-2"
          /> */}
          <span className="text-sm font-medium text-gray-900">
            {order.currency_id}
          </span>
        </div>
      ),
    },
    { label: "Comercio", value: order.merchant_device },
    { label: "Fecha", value: formatDate(order.created_at) },
    { label: "Concepto", value: "Pago de ejemplo" },
  ];

  return (
    <OrderContext.Provider value={{ order, paymentUri }}>
      <div className="container mx-auto p-6 flex justify-center w-full">
        <ResumeOrder resumeOrderItems={resumeOrderItems} />
        <MakePayment />
      </div>
    </OrderContext.Provider>
  );
}

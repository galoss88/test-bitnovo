"use client";

import { useOrder } from "@/application/hooks/useOrder";
import useWebSocket from "@/application/hooks/useWebSocket";
import MakePayment from "@/components/MakePayment";
import ResumeOrder from "@/components/Resume";
import OrderContext from "@/context/OrderContext";
import { IGetOrderInfo } from "@/lib/api/types";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Obtener la orden desde el hook
  const { order, loading } = useOrder(id ?? "");
  const [updatedOrder, setUpdatedOrder] = useState<IGetOrderInfo | null>(null);
  const [paymentUri, setPaymentUri] = useState<string | null>(null);

 
  useEffect(() => {
    if (order) {
      setUpdatedOrder(order);

      // Intentar recuperar `payment_uri` desde localStorage
      const storedPaymentUri = localStorage.getItem(`payment_uri`);
      setPaymentUri(storedPaymentUri || null);
    }
  }, [order]);

  // WebSocket para recibir actualizaciones de la orden
  useWebSocket(updatedOrder?.identifier ?? "", (data) => {
    console.log("🔄 Actualización de pedido recibida:", data);

    // Asegurar que no sobrescribimos valores importantes
    setUpdatedOrder((prev) => {
      if (!prev) return data as IGetOrderInfo;
      return { ...prev, ...data };
    });
  });

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (!updatedOrder)
    return (
      <p className="text-center text-red-500">Error obteniendo la orden</p>
    );


  const resumeOrderItems = [
    {
      label: "Importe",
      value: `${updatedOrder.fiat_amount.toFixed(2)} ${updatedOrder.fiat}`,
    },
    {
      label: "Moneda seleccionada",
      value: (
        <div className="flex items-center">
          {/* {updatedOrder.currency_logo && (
            <img
              src={updatedOrder.currency_logo}
              alt={updatedOrder.currency_id}
              className="w-6 h-6 mr-2"
            />
          )} */}
          <span className="text-sm font-medium text-gray-900">
            {updatedOrder.currency_id}
          </span>
        </div>
      ),
    },
    {
      label: "Comercio",
      value: updatedOrder.merchant_device || "Tienda de ejemplo",
    },
    { label: "Fecha", value: formatDate(updatedOrder.created_at) },
    { label: "Concepto", value: updatedOrder.notes || "Pago de ejemplo" },
  ];

  return (
    <OrderContext.Provider value={{ order: updatedOrder, paymentUri }}>
      <div className="container mx-auto p-6 flex justify-center w-full">
        <ResumeOrder resumeOrderItems={resumeOrderItems} />
        <MakePayment />
      </div>
    </OrderContext.Provider>
  );
}

//borrar despues
import "@/styles/globals.css";

import { useRouter } from "next/router"; // ⬅️ Cambio importante
import { useEffect, useState } from "react";

import { useOrder } from "@/application/hooks/useOrder";
import useWebSocket from "@/application/hooks/useWebSocket";
import MakePayment from "@/components/MakePayment";
import ResumeOrder from "@/components/Resume";
import OrderContext from "@/context/OrderContext";
import { IGetOrderInfo } from "@/lib/api/types";
import { formatDate } from "@/utils/formatDate";

export default function PaymentPage() {
  const router = useRouter(); // ⬅️ Usar useRouter() en lugar de useParams()
  const { id } = router.query; // ⬅️ Extraer `id` correctamente

  console.log("ID recibido:", id); // ⬅️ Depuración

  // Manejo de estados
  const { order, loading } = useOrder(id as string);
  const [updatedOrder, setUpdatedOrder] = useState<IGetOrderInfo | null>(null);
  const [paymentUri, setPaymentUri] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setUpdatedOrder(order);
      const storedPaymentUri = localStorage.getItem(`payment_uri`);
      setPaymentUri(storedPaymentUri || null);
    }
  }, [order]);

  // WebSocket para recibir actualizaciones en tiempo real
  useWebSocket(updatedOrder?.identifier ?? "", (data) => {
    console.log("🔄 Actualización de pedido recibida:", data);
    setUpdatedOrder((prev) =>
      prev ? { ...prev, ...data } : (data as IGetOrderInfo)
    );
  });

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (!updatedOrder)
    return (
      <p className="text-center text-red-500">Error obteniendo la orden</p>
    );

  const resumeOrderItems = [
    {
      label: "Importe",
      value: `${updatedOrder?.fiat_amount.toFixed(2)} ${updatedOrder?.fiat}`,
    },
    { label: "Moneda seleccionada", value: updatedOrder?.currency_id },
    {
      label: "Comercio",
      value: updatedOrder?.merchant_device || "Tienda de ejemplo",
    },
    {
      label: "Fecha",
      value: formatDate(updatedOrder?.created_at ?? "S/fecha"),
    },
    { label: "Concepto", value: updatedOrder?.notes || "Pago de ejemplo" },
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

"use client";

import { useCurrenciesContext } from "@/application/context/CurrencyProvider";
import OrderContext from "@/application/context/OrderContext";
import { useOrder } from "@/application/hooks/useOrder";
import useWebSocket from "@/application/hooks/useWebSocket";
import MakePayment from "@/components/MakePayment";
import ResumeOrder from "@/components/Resume";
import { IGetOrderInfo } from "@/lib/api/types";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { currencies } = useCurrenciesContext();
  const router = useRouter();
  const { id } = router.query;

  const { order, loading } = useOrder(id as string);
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
    // console.log("🔄 Actualización de pedido recibida:", data);
    setUpdatedOrder((prev) =>
      prev ? { ...prev, ...data } : (data as IGetOrderInfo)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (!updatedOrder) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500">Error obteniendo la orden</p>
      </div>
    );
  }
  const selectedCurrency = currencies.find((currency) => {
    return currency.id === updatedOrder.currency_id;
  });
  // 📌 Formato de la información para el resumen del pedido
  const resumeOrderItems = [
    {
      label: "Importe",
      value: (
        <span className="text-primary font-bold">
          {`${updatedOrder?.fiat_amount.toFixed(2)} ${updatedOrder?.fiat}`}
        </span>
      ),
    },
    {
      label: "Moneda seleccionada",
      value: (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <img
              src={selectedCurrency?.image}
              alt={selectedCurrency?.name}
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm text-primary font-bold">
              {selectedCurrency?.symbol}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Comercio",
      value: (
        <span className="text-secondary">
          {updatedOrder?.merchant_device || "Tienda de ejemplo"}
        </span>
      ),
    },
    {
      label: "Fecha",
      value: (
        <span className="text-secondary">
          {formatDate(updatedOrder?.created_at ?? "S/fecha")}
        </span>
      ),
    },
    {
      label: "Concepto",
      value: (
        <span className="text-secondary">
          {updatedOrder?.notes || "Pago de ejemplo"}
        </span>
      ),
    },
  ];

  return (
    <OrderContext.Provider value={{ order: updatedOrder, paymentUri }}>
      <div className="container mx-auto p-6 flex flex-col md:flex-row justify-center gap-8">
        {/* Resumen del pedido */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl">
          <h1 className="text-xl text-primary font-bold mb-4">
            Resumen del pedido
          </h1>
          <ResumeOrder resumeOrderItems={resumeOrderItems} />
        </div>

        {/* Sección de Pago */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl ">
          <h1 className="text-xl text-primary font-bold mb-4">
            Realiza el pago
          </h1>
          <MakePayment />
        </div>
      </div>
    </OrderContext.Provider>
  );
}

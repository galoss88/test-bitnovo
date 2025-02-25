import { useOrderContext } from "@/context/OrderContext";
import { useCurrenciesContext } from "@/context/Providers/CurrencyProvider";
import { OrderProvider } from "@/context/Providers/OrderProvider";
import { ICurrency } from "@/lib/api/currencies";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MakePayment from "../../../components/MakePayment";
import ResumeOrder from "../../../components/ResumeOrder";
import SpinnerLoading from "../../../components/SpinnerLoading";

export default function PaymentPage() {
  const { currencies } = useCurrenciesContext();
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id ?? "";

  return (
    <OrderProvider orderId={id}>
      <PaymentContent currencies={currencies} />
    </OrderProvider>
  );
}

interface PaymentContentProps {
  currencies: ICurrency[];
}

function PaymentContent({ currencies }: PaymentContentProps) {
  const { order, loading } = useOrderContext();
  const router = useRouter();

  useEffect(() => {
    if (!order) return;

    if (["CO", "AC"].includes(order.status)) {
      router.replace("/payment/success");
    } else if (["OC"].includes(order.status)) {
      router.replace("/payment/failed");
    } else if (["EX"].includes(order.status)) {
      router.replace("/payment/expired");
    }
  }, [order, router]);

  // ⚠️ Muestra solo el spinner mientras carga la orden
  if (loading || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <SpinnerLoading />
        <p className="text-gray-700 dark:text-gray-300 text-lg text-center">
          {loading
            ? "Cargando creación del pago..."
            : "Error obteniendo la orden"}
        </p>
      </div>
    );
  }

  const selectedCurrency = (currencies || []).find(
    (currency) => currency.id === order.currency_id
  );

  const resumeOrderItems = [
    {
      label: "Importe",
      value: `${order.fiat_amount?.toFixed(2)} ${order.fiat}`,
    },
    {
      label: "Moneda seleccionada",
      value: selectedCurrency ? (
        <div className="flex items-center gap-2">
          <img
            src={selectedCurrency.image}
            alt={selectedCurrency.name}
            className="w-6 h-6"
          />
          <span className="text-sm text-primary font-bold">
            {selectedCurrency.symbol}
          </span>
        </div>
      ) : (
        "N/A"
      ),
    },
    { label: "Comercio", value: order.merchant_device || "Tienda de ejemplo" },
    { label: "Fecha", value: formatDate(order.created_at ?? "S/fecha") },
    { label: "Concepto", value: order.notes || "Pago de ejemplo" },
  ];
  if (order.status !== "PE") return null;

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-center items-start gap-6 md:gap-10 min-h-[90vh] max-w-screen-xl md:flex-col">
      <div className="flex-grow h-full w-full max-w-screen-lg bg-white p-6 rounded-xl flex flex-col">
        <h1 className="text-xl text-primary font-bold mb-4 md:text-left">
          Resumen del pedido
        </h1>
        <ResumeOrder resumeOrderItems={resumeOrderItems} />
      </div>
      <div className="flex-grow h-full w-full max-w-screen-lg bg-white p-6 rounded-xl flex flex-col">
        <h1 className="text-xl text-primary font-bold mb-4 md:text-left">
          Realiza el pago
        </h1>
        <MakePayment />
      </div>
    </div>
  );
}

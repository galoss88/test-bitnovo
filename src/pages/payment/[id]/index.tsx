import { useCurrenciesContext } from "@/context/Providers/CurrencyProvider";
import { useOrderContext } from "@/context/OrderContext";
import { OrderProvider } from "@/context/Providers/OrderProvider"; // ✅ Asegurar que importamos bien el Provider
import { ICurrency } from "@/lib/api/currencies";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/router";
import MakePayment from "../../../components/MakePayment";
import ResumeOrder from "../../../components/ResumeOrder";

export default function PaymentPage() {
  const { currencies } = useCurrenciesContext();
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id ?? ""; // ✅ Convertimos a string correctamente

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
  const { order, loading } = useOrderContext(); // ✅ Ahora sí está dentro de OrderProvider

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (!order && !loading) {
 
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-red-500">Error obteniendo la orden</p>
      </div>
    );
  }

  const selectedCurrency = (currencies || []).find(
    (currency) => currency.id === order?.currency_id
  );

  const resumeOrderItems = [
    {
      label: "Importe",
      value: `${order?.fiat_amount?.toFixed(2)} ${order?.fiat}`,
    },
    {
      label: "Moneda seleccionada",
      value: selectedCurrency ? (
        <div className="flex items-center gap-2">
          <img
            src={selectedCurrency.image}
            alt={selectedCurrency.name}
            className="w-6 h-6 mr-2"
          />
          <span className="text-sm text-primary font-bold">
            {selectedCurrency.symbol}
          </span>
        </div>
      ) : (
        "N/A"
      ),
    },
    { label: "Comercio", value: order?.merchant_device || "Tienda de ejemplo" },
    { label: "Fecha", value: formatDate(order?.created_at ?? "S/fecha") },
    { label: "Concepto", value: order?.notes || "Pago de ejemplo" },
  ];

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row justify-center gap-8">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-xl">
        <h1 className="text-xl text-primary font-bold mb-4">
          Resumen del pedido
        </h1>
        <ResumeOrder resumeOrderItems={resumeOrderItems} />
      </div>
      <div className="w-full md:w-1/2 bg-white p-6 rounded-xl">
        <h1 className="text-xl text-primary font-bold mb-4">Realiza el pago</h1>
        <MakePayment />
      </div>
    </div>
  );
}

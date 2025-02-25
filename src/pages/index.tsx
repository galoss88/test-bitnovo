import PaymentForm from "@/components/PaymentForm";
import SpinnerLoading from "@/components/SpinnerLoading";
import { useCurrenciesContext } from "@/context/Providers/CurrencyProvider";
import { usePayment } from "@/hooks/usePayment";
import { ICurrency } from "@/lib/api/currencies";
import { useCallback, useState } from "react";

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { handleCreatePayment, loading: loadingPayment } = usePayment();
  const { currencies, loading: loadingCurrencies, error } = useCurrenciesContext();

  const onSubmit = useCallback(() => {
    if (!selectedCurrency) {
      alert("Selecciona una moneda antes de continuar.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    handleCreatePayment(amount, selectedCurrency.id, description);
  }, [amount, selectedCurrency, description, handleCreatePayment]);

  return (
    <div className="flex items-center justify-center w-full h-[90vh] px-6">
      <div className="w-full max-w-lg bg-white rounded-lg p-6">
        {loadingCurrencies ? (
          <div className="flex flex-col items-center justify-center h-[90vh] gap-2">
            <SpinnerLoading />
            <p className="text-gray-700 dark:text-gray-300">
              Cargando creación del pago...
            </p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <PaymentForm
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            currencies={currencies}
            onSubmit={onSubmit}
            loading={loadingPayment}
          />
        )}
      </div>
    </div>
  );
}

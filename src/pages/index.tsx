import { useCurrenciesContext } from "@/application/context/CurrencyProvider";
import { usePayment } from "@/application/hooks/usePayment";
import { ICurrency } from "@/lib/api/currencies";
import PaymentForm from "@/pages/_components/PaymentForm";
import { useCallback, useState } from "react";

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(
    null
  );
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { handleCreatePayment, loading: loadingPayment } = usePayment();
  const {
    currencies,
    loading: loadingCurrencies,
    error,
  } = useCurrenciesContext();

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
    <div className="container mx-auto p-6">
      {loadingCurrencies ? (
        <p className="text-center">🔄 Cargando monedas...</p>
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
  );
}

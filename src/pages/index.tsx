import "@/styles/globals.css";

import { usePayment } from "@/application/hooks/usePayment";
import PaymentForm from "@/components/PaymentForm";
import { getCurrencies, ICurrency } from "@/lib/api/currencies";
import { useEffect, useState } from "react";

export default function Home() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(
    null
  );
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { handleCreatePayment, loading } = usePayment();

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("❌ Error obteniendo criptomonedas:", error);
      }
    }
    fetchCurrencies();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <PaymentForm
        amount={amount}
        setAmount={setAmount}
        description={description}
        setDescription={setDescription}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={currencies}
        onSubmit={() => {
          if (selectedCurrency) {
            handleCreatePayment(amount, selectedCurrency.id, description);
          }
        }}
        loading={loading}
      />
    </div>
  );
}

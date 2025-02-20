"use client";

import PaymentForm from "@/components/PaymentForm";
import { getCurrencies, ICurrency } from "@/lib/api/currencies";
import { createOrder } from "@/lib/api/orders";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency | null>(
    null
  );
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("Error obteniendo criptomonedas:", error);
      }
    }
    fetchCurrencies();
  }, []);

  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      if (!selectedCurrency) {
        throw new Error("Debe seleccionar una criptomoneda");
      }
      const order = await createOrder({
        amount,
        currency: selectedCurrency.id,
        description,
      });
      router.push(`/payment/${order.id}`);
    } catch (error) {
      console.error("Error creando el pago", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Pago</h1>
      <PaymentForm
        amount={amount}
        setAmount={setAmount}
        description={description}
        setDescription={setDescription}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={currencies}
        onSubmit={handleCreatePayment}
        loading={loading}
      />
    </div>
  );
}

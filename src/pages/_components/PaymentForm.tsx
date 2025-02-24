"use client";

import { ICurrency } from "@/lib/api/currencies";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import FormErrorMessage from "./ErrorMessage";

interface PaymentFormProps {
  amount: string;
  setAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  currencies: ICurrency[];
  selectedCurrency: ICurrency | null;
  setSelectedCurrency: Dispatch<SetStateAction<ICurrency | null>>;
  onSubmit: () => void;
  loading: boolean;
}

export default function PaymentForm({
  amount,
  setAmount,
  description,
  setDescription,
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  onSubmit,
  loading,
}: PaymentFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Función para validar el monto
  const validateAmount = (value: string) => {
    if (!selectedCurrency) return;

    const minAmount = Number(parseFloat(selectedCurrency.minAmount).toFixed(2));
    const maxAmount = Number(parseFloat(selectedCurrency.maxAmount).toFixed(2));
    const enteredAmount = Number(parseFloat(value).toFixed(2));

    if (enteredAmount < minAmount) {
      setErrorMessage(
        `El importe mínimo para ${selectedCurrency.name} es ${minAmount}`
      );
    } else if (enteredAmount > maxAmount) {
      setErrorMessage(
        `El importe máximo para ${selectedCurrency.name} es ${maxAmount}`
      );
    } else {
      setErrorMessage(""); // No hay error
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  // Revalidar el monto cuando cambia la moneda seleccionada
  useEffect(() => {
    if (amount) {
      validateAmount(amount);
    }
  }, [selectedCurrency]);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary font-bold">
        Crear pago
      </h2>

      {/* Campo de importe */}
      <div className="mb-4">
        <label className="block text-primary font-bold mb-2">
          Importe a pagar
        </label>
        <input
          type="number"
          placeholder="Añade importe a pagar"
          value={amount}
          onChange={handleAmountChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-black"
        />
      </div>

      {/* Selector de moneda */}
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      {/* Campo de concepto */}
      <div className="mt-4 mb-6">
        <label className="block text-primary font-bold mb-2">Concepto</label>
        <input
          type="text"
          placeholder="Añade descripción del pago"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:text-primary text-primary"
        />
      </div>

      {/* Mensaje de error */}
      <FormErrorMessage message={errorMessage} />
      {/* Botón de continuar */}
      <button
        onClick={onSubmit}
        disabled={
          loading ||
          !amount ||
          !description ||
          !selectedCurrency ||
          !!errorMessage // Deshabilitar si hay error
        }
        className={`w-full p-3 rounded-lg text-white font-medium transition ${
          amount && description && selectedCurrency && !errorMessage
            ? "bg-blue-700 hover:bg-blue-700"
            : "bg-blue-300 cursor-not-allowed"
        }`}
      >
        {loading ? "Procesando..." : "Continuar"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Powered by <span className="font-semibold">Bitnovo</span>
      </p>
    </div>
  );
}

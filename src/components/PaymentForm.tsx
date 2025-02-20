"use client";

import { ICurrency } from "@/lib/api/currencies";
import { Dispatch, SetStateAction } from "react";
import CurrencySelector from "./CurrencySelector"; //

interface PaymentFormProps {
  amount: string;
  setAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  currencies: ICurrency[]; //
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
  currencies, // 🔹 Se recibe currencies
  selectedCurrency,
  setSelectedCurrency,
  onSubmit,
  loading,
}: PaymentFormProps) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Crear pago</h2>

      {/* Campo de importe */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Importe a pagar
        </label>
        <input
          type="number"
          placeholder="Añade importe a pagar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Selector de moneda dinámico */}
      {
        <CurrencySelector
          currencies={currencies} // 🔹 Ahora se pasa correctamente
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      }
      <div className="mb-4"></div>

      {/* Campo de concepto */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Concepto</label>
        <input
          type="text"
          placeholder="Añade descripción del pago"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Botón de continuar */}
      <button
        onClick={onSubmit}
        disabled={loading || !amount || !description || !selectedCurrency}
        className={`w-full p-3 rounded-lg text-white font-medium transition ${
          amount && description && selectedCurrency
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-300 cursor-not-allowed"
        }`}
      >
        {loading ? "Procesando..." : "Continuar"}
      </button>
    </div>
  );
}

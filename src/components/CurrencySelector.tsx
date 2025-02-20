"use client";

import { ICurrency } from "@/lib/api/currencies";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface CurrencySelectorProps {
  currencies: ICurrency[];
  selectedCurrency: ICurrency | null;
  setSelectedCurrency: Dispatch<SetStateAction<ICurrency | null>>;
}

export default function CurrencySelector({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Seleccionar moneda
      </label>
      <button
        className="w-full flex items-center justify-between border rounded-lg p-2 bg-white shadow-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCurrency ? (
          <div className="flex items-center">
            <img
              src={selectedCurrency.image}
              alt={selectedCurrency.name}
              className="w-6 h-6 mr-2"
            />
            <span>
              {selectedCurrency.name} ({selectedCurrency.symbol})
            </span>
          </div>
        ) : (
          <span className="text-gray-500">Selecciona una moneda</span>
        )}
        <span className="text-gray-400">▼</span>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {currencies.map((currency) => (
            <div
              key={currency.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedCurrency(currency);
                setIsOpen(false);
              }}
            >
              <img
                src={currency.image}
                alt={currency.name}
                className="w-6 h-6 mr-2"
              />
              <span>
                {currency.name} ({currency.symbol})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

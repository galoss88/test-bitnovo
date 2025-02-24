"use client";

import { ICurrency } from "@/lib/api/currencies";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

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
      <label className="block text-primary font-bold mb-2">
        Seleccionar moneda
      </label>
      <button
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCurrency ? (
          <div className="flex items-center">
            <img
              src={selectedCurrency.image}
              alt={selectedCurrency.name}
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm font-medium text-primary">
              {selectedCurrency.name} ({selectedCurrency.symbol})
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">Selecciona una moneda</span>
        )}
        <IoChevronDown className="text-gray-500" size={18} />
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {currencies.map((currency) => (
            <div
              key={currency.id}
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition"
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
              <span className="text-sm text-gray-900">{currency.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

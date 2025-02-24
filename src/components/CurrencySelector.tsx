"use client";

import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { ICurrency } from "@/lib/api/currencies";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoCheckmarkCircle, IoChevronForward, IoClose } from "react-icons/io5";

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
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Aplicamos debounce a la búsqueda
  const debouncedSearch = useDebouncedSearch(search, 300);

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

  // Filtrar monedas según la búsqueda con debounce
  const filteredCurrencies =
    currencies &&
    currencies?.filter(
      (currency) =>
        currency.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
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
            <span className="text-sm font-medium text-gray-900">
              {selectedCurrency.name}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">Selecciona una moneda</span>
        )}
        <IoChevronForward
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
          size={18}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-auto z-10">
          {/* Header con búsqueda y botón de cierre */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">
              Seleccionar criptomoneda
            </span>
            <IoClose
              size={20}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Input de búsqueda */}
          <div className="p-3">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de monedas */}
          <div className="divide-y divide-gray-100">
            {filteredCurrencies && filteredCurrencies.length > 0 ? (
              filteredCurrencies?.map((currency) => (
                <div
                  key={currency.id}
                  className={`flex items-center justify-between p-3 cursor-pointer transition ${
                    selectedCurrency?.id === currency.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedCurrency(currency);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={currency.image}
                      alt={currency.name}
                      className="w-6 h-6 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {currency.name}
                      </span>
                      <p className="text-xs text-gray-500">{currency.symbol}</p>
                    </div>
                  </div>
                  {selectedCurrency?.id === currency.id && (
                    <IoCheckmarkCircle className="text-blue-500" size={20} />
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-3">
                No hay resultados
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

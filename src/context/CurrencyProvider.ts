import { ICurrency } from "@/lib/api/currencies";
import { createContext, useContext } from "react";

interface CurrencyContextProps {
  currencies: ICurrency[];
  loading: boolean;
  error: string | null;
}

export const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

// Hook para acceder a las monedas desde cualquier componente
export function useCurrenciesContext() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrencies debe usarse dentro de un CurrencyProvider");
  }
  return context;
}

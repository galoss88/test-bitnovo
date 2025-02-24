import { CurrencyContext } from "@/application/context/CurrencyProvider";
import { useCurrencies } from "@/application/hooks/useCurrencies";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { currencies, loading, error } = useCurrencies();

  return (
    <CurrencyContext.Provider value={{ currencies, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}

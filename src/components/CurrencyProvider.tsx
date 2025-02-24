import { CurrencyContext } from "@/context/CurrencyProvider";
import { useCurrencies } from "@/hooks/useCurrencies";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { currencies, loading, error } = useCurrencies();

  return (
    <CurrencyContext.Provider value={{ currencies, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}
export default CurrencyProvider;

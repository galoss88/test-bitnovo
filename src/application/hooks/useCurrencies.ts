import { getCurrencies, ICurrency } from "@/lib/api/currencies";
import { useEffect, useState } from "react";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("❌ Error obteniendo criptomonedas:", error);
        setError("Hubo un error cargando las monedas.");
      } finally {
        setLoading(false);
      }
    }
    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};

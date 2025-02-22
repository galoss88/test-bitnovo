import apiClient from "@/lib/apiClient";

export interface ICurrency {
  id: string;
  name: string;
  symbol: string;
  minAmount: number;
  maxAmount: number;
  image: string;
  blockchain: string;
}

export async function getCurrencies(): Promise<ICurrency[]> {
  try {
    const response = await apiClient.get("/currencies");

    return response.data.map((currency: ICurrency) => ({
      id: currency.symbol, // 🔹 Se usa el `symbol` como identificador único
      name: currency.name,
      symbol: currency.symbol,
      minAmount: currency.minAmount,
      maxAmount: currency.maxAmount,
      image: currency.image,
      blockchain: currency.blockchain,
    }));
  } catch (error) {
    console.error("Error obteniendo la lista de criptomonedas:", error);
    throw error;
  }
}

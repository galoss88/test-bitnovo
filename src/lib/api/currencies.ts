import apiClient from "@/api/apiClient";

export interface ICurrencyApi {
  id: string;
  name: string;
  symbol: string;
  min_amount: number;
  max_amount: number;
  image: string;
  blockchain: string;
}

export interface ICurrency {
  id: string;
  name: string;
  symbol: string;
  minAmount: string;
  maxAmount: string;
  image: string;
  blockchain: string;
}

export async function getCurrencies(): Promise<ICurrency[]> {
  try {
    const response = await apiClient.get("/currencies");

    return response.data.map((currency: ICurrencyApi) => ({
      id: currency.symbol, // 🔹 Se usa el `symbol` como identificador único
      name: currency.name,
      symbol: currency.symbol,
      minAmount: currency.min_amount,
      maxAmount: currency.max_amount,
      image: currency.image,
      blockchain: currency.blockchain,
    }));
  } catch (error) {
    console.error("Error obteniendo la lista de criptomonedas:", error);
    throw error;
  }
}

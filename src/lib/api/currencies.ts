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
    const response = await apiClient.get(
      "https://payments.pre-bnvo.com/api/v1/currencies",
      {
        headers: {
          "X-Device-Id": "d6aac8e9-ed6c-4135-a5c7-f3b4bba5c31b", // Reemplázalo con el valor correcto
        },
      }
    );

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

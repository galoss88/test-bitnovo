import { IGetOrderInfo } from "@/lib/api/types";
import { createContext, useContext } from "react";

interface OrderContextProps {
  order: IGetOrderInfo | null;
  paymentUri: string | null;
  setOrder: (order: IGetOrderInfo | null) => void;
  setPaymentUri: (uri: string | null) => void;
  loading: boolean;
}

// 📌 Crear contexto con valores iniciales opcionales
export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
);

// 📌 Hook para consumir el contexto
export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext debe ser usado dentro de un OrderProvider"
    );
  }
  return context;
}

export default OrderContext;

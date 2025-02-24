import { createContext, useContext } from "react";
import { IGetOrderInfo } from "@/lib/api/types";

interface OrderContextProps {
  order: IGetOrderInfo | null;
  paymentUri: string | null;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext debe ser usado dentro de un OrderProvider");
  }
  return context;
}

export default OrderContext;

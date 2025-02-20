import { useEffect } from "react";

interface Order {
  id: string;
  status: string;
  amount: number;
  currency: string;
  expirationTime?: string;
  paymentAddress?: string;
}

export default function useWebSocket(
  orderId: string,
  onUpdate: (order: Order) => void
) {
  useEffect(() => {
    const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${orderId}`);

    socket.onopen = () => {
      console.log("WebSocket conectado");
    };

    socket.onmessage = (event) => {
      try {
        const updatedOrder: Order = JSON.parse(event.data);
        onUpdate(updatedOrder);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket cerrado");
    };

    return () => {
      socket.close();
    };
  }, [orderId, onUpdate]);
}

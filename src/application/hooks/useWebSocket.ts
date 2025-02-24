import { IGetOrderInfo } from "@/lib/api/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useWebSocket(
  identifier: string,
  onUpdate: (order: Partial<IGetOrderInfo>) => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!identifier) {
      console.warn("⚠️ WebSocket no iniciado: `identifier` inválido.");
      return;
    }

    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${identifier}`
    );
    socketRef.current = socket;

    socket.onmessage = (event) => {
      console.log("📩 WebSocket mensaje recibido:", event.data);
      try {
        const updatedOrder: Partial<IGetOrderInfo> = JSON.parse(event.data);
        onUpdate(updatedOrder);

        // 🔥 Redirigir a la pantalla correspondiente según el estado
        if (updatedOrder.status === "CO" || updatedOrder.status === "AC") {
          console.log("✅ Pago completado, redirigiendo...");
          router.push("/payment/success");
        }

        if (updatedOrder.status === "EX" || updatedOrder.status === "OC") {
          console.warn("❌ Pago expirado, redirigiendo...");
          router.push("/payment/failed");
        }
      } catch (error) {
        console.error("❌ Error parseando mensaje WebSocket:", error);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [identifier, onUpdate, router]);
}

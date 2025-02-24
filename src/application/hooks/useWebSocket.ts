// import { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { IGetOrderInfo } from "@/lib/api/types";

// export default function useWebSocket(
//   identifier: string,
//   onUpdate: (order: Partial<IGetOrderInfo>) => void
// ) {
//   const socketRef = useRef<WebSocket | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (!identifier) {
//       console.warn("⚠️ WebSocket no iniciado: `identifier` inválido.");
//       return;
//     }

//     function connectWebSocket() {
//       if (socketRef.current) return; // Evita conexiones duplicadas

//       try {
//         const socket = new WebSocket(
//           `wss://payments.pre-bnvo.com/ws/${identifier}`
//         );
//         socketRef.current = socket;

//         socket.onopen = () => console.log("✅ WebSocket conectado");

//         socket.onmessage = (event) => {
//           try {
//             const updatedOrder: Partial<IGetOrderInfo> = JSON.parse(event.data);
//             console.log("📡 WebSocket actualización:", updatedOrder);
//             onUpdate(updatedOrder);

//             if (updatedOrder.status === "EX" || updatedOrder.status === "OC") {
//               console.warn("❌ Pago expirado, redirigiendo...");
//               router.push("/payment-failed");
//             }

//             if (updatedOrder.status === "CO" || updatedOrder.status === "AC") {
//               console.log("✅ Pago completado, redirigiendo...");
//               router.push("/payment-success");
//             }
//           } catch (error) {
//             console.error("❌ Error en WebSocket:", error);
//           }
//         };

//         socket.onerror = (event) => console.error("❌ WebSocket error:", event);

//         socket.onclose = (event) => {
//           console.warn("⚠️ WebSocket cerrado:", event.reason);
//           socketRef.current = null;
//           setTimeout(() => {
//             console.log("🔄 Reconectando WebSocket...");
//             connectWebSocket();
//           }, 3000);
//         };
//       } catch (error) {
//         console.error("❌ Error inicializando WebSocket:", error);
//       }
//     }

//     connectWebSocket();

//     return () => {
//       if (socketRef.current) {
//         console.log("🔌 Cerrando WebSocket...");
//         socketRef.current.close();
//       }
//     };
//   }, [identifier, onUpdate, router]);
// }

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IGetOrderInfo } from "../lib/api/types";

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

    function connectWebSocket() {
      if (socketRef.current) return; // Evita conexiones duplicadas

      try {
        const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${identifier}`);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log("✅ WebSocket conectado con éxito.");
        };

        socket.onmessage = (event) => {
          try {
            const updatedOrder: Partial<IGetOrderInfo> = JSON.parse(event.data);
            console.log("📡 WebSocket actualización:", updatedOrder);
            onUpdate(updatedOrder);

            // 🔥 Redirigir si el pago expira (EX, OC)
            if (updatedOrder.status === "EX" || updatedOrder.status === "OC") {
              console.warn("❌ Pago expirado, redirigiendo...");
              router.push("/payment-failed");
            }

            // 🔥 Redirigir si el pago es exitoso (CO, AC)
            if (updatedOrder.status === "CO" || updatedOrder.status === "AC") {
              console.log("✅ Pago completado, redirigiendo...");
              router.push("/payment-success");
            }
          } catch (error) {
            console.error("❌ Error parseando mensaje WebSocket:", error);
          }
        };

        socket.onerror = (event) => {
          console.error("❌ WebSocket error:", event);
        };

        socket.onclose = (event) => {
          console.warn("⚠️ WebSocket cerrado:", event.reason);
          socketRef.current = null;

          // Intentar reconectar después de 3 segundos
          setTimeout(() => {
            console.log("🔄 Intentando reconectar WebSocket...");
            connectWebSocket();
          }, 3000);
        };
      } catch (error) {
        console.error("❌ Error inicializando WebSocket:", error);
      }
    }

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        console.log("🔌 Cerrando WebSocket...");
        socketRef.current.close();
      }
    };
  }, [identifier, onUpdate, router]);
}

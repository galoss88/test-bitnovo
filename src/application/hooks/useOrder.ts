// import { useEffect, useState } from "react";
// import { getOrderInfo } from "@/lib/api/orders";
// import { IGetOrderInfo } from "@/lib/api/types";
// import useWebSocket from "@/hooks/useWebSocket";

// export function useOrder(orderId: string | null) {
//   const [order, setOrder] = useState<IGetOrderInfo | null>(null);
//   const [paymentUri, setPaymentUri] = useState<string | null>(null);

//   useEffect(() => {
//     if (!orderId) return;

//     async function fetchOrder() {
//       try {
//         console.log(`📡 Obteniendo información de la orden ${orderId}`);
//         const data = await getOrderInfo(orderId);
//         setOrder(data);

//         // ✅ Guarda en localStorage
//         localStorage.setItem(`payment_uri_${data.identifier}`, data.payment_uri);

//         useWebSocket(data.identifier, (updatedOrder) => {
//           setOrder((prevOrder) => ({
//             ...prevOrder,
//             ...updatedOrder,
//           }));
//         });

//         // ✅ Recupera de `localStorage`
//         const storedPaymentUri = localStorage.getItem(`payment_uri_${data.identifier}`);
//         if (storedPaymentUri) {
//           setPaymentUri(storedPaymentUri);
//         }
//       } catch (error) {
//         console.error("❌ Error obteniendo la orden:", error);
//       }
//     }

//     fetchOrder();
//   }, [orderId]);

//   return { order, paymentUri };
// }

// "use client";

// import QRPayment from "@/components/QRPayment";
// import { useOrder } from "@/hooks/useOrder";
// import OrderContext from "@/context/OrderContext";
// import { useParams } from "next/navigation";

// export default function PaymentPage() {
//   const params = useParams();
//   const orderId = typeof params.id === "string" ? params.id : null;
//   const { order, paymentUri } = useOrder(orderId);

//   if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

//   return (
//     <OrderContext.Provider value={{ order, paymentUri }}>
//       <div className="container mx-auto p-6 flex justify-center">
//         <QRPayment />
//       </div>
//     </OrderContext.Provider>
//   );
// }

// "use client";

// import QRPayment from "@/components/QRPayment";
// import useWebSocket from "@/hooks/useWebSocket";
// import { getOrderInfo } from "@/lib/api/orders";
// import { IGetOrderInfo } from "@/lib/api/types";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function PaymentPage() {
//   const params = useParams();
//   const id = typeof params.id === "string" ? params.id : null;
//   const [order, setOrder] = useState<IGetOrderInfo | null>(null);
//   const [identifier, setIdentifier] = useState<string>("");
//   const [paymentUri, setPaymentUri] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     async function fetchOrder() {
//       try {
//         if (!id) return;
//         console.log(`📡 Obteniendo información de la orden ${id}`);
//         const data = await getOrderInfo(id);
//         setOrder(data);
//         setIdentifier(data.identifier);

//         // ✅ Intentar recuperar `payment_uri` desde localStorage si no está en la orden
//         const storedPaymentUri = localStorage.getItem(`payment_uri`);
//         if (storedPaymentUri) {
//           setPaymentUri(storedPaymentUri);
//         }
//       } catch (error) {
//         console.error("❌ Error obteniendo la orden:", error);
//       }
//     }

//     fetchOrder();
//   }, [id]);

//   // ✅ Llamar `useWebSocket` correctamente después de obtener el `identifier`
//   useWebSocket(identifier, (updatedOrder: Partial<IGetOrderInfo>) => {
//     setOrder((prevOrder) => {
//       if (!prevOrder) return { ...updatedOrder } as IGetOrderInfo;

//       return {
//         ...prevOrder,
//         ...updatedOrder,
//         address: updatedOrder.address ?? prevOrder.address,
//       };
//     });
//   });

//   if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

//   return <QRPayment order={order} paymentUri={paymentUri} />;
// }

"use client";

import MakePayment from "@/components/MakePayment";
import ResumeOrder from "@/components/ResumeOrder";
import OrderContext from "@/context/OrderContext";
import useWebSocket from "@/hooks/useWebSocket";
import { getOrderInfo } from "@/lib/api/orders";
import { IGetOrderInfo } from "@/lib/api/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const [order, setOrder] = useState<IGetOrderInfo | null>(null);
  const [identifier, setIdentifier] = useState<string>("");
  const [paymentUri, setPaymentUri] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        if (!id) return;
        console.log(`📡 Obteniendo información de la orden ${id}`);
        const data = await getOrderInfo(id);
        setOrder(data);
        setIdentifier(data.identifier);

        // ✅ Intentar recuperar `payment_uri` desde localStorage si no está en la orden
        const storedPaymentUri = localStorage.getItem(`payment_uri`);
        if (storedPaymentUri) {
          setPaymentUri(storedPaymentUri);
        }
      } catch (error) {
        console.error("❌ Error obteniendo la orden:", error);
      }
    }

    fetchOrder();
  }, [id]);

  // ✅ Llamar `useWebSocket` correctamente después de obtener el `identifier`
  useWebSocket(identifier, (updatedOrder: Partial<IGetOrderInfo>) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return { ...updatedOrder } as IGetOrderInfo;

      return {
        ...prevOrder,
        ...updatedOrder,
        address: updatedOrder.address ?? prevOrder.address,
      };
    });
  });

  if (!order) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <OrderContext.Provider value={{ order, paymentUri }}>
      <div className="container mx-auto p-6 flex justify-center w-full">
        <ResumeOrder />
        <MakePayment />
      </div>
    </OrderContext.Provider>
  );
}

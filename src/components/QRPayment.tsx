"use client";

import { IGetOrderInfo } from "@/lib/api/types";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPayment({
  order,
  paymentUri,
}: {
  order: IGetOrderInfo;
  paymentUri: string | null;
}) {
  const qrValue = paymentUri ?? order?.address;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Escanea el QR para pagar
      </h2>

      {qrValue ? (
        <QRCodeCanvas value={qrValue} size={200} />
      ) : (
        <p className="text-sm text-gray-500">QR no disponible</p>
      )}

     
    </div>
  );
}

// "use client";

// import { IGetOrderInfo } from "@/lib/api/types";
// import { QRCodeCanvas } from "qrcode.react";

// interface QRPaymentProps {
//   order: IGetOrderInfo;
//   paymentUri: string | null; // ✅ Ahora puede recibir `payment_uri`
// }

// export default function QRPayment({ order, paymentUri }: QRPaymentProps) {
//   console.log("order", order); // ✅ Usamos `clog` en lugar de `console.log`
//   const qrValue = paymentUri ?? order.address; // ✅ Usamos `paymentUri` primero, luego `order.address`

//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold mb-4 text-gray-900">
//         Escanea el QR para pagar
//       </h2>

//       {qrValue ? (
//         <QRCodeCanvas value={qrValue} size={200} />
//       ) : (
//         <p className="text-sm text-gray-500">QR no disponible</p>
//       )}

//       <p className="mt-4 text-sm text-gray-700">
//         <strong>Dirección de pago:</strong> {order.address ?? "No disponible"}
//       </p>
//     </div>
//   );
// }

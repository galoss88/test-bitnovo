"use client";

import Image from "next/image";

interface Order {
  id: string;
  status: string;
  amount: number;
  currency: string;
  qrCodeUrl?: string;
  paymentAddress?: string;
  expirationTime?: string;
}

interface QRPaymentProps {
  order: Order;
}

export default function QRPayment({ order }: QRPaymentProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Escanea el QR para pagar</h2>
      {order.qrCodeUrl && (
        <Image src={order.qrCodeUrl} alt="Código QR" width={200} height={200} />
      )}
      <p className="mt-4 text-sm text-gray-700">
        Dirección de pago: {order.paymentAddress ?? "No disponible"}
      </p>
      <p className="text-sm text-gray-700">
        Expira en:{" "}
        {order.expirationTime
          ? new Date(order.expirationTime).toLocaleTimeString()
          : "No disponible"}
      </p>
    </div>
  );
}

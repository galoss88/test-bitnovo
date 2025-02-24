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
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md">
      {qrValue ? (
        <QRCodeCanvas
          value={qrValue}
          size={180} // Ajusta el tamaño a la proporción de la imagen
          bgColor="#FFFFFF" // Asegura un fondo blanco puro
          fgColor="#000000" // Asegura un color de QR negro puro
          level="H" // Usa el nivel de corrección de errores más alto
        />
      ) : (
        <p className="text-sm text-gray-500">QR no disponible</p>
      )}
    </div>
  );
}

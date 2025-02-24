import StatusIcon from "@/components/StatusIcon";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-sm">
        {/* Icono corregido con color exacto */}
        <StatusIcon status="success" />
        {/* Título corregido con color exacto */}
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mt-4">
          ¡Pago completado!
        </h1>

        {/* Texto secundario corregido con color exacto */}
        <p className="text-[#667085] mt-2">
          Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et
          varius dolor elit facilisi enim. Nulla ut ut eu nunc.
        </p>

        {/* Botón corregido con color exacto */}
        <Link href="/">
          <button className="mt-6 px-8 py-3 bg-[#0052CC] text-white rounded-lg hover:bg-[#003E99] w-full">
            Crear nuevo pago
          </button>
        </Link>
      </div>
    </div>
  );
}

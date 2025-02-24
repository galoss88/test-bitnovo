import "@/styles/globals.css";

import Link from "next/link";
import { MdOutlineAccessTime } from "react-icons/md";

export default function PaymentExpired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-sm">
        <MdOutlineAccessTime className="text-yellow-500 mx-auto text-6xl" />
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">
          ¡Pago expirado!
        </h1>
        <p className="text-gray-500 mt-2">
          El tiempo para realizar el pago ha expirado.
        </p>
        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
            Crear nuevo pago
          </button>
        </Link>
      </div>
    </div>
  );
}

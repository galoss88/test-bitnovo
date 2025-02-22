import { useState } from "react";
import { createPayment } from "@/lib/services/paymentService";
import { IOrder } from "@/lib/api/types";
import { useRouter } from "next/navigation";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreatePayment = async (amount: string, currencyId: string, notes: string) => {
    setLoading(true);
    try {
      const order: IOrder = await createPayment({
        expected_output_amount: parseFloat(amount), // 🔹 Convertir a número
        input_currency: currencyId,
        notes,
      });

      // ✅ Redirigir después de la creación del pago
      router.push(`/payment/${order.identifier}`);
    } catch (error) {
      console.error("❌ Error creando el pago:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePayment, loading };
}

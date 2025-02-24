import { IOrder } from "@/lib/api/types";
import { createPayment } from "@/application/services/PaymentService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [infoPayment, setInfoPayment] = useState<IOrder | null>(null);
  const router = useRouter();

  const handleCreatePayment = async (
    amount: string,
    currencyId: string,
    notes: string
  ) => {
    setLoading(true);
    try {
      const order: IOrder = await createPayment({
        expected_output_amount: parseFloat(amount), // 🔹 Convertir a número
        input_currency: currencyId,
        notes,
      });
      setInfoPayment(order);
      // ✅ Redirigir después de la creación del pago
      router.push(`/payment/${order.identifier}`);
    } catch (error) {
      console.error("❌ Error creando el pago:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePayment, loading, infoPayment };
}

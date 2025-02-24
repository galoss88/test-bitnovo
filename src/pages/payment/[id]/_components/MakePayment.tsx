import { useOrderContext } from "@/application/context/OrderContext";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import CopyableField from "../../../_components/CopyableField";
import PaymentCryptoDetail from "../../../_components/PaymentCryptoDetail";
import PaymentMethodToggle from "../../../_components/PaymentMethodToggle";
import QRPayment from "../../../_components/QRPayment";
import TimeReloj from "../../../_components/TimeReloj";
import Web3Payment from "../../../_components/Web3Payment";

const MakePayment = () => {
  const { order, paymentUri } = useOrderContext();
  const [selected, setSelected] = useState<number>(0);
  const router = useRouter();

  const expirationDate = order?.expired_time
    ? new Date(order.expired_time).getTime()
    : null;
  const currentTime = new Date().getTime();
  const timeLeft = expirationDate
    ? Math.max(Math.floor((expirationDate - currentTime) / 1000), 0)
    : 0;

  const handleExpiration = useCallback(() => {
    console.warn("⏳ Tiempo agotado, redirigiendo a /payment/expired");
    router.push("/payment/expired");
  }, [router]);

  if (!order) return null;

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
      {/* ⏳ Temporizador con tiempo real basado en `expired_time` */}
      <TimeReloj
        className="text-xl"
        initialTime={timeLeft}
        onExpire={handleExpiration}
      />

      {/* Selector de Métodos */}
      <PaymentMethodToggle
        options={["Smart QR", "Web3"]}
        selectedIndex={selected}
        onChange={setSelected}
      />

      {selected === 0 ? (
        <QRPayment order={order} paymentUri={paymentUri ?? null} />
      ) : (
        <Web3Payment order={order} />
      )}
      <div className="bg-white p-1 rounded-xl flex flex-col items-center">
        {/* Detalles del Pago */}
        <PaymentCryptoDetail
          amount={order.fiat_amount}
          currency={order.currency_id ?? "N/A"}
        />

        {/* Dirección de pago */}
        <CopyableField
          value={order.address ?? "Sin código"}
          valueClassName="text-primary font-medium"
        />

        {/* Etiqueta de destino */}
        <CopyableField
          label="Etiqueta de destino"
          value={order?.tag_memo ? order?.tag_memo : "N/A"}
          LeadingIcon={MdErrorOutline}
          labelClassName="text-primary font-medium"
          valueClassName="text-primary font-bold"
        />
      </div>
    </div>
  );
};

export default MakePayment;

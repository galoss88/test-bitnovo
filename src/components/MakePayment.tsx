import { useOrderContext } from "@/context/OrderContext";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import CopyableField from "./CopyableField";
import PaymentCryptoDetail from "./PaymentCryptoDetail";
import PaymentMethodToggle from "./PaymentMethodToggle";
import QRPayment from "./QRPayment";
import TimeReloj from "./TimeReloj";
import Web3Payment from "./Web3Payment";

const MakePayment = () => {
  const { order, paymentUri } = useOrderContext();
  const [selected, setSelected] = useState<number>(0);

  if (!order) return null;

  return (
    <div className="flex flex-col items-center text-black p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      {/* Temporizador */}
      <TimeReloj className="text-xl" initialTime={300} />

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
      {/* Código QR */}

      {/* Detalles del Pago */}
      <PaymentCryptoDetail
        amount={order.fiat_amount}
        currency={order.currency_id ?? "N/A"}
      />

      {/* Dirección de pago */}
      <CopyableField value={order.address ?? "Sin código"} />

      {/* Etiqueta de destino */}
      <CopyableField
        label="Etiqueta de destino"
        value={order.tag_memo ?? "N/A"}
        LeadingIcon={MdErrorOutline}
      />
    </div>
  );
};

export default MakePayment;

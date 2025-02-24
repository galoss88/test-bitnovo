import { useOrderContext } from "@/context/OrderContext";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { CopyableField } from "./CopyableField";
import { PaymentCryptoDetail } from "./PaymentCryptoDetail";
import { PaymentMethodToggle } from "./PaymentMethodToggle";
import QRPayment from "./QRPayment";
import TimeReloj from "./timeReloj";

const MakePayment = () => {
  const { order, paymentUri } = useOrderContext();
  const [selected, setSelected] = useState<number>(0);
  const cryptoAmount = 108.2;
  const cryptoType = "XRP";
  const paymentCode = "ABC123XYZ";
  const destinationTag = "987654321";
  const options = ["Opción 1", "Opción 2"];
  
  return (
    <div className="flex flex-col items-center text-black p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <TimeReloj className="text-xl" />

      <PaymentMethodToggle
        options={options}
        selectedIndex={selected}
        onChange={setSelected}
      />

      <QRPayment order={order} paymentUri={paymentUri ?? null} />

      <PaymentCryptoDetail amount={cryptoAmount} currency={cryptoType} />

      <CopyableField label="Código" value={paymentCode} />

      <CopyableField
        label="Etiqueta de destino"
        value={destinationTag}
        LeadingIcon={MdErrorOutline}
      />
    </div>
  );
};

export default MakePayment;

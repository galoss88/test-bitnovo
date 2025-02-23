import { useOrderContext } from "@/context/OrderContext";
import { MdErrorOutline } from "react-icons/md";
import { CopyableField } from "./CopyableField";
import { PaymentCryptoDetail } from "./PaymentCryptoDetail";
import { PaymentMethodToggle } from "./PaymentMethodToggle";
import QRPayment from "./QRPayment";
import TimeReloj from "./timeReloj";

const MakePayment = () => {
  // Valores dinámicos
  const cryptoAmount = 108.2;
  const cryptoType = "XRP";
  const paymentCode = "ABC123XYZ"; // Código dinámico (por ejemplo, de una API)
  const destinationTag = "987654321"; // Etiqueta de destino dinámica
  const { order, paymentUri } = useOrderContext();

  return (
    <div className="flex flex-col items-center text-black p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      {/* Reloj */}
      <TimeReloj />

      {/* Botones de selección */}
      <PaymentMethodToggle />

      {/* QR Payment */}
      <QRPayment order={order} paymentUri={paymentUri ?? null} />

      {/* Detalle del pago en criptomoneda */}
      <PaymentCryptoDetail amount={cryptoAmount} currency={cryptoType} />

      {/* Campo para copiar el código */}
      <CopyableField label="Código" value={paymentCode} />

      {/* Campo para copiar la etiqueta de destino con ícono de exclamación */}
      <CopyableField
        label="Etiqueta de destino"
        value={destinationTag}
        LeadingIcon={MdErrorOutline}
      />
    </div>
  );
};

export default MakePayment;

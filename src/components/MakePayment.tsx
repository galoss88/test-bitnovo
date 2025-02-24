import { useOrderContext } from "@/context/OrderContext";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import CopyableField from "./CopyableField";
import PaymentCryptoDetail from "./PaymentCryptoDetail";
import PaymentMethodToggle from "./PaymentMethodToggle";
import QRPayment from "./QRPayment";
import TimeReloj from "./TimeReloj";

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

      {/* Código QR */}
      <QRPayment order={order} paymentUri={paymentUri ?? null} />

      {/* Detalles del Pago */}
      <PaymentCryptoDetail amount={order.fiat_amount} currency={order.currency_id ?? "N/A"} />

      {/* Dirección de pago */}
      <CopyableField value={order.address ?? "Sin código"} />

      {/* Etiqueta de destino */}
      <CopyableField label="Etiqueta de destino" value={order.tag_memo ?? "N/A"} LeadingIcon={MdErrorOutline} />
    </div>
  );
};

export default MakePayment;

// import { useOrderContext } from "@/context/OrderContext";
// import { useState } from "react";
// import { MdErrorOutline } from "react-icons/md";
// import { CopyableField } from "./CopyableField";
// import { PaymentCryptoDetail } from "./PaymentCryptoDetail";
// import { PaymentMethodToggle } from "./PaymentMethodToggle";
// import QRPayment from "./QRPayment";
// import TimeReloj from "./timeReloj";

// const MakePayment = () => {
//   const { order, paymentUri } = useOrderContext();
//   const [selected, setSelected] = useState<number>(0);
//   const cryptoAmount = order?.fiat_amount ?? 0;
//   const cryptoType = order?.currency_id;
//   const paymentCode = order?.address ?? "S/codigo";
//   const destinationTag = order?.tag_memo ?? "S/tag";
//   const options = ["Opción 1", "Opción 2"];
//   if (!order) return null;
//   return (
//     <div className="flex flex-col items-center text-black p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
//       <TimeReloj className="text-xl" />

//       <PaymentMethodToggle
//         options={options}
//         selectedIndex={selected}
//         onChange={setSelected}
//       />

//       <QRPayment order={order} paymentUri={paymentUri ?? null} />

//       <CopyableField value={paymentCode} />
//       <PaymentCryptoDetail
//         amount={cryptoAmount}
//         currency={cryptoType ?? "S/moneda"}
//       />

//       <CopyableField
//         label="Etiqueta de destino"
//         value={destinationTag}
//         LeadingIcon={MdErrorOutline}
//       />
//     </div>
//   );
// };

// export default MakePayment;

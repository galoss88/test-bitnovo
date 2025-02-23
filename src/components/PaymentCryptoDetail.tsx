import { MdContentCopy } from "react-icons/md";

// Muestra el detalle del envío en criptomonedas con un botón para copiar el valor
export const PaymentCryptoDetail = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${amount} ${currency}`);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">
          Enviar {amount} {currency}
        </span>
        <button
          onClick={handleCopy}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          <MdContentCopy size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

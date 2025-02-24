import { MdContentCopy } from "react-icons/md";

const PaymentCryptoDetail = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const handleCopy = () =>
    navigator.clipboard.writeText(`${amount} ${currency}`);

  return (
    <div className="mt-4 text-center">
      <div className="flex items-center justify-center gap-2 text-lg font-medium">
        <span>
          Enviar{" "}
          <strong>
            {amount.toFixed(2)} {currency}
          </strong>
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

export default PaymentCryptoDetail;

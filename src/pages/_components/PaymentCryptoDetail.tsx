import CopyableField from "./CopyableField";

const PaymentCryptoDetail = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <CopyableField
        label="Enviar"
        value={`${amount.toFixed(2)} ${currency}`}
        labelClassName="text-primary font-medium"
        valueClassName="text-primary font-bold"
      />
    </div>
  );
};

export default PaymentCryptoDetail;

interface PaymentMethodToggleProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

const PaymentMethodToggle: React.FC<PaymentMethodToggleProps> = ({
  options,
  selectedIndex,
  onChange,
}) => {
  return (
    <div className="flex gap-2 mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
            ${
              selectedIndex === index
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
          aria-pressed={selectedIndex === index}
          aria-label={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PaymentMethodToggle;

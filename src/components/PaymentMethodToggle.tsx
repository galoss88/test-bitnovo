import React from "react";

export interface PaymentMethodToggleProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

export const PaymentMethodToggle: React.FC<PaymentMethodToggleProps> = ({
  options,
  selectedIndex,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex gap-4 mt-4 ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`px-4 py-2 rounded transition-colors ${
            selectedIndex === index
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

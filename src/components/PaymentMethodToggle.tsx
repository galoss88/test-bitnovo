import { useState } from "react";

// Botones para seleccionar opción de pago
export const PaymentMethodToggle = () => {
  const [selected, setSelected] = useState<number>(0);
  const options = ["Opción 1", "Opción 2"];

  return (
    <div className="flex gap-4 mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelected(index)}
          className={`px-4 py-2 rounded transition-colors ${
            selected === index
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

import { MdContentCopy } from "react-icons/md";

// Componente genérico para mostrar un campo con valor y botón de copiar
type CopyableFieldProps = {
  label: string;
  value: string;
  LeadingIcon?: React.ComponentType<{ size: number; className?: string }>;
};

export const CopyableField = ({
  label,
  value,
  LeadingIcon,
}: CopyableFieldProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded mt-4">
      <div className="flex items-center gap-2">
        {LeadingIcon && <LeadingIcon size={20} className="text-gray-600" />}
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 text-gray-600 hover:text-gray-800"
      >
        <MdContentCopy size={20} />
      </button>
    </div>
  );
};

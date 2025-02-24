import { MdContentCopy, MdCheck } from "react-icons/md";
import { useState } from "react";

interface CopyableFieldProps {
  label?: string;
  value: string;
  LeadingIcon?: React.ComponentType<{ size: number; className?: string }>;
}

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  LeadingIcon,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md w-full mt-2">
      <div className="flex items-center gap-2">
        {LeadingIcon && <LeadingIcon size={20} className="text-gray-600" />}
        {label && <span className="font-medium">{label}:</span>}
        <span>{value}</span>
      </div>
      <button
        onClick={handleCopy}
        className="p-2 text-gray-600 hover:text-gray-800"
      >
        {copied ? (
          <MdCheck size={20} className="text-green-500" />
        ) : (
          <MdContentCopy size={20} />
        )}
      </button>
    </div>
  );
};

export default CopyableField;

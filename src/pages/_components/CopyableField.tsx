import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

interface CopyableFieldProps {
  label?: string;
  value: string;
  LeadingIcon?: React.ComponentType<{ size: number; className?: string }>;
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  iconClassName?: string;
}

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  LeadingIcon,
  containerClassName = "",
  labelClassName = "",
  valueClassName = "",
  iconClassName = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      {LeadingIcon && <LeadingIcon size={20} className={iconClassName} />}
      {label && <span className={labelClassName}>{label}</span>}
      <span className={valueClassName}>{value}</span>
      <button onClick={handleCopy} className="p-1 flex items-center">
        {copied ? (
          <MdCheck size={18} className="text-green-500" />
        ) : (
          <FiCopy size={18} className={iconClassName} />
        )}
      </button>
    </div>
  );
};

export default CopyableField;

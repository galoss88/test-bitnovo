import { MdCheck, MdClose, MdOutlineAccessTime, MdHelp } from "react-icons/md";

interface StatusIconProps {
  status: "success" | "failed" | "expired";
}

const statusStyles = {
  success: {
    bgColor: "bg-green-300",
    iconColor: "text-green-600",
    icon: <MdCheck className="text-7xl" />,
  },
  failed: {
    bgColor: "bg-red-300",
    iconColor: "text-red-600",
    icon: <MdClose className="text-5xl" />,
  },
  expired: {
    bgColor: "bg-yellow-300",
    iconColor: "text-yellow-600",
    icon: <MdOutlineAccessTime className="text-5xl" />,
  },
  default: {
    bgColor: "bg-gray-300",
    iconColor: "text-gray-600",
    icon: <MdHelp className="text-5xl" />,
  },
};

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const { bgColor, iconColor, icon } =
    statusStyles[status] || statusStyles.default;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${bgColor} rounded-full flex items-center justify-center w-20 h-20`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
    </div>
  );
};

export default StatusIcon;

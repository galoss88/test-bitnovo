import { MdCheck, MdClose, MdOutlineAccessTime } from "react-icons/md";

interface StatusIconProps {
  status: "success" | "failed" | "expired";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
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
  };

  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`${statusStyles[status].bgColor} rounded-full flex items-center justify-center w-20 h-20`}
      >
        <div className={`${statusStyles[status].iconColor}`}>
          {statusStyles[status].icon}
        </div>
      </div>
    </div>
  );
};

export default StatusIcon;

import { MdCheck, MdClose, MdOutlineAccessTime } from "react-icons/md";

interface StatusIconProps {
  status: "success" | "failed" | "expired";
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  // Definir colores y el ícono según el estado
  const statusStyles = {
    success: {
      bgColor: "bg-green-300", // Fondo verde claro
      iconColor: "text-green-600", // Check verde
      icon: <MdCheck className="text-7xl" />, // Icono grande
    },
    failed: {
      bgColor: "bg-red-300", // Fondo rojo claro
      iconColor: "text-red-600", // Cruz roja
      icon: <MdClose className="text-5xl" />,
    },
    expired: {
      bgColor: "bg-yellow-300", // Fondo amarillo claro
      iconColor: "text-yellow-600", // Reloj amarillo
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

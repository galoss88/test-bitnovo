import React, { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";

interface TimeRelojProps {
  className?: string;
  initialTime?: number;
  onExpire?: () => void;
}

const TimeReloj: React.FC<TimeRelojProps> = ({
  className = "",
  initialTime = 300,
  onExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  //Si el tiempo ya expiro, se ejecuta la funcion onExpire
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t - 1 <= 0) {
          clearInterval(interval);
          onExpire?.();
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={`flex items-center gap-2 text-gray-900 font-medium ${className}`}
    >
      <MdOutlineTimer size={20} />
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default TimeReloj;


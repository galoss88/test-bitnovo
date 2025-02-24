import React, { useState, useEffect } from "react";
import { MdOutlineTimer } from "react-icons/md";

interface TimeRelojProps {
  className?: string;
  initialTime?: number; // en segundos
}

const TimeReloj: React.FC<TimeRelojProps> = ({
  className = "",
  initialTime = 300,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

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

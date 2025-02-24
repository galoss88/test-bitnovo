import React, { useState, useEffect } from "react";
import { MdOutlineTimer } from "react-icons/md";

// Definición de las props, ahora incluyendo configuración para el temporizador.
interface TimeRelojProps {
  className?: string;
  initialTime?: number;
  intervalMs?: number;
}

// Custom hook que ahora puede recibir parámetros externos para mayor flexibilidad.
const useTimer = (
  initialTime: number = 0,
  intervalMs: number = 1000
): number => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, intervalMs);
    return () => clearInterval(intervalId);
  }, [intervalMs]);

  return time;
};

const TimeReloj: React.FC<TimeRelojProps> = ({
  className = "",
  initialTime = 0,
  intervalMs = 1000,
}) => {
  const seconds = useTimer(initialTime, intervalMs);

  return (
    <span
      className={`flex gap-3 text-sm font-medium text-gray-900 ${className}`}
    >
      <MdOutlineTimer />
      {seconds}
    </span>
  );
};

export default TimeReloj;

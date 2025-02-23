import React, { useState, useEffect } from "react";
import { MdOutlineTimer } from "react-icons/md";

// Definición de las props con una interfaz simple para cumplir con el principio de Segregación de Interfaces.
interface TimeRelojProps {
  className?: string;
}

// Custom hook para la lógica del temporizador.
// Cumple con el principio de Responsabilidad Única al encargarse solo de manejar el tiempo.
const useTimer = (
  initialTime: number = 0,
  intervalMs: number = 1000
): number => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, intervalMs);

    // Limpieza del intervalo para cumplir con la inversión de dependencias (invirtiendo la responsabilidad de la gestión de recursos).
    return () => clearInterval(intervalId);
  }, [intervalMs]);

  return time;
};

// Componente de presentación que consume el hook.
// Esto permite que el componente sea fácilmente extensible y testeable, siguiendo los principios SOLID.
const TimeReloj: React.FC<TimeRelojProps> = ({ className = "" }) => {
  const seconds = useTimer(0, 1000);

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

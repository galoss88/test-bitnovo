import { useEffect, useState } from "react";

/**
 * Hook para manejar un temporizador regresivo.
 * @param initialTime - Tiempo inicial en segundos.
 * @param onExpire - Callback cuando el tiempo llega a 0.
 */
export const useTimer = (initialTime: number, onExpire: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  return {
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60,
  };
};

import { useState, useEffect } from "react";

// The hook will return the number of seconds left
export const useCountdown = (initialSeconds: number): number => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [secondsLeft]);

  return secondsLeft;
};

import { useEffect, useState } from "react";

export function useIntervalValue(max: number, delay = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < max ? prev + 1 : prev));
    }, delay);
    return () => clearInterval(interval);
  }, [max, delay]);
  return value;
}

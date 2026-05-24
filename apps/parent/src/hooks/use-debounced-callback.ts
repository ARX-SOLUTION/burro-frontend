import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

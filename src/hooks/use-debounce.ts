import { useEffect, useState } from "react";

// Debounce hook to delay the execution of a function
export default function useDebounce<T>(value: T, delay: number = 250) {
  // State and setter for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Set debouncedValue to value after the specified delay
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update debounced value
    }, delay);

    // Cleanup the timeout on useEffect cleanup to prevent memory leaks
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}

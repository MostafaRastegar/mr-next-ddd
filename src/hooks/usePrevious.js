import { useRef, useEffect } from "react";

export default function usePrevious(value) {
  const ref = useRef(null);
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)

  return ref.current;
}

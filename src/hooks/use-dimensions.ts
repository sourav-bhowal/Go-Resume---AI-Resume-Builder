import { useEffect, useState } from "react";

// Custom hook to get the dimensions of a referenced HTML element
export default function useDimensions(
  containerRef: React.RefObject<HTMLElement>,
) {
  // State to store the dimensions of the element
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Effect to run when the component mounts or the containerRef changes
  useEffect(() => {
    // If the referenced element is not available, exit early
    if (!containerRef.current) return;

    // Get the current element from the ref
    const { current } = containerRef;
    // Create a ResizeObserver to observe changes to the element's size
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Update the dimensions state with the new size of the element
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    // Start observing the referenced element
    resizeObserver.observe(current);

    // Cleanup function to stop observing the element when the component unmounts or dependencies change
    return () => {
      resizeObserver.unobserve(current); // Stop observing the element
      resizeObserver.disconnect(); // Disconnect the ResizeObserver
    };
  }, [containerRef]); // Dependency array to re-run the effect if containerRef changes

  // Return the current dimensions of the element
  return dimensions;
}

import { useEffect } from "react";

// This hook is used to show a warning message when the user tries to leave the page with unsaved changes.
export default function useUnloadWarning(condition = true) {
  // If the condition is false, we don't need to show the warning message.
  useEffect(() => {
    // If the condition is false, we don't need to show the warning message.
    if (!condition) {
      return;
    }

    // This event listener is used to show the warning message when the user tries to leave the page.
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    // Add the event listener to the window object.
    window.addEventListener("beforeunload", handler);

    // Remove the event listener when the component is unmounted.
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [condition]);
}

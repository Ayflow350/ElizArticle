import { useEffect } from "react";

const useMouseTracker = (onMouseOut: (e: MouseEvent) => void) => {
  useEffect(() => {
    let isListenerActive = false;

    const initializeMouseTracker = () => {
      try {
        document.addEventListener("mouseout", onMouseOut);
        isListenerActive = true;
      } catch (error) {
        console.error("Failed to initialize mouse tracker, reloading...");
        window.location.reload(); // Reload the page on failure
      }
    };

    initializeMouseTracker();

    // Monitor if the listener is active, and reload if it fails
    const listenerCheckInterval = setInterval(() => {
      if (!isListenerActive) {
        console.warn("Mouse tracker listener is inactive, reinitializing...");
        window.location.reload();
      }
    }, 1000); // Check every second

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      clearInterval(listenerCheckInterval); // Cleanup the interval on unmount
    };
  }, [onMouseOut]);
};

export default useMouseTracker;

"use client";

import React, { useEffect, useCallback, useRef } from "react";

interface MouseTrackerProps {
  onModalTrigger: () => void; // Action to trigger the modal
  children: React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({
  onModalTrigger,
  children,
}) => {
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track mouse movement and trigger modal if Y position is between 0 and 6
  const trackMouseMovement = useCallback(
    (e: MouseEvent) => {
      const mouseY = e.clientY;

      // Check if mouseY is between 0 and 6
      if (mouseY >= 0 && mouseY <= 6) {
        onModalTrigger(); // Trigger the modal when the condition is met
      }
    },
    [onModalTrigger]
  );

  useEffect(() => {
    // Add mouse movement event listener
    document.addEventListener("mousemove", trackMouseMovement);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", trackMouseMovement);
    };
  }, [trackMouseMovement]);

  return <>{children}</>; // Render wrapped content
};

export default MouseTracker;

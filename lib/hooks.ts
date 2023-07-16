import { Task } from "@/types/types";
import { useEffect, useCallback } from "react";

export function useEscapeKey(onEscape: () => void) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    },
    [onEscape]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

export function sortArrayByPosition(arr: Task[]) {
  return arr.sort((a, b) => {
    if (a.position === null) {
      return 1; // null positions are sorted last
    } else if (b.position === null) {
      return -1; // null positions are sorted last
    } else {
      // Compare the positions alphanumerically
      return a.position.localeCompare(b.position);
    }
  });
}

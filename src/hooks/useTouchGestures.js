import { useEffect, useRef } from "react";

/**
 * Hook to handle mobile touch gestures: pinch zoom and two-finger pan
 * Usage: Call this hook with stageRef and state setters
 */
export function useTouchGestures(stageRef, setStageState) {
  const lastCenter = useRef(null);
  const lastDist = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const container = stage.container();

    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    function getCenter(p1, p2) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    }

    function handleTouchMove(e) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      if (touch1 && touch2) {
        // Two-finger gesture
        const p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        const p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter.current) {
          lastCenter.current = getCenter(p1, p2);
          lastDist.current = getDistance(p1, p2);
          return;
        }

        const newCenter = getCenter(p1, p2);
        const dist = getDistance(p1, p2);

        // Calculate zoom
        const pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleY(),
        };

        const scale = stage.scaleX() * (dist / lastDist.current);
        const clampedScale = Math.max(0.1, Math.min(5, scale));

        // Calculate new position
        const dx = newCenter.x - lastCenter.current.x;
        const dy = newCenter.y - lastCenter.current.y;

        const newPos = {
          x: newCenter.x - pointTo.x * clampedScale + dx,
          y: newCenter.y - pointTo.y * clampedScale + dy,
        };

        setStageState({
          scale: clampedScale,
          x: newPos.x,
          y: newPos.y,
          draggable: false,
        });

        lastDist.current = dist;
        lastCenter.current = newCenter;
      }
    }

    function handleTouchEnd() {
      lastCenter.current = null;
      lastDist.current = 0;
    }

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [stageRef, setStageState]);
}

import React, { useState, useEffect } from "react";
import { useSmoothFollow } from "./useSmoothFollow";

export default function CursorCircle() {
  // 1) Detect if a fine pointer (mouse) is available
  const [hasPointerFine, setHasPointerFine] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = (e) => setHasPointerFine(e.matches);
    update(mql); // initial
    mql.addEventListener
      ? mql.addEventListener("change", update)
      : mql.addListener(update);
    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", update)
        : mql.removeListener(update);
    };
  }, []);

  // 2) Set up the smooth‐follow hook
  const circleRef = useSmoothFollow(1);

  // 3) Track first move, pointer coords, and shrink state
  const [hasMoved, setHasMoved] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    if (!hasPointerFine) return; // only listen on fine‐pointer devices

    const interactiveSelector = "button, a, input, textarea";
    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (!hasMoved) setHasMoved(true);
      setPointerPos({ x, y });

      const el = document.elementFromPoint(x, y);
      const overInteractive = !!el?.closest(interactiveSelector);
      setIsShrunk((prev) =>
        overInteractive !== prev ? overInteractive : prev
      );
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    return () =>
      document.removeEventListener("pointermove", handleMove);
  }, [hasPointerFine, hasMoved]);

  // 4) Don’t render until both pointer‐fine & first move
  if (!hasPointerFine || !hasMoved) return null;

  // 5) Compute size & initial transform to avoid corner flash
  const sizePx = isShrunk ? 24 : 32;
  const sizeClass = isShrunk ? "w-6 h-6" : "w-10 h-10";
  const initialTransform = `translate3d(${
    pointerPos.x - sizePx / 2
  }px, ${pointerPos.y - sizePx / 2}px, 0)`;

  return (
    <div
      ref={circleRef}
      style={{ transform: initialTransform }}
      className={`
        pointer-events-none fixed top-0 left-0 rounded-full
        bg-transparent border border-pink-500 z-[9999]
        transition-all duration-200 ease-out
        ${sizeClass}
      `}
    />
  );
}

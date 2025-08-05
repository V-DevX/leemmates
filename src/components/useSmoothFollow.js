import { useEffect, useRef } from "react";

export function useSmoothFollow(speed = 3) {
  const ref = useRef(null);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let posX = 0,
      posY = 0;
    let initialized = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!initialized) {
        // on first move, jump the dot under the cursor immediately
        posX = mouseX;
        posY = mouseY;
        initialized = true;
      }
    };

    const animate = () => {
      if (initialized && ref.current) {
        // lerp towards pointer
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        const w = ref.current.offsetWidth;
        const h = ref.current.offsetHeight;
        ref.current.style.transform = `translate3d(${posX - w / 2}px, ${posY - h / 2}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [speed]);

  return ref;
}

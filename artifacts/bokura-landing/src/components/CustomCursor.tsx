import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags behind cursor with spring physics
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    // Only show on true pointer devices — hide on touch
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    const bindHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach(el => {
          el.addEventListener("mouseenter", () => setHovering(true));
          el.addEventListener("mouseleave", () => setHovering(false));
        });
    };
    bindHover();

    // Re-bind when DOM changes (dialogs, drawers)
    observerRef.current = new MutationObserver(bindHover);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      observerRef.current?.disconnect();
    };
  }, []);

  if (!visible) return null;

  const dotSize   = clicking ? 4  : hovering ? 10 : 6;
  const ringSize  = clicking ? 28 : hovering ? 52 : 36;
  const ringBorder= hovering ? "rgba(0,212,255,0.9)" : "rgba(0,212,255,0.45)";
  const ringGlow  = hovering
    ? "0 0 20px rgba(0,212,255,0.5), inset 0 0 10px rgba(0,212,255,0.08)"
    : "0 0 10px rgba(0,212,255,0.2)";

  return (
    <>
      {/* ── Dot — snaps exactly to cursor ─────────────────── */}
      <motion.div
        className="fixed z-[9999] top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(0,212,255,0.95)",
          boxShadow: "0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.4)",
        }}
        animate={{ width: dotSize, height: dotSize, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />

      {/* ── Ring — follows with spring lag ────────────────── */}
      <motion.div
        className="fixed z-[9998] top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: `1px solid ${ringBorder}`,
          boxShadow: ringGlow,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          borderColor: ringBorder,
          boxShadow: ringGlow,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />

      {/* ── Subtle outer halo (only on hover) ─────────────── */}
      {hovering && (
        <motion.div
          className="fixed z-[9997] top-0 left-0 pointer-events-none rounded-full"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 90, height: 90, opacity: 1 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );
}

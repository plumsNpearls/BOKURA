import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/animations";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SectionReveal({ children, delay = 0, className = "" }: SectionRevealProps) {
  return (
    <div className={`relative overflow-x-clip ${className}`}>
      <motion.div
        initial={{
          clipPath: "inset(6% 3% 6% 3% round 24px)",
          opacity: 0,
          scale: 0.97,
        }}
        whileInView={{
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          clipPath: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
          opacity:  { duration: 0.5, delay, ease: "easeOut" },
          scale:    { duration: 0.9, delay, ease: EASE_OUT_EXPO },
        }}
      >
        {children}
      </motion.div>

      {/* Glowing top edge that flashes on entry */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        whileInView={{ scaleX: 1, opacity: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.8,
          delay: delay + 0.1,
          ease: EASE_OUT_EXPO,
        }}
        className="absolute top-0 left-0 right-0 origin-left pointer-events-none z-10"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #00d4ff, #00f0ff, #d4a017, transparent)",
          boxShadow:
            "0 0 12px rgba(0,212,255,0.8), 0 0 30px rgba(0,212,255,0.4)",
        }}
      />
    </div>
  );
}

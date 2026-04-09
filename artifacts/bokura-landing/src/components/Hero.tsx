import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// ── Word-by-word clip reveal ────────────────────────────────────
function WordReveal({
  text,
  className,
  baseDelay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: baseDelay + i * stagger,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.28em" }} />
          )}
        </span>
      ))}
    </span>
  );
}

// ── Magnetic button — subtly pulls toward cursor ────────────────
function MagneticButton({
  children,
  className,
  style,
  onClick,
  href,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  testId?: string;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      {href ? (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={className}
          style={style}
          data-testid={testId}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </a>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={className}
          style={style}
          data-testid={testId}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLanguage();

  const { scrollY } = useScroll();
  const rawY       = useTransform(scrollY, [0, 700], [0, -140]);
  const rawOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const rawScale   = useTransform(scrollY, [0, 500], [1, 0.94]);
  const orbScale   = useTransform(scrollY, [0, 600], [1, 1.4]);
  const orbOpacity = useTransform(scrollY, [0, 500], [0.08, 0.02]);

  const y       = useSpring(rawY,       { stiffness: 80, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale   = useSpring(rawScale,   { stiffness: 80, damping: 20 });

  // Count words in title1 so gradient words start after
  const title1Words = t.hero.title1.split(" ").length;
  const title2Words = t.hero.title2 ? t.hero.title2.split(" ").length : 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Parallax ambient orb */}
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[900px] h-[500px] sm:h-[700px] md:h-[900px] bg-primary rounded-full blur-[140px] pointer-events-none"
      />

      {/* Parallax hero content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 liquid-glass px-4 py-2 rounded-full text-xs sm:text-sm text-primary font-semibold mb-8 border-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            {t.hero.badge}
          </motion.div>

          {/* ── Headline — word-by-word reveal ──────────────── */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.25] mb-5 tracking-tight">
            <WordReveal
              text={t.hero.title1}
              baseDelay={0.15}
              stagger={0.07}
            />

            {t.hero.title2 && (
              <>
                <br className="hidden sm:block" />
                {" "}
                <WordReveal
                  text={t.hero.title2}
                  baseDelay={0.15 + title1Words * 0.07}
                  stagger={0.07}
                />
                {" "}
              </>
            )}

            {/* Gradient phrase — slides up as one unit */}
            <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }} className="block sm:inline">
              <motion.span
                className="text-gradient-cyan block sm:inline"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.15 + (title1Words + title2Words) * 0.07 + 0.06,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t.hero.titleGradient}
              </motion.span>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* ── Magnetic CTAs ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2"
          >
            <MagneticButton
              onClick={onOpenModal}
              testId="button-hero-cta-primary"
              className="bg-primary text-black px-7 py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 active:scale-95"
              style={{ boxShadow: "0 0 24px rgba(0,212,255,0.5)" }}
            >
              {t.hero.ctaPrimary}
            </MagneticButton>

            <MagneticButton
              href="#services"
              testId="link-hero-cta-secondary"
              className="liquid-glass px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-white hover:text-primary transition-colors text-center"
            >
              {t.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-x-8 sm:gap-y-4 text-xs sm:text-sm font-medium text-gray-400"
          >
            {t.hero.badges.map((badge) => (
              <div key={badge} className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}

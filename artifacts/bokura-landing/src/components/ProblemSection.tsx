import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";
import { EASE_OUT_EXPO } from "@/lib/animations";

export function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div ref={ref} className="liquid-glass-static border border-red-500/20 p-6 sm:p-10 md:p-12 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-14">
            {/* Left text — slides in from left */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.82, ease: EASE_OUT_EXPO }}
              >
                <span className="inline-block text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-widest mb-3">{t.problem.label}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {t.problem.title1}{" "}
                  <span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">{t.problem.titleRed}</span>{" "}
                  {t.problem.title2}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {t.problem.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Right pain points — stagger slide from right */}
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
              {t.problem.items.map((problem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 36, filter: "blur(6px)" }}
                  animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 36, filter: "blur(6px)" }}
                  whileHover={{ scale: 1.03, x: -5, transition: { duration: 0.26, ease: EASE_OUT_EXPO } }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.72, delay: 0.15 + idx * 0.07, ease: EASE_OUT_EXPO }}
                  className="flex items-center gap-3 bg-black/40 p-3 sm:p-4 rounded-xl border border-red-500/10 hover-red cursor-pointer"
                  data-testid={`item-problem-${idx}`}
                >
                  <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 text-red-400 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-gray-200 font-medium text-sm sm:text-base">{problem}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

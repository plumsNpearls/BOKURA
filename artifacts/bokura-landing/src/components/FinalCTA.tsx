import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";

export function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8 }}
          className="liquid-glass-static relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-20 text-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/15 via-secondary/8 to-primary/15 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-4">{t.finalCta.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t.finalCta.title}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              {t.finalCta.subtitle}
            </p>
            <button
              onClick={onOpenModal}
              data-testid="button-final-cta"
              className="bg-primary text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-xl shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:shadow-[0_0_50px_rgba(0,212,255,0.9)] hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              {t.finalCta.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

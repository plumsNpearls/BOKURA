import { motion } from "framer-motion";

export function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 liquid-glass px-4 py-2 rounded-full text-xs sm:text-sm text-primary font-semibold mb-8 border-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            Dubai's Premier Accounting Partner
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-5 tracking-tight"
          >
            Outsource Your Accounting
            <br className="hidden sm:block" />
            {" "}in Dubai.{" "}
            <span className="text-gradient-cyan block sm:inline">
              Focus on Growth.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Stop drowning in VAT filings, reconciliations, and confusing reports.
            BOKURA handles it all — so you can focus on what matters most.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2"
          >
            <button
              onClick={onOpenModal}
              data-testid="button-hero-cta-primary"
              className="bg-primary text-black px-7 py-4 rounded-full font-semibold text-sm sm:text-base shadow-[0_0_24px_rgba(0,212,255,0.5)] hover:shadow-[0_0_36px_rgba(0,212,255,0.8)] hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get a Free Financial Health Check
            </button>
            <a
              href="#services"
              data-testid="link-hero-cta-secondary"
              className="liquid-glass px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-white hover:text-primary transition-colors text-center"
            >
              View Our Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-x-8 sm:gap-y-4 text-xs sm:text-sm font-medium text-gray-400"
          >
            {["UAE VAT Compliant", "FTA Ready", "Trusted in Dubai & GCC", "ISO-Standard Processes"].map((badge) => (
              <div key={badge} className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[900px] h-[500px] sm:h-[700px] md:h-[900px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
}

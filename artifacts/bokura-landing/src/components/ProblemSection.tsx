import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const problems = [
  "VAT Headaches & FTA Penalties",
  "Confusing Free Zone Reporting",
  "Messy Bank Reconciliations",
  "Missed Filing Deadlines",
  "Lack of Clear Financial Visibility"
];

export function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 sm:py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div ref={ref} className="liquid-glass-static border border-red-500/20 p-6 sm:p-10 md:p-12 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            {/* Left text */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-widest mb-3">The Reality</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Is Your Business{" "}
                  <span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">Losing Money</span>{" "}
                  in the Dark?
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Dubai's regulatory landscape is shifting rapidly. Corporate Tax, VAT complexities, and stringent FTA requirements mean sloppy bookkeeping isn't just an inconvenience — it's a massive financial risk.
                </p>
              </motion.div>
            </div>

            {/* Right pain points */}
            <div className="lg:w-1/2 w-full space-y-3">
              {problems.map((problem, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
                  className="flex items-center gap-3 bg-black/40 p-3 sm:p-4 rounded-xl border border-red-500/10"
                  data-testid={`item-problem-${idx}`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 text-red-400 shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

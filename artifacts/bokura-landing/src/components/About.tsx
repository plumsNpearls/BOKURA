import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const stats = [
    { value: "200+", label: "Clients Served" },
    { value: "99%", label: "FTA Compliance Rate" },
    { value: "48h", label: "Onboarding Time" },
    { value: "GCC", label: "Regional Coverage" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">About BOKURA</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              Built for Dubai's Most{" "}
              <span className="text-gradient-cyan">Ambitious Enterprises</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="liquid-glass-static p-6 sm:p-8 md:p-12 relative overflow-hidden rounded-2xl mb-8"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                BOKURA Accounting and Bookkeeping L.L.C was founded on a simple premise: Dubai's rapid growth demands financial services that move at the speed of innovation.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                Operating across mainland UAE and major free zones, our team of seasoned financial experts transforms chaotic ledgers into crystal-clear insights. We act as your invisible financial engine — ensuring compliance, driving efficiency, and providing the pristine financial clarity you need to dominate your market.
              </p>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
                className="liquid-glass p-4 sm:p-6 text-center"
                data-testid={`stat-${idx}`}
              >
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-cyan mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

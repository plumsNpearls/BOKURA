import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/context/LanguageContext";

const highlightIcons = [
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useLanguage();

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
            <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.about.label}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              {t.about.title}{" "}
              <span className="text-gradient-cyan">{t.about.titleGradient}</span>
            </h2>
          </motion.div>

          {/* Main description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="liquid-glass-static p-6 sm:p-8 md:p-10 relative overflow-hidden rounded-2xl mb-6"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">{t.about.desc1}</p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">{t.about.desc2}</p>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {t.about.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, type: "spring", stiffness: 280, damping: 20 }}
                className="liquid-glass p-5 flex gap-3 items-start cursor-pointer"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary shrink-0">
                  {highlightIcons[idx]}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {t.about.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileHover={{ scale: 1.06, y: -8 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                className="liquid-glass p-4 sm:p-5 text-center cursor-pointer"
                data-testid={`stat-${idx}`}
              >
                <div className="text-xl sm:text-2xl font-display font-bold text-gradient-cyan mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

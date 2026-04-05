import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function WhyUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const benefits = [
    {
      title: "Expert UAE Knowledge",
      desc: "Deep understanding of UAE mainland and free zone financial regulations.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    {
      title: "Strict FTA Compliance",
      desc: "Always aligned with the latest Federal Tax Authority mandates.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      )
    },
    {
      title: "Fast Turnaround",
      desc: "Speedy reporting and reconciliation so you never miss a deadline.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      )
    },
    {
      title: "Dedicated Account Manager",
      desc: "A single point of contact who knows your business inside and out.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      )
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden fees. Premium service with clear, predictable costs.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Why BOKURA</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
              The <span className="text-gradient-gold">Gold Standard</span>
              <br className="sm:hidden" /> in Bookkeeping.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
              We don't just crunch numbers. We provide a fortified financial foundation for Dubai's most ambitious businesses.
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`liquid-glass p-5 sm:p-6 flex gap-4 items-start ${idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              data-testid={`card-benefit-${idx}`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

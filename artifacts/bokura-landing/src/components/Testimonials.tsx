import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote: "BOKURA entirely transformed our financial operations. They navigated the FTA requirements seamlessly, giving us total peace of mind.",
    name: "Ahmed Al Mansoori",
    role: "CEO, Mainland LLC",
    stars: 5
  },
  {
    quote: "As a fast-growing tech startup, we needed a firm that understood modern business. BOKURA acts like our in-house CFO.",
    name: "Sarah Jenkins",
    role: "Founder, Tech FZCO",
    stars: 5
  },
  {
    quote: "Their precision in reconciling our multi-currency accounts is unmatched. The finest bookkeeping service in the GCC, hands down.",
    name: "Tariq Rashid",
    role: "Director, Retail Group",
    stars: 5
  }
];

export function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">Client Stories</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Trusted by <span className="text-gradient-cyan">Industry Leaders</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="liquid-glass p-6 sm:p-8 flex flex-col justify-between"
              data-testid={`card-testimonial-${idx}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <div className="text-primary mb-4 opacity-40">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic mb-6 flex-grow">
                "{test.quote}"
              </p>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-white font-semibold text-sm sm:text-base">{test.name}</h4>
                <p className="text-primary text-xs sm:text-sm">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

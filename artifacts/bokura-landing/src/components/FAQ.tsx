import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";
import { headingVariants, itemVariants, EASE_OUT_EXPO } from "@/lib/animations";

export function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={headingVariants} className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            {t.faq.label}
          </motion.span>
          <motion.h2 variants={headingVariants} className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t.faq.title} <span className="text-gradient-cyan">{t.faq.titleGradient}</span>
          </motion.h2>
        </motion.div>

        {/* FAQ items — each one animates in with stagger */}
        <motion.div
          ref={ref}
          className="liquid-glass p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
        >
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((faq, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ delay: idx * 0.055 }}
              >
                <AccordionItem value={`item-${idx}`} className="border-b border-primary/15 last:border-0">
                  <AccordionTrigger
                    className="text-start text-white hover:text-primary transition-colors py-4 sm:py-5 font-medium text-sm sm:text-base"
                    data-testid={`faq-trigger-${idx}`}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

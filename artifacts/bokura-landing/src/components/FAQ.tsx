import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is included in your bookkeeping service?", a: "Our comprehensive service includes daily transaction recording, bank reconciliations, accounts payable and receivable management, and monthly financial reporting tailored to UAE standards." },
  { q: "Are you registered with the FTA?", a: "Yes, we are fully versed in Federal Tax Authority regulations and can manage your VAT registration, filing, and compliance to ensure you avoid penalties." },
  { q: "Do you work with free zone companies?", a: "Absolutely. We serve businesses across all major UAE Free Zones (DMCC, JAFZA, DDA, etc.) as well as mainland LLCs, understanding the unique reporting requirements for each." },
  { q: "How do you handle VAT filing?", a: "We compile your taxable records, calculate output and input VAT, and prepare the official return for timely submission to the FTA portal." },
  { q: "What's your pricing model?", a: "We offer transparent, flat-rate monthly retainers based on your transaction volume and complexity. No hidden hourly fees — ever." },
  { q: "How quickly can I get started?", a: "Our onboarding is swift. We can usually begin auditing your current books and setting up our systems within 48 hours of engagement." },
  { q: "Do you work with businesses outside Dubai?", a: "Yes, we serve clients across the entire UAE and GCC region, providing remote, cloud-based financial management." },
  { q: "What accounting software do you use?", a: "We work with industry-leading platforms like Xero, QuickBooks, and Zoho, ensuring your data is secure, accessible, and integrated." },
];

export function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="faq" className="py-16 sm:py-24 relative z-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Frequently Asked <span className="text-gradient-cyan">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="liquid-glass p-4 sm:p-6 md:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-primary/15 last:border-0">
                <AccordionTrigger
                  className="text-left text-white hover:text-primary transition-colors py-4 sm:py-5 font-medium text-sm sm:text-base"
                  data-testid={`faq-trigger-${idx}`}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

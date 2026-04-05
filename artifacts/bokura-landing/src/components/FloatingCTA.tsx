import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 200 }}
      className="fixed bottom-5 end-5 z-50 md:hidden"
    >
      <button
        onClick={onOpenModal}
        data-testid="button-floating-cta"
        className="relative bg-primary text-black font-bold px-5 py-3 rounded-full text-sm shadow-[0_0_24px_rgba(0,212,255,0.6)] hover:shadow-[0_0_36px_rgba(0,212,255,0.9)] active:scale-95 transition-all duration-200 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-black/60 animate-ping absolute start-3 top-1/2 -translate-y-1/2" />
        <span className="ms-2">{t.floatingCta}</span>
      </button>
    </motion.div>
  );
}

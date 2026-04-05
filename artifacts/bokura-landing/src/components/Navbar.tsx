import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.whyUs, href: "#why-us" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.testimonials, href: "#testimonials" },
    { name: t.nav.faq, href: "#faq" },
  ];

  const isGlassActive = scrolled || mobileMenuOpen;

  return (
    <>
      {/* ── Header entry animation ───────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 overflow-hidden transition-all duration-500 ${
              isGlassActive
                ? "navbar-scrolled bg-black/70 backdrop-blur-2xl border border-primary/20"
                : "bg-transparent"
            }`}
          >
            {/* ── Scan beam (only when glass is active) ──────────── */}
            {isGlassActive && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-[80px] z-10"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.18) 50%, transparent 100%)",
                  animation: "navScanBeam 7s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              />
            )}

            {/* ── Glowing bottom edge line ────────────────────────── */}
            {isGlassActive && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-4 right-4 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 50%, transparent 100%)",
                  opacity: 0.6,
                }}
              />
            )}

            {/* ── Logo ────────────────────────────────────────────── */}
            <a href="#" className="relative z-20 flex items-center gap-3 sm:gap-4 group" data-testid="link-logo">
              <div className="logo-ring-animated h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden ring-2 ring-secondary/60 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/bokura-logo.png"
                  alt="BOKURA Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-display font-bold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_14px_rgba(0,212,255,0.35)] transition-all duration-300">
                BOKURA<span className="text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.9)]">.</span>
              </span>
            </a>

            {/* ── Desktop Nav ─────────────────────────────────────── */}
            <nav className="relative z-20 hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-primary transition-all duration-200 relative group"
                  style={{ textShadow: "none" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(0,212,255,0.8)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.textShadow = "none";
                  }}
                >
                  {link.name}
                  {/* Glowing underline */}
                  <span
                    className="absolute -bottom-0.5 start-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,212,255,0.8), rgba(0,212,255,0.3))",
                      boxShadow: "0 0 6px rgba(0,212,255,0.6)",
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* ── Desktop CTA row ──────────────────────────────────── */}
            <div className="relative z-20 hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                data-testid="button-lang-toggle"
                className="liquid-glass px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-primary/40 transition-all duration-200 tracking-wide"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
              <motion.button
                onClick={onOpenModal}
                data-testid="button-nav-inquire"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden bg-primary text-black px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
                style={{ boxShadow: "0 0 18px rgba(0,212,255,0.45), 0 2px 8px rgba(0,0,0,0.4)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,212,255,0.8), 0 2px 8px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(0,212,255,0.45), 0 2px 8px rgba(0,0,0,0.4)";
                }}
              >
                {/* Button inner shimmer */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-8 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                    animation: "navScanBeam 4s ease-in-out infinite",
                    animationDelay: "0.5s",
                  }}
                />
                <span className="relative z-10">{t.nav.inquire}</span>
              </motion.button>
            </div>

            {/* ── Mobile right controls ────────────────────────────── */}
            <div className="relative z-20 flex md:hidden items-center gap-2">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                data-testid="button-lang-toggle-mobile"
                className="liquid-glass px-2.5 py-1 rounded-full text-xs font-semibold text-gray-300 border border-white/10 transition-all"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
              <button
                className="text-white p-2 -mr-1 rounded-xl hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-3 right-3 z-40 rounded-2xl overflow-hidden md:hidden border shadow-2xl"
            style={{
              background: "rgba(5, 5, 12, 0.97)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(0,212,255,0.2)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 20px rgba(0,212,255,0.06)",
            }}
          >
            {/* Top edge glow */}
            <div
              className="absolute top-0 left-4 right-4 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
            />

            <div className="p-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="text-base font-medium text-gray-200 hover:text-primary hover:bg-white/5 transition-all px-3 py-3 rounded-xl"
                  style={{ borderLeft: "2px solid transparent" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = "rgba(0,212,255,0.5)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-px my-2" style={{ background: "rgba(0,212,255,0.12)" }} />
              <motion.button
                onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
                data-testid="button-nav-mobile-inquire"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                className="mt-1 bg-primary text-black px-6 py-3.5 rounded-xl font-bold text-base w-full"
                style={{ boxShadow: "0 0 20px rgba(0,212,255,0.45)" }}
              >
                {t.nav.inquireFree}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

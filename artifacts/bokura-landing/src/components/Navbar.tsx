import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
              scrolled || mobileMenuOpen
                ? "liquid-glass-static border-primary/20 bg-black/70"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5" data-testid="link-logo">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden ring-1 ring-secondary/50 shadow-[0_0_10px_rgba(212,160,23,0.35)] shrink-0">
                <img
                  src="/bokura-logo.png"
                  alt="BOKURA Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl sm:text-2xl font-display font-bold tracking-wider text-white">
                BOKURA<span className="text-primary">.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <button
                onClick={onOpenModal}
                data-testid="button-nav-inquire"
                className="bg-primary text-black px-5 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] hover:bg-primary/90 transition-all duration-200"
              >
                Inquire Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 -mr-1 rounded-xl hover:bg-white/5 transition-colors"
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
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-3 right-3 z-40 rounded-2xl overflow-hidden md:hidden border border-white/10 shadow-2xl"
            style={{ background: "rgba(5, 5, 12, 0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="p-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-200 hover:text-primary hover:bg-white/5 transition-all px-3 py-3 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-nav-mobile-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}
                data-testid="button-nav-mobile-inquire"
                className="mt-1 bg-primary text-black px-6 py-3.5 rounded-xl font-bold text-base shadow-[0_0_15px_rgba(0,212,255,0.4)] w-full"
              >
                Inquire Now — It's Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-xl pt-12 sm:pt-16 pb-8">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-secondary/50 shadow-[0_0_12px_rgba(212,160,23,0.4)] shrink-0">
                <img
                  src="/bokura-logo.png"
                  alt="BOKURA Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-display font-bold tracking-wider text-white">
                BOKURA<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed mb-4">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.footer.accepting}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Deira, Dubai, UAE
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:accounts@bokura.org" className="hover:text-primary transition-colors break-all">
                  accounts@bokura.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:+971555660189" className="hover:text-primary transition-colors">
                  +971 55 566 0189
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { label: t.footer.links.services, href: "#services" },
                { label: t.footer.links.whyUs, href: "#why-us" },
                { label: t.footer.links.about, href: "#about" },
                { label: t.footer.links.testimonials, href: "#testimonials" },
                { label: t.footer.links.faq, href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

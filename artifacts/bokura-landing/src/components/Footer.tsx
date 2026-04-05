export function Footer() {
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
              Premium accounting, bookkeeping, and financial advisory services tailored for Dubai's modern enterprises and GCC businesses.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Currently accepting new clients
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Dubai, United Arab Emirates</li>
              <li>
                <a href="mailto:info@bokura-accounting.com" className="hover:text-primary transition-colors">
                  info@bokura-accounting.com
                </a>
              </li>
              <li>+971 4 XXX XXXX</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Services", href: "#services" },
                { label: "Why Us", href: "#why-us" },
                { label: "About Us", href: "#about" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
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
          <p>© {new Date().getFullYear()} BOKURA Accounting & Bookkeeping L.L.C. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

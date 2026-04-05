# BOKURA Accounting & Bookkeeping L.L.C — Landing Page

Ultra-premium landing page for **BOKURA Accounting & Bookkeeping L.L.C**, an Accounting & Audit Office based in Deira, Dubai. Built with a deep space dark theme, iOS-inspired Liquid Glass UI, Three.js 3D animated background, full bilingual English/Arabic support with RTL layout, and comprehensive UAE/GCC SEO.

---

## Features

- **Deep Space Dark Theme** — Deep black background (`#050508`) with electric cyan (`#00d4ff`) and gold (`#d4a017`) accents
- **iOS 26 Liquid Glass UI** — Frosted glass card components with blur, saturation, and layered depth
- **Three.js 3D Background** — Animated particle field rendered on a WebGL canvas behind all content
- **Bilingual EN / AR** — Full English and Arabic translations across all 11 sections; language preference saved to `localStorage`
- **RTL Layout** — `dir="rtl"` applied dynamically; Noto Sans Arabic font; CSS logical properties throughout
- **Hover Glow Effects** — Framer Motion spring animations + CSS `@keyframes` glow flash on every card — cyan for service/testimonial cards, gold for Why Us cards, red for problem items
- **UAE / GCC SEO** — 35+ English keywords, 18+ Arabic keywords, 5 JSON-LD schemas (LocalBusiness, FAQPage ×2, BreadcrumbList, WebSite), `hreflang` for `en-AE` / `ar-AE`, geo meta tags, `robots.txt`, and image sitemap
- **Inquiry Modal** — Animated contact form with bilingual field labels

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D Background | Three.js |
| Fonts | Inter, Syne (display), Noto Sans Arabic |
| Package Manager | pnpm (monorepo) |
| i18n | Custom `LanguageContext` + `translations.ts` |

---

## Project Structure

```
/
├── artifacts/
│   └── bokura-landing/          # Landing page artifact
│       ├── public/
│       │   ├── bokura-logo.png  # Logo / favicon / OG image
│       │   ├── robots.txt
│       │   └── sitemap.xml
│       ├── src/
│       │   ├── components/      # All 11 page sections
│       │   │   ├── Navbar.tsx
│       │   │   ├── Hero.tsx
│       │   │   ├── ProblemSection.tsx
│       │   │   ├── Services.tsx
│       │   │   ├── WhyUs.tsx
│       │   │   ├── About.tsx
│       │   │   ├── Testimonials.tsx
│       │   │   ├── FAQ.tsx
│       │   │   ├── FinalCTA.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── FloatingCTA.tsx
│       │   │   ├── InquireModal.tsx
│       │   │   └── ThreeBackground.tsx
│       │   ├── context/
│       │   │   └── LanguageContext.tsx  # EN/AR toggle + RTL logic
│       │   ├── i18n/
│       │   │   └── translations.ts     # All bilingual strings
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css               # Liquid Glass, glow animations, RTL
│       ├── index.html                  # All SEO meta tags + JSON-LD schemas
│       ├── vite.config.ts
│       └── package.json
├── package.json                        # Monorepo root
└── pnpm-workspace.yaml
```

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or later (project tested on v24)
- **pnpm** v9 or later

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

---

## Running Locally

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies

From the monorepo root, install all workspace dependencies at once:

```bash
pnpm install
```

### 3. Set required environment variables

The Vite config requires `PORT` and `BASE_PATH` to be set before starting. Create a `.env` file inside the landing page artifact directory:

```bash
# artifacts/bokura-landing/.env
PORT=3000
BASE_PATH=/
```

Or pass them inline when running the dev command (see step 4).

### 4. Start the development server

**Using the `.env` file (recommended):**

```bash
pnpm --filter @workspace/bokura-landing run dev
```

**Or pass environment variables inline:**

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bokura-landing run dev
```

The site will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## Building for Production

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bokura-landing run build
```

Output is written to `artifacts/bokura-landing/dist/public/`.

To preview the production build locally:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/bokura-landing run serve
```

---

## SEO Configuration

After deploying, complete the SEO setup by:

1. **Google Search Console** — Verify your domain and replace the commented-out `google-site-verification` meta tag in `index.html`
2. **Bing Webmaster Tools** — Replace the `msvalidate.01` meta tag placeholder in `index.html`
3. **Phone number** — Replace `+971-4-XXX-XXXX` in `index.html` (LocalBusiness schema) with the real office number
4. **Canonical URL** — If you move to a custom domain, replace all instances of `attached-assets-techedubyte.replit.app` in `index.html` and `sitemap.xml` with your domain

---

## Adding / Editing Content

All visible text on the page lives in one file:

```
artifacts/bokura-landing/src/i18n/translations.ts
```

Each key has an English (`en`) and Arabic (`ar`) version. Edit this file to update any heading, description, FAQ, testimonial, or service without touching component files.

---

## License

Private — All rights reserved. BOKURA Accounting and Bookkeeping L.L.C.

# NumroLogic — Deploy-Ready Pre-Launch Checklist

> **Page:** Single-file landing page (`index.html`) · All CSS & JS inline · All images on Cloudinary CDN · `assets/` folder currently empty
> **Last updated:** April 8, 2026

---

## ⚠️ Critical — Fix Before Any Deployment

- [ ] **Favicon is missing** — `assets/` is empty; add a favicon and link it in `<head>`
- [ ] **All CTA buttons** must point to real checkout/payment URLs (not `#` placeholders)
- [ ] **Legal pages** (Privacy Policy, T&C, Refund Policy) must exist as live, accessible pages
- [ ] **SEO meta tags** — confirm `<title>` and `<meta name="description">` are not blank

---

## Phase 1 — Content & Copy

- [ ] All placeholder text replaced (no lorem ipsum, `[NAME]`, TODOs)
- [ ] Headline, subheadline, and body copy proofread for typos and grammar
- [ ] Pricing and offer details are accurate and consistent across all sections
- [ ] Countdown timer duration/expiry matches the actual offer (localStorage key correct)
- [ ] Testimonial names, results, and images are real and approved for use
- [ ] Celebrity names/images have proper usage rights cleared
- [ ] Contact email, phone, and WhatsApp number are correct in the footer
- [ ] Company name, address, and legal entity details are accurate
- [ ] All CTA button labels are finalized

---

## Phase 2 — Links & URLs

- [ ] Primary CTA button(s) link to the correct checkout/payment URL
- [ ] Sticky bottom bar CTA links to the same correct URL
- [ ] Footer links (Privacy Policy, Terms, Refund Policy, Contact) all work — no dead links
- [ ] No `href="#"` placeholders left on live CTAs
- [ ] All Cloudinary image URLs return 200 — zero 404s (check every `<img>` src)

---

## Phase 3 — Media & Assets

- [ ] All Cloudinary images load correctly (hero, testimonials, celebrity images, report previews)
- [ ] All 12 hero flip-book report preview images display correctly
- [ ] Video embed loads and plays; lazy loading (IntersectionObserver) fires correctly
- [ ] Video fallback text shown if video fails to load
- [ ] Celebrity auto-scroll slider images all load and animate smoothly
- [ ] Favicon added to `assets/` and `<link rel="icon">` tag added to `<head>`
- [ ] OG/social share image is hosted at a public URL and linked in meta tags

---

## Phase 4 — JavaScript Functionality

- [ ] FAQ accordion opens/closes correctly for all 4 FAQs
- [ ] Countdown timer counts down correctly from 2 hours on first visit
- [ ] Countdown timer persists on page refresh — does NOT reset on every reload
- [ ] 3D hero flip animation cycles through all 12 report pages smoothly
- [ ] 3D flip animation responsive sizing adapts to screen width correctly
- [ ] Sticky bottom bar is visible on scroll and the CTA is clickable on all devices
- [ ] Celebrity auto-scroll animation plays continuously with no jank
- [ ] **Zero JavaScript console errors** (DevTools → Console tab — check on every section)
- [ ] No broken JS references (undefined variables, missing functions)

---

## Phase 5 — Responsive & Cross-Device

- [ ] Layout correct on 375px (iPhone SE)
- [ ] Layout correct on 390px (iPhone 14/15)
- [ ] Layout correct on 768px (iPad)
- [ ] Layout correct on 1280px desktop
- [ ] Layout correct on 1440px desktop
- [ ] Touch targets (buttons, CTAs) are at least 44×44px on mobile
- [ ] Sticky bottom bar does not obscure critical content on mobile
- [ ] Hero section CTA is visible above the fold on mobile
- [ ] No text overflow or image stretch on any breakpoint
- [ ] Tested in Chrome, Firefox, Safari, and Edge

---

## Phase 6 — SEO & Metadata

- [ ] `<title>` tag set to a descriptive, keyword-rich title
- [ ] `<meta name="description">` present and under 160 characters
- [ ] Open Graph tags populated: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Twitter card meta tags added (`twitter:card`, `twitter:title`, `twitter:image`)
- [ ] `<link rel="canonical">` set to the production URL
- [ ] `<html lang="en">` (or correct language) attribute set
- [ ] Only one `<h1>` tag on the page
- [ ] Robots meta tag is NOT set to `noindex`

---

## Phase 7 — Performance

- [ ] Google PageSpeed Insights score: **70+ mobile**, **85+ desktop**
- [ ] Cloudinary images use transforms (`w_`, `q_auto`, `f_auto`) where possible
- [ ] Lazy loading active for below-fold images and the video
- [ ] Core Web Vitals: LCP < 2.5s · CLS < 0.1 · INP < 200ms
- [ ] Total initial page weight under 3MB

---

## Phase 8 — Legal & Compliance

- [ ] Privacy Policy page exists and is linked in footer
- [ ] Terms & Conditions page exists and is linked in footer
- [ ] Refund/Cancellation Policy page exists and is linked in footer
- [ ] Results disclaimer visible ("Results may vary" or equivalent)
- [ ] Cookie consent banner present (required for EU/UK traffic)
- [ ] DPDP (Digital Personal Data Protection) compliance reviewed for India market
- [ ] No unauthorized use of celebrity likenesses

---

## Phase 9 — Analytics & Tracking

- [ ] Google Analytics 4 (GA4) tag installed and firing on page load
- [ ] Facebook/Meta Pixel installed (if running paid ads)
- [ ] Primary CTA click conversion event tracked (e.g., `InitiateCheckout`)
- [ ] Google Tag Manager container set up (if using GTM)
- [ ] Hotjar or heatmap tool installed (strongly recommended for a sales page)
- [ ] UTM parameters pass through correctly to the checkout URL

---

## Phase 10 — Hosting & Infrastructure

- [ ] Hosting platform set up (Netlify / Vercel / Cloudflare Pages / cPanel)
- [ ] Domain registered and DNS pointing to the host
- [ ] SSL/TLS certificate active — page loads over HTTPS
- [ ] HTTP → HTTPS redirect configured (no mixed-content warnings)
- [ ] www ↔ non-www redirect consistent
- [ ] Custom 404 page configured on host
- [ ] `assets/` folder contents (favicon, any new files) uploaded correctly
- [ ] Staging/preview URL fully tested before flipping DNS to production

---

## Phase 11 — Final Smoke Test (Go-Live)

- [ ] Open production URL in a fresh incognito window — page loads fully
- [ ] Click every CTA button — all route to the correct destination
- [ ] Test on a real physical mobile device (not just DevTools emulation)
- [ ] Browser tab shows correct favicon and page title
- [ ] DevTools Console shows zero errors on the live URL
- [ ] Run PageSpeed Insights on the live production URL
- [ ] Share URL on WhatsApp/social to confirm OG preview card renders correctly

---

## Sign-Off

| Check | Name | Date |
|-------|------|------|
| Content approved | | |
| Dev/QA complete | | |
| Legal reviewed | | |
| Tracking verified | | |
| Final go-live approval | | |

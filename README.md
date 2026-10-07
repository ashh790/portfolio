# Ashraf Dalal — Portfolio

Personal portfolio site for Ashraf Dalal, a full stack developer based in Mumbai, India. Built with Next.js, it showcases his experience, skills, and shipped projects.

## Tech Stack

- **Framework:** Next.js 13 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (scroll reveals, letter-flip text), custom typewriter effect
- **Scrolling:** Lenis (smooth scroll)
- **Icons:** Font Awesome
- **Email:** Nodemailer (contact form)

## Features

- Animated, looping typewriter intro for the name
- Letter-flip reveal animation for headline text, triggered on scroll
- Smooth-scroll navigation with scroll-spy active link highlighting
- Fully responsive layout, mobile through desktop
- Project, services, and about content all driven from a single data file
- Working contact form backed by a real API route
- Respects `prefers-reduced-motion` across all custom animations

## Getting Started

Requires Node.js 18+.

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page auto-updates as you edit files.

### Contact form setup

The contact form sends mail through `app/api/contact/route.ts` using SMTP credentials from environment variables. Fill these in `.env.local` (see `.env.local.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials. For Gmail, use an [App Password](https://myaccount.google.com/apppasswords), not the account password.
- `CONTACT_TO_EMAIL` — optional override for where messages are delivered (defaults to `profile.email`).
- `NEXT_PUBLIC_SITE_URL` — the site's deployed URL, used for the canonical link in `app/layout.tsx`.

Without `SMTP_USER`/`SMTP_PASS` set, the form will return an error instead of silently failing. Remember to add the same environment variables in your hosting provider's dashboard (e.g. Vercel) for production.

### SEO files

This project is pinned to Next.js 13.2.3, which predates the `sitemap.ts`/`robots.ts` file-convention APIs — `public/robots.txt` and `public/sitemap.xml` are static files instead. Both currently point at a placeholder `your-domain.example.com`; replace it with the real deployed domain once the site has one.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Project Structure

```
app/
├── api/contact/route.ts     # contact form API route (sends email via Nodemailer)
├── data/profile.ts          # all site content: name, bio, skills, projects, services
├── hero-section/            # Hero.tsx
├── about-section/           # About.tsx
├── services-section/        # Services.tsx
├── works-section/           # Works.tsx
├── contact-section/         # Contact.tsx
├── navbar/                  # NavBar.tsx
├── footer/                  # Footer.tsx
├── components/               # shared components (FlipText, Typewriter, Photo, Reveal, SmoothScroll, ProjectImage)
├── fonts/                    # Mona Sans + Poppins font files
├── layout.tsx, page.tsx, globals.css
public/                       # images, resume PDF, favicons, robots.txt, sitemap.xml
```

## Editing Content

All copy on the site — name, tagline, bio, skills, services, and project details — lives in [`app/data/profile.ts`](app/data/profile.ts). Update that file to change the site's content without touching any components.

## Author

**Ashraf Dalal**

- GitHub: [github.com/ashh790](https://github.com/ashh790)
- LinkedIn: [linkedin.com/in/ashrafdalal](https://linkedin.com/in/ashrafdalal)
- Email: dalalashraf456@gmail.com

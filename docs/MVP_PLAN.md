# InstAPI MVP Plan - Landing Page & Waitlist

## Overview

The MVP is a marketing landing page to validate demand for InstAPI before building the full application. The goal is to collect waitlist signups and gauge interest by preferred programming language.

---

## What We Built

### Landing Page Sections

1. **Hero Section**
   - Headline: "Ship backends in minutes, not days."
   - Subheadline explaining the value proposition
   - Primary CTA → waitlist signup
   - Animated gradient background

2. **How It Works Section**
   - 4-step visual: Design → Configure → Generate → Deploy
   - Explains the wizard flow concept

3. **Features Section**
   - Security-first (JWT, validation, rate limiting built-in)
   - Production-ready (not scaffolding)
   - You own the code (no vendor lock-in)
   - Complete package (code + tests + docs)

4. **Pricing Section**
   - Free tier (1 credit, 3 endpoints, TypeScript only)
   - Pay-as-you-go ($29/credit)
   - Pro ($29/mo)
   - Team ($99/mo)

5. **Interactive Demo**
   - Static walkthrough of the wizard concept
   - Shows: naming endpoints → configuring fields → selecting auth → output preview

6. **Waitlist Signup Form**
   - Email address (required)
   - Preferred language dropdown (Node.js, Python, Go, Java, Ruby, Other)
   - Email verification flow

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Form Validation | Zod |
| Analytics | Vercel Analytics + Google Analytics |
| Hosting | Vercel |

---

## Security Features

### API Protection
- **Rate Limiting**: 10 requests/minute per IP (in-memory middleware)
- **Input Validation**: Zod schema validation on all inputs
- **Email Normalization**: Lowercase + trim to prevent duplicates
- **Honeypot Field**: Bot prevention without CAPTCHA
- **Language Whitelist**: Only accepts predefined language options

### Email Verification
- Double opt-in flow with verification tokens
- Tokens expire after 24 hours
- Verified status tracked in database

### Database Security
- Row Level Security (RLS) policies in Supabase
- Anon key only has insert/select/update access to waitlist table
- No delete access for anon users

### HTTP Security Headers
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (restricts camera, microphone, geolocation)

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles
│   ├── sitemap.ts                  # Dynamic sitemap generation
│   ├── not-found.tsx               # 404 page
│   ├── privacy/page.tsx            # Privacy policy
│   ├── terms/page.tsx              # Terms of service
│   ├── verified/page.tsx           # Email verification status
│   └── api/
│       └── waitlist/
│           ├── route.ts            # POST endpoint for signups
│           └── verify/route.ts     # GET endpoint for verification
├── components/
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── InteractiveDemo.tsx
│   ├── WaitlistForm.tsx
│   ├── Footer.tsx
│   └── GoogleAnalytics.tsx
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── resend.ts                   # Email sending functions
│   └── tokens.ts                   # Verification token generation
├── middleware.ts                   # Rate limiting
└── emails/
    ├── VerificationEmail.tsx       # Email verification template
    └── WelcomeEmail.tsx            # Welcome email template
```

---

## Database Schema

```sql
-- Waitlist signups table
create table waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  preferred_lang text not null,
  verified boolean default false,
  verification_token text,
  verification_expires timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table waitlist_signups enable row level security;

-- Allow inserts
create policy "Allow anonymous inserts"
  on waitlist_signups for insert
  to anon
  with check (true);

-- Allow select for verification
create policy "Allow anonymous select for verification"
  on waitlist_signups for select
  to anon
  using (true);

-- Allow update for verification
create policy "Allow anonymous update for verification"
  on waitlist_signups for update
  to anon
  using (true)
  with check (true);
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend
RESEND_API_KEY=re_your_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Production: NEXT_PUBLIC_APP_URL=https://instapi.app

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## SEO Implementation

- **Meta Tags**: Title, description, keywords, author
- **Open Graph**: Title, description, image, URL for social sharing
- **Twitter Cards**: Large image card for Twitter/X
- **Sitemap**: Dynamic sitemap.xml at /sitemap.xml
- **Robots.txt**: Allow all crawlers, reference sitemap
- **Favicon**: Logo as favicon and apple-touch-icon

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page with all sections |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/verified` | Email verification status page |
| `/not-found` | Custom 404 page |

---

## Success Metrics

- **Waitlist signups**: Total count
- **Conversion rate**: Visits → Signups
- **Language preferences**: Distribution to prioritize development
- **Email verification rate**: Signups → Verified
- **Bounce rate**: Via Google Analytics

---

## Deployment Checklist

- [ ] Set environment variables in Vercel
- [ ] Configure custom domain (instapi.app)
- [ ] Verify Resend domain for email delivery
- [ ] Run RLS policies in Supabase
- [ ] Test waitlist flow end-to-end
- [ ] Verify analytics tracking
- [ ] Test OG image on social platforms

---

*Last updated: January 2025*

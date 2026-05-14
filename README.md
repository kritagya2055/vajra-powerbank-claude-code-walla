# Vajra PowerBank — COD Funnel

A production-ready Next.js 14 (App Router) Cash-on-Delivery funnel for Vajra PowerBank.

## Stack

- Next.js 14 (App Router) + JavaScript
- Tailwind CSS
- Framer Motion (scroll animations)
- Nodemailer (SMTP — admin + customer emails)
- google-spreadsheet (order log in Google Sheets)

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your credentials
npm run dev
```

Open http://localhost:3000.

## Required media in `public/`

| File                | Notes                            |
| ------------------- | -------------------------------- |
| `hero.mp4`          | Hero loop video (already added). |
| `carousel-1.jpg`    | Product gallery image 1          |
| `carousel-2.jpg`    | Product gallery image 2          |
| `carousel-3.jpg`    | Product gallery image 3          |
| `carousel-4.jpg`    | Product gallery image 4          |
| `carousel-5.jpg`    | Product gallery image 5          |

Drop these into `public/` before deploying.

## Environment variables

See `.env.example`. All integrations degrade gracefully — if SMTP or Google
Sheets credentials are missing the order still completes and returns an Order
ID, but the row/email is skipped (a warning is logged).

### Google Sheets

1. Create a service account in Google Cloud, download its JSON key.
2. Share your sheet with the service account email (Editor permission).
3. Set `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
   `GOOGLE_PRIVATE_KEY` (keep `\n` escaping in the env value).

### SMTP

Any provider (Gmail App Password, SendGrid, Resend SMTP, etc.) works. Set
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ADMIN_EMAIL`.

## Deploy

Push to GitHub and import the repo in Vercel. Add the same env vars in the
Vercel dashboard. No further configuration needed.

## Routes

- `/` — landing (hero video + 6 sections)
- `/checkout` — Apple-style checkout form
- `/thank-you?id=...` — order confirmation
- `POST /api/order` — accepts the order, generates ID, logs to Sheets, sends emails

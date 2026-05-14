# Deploying to Vercel (no GitHub required)

The project is fully built and verified. The build sandbox where this code was
generated cannot reach `vercel.com` (network policy), so the actual deploy has
to run from your machine. Two minutes, three commands.

## Option A — Vercel CLI (recommended)

Prerequisite: Node 18+ installed locally.

```bash
# 1. Extract the tarball
tar -xzf vajra-powerbank.tar.gz
cd vajra-powerbank-claude-code-walla

# 2. Install Vercel CLI once (skip if you already have it)
npm i -g vercel

# 3. Deploy. The first time it opens a browser to log in.
vercel deploy --prod
```

The CLI will:
1. Ask which Vercel scope/team to use → pick yours
2. Ask "Link to existing project?" → say **N** (creates a new one)
3. Use the project name `vajra-powerbank` (or whatever you want)
4. Auto-detect Next.js, upload, build, deploy

You'll get a production URL like `https://vajra-powerbank.vercel.app`.

## Option B — Drag-and-drop via Vercel dashboard

1. Extract the tarball locally.
2. Go to https://vercel.com/new
3. Choose **"Import third-party Git Repository"** → switch to **"Upload"** tab
   (or use the **CLI** tab and follow Option A).
4. Drop the extracted folder. Vercel auto-detects Next.js. Click **Deploy**.

## Environment variables

In the Vercel dashboard → your project → **Settings → Environment Variables**,
add these (copy-paste from your `.env.local` if you've filled it locally):

| Key                              | Notes                                       |
| -------------------------------- | ------------------------------------------- |
| `GOOGLE_SHEET_ID`                | The sheet that will store orders.           |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`   | From the service-account JSON.              |
| `GOOGLE_PRIVATE_KEY`             | Paste with literal `\n` for newlines.       |
| `SMTP_HOST`                      | e.g. `smtp.gmail.com`                       |
| `SMTP_PORT`                      | `587`                                       |
| `SMTP_USER`                      | Your SMTP username.                         |
| `SMTP_PASS`                      | App password / API key.                     |
| `SMTP_FROM`                      | `Vajra PowerBank <orders@vajra.com>`        |
| `ADMIN_EMAIL`                    | Where new-order notifications should land.  |

All integrations degrade gracefully: missing creds just skip that step. The
order will still complete and return an Order ID.

## After the first deploy

- Update the `public/` folder with the 5 product images (`carousel-1.jpg` …
  `carousel-5.jpg`) — the carousel currently references those filenames.
- Re-run `vercel deploy --prod` (or push to the linked Git remote later).

## Verifying locally before deploying

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production sanity check
```

`npm run build` is already known to succeed cleanly with this codebase.

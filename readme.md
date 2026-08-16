# Super Kidzz

A single-vendor e-commerce web app for selling children's products, built with Next.js.

**Live:** [super-kidz-tau.vercel.app](https://super-kidz-tau.vercel.app)

## Features

- **Product Catalog** — browse children's toys and accessories
- **Shopping Cart** — add and manage items
- **Checkout** — cash on delivery or simulated online card payment (demo flow, no real payment gateway)
- **Order Invoices** — emailed invoice with a resend option, payment status included
- **User Accounts** — email/password and Google sign-in, order history, saved preferences
- **Product Reviews** — verified-purchaser ratings and comments, editable by their author
- **Admin Panel** — manage products, orders, users, and reviews at `/admin`
- **Route Protection** — proxy-based middleware enforcing auth and security headers
- **Responsive Design** — mobile-friendly interface

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS + daisyUI
- MongoDB (native driver)
- NextAuth for authentication (credentials + Google)
- Nodemailer for transactional email

## Prerequisites

- Node.js (LTS)
- A MongoDB database (local or hosted, e.g. MongoDB Atlas)
- A Google OAuth client (for Google sign-in)
- An SMTP-capable email account (for order invoice emails)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=your_database_name
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   NEXTAUTH_SECRET=a_random_secret_string
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_app_password
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                    | Description                              |
| --------------------------- | ----------------------------------------- |
| `npm run dev`                | Start the development server             |
| `npm run build`               | Build the app for production             |
| `npm run start`               | Start the production server              |
| `npm run lint`                | Run ESLint                               |
| `npm run admin:promote`       | Promote a user to admin (see below)       |


## Project Structure

```
src/
├── actions/       # Server actions
├── app/           # App Router routes (pages, admin, api, auth, etc.)
├── components/    # UI components (buttons, cards, layouts, pages, reviews, skeletons)
├── data/          # Static/seed data
├── fonts/         # Local font assets
├── lib/           # Shared utilities (db, auth, mail, etc.)
├── provider/      # React context providers
└── proxy.ts       # Route protection & security headers middleware
```

## Contributing

Follow existing code conventions and file structure when adding features. Keep changes scoped and avoid introducing new dependencies unless necessary.

## License

All rights reserved. This project and its assets are proprietary to Hero Kidzz.

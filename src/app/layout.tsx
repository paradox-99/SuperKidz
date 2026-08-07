import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const fontBangla = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

// Replace metadataBase with your real production origin.
const BASE_URL = 'https://super-kidz-tau.vercel.app';
const HOME_PREVIEW = 'https://ibb.co/Z62sBWxt';
const LOGO_IMAGE = 'https://ibb.co/Q7wfrxDD';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SuperKidz | Safe, Fun, and Educational Toys for Kids',
    template: '%s | SuperKidz'
  },
  description:
    'SuperKidz — safe, fun, and educational toys for curious kids. Hand-selected products, fast delivery, and playful learning tools for ages 0-10.',
  keywords: [
    'toys',
    'educational toys',
    'kids toys',
    'learning toys',
    'SuperKidz',
    'children gifts',
    'STEM toys',
    'puzzles',
    'building sets',
    'creative play',
    'safe toys',
    'fun toys',
    'playful learning',
    'toys for toddlers',
    'toys for preschoolers',
    'toys for school-age kids'
  ],
  authors: [
    { name: 'SuperKidz', url: BASE_URL },
    { name: 'SuperKidz Team' }
  ],
  creator: 'SuperKidz',
  publisher: 'SuperKidz',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  icons: {
    icon: LOGO_IMAGE,
    apple: LOGO_IMAGE,
    shortcut: LOGO_IMAGE
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'SuperKidz',
    title: 'SuperKidz | Safe, Fun, and Educational Toys for Kids',
    description:
      'SuperKidz — safe, fun, and educational toys for curious kids. Browse top picks and reliable favorites.',
    images: [
      {
        url: HOME_PREVIEW,
        alt: 'SuperKidz — Home preview',
        width: 1280,
        height: 720
      },
      {
        url: LOGO_IMAGE,
        alt: 'SuperKidz logo',
        width: 512,
        height: 512
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuperKidz | Safe, Fun, and Educational Toys for Kids',
    description:
      'SuperKidz — safe, fun, and educational toys for curious kids.',
    images: [HOME_PREVIEW],
    site: '@superkidz', // replace with your official handle
    creator: '@superkidz'
  },
  category: "E-commerce, Toys, Educational Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 w-full bg-base-100 shadow-sm">
          <Navbar />
        </header>
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-301px)]">{children}</main>
        <Footer />
      </body>

    </html>
  );
}

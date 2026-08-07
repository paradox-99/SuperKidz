import Banner from "@/components/pages/home/Banner";
import Products from "@/components/pages/home/Products";
import { Metadata } from "next";

const BASE_URL = 'https://super-kidz-tau.vercel.app';
const HOME_PREVIEW = 'https://i.ibb.co/TBWX4mtp/Screenshot-from-2026-08-06-23-26-21.png';

export const metadata: Metadata = {
  title: 'Playful toys that spark learning',
  description:
    'Discover smartly curated educational toys, safe materials, and joyful designs at SuperKidz.',
  openGraph: {
    title: 'SuperKidz - Toys that spark learning',
    description:
      'Discover smartly curated educational toys, safe materials, and joyful designs.',
    url: BASE_URL + '/',
    images: [
      {
        url: HOME_PREVIEW,
        alt: 'SuperKidz home preview',
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: [HOME_PREVIEW]
  }
};


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center space-y-20">
      <Banner />
      <Products />
    </div>
  );
}

import Banner from "@/components/pages/home/Banner";
import Features from "@/components/pages/home/Features";
import FeaturedProducts from "@/components/pages/home/FeaturedProducts";
import CtaBand from "@/components/pages/home/CtaBand";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

const BASE_URL = 'https://super-kidz-tau.vercel.app';
const HOME_PREVIEW = 'https://i.ibb.co/TBWX4mtp/Screenshot-from-2026-08-06-23-26-21.png';

export const metadata: Metadata = {
  title: 'SuperKidz - Playful toys that spark learning',
  description:
    'Discover smartly curated educational toys, safe materials, and joyful designs at SuperKidz. Shop now for playful learning tools for ages 0-10. Browse top picks and reliable favorites.',
  openGraph: {
    title: 'SuperKidz - Toys that spark learning',
    description:
      'Discover smartly curated educational toys, safe materials, and joyful designs. Shop now for playful learning tools for ages 0-10. Browse top picks and reliable favorites.',
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


export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col flex-1 items-center justify-center space-y-20">
      <Banner />
      <Features />
      <FeaturedProducts />
      <CtaBand />
    </div>
  );
}

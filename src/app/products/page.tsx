import type { Metadata } from 'next';
import Products from '@/components/pages/home/Products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://super-kidz-tau.vercel.app';
const PRODUCT_PREVIEW = 'https://i.ibb.co/0jBVmd7f/image.png';

export function productMetadata(product: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  price?: string;
}): Metadata {
  const title = product.title;
  const description =
    product.description ??
    `Buy ${product.title} — playful, safe, and made for curious kids. Shop now at SuperKidz.`;
  const url = `${BASE_URL}/products/${product.slug}`;
  const image = product.image ?? PRODUCT_PREVIEW;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'SuperKidz',
      images: [
        {
          url: image,
          alt: `${title} — SuperKidz product preview`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * JSON-LD generator for product pages — render this in the page via a <script type="application/ld+json"> tag.
 */
export function productJsonLd(product: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  price?: string;
}) {
  const url = `${BASE_URL}/products/${product.slug}`;
  const image = product.image ?? PRODUCT_PREVIEW;

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: [image],
    description: product.description ?? `Buy ${product.title} at SuperKidz.`,
    url,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        url,
        price: product.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

export const metadata: Metadata = {
  title: 'Products — SuperKidz',
  description: 'Browse our curated selection of safe, educational toys for kids.',
  openGraph: {
    title: 'Products — SuperKidz',
    description: 'Browse our curated selection of safe, educational toys for kids.',
    url: `${BASE_URL}/products`,
    siteName: 'SuperKidz',
    images: [
      {
        url: PRODUCT_PREVIEW,
        alt: 'Products preview — SuperKidz',
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [PRODUCT_PREVIEW],
  },
};

const page = () => {
  return (
    <div className="mt-10">
      <Products />
    </div>
  );
};

export default page;
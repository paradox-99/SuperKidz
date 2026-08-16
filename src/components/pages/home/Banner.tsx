import { fontBangla } from '@/app/layout';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiStar, FiTruck } from 'react-icons/fi';

const stats = [
      { label: 'Toys & Games', value: '500+' },
      { label: 'Happy Kids', value: '10k+' },
      { label: 'Parent Rating', value: '4.8/5' },
];

const Banner = () => {
      return (
            <div className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-rose-100 px-6 py-14 sm:px-10 md:py-20">
                  <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

                  <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-12 md:flex-row">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                              <span className="badge badge-lg border-0 bg-primary/10 px-4 py-3 font-semibold text-primary">
                                    🎉 Trusted by 10,000+ Parents
                              </span>

                              <h2 className={`${fontBangla.className} text-5xl font-bold leading-tight sm:text-6xl sm:leading-20`}>
                                    আপনার শিশুকে দিন একটি{" "}
                                    <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                                          সুন্দর ভবিষ্যত
                                    </span>
                              </h2>

                              <p className="text-lg text-base-content/70">
                                    Buy every toy with up to 15% discount — safe materials, joyful designs.
                              </p>

                              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
                                    <Link href="/products" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/30">
                                          Explore Products
                                          <FiArrowRight />
                                    </Link>
                                    <Link href="/about" className="btn btn-lg btn-ghost">
                                          Learn More
                                    </Link>
                              </div>

                              <div className="grid grid-cols-3 gap-4 border-t border-base-content/10 pt-6">
                                    {stats.map((stat) => (
                                          <div key={stat.label}>
                                                <p className="text-2xl font-extrabold text-primary sm:text-3xl">{stat.value}</p>
                                                <p className="text-xs text-base-content/60 sm:text-sm">{stat.label}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        <div className="relative flex-1">
                              <Image
                                    alt="Buy Every toy with up to 15% Discount"
                                    src={"/assets/hero.png"}
                                    width={500}
                                    height={400}
                                    preload
                                    unoptimized
                                    className="w-full max-w-md mx-auto drop-shadow-2xl"
                              />

                              <div className="absolute left-2 top-4 hidden items-center gap-2 rounded-2xl bg-base-100 px-4 py-3 shadow-xl sm:flex">
                                    <FiStar className="text-xl text-amber-500" />
                                    <div>
                                          <p className="text-sm font-bold leading-none">4.8 / 5</p>
                                          <p className="text-xs text-base-content/60">Parent Rating</p>
                                    </div>
                              </div>

                              <div className="absolute bottom-4 right-2 hidden items-center gap-2 rounded-2xl bg-base-100 px-4 py-3 shadow-xl sm:flex">
                                    <FiTruck className="text-xl text-primary" />
                                    <div>
                                          <p className="text-sm font-bold leading-none">Fast Delivery</p>
                                          <p className="text-xs text-base-content/60">Across the country</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Banner;

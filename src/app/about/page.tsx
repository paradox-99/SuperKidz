import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShield, FiSmile, FiStar, FiTruck, FiUsers } from "react-icons/fi";
import CtaBand from "@/components/pages/home/CtaBand";

export const metadata: Metadata = {
      title: "About Us",
      description:
            "Learn about SuperKidz — our mission to bring safe, joyful, and educational toys to kids everywhere.",
};

const stats = [
      { label: "Toys & Games", value: "500+" },
      { label: "Happy Kids", value: "10k+" },
      { label: "Parent Rating", value: "4.8/5" },
      { label: "Easy Returns", value: "7 days" },
];

const values = [
      {
            icon: FiShield,
            title: "Safety First",
            description: "Every toy is checked for non-toxic, child-safe materials before it reaches your door.",
      },
      {
            icon: FiSmile,
            title: "Joyful Learning",
            description: "We pick toys that turn playtime into a chance to learn, build, and imagine.",
      },
      {
            icon: FiUsers,
            title: "Trusted by Parents",
            description: "Thousands of families rely on SuperKidz for reliable picks and honest reviews.",
      },
      {
            icon: FiHeart,
            title: "Made with Care",
            description: "From packaging to delivery, we treat every order like it's for our own kids.",
      },
];

const AboutPage = () => {
      return (
            <div className="flex flex-col gap-20 pb-10">
                  <section className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-rose-100 px-6 py-14 sm:px-10 md:py-20">
                        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

                        <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-12 md:flex-row">
                              <div className="flex-1 space-y-6 text-center md:text-left">
                                    <span className="badge badge-lg border-0 bg-primary/10 px-4 py-3 font-semibold text-primary">
                                          Our Story
                                    </span>

                                    <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                                          Making Childhood a Little More{" "}
                                          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                                                Magical
                                          </span>
                                    </h1>

                                    <p className="text-lg text-base-content/70">
                                          SuperKidz started with a simple idea — every child deserves toys that are
                                          safe, fun, and built to spark curiosity. Today we help thousands of parents
                                          find the right toy for every age and stage.
                                    </p>

                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
                                          <Link href="/products" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/30">
                                                Explore Products
                                                <FiArrowRight />
                                          </Link>
                                          <Link href="/contact" className="btn btn-lg btn-ghost">
                                                Contact Us
                                          </Link>
                                    </div>
                              </div>

                              <div className="relative flex-1">
                                    <Image
                                          alt="SuperKidz — toys that spark learning"
                                          src="/assets/hero.png"
                                          width={500}
                                          height={400}
                                          unoptimized
                                          className="mx-auto w-full max-w-md drop-shadow-2xl"
                                    />

                                    <div className="absolute bottom-4 left-2 hidden items-center gap-2 rounded-2xl bg-base-100 px-4 py-3 shadow-xl sm:flex">
                                          <FiStar className="text-xl text-amber-500" />
                                          <div>
                                                <p className="text-sm font-bold leading-none">4.8 / 5</p>
                                                <p className="text-xs text-base-content/60">Parent Rating</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <section className="grid grid-cols-2 gap-6 rounded-4xl border border-base-200 bg-base-100 p-8 shadow-sm sm:grid-cols-4">
                        {stats.map((stat) => (
                              <div key={stat.label} className="text-center">
                                    <p className="text-3xl font-extrabold text-primary sm:text-4xl">{stat.value}</p>
                                    <p className="text-xs text-base-content/60 sm:text-sm">{stat.label}</p>
                              </div>
                        ))}
                  </section>

                  <section className="mx-auto max-w-3xl space-y-4 text-center">
                        <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                              Our Mission
                        </span>
                        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                              Play That Means Something
                        </h2>
                        <p className="text-base-content/70 md:text-lg">
                              We believe the best toys don&apos;t just entertain — they build confidence, spark
                              imagination, and bring families closer together. That&apos;s why every product on
                              SuperKidz is hand-picked, safety-checked, and backed by real parent feedback before it
                              ever reaches your cart.
                        </p>
                  </section>

                  <section className="space-y-10">
                        <div className="mx-auto max-w-2xl space-y-4 text-center">
                              <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                                    What We Stand For
                              </span>
                              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                                    Our Values
                              </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                              {values.map(({ icon: Icon, title, description }) => (
                                    <div
                                          key={title}
                                          className="flex items-start gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                                                <Icon />
                                          </span>
                                          <div>
                                                <h3 className="font-bold text-base-content">{title}</h3>
                                                <p className="text-sm text-base-content/60">{description}</p>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </section>

                  <section className="grid gap-8 rounded-4xl bg-base-200/60 p-8 sm:grid-cols-2 sm:p-10">
                        <div className="flex items-start gap-4">
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                                    <FiTruck />
                              </span>
                              <div>
                                    <h3 className="font-bold text-base-content">Fast, Reliable Delivery</h3>
                                    <p className="mt-1 text-sm text-base-content/60">
                                          We pack every order with care and ship it straight to your doorstep,
                                          nationwide.
                                    </p>
                              </div>
                        </div>
                        <div className="flex items-start gap-4">
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                                    <FiUsers />
                              </span>
                              <div>
                                    <h3 className="font-bold text-base-content">A Growing Community</h3>
                                    <p className="mt-1 text-sm text-base-content/60">
                                          From first-time parents to grandparents, SuperKidz is trusted by families
                                          who want the best for their kids.
                                    </p>
                              </div>
                        </div>
                  </section>

                  <CtaBand />
            </div>
      );
};

export default AboutPage;

import { Metadata } from "next";
import Link from "next/link";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactForm from "@/components/pages/contact/ContactForm";

export const metadata: Metadata = {
      title: "Contact Us",
      description:
            "Get in touch with the SuperKidz team — we're happy to help with orders, products, or anything else.",
};

const contactDetails = [
      {
            icon: FiMail,
            title: "Email Us",
            lines: ["support@superkidz.com"],
            href: "mailto:support@superkidz.com",
      },
      {
            icon: FiPhone,
            title: "Call Us",
            lines: ["+880 1234-567890"],
            href: "tel:+8801234567890",
      },
      {
            icon: FiMapPin,
            title: "Visit Us",
            lines: ["House 12, Road 5, Banani", "Dhaka, Bangladesh"],
      },
      {
            icon: FiClock,
            title: "Working Hours",
            lines: ["Sat – Thu: 9am – 8pm", "Friday: Closed"],
      },
];

const ContactPage = () => {
      return (
            <div className="flex flex-col gap-16 pb-10">
                  <section className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-rose-100 px-6 py-14 text-center sm:px-10 md:py-20">
                        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

                        <div className="relative mx-auto max-w-2xl space-y-4">
                              <span className="badge badge-lg border-0 bg-primary/10 px-4 py-3 font-semibold text-primary">
                                    Get In Touch
                              </span>
                              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                                    We&apos;d Love to Hear From You
                              </h1>
                              <p className="text-base-content/70 md:text-lg">
                                    Questions about an order, a product, or just want to say hi? Our team usually
                                    replies within one business day.
                              </p>
                        </div>
                  </section>

                  <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {contactDetails.map(({ icon: Icon, title, lines, href }) => {
                              const content = (
                                    <>
                                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
                                                <Icon />
                                          </span>
                                          <div>
                                                <h3 className="font-bold text-base-content">{title}</h3>
                                                {lines.map((line) => (
                                                      <p key={line} className="text-sm text-base-content/60">
                                                            {line}
                                                      </p>
                                                ))}
                                          </div>
                                    </>
                              );

                              const className =
                                    "flex items-start gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg";

                              return href ? (
                                    <a key={title} href={href} className={className}>
                                          {content}
                                    </a>
                              ) : (
                                    <div key={title} className={className}>
                                          {content}
                                    </div>
                              );
                        })}
                  </section>

                  <section className="grid gap-10 lg:grid-cols-5 lg:items-start">
                        <div className="space-y-4 lg:col-span-2">
                              <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                                    FAQ
                              </span>
                              <h2 className="text-3xl font-black tracking-tight">
                                    Before you reach out
                              </h2>
                              <div className="space-y-3">
                                    <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                                          <h3 className="font-bold text-base-content">Where&apos;s my order?</h3>
                                          <p className="mt-1 text-sm text-base-content/60">
                                                Track it anytime from your{" "}
                                                <Link href="/orders" className="link link-primary">
                                                      Orders
                                                </Link>{" "}
                                                page — no need to email us for a status update.
                                          </p>
                                    </div>
                                    <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                                          <h3 className="font-bold text-base-content">Can I return a toy?</h3>
                                          <p className="mt-1 text-sm text-base-content/60">
                                                Yes — we offer a hassle-free 7-day return window on all products.
                                          </p>
                                    </div>
                                    <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                                          <h3 className="font-bold text-base-content">Bulk or school orders?</h3>
                                          <p className="mt-1 text-sm text-base-content/60">
                                                Send us a message below with your requirements and we&apos;ll get back
                                                with a quote.
                                          </p>
                                    </div>
                              </div>
                        </div>

                        <div className="lg:col-span-3">
                              <ContactForm />
                        </div>
                  </section>
            </div>
      );
};

export default ContactPage;

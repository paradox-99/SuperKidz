import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CtaBand = () => {
      return (
            <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-accent px-6 py-14 text-center text-primary-content sm:px-10">
                  <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative mx-auto max-w-2xl space-y-5">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                              Give your child a joyful way to learn
                        </h2>
                        <p className="text-primary-content/80">
                              Join thousands of parents who trust SuperKidz for safe, educational, and fun toys.
                        </p>
                        <Link href="/products" className="btn btn-lg gap-2 border-0 bg-base-100 text-primary hover:bg-base-200">
                              Shop All Toys
                              <FiArrowRight />
                        </Link>
                  </div>
            </section>
      );
};

export default CtaBand;

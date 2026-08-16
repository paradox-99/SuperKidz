import { FiSearch, FiShoppingCart, FiTruck, FiSmile } from "react-icons/fi";

const steps = [
      {
            icon: FiSearch,
            title: "Browse & Choose",
            description: "Explore our curated toys by rating, price, or popularity.",
      },
      {
            icon: FiShoppingCart,
            title: "Add to Cart",
            description: "Pick your favorites and review them in your cart anytime.",
      },
      {
            icon: FiTruck,
            title: "Fast Delivery",
            description: "We pack and ship your order straight to your doorstep.",
      },
      {
            icon: FiSmile,
            title: "Enjoy Playing",
            description: "Watch your kid learn and play safely with every toy.",
      },
];

const HowItWorks = () => {
      return (
            <section className="w-full space-y-10">
                  <div className="mx-auto max-w-2xl space-y-4 text-center">
                        <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                              How It Works
                        </span>
                        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                              Shopping Made Simple
                        </h2>
                        <p className="text-base-content/70 md:text-lg">
                              From browsing to unboxing, here&apos;s how SuperKidz gets toys to your door.
                        </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map(({ icon: Icon, title, description }, index) => (
                              <div key={title} className="relative flex flex-col items-center gap-3 text-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary">
                                          <Icon />
                                    </span>
                                    <span className="absolute -top-2 right-1/3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content sm:right-1/4">
                                          {index + 1}
                                    </span>
                                    <h3 className="font-bold text-base-content">{title}</h3>
                                    <p className="text-sm text-base-content/60">{description}</p>
                              </div>
                        ))}
                  </div>
            </section>
      );
};

export default HowItWorks;

import { FiShield, FiTruck, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const features = [
      {
            icon: FiShield,
            title: "Safe & Certified",
            description: "Non-toxic, child-safe materials in every toy.",
      },
      {
            icon: FiTruck,
            title: "Fast Delivery",
            description: "Quick doorstep delivery across the country.",
      },
      {
            icon: FiRefreshCw,
            title: "Easy Returns",
            description: "Hassle-free 7-day return policy.",
      },
      {
            icon: FiHeadphones,
            title: "24/7 Support",
            description: "We're here to help whenever you need us.",
      },
];

const Features = () => {
      return (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {features.map(({ icon: Icon, title, description }) => (
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
            </section>
      );
};

export default Features;

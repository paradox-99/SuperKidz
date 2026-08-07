import Link from "next/link";

const Logo = () => {
      return (
            <Link href="/" className="flex items-center gap-2">
                  <img
                        src="/assets/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="h-12 w-auto"
                  />
                  <h2 className="text-xl font-bold">Super <span className="text-primary">Kidz</span></h2>
            </Link>
      );
};

export default Logo;
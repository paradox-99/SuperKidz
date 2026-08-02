import Image from "next/image";
import Link from "next/link";

const Logo = () => {
      return (
            <Link href="/" className="flex items-center gap-2">
                  <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                  />
                  <h2 className="text-xl font-bold">Super <span className="text-primary">Kidz</span></h2>
            </Link>
      );
};

export default Logo;
'use client';
import { usePathname } from "next/navigation"
import Link from "next/dist/client/link";

interface NavButtonProps {
      href: string;
      children: React.ReactNode;
}

const NavButton = ({href, children}: NavButtonProps) => {
      const path = usePathname();

      return (
            <Link href={href} className={`${path === href && 'text-primary' } font-medium`}>
                  {children}
            </Link>
      );
};

export default NavButton;
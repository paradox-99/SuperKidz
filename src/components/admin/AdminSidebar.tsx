'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBox, FiGrid, FiPackage, FiStar, FiUsers } from "react-icons/fi";

const links = [
      { href: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
      { href: "/admin/products", label: "Products", icon: FiBox, exact: false },
      { href: "/admin/orders", label: "Orders", icon: FiPackage, exact: false },
      { href: "/admin/users", label: "Users", icon: FiUsers, exact: false },
      { href: "/admin/reviews", label: "Reviews", icon: FiStar, exact: false },
];

const AdminSidebar = () => {
      const pathname = usePathname();

      return (
            <nav className="flex gap-2 overflow-x-auto rounded-3xl border border-base-200 bg-base-100 p-3 shadow-sm lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible">
                  {links.map(({ href, label, icon: Icon, exact }) => {
                        const isActive = exact ? pathname === href : pathname.startsWith(href);

                        return (
                              <Link
                                    key={href}
                                    href={href}
                                    className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${isActive
                                          ? "bg-primary text-primary-content"
                                          : "text-base-content/70 hover:bg-base-200"
                                          }`}
                              >
                                    <Icon /> {label}
                              </Link>
                        );
                  })}
            </nav>
      );
};

export default AdminSidebar;

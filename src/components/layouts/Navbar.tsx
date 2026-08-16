import Link from "next/link";
import NavButton from "../buttons/NavButton";
import Logo from "./Logo";
import { FiShield, FiShoppingCart } from "react-icons/fi";
import AuthButton from "../buttons/AuthButton";
import { getCartItemCountByUserId } from "@/actions/server/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface NavigationProps {
      title?: string;
      url?: string;
}


const Navbar = async () => {

      const session = await getServerSession(authOptions);
      const cartItemCount = session?.user?.id ? await getCartItemCountByUserId(session.user.id) : 0;

      const navigation: NavigationProps[] = [
            { title: "Home", url: "/" },
            { title: "Products", url: "/products" },
            { title: "About", url: "/about" },
            { title: "Contact", url: "/contact" },
      ];

      return (
            <div className="navbar bg-base-100 shadow-sm">
                  <div className="navbar-start">
                        <div className="dropdown">
                              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                              </div>
                              <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {navigation.map((item, index) => (
                                          <NavButton key={index} href={item.url || "#"}>
                                                {item.title}
                                          </NavButton>
                                    ))}
                              </ul>
                        </div>
                        <Logo />
                  </div>
                  <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-3">
                              {navigation.map((item, index) => (
                                    <li key={index}>
                                          <NavButton href={item.url || "#"}>
                                                {item.title}
                                          </NavButton>
                                    </li>
                              ))}
                        </ul>
                  </div>
                  <div className="navbar-end">
                        {session?.user?.role === "admin" ? (
                              <div className="btn btn-sm btn-ghost mr-2">
                                    <Link href="/admin" className="flex items-center gap-1.5">
                                          <FiShield /> Admin
                                    </Link>
                              </div>
                        ) : null}
                        <div className="indicator mr-10">
                              {
                                    cartItemCount > 0 && <span className="indicator-item py-0.5 px-2 rounded-full status-success text-white text-[8px]">{cartItemCount}</span>
                              }
                              <div className="btn btn-sm"><Link href='cart' className=""><FiShoppingCart /></Link></div>
                        </div>
                        <AuthButton />
                  </div>
            </div>
      );
};

export default Navbar;
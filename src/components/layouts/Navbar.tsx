import Link from "next/link";
import NavButton from "../buttons/NavButton";
import Logo from "./Logo";
import { FiShoppingCart } from "react-icons/fi";

interface NavigationProps {
      title?: string;
      url?: string;
}


const Navbar = () => {

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
                        <Link href = 'cart' className="btn btn-ghost mx-4"><FiShoppingCart /></Link>
                        <Link href="/login" className="btn btn-primary">Login</Link>
                  </div>
            </div>
      );
};

export default Navbar;
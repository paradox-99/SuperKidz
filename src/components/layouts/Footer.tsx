import Link from "next/link";


const Footer = () => {
      return (
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                  <aside>
                        <Link href="/" className="flex flex-col items-center gap-2">
                              <img
                                    src="/assets/logo.png"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="h-12 w-auto"
                              />
                              <h2 className="text-xl font-bold">Super <span className="text-primary">Kidz</span></h2>
                        </Link>
                        <p>
                              Super Kidz Ltd. <br />
                              <br />
                              Providing reliable tech since 1992
                        </p>
                  </aside>
                  <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                  </nav>
                  <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                  </nav>
                  <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                  </nav>
            </footer>
      );
};

export default Footer;
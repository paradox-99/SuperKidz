import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const SignupPage = () => {
      return (
            <section className="flex min-h-[90vh] items-center justify-center px-4 py-10">
                  <div className="w-full max-w-5xl overflow-hidden rounded-4xl border border-base-200 bg-base-100 shadow-2xl">
                        <div className="grid lg:grid-cols-2">
                              <div className="bg-linear-to-br from-primary to-secondary p-8 text-primary-content md:p-10 lg:p-12">
                                    <div className="flex h-full flex-col justify-between">
                                          <div>
                                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] opacity-80">
                                                      Welcome aboard
                                                </p>
                                                <h1 className="text-3xl font-black leading-tight md:text-4xl">
                                                      Create your SuperKidz account
                                                </h1>
                                                <p className="mt-4 max-w-md text-base opacity-90">
                                                      Join thousands of parents and kids discovering joyful, educational toys.
                                                </p>
                                          </div>

                                          <div className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                                                <p className="text-sm font-semibold">Why sign up?</p>
                                                <ul className="mt-3 space-y-2 text-sm opacity-90">
                                                      <li>• Save favorites and wishlist items</li>
                                                      <li>• Get updates on new toy arrivals</li>
                                                      <li>• Enjoy a smoother shopping experience</li>
                                                </ul>
                                          </div>
                                    </div>
                              </div>

                              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                                    <div className="mx-auto max-w-md">
                                          <div className="mb-8 text-center lg:text-left">
                                                <h2 className="text-2xl font-black">Sign up</h2>
                                                <p className="mt-2 text-sm text-base-content/70">
                                                      Fill in your details to get started.
                                                </p>
                                          </div>

                                          <form className="space-y-4">
                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiUser className="text-base-content/60" />
                                                      <input type="text" className="grow" placeholder="Full name" />
                                                </label>

                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiMail className="text-base-content/60" />
                                                      <input type="email" className="grow" placeholder="Email address" />
                                                </label>

                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiLock className="text-base-content/60" />
                                                      <input type="password" className="grow" placeholder="Password" />
                                                </label>

                                                <button type="submit" className="btn btn-primary w-full">
                                                      Create account
                                                </button>
                                          </form>

                                          <div className="my-6 flex items-center gap-3">
                                                <div className="h-px flex-1 bg-base-300" />
                                                <span className="text-sm text-base-content/60">or</span>
                                                <div className="h-px flex-1 bg-base-300" />
                                          </div>

                                          <button className="btn btn-outline w-full">
                                                <FcGoogle className="text-lg" />
                                                Sign up with Google
                                          </button>

                                          <p className="mt-6 text-center text-sm text-base-content/70">
                                                Already have an account?{' '}
                                                <Link href="/signin" className="font-semibold text-primary hover:underline">
                                                      Sign in
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default SignupPage;
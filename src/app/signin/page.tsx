import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";

const SigninPage = () => {
      return (
            <section className="flex min-h-[90vh] items-center justify-center px-4 py-10">
                  <div className="w-full max-w-5xl overflow-hidden rounded-4xl border border-base-200 bg-base-100 shadow-2xl">
                        <div className="grid lg:grid-cols-2">
                              <div className="bg-linear-to-br from-primary to-secondary p-8 text-primary-content md:p-10 lg:p-12">
                                    <div className="flex h-full flex-col justify-between">
                                          <div>
                                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] opacity-80">
                                                      Welcome back
                                                </p>
                                                <h1 className="text-3xl font-black leading-tight md:text-4xl">
                                                      Sign in to your SuperKidz account
                                                </h1>
                                                <p className="mt-4 max-w-md text-base opacity-90">
                                                      Continue exploring educational toys and fun learning essentials for your child.
                                                </p>
                                          </div>

                                          <div className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                                                <p className="text-sm font-semibold">What you can do</p>
                                                <ul className="mt-3 space-y-2 text-sm opacity-90">
                                                      <li>• Track your favorite picks</li>
                                                      <li>• Review product details quickly</li>
                                                      <li>• Stay updated on new arrivals</li>
                                                </ul>
                                          </div>
                                    </div>
                              </div>

                              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                                    <div className="mx-auto max-w-md">
                                          <div className="mb-8 text-center lg:text-left">
                                                <h2 className="text-2xl font-black">Sign in</h2>
                                                <p className="mt-2 text-sm text-base-content/70">
                                                      Use your email and password to continue.
                                                </p>
                                          </div>

                                          <form className="space-y-4">
                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiMail className="text-base-content/60" />
                                                      <input type="email" className="grow" placeholder="Email address" />
                                                </label>

                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiLock className="text-base-content/60" />
                                                      <input type="password" className="grow" placeholder="Password" />
                                                </label>

                                                <button type="submit" className="btn btn-primary w-full">
                                                      Sign in
                                                </button>
                                          </form>

                                          <div className="my-6 flex items-center gap-3">
                                                <div className="h-px flex-1 bg-base-300" />
                                                <span className="text-sm text-base-content/60">or</span>
                                                <div className="h-px flex-1 bg-base-300" />
                                          </div>

                                          <button className="btn btn-outline w-full">
                                                <FcGoogle className="text-lg" />
                                                Sign in with Google
                                          </button>

                                          <p className="mt-6 text-center text-sm text-base-content/70">
                                                Don&apos;t have an account?{' '}
                                                <Link href="/signup" className="font-semibold text-primary hover:underline">
                                                      Sign up
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default SigninPage;
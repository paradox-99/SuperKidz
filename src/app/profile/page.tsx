import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { FaUser } from "react-icons/fa";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCurrentUser } from "@/actions/server/auth";
import { getOrdersByUserId } from "@/actions/server/order";

export const metadata: Metadata = {
      title: "My Profile",
      description: "View your SuperKidz account details and order history.",
};

const paymentStatusBadgeClass: Record<"unpaid" | "paid" | "failed", string> = {
      unpaid: "badge-warning",
      paid: "badge-success",
      failed: "badge-error",
};

const ProfilePage = async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
            redirect("/signin");
      }

      const [user, orders] = await Promise.all([
            getCurrentUser(),
            getOrdersByUserId(session.user.id),
      ]);

      return (
            <section className="space-y-6 py-6 md:py-10">
                  <div className="flex flex-col items-center gap-4 rounded-4xl border border-base-200 bg-base-100 p-8 text-center shadow-lg sm:flex-row sm:text-left">
                        {user.image ? (
                              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                                    <Image src={user.image} alt={user.name} fill sizes="80px" unoptimized className="object-cover" />
                              </div>
                        ) : (
                              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-3xl text-primary-content">
                                    <FaUser />
                              </div>
                        )}
                        <div className="space-y-1">
                              <h1 className="text-2xl font-black md:text-3xl">{user.name}</h1>
                              <p className="text-base-content/70">{user.email}</p>
                              <p className="text-sm text-base-content/50">
                                    Member since {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                              </p>
                        </div>
                  </div>

                  <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                        <div className="mb-5 flex items-center gap-2">
                              <FiPackage className="text-xl text-primary" />
                              <h2 className="text-lg font-bold">Order History</h2>
                        </div>

                        {orders.length === 0 ? (
                              <div className="flex flex-col items-center gap-4 py-12 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-3xl text-base-content/40">
                                          <FiShoppingBag />
                                    </div>
                                    <div className="space-y-1">
                                          <p className="font-semibold">No orders yet</p>
                                          <p className="text-sm text-base-content/60">Your past orders will show up here.</p>
                                    </div>
                                    <Link href="/products" className="btn btn-primary btn-sm">
                                          Start shopping
                                    </Link>
                              </div>
                        ) : (
                              <div className="space-y-4">
                                    {orders.map((order) => (
                                          <Link
                                                key={order._id}
                                                href={`/orders/${order._id}`}
                                                className="flex flex-col gap-3 rounded-3xl border border-base-200 p-4 transition hover:border-primary/40 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                          >
                                                <div>
                                                      <p className="font-bold">Order #{order._id.slice(-8).toUpperCase()}</p>
                                                      <p className="text-sm text-base-content/60">
                                                            {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                                            {" · "}
                                                            {order.items.length} item{order.items.length === 1 ? "" : "s"}
                                                      </p>
                                                </div>
                                                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                                                      <div className="flex gap-2">
                                                            <span className="badge badge-outline capitalize">{order.status}</span>
                                                            <span className={`badge capitalize ${paymentStatusBadgeClass[order.paymentStatus]}`}>
                                                                  {order.paymentStatus}
                                                            </span>
                                                      </div>
                                                      <p className="font-bold text-primary">৳{order.total.toFixed(2)}</p>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        )}
                  </div>
            </section>
      );
};

export default ProfilePage;

import Link from "next/link";
import type { Metadata } from "next";
import { FiBox, FiDollarSign, FiPackage, FiStar, FiUsers } from "react-icons/fi";
import { getAdminStats } from "@/actions/server/adminStats";

export const metadata: Metadata = {
      title: "Admin Dashboard",
};

const paymentStatusBadgeClass: Record<string, string> = {
      unpaid: "badge-warning",
      paid: "badge-success",
      failed: "badge-error",
};

const AdminDashboardPage = async () => {
      const stats = await getAdminStats();

      const cards = [
            { label: "Total orders", value: stats.orderCount, icon: FiPackage },
            { label: "Revenue (paid)", value: `৳${stats.revenue.toFixed(2)}`, icon: FiDollarSign },
            { label: "Unpaid orders", value: stats.unpaidOrderCount, icon: FiDollarSign },
            { label: "Products", value: stats.productCount, icon: FiBox },
            { label: "Users", value: stats.userCount, icon: FiUsers },
            { label: "Reviews", value: stats.reviewCount, icon: FiStar },
      ];

      return (
            <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map(({ label, value, icon: Icon }) => (
                              <div key={label} className="flex items-center gap-4 rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-xl text-primary">
                                          <Icon />
                                    </div>
                                    <div>
                                          <p className="text-xs uppercase tracking-wide text-base-content/50">{label}</p>
                                          <p className="text-2xl font-black">{value}</p>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                        <h2 className="mb-4 text-lg font-bold">Recent orders</h2>
                        {stats.recentOrders.length === 0 ? (
                              <p className="text-sm text-base-content/60">No orders yet.</p>
                        ) : (
                              <div className="space-y-3">
                                    {stats.recentOrders.map((order) => (
                                          <Link
                                                key={order._id}
                                                href={`/admin/orders/${order._id}`}
                                                className="flex flex-col gap-2 rounded-2xl border border-base-200 p-4 transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                                          >
                                                <div>
                                                      <p className="font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                                                      <p className="text-sm text-base-content/60">{order.customerName}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                      <span className="badge badge-outline capitalize">{order.status}</span>
                                                      <span className={`badge capitalize ${paymentStatusBadgeClass[order.paymentStatus] ?? ""}`}>
                                                            {order.paymentStatus}
                                                      </span>
                                                      <span className="font-bold text-primary">৳{order.total.toFixed(2)}</span>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default AdminDashboardPage;

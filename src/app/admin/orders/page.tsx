import Link from "next/link";
import type { Metadata } from "next";
import { getAllOrders } from "@/actions/server/order";

export const metadata: Metadata = {
      title: "Admin · Orders",
};

const paymentStatusBadgeClass: Record<string, string> = {
      unpaid: "badge-warning",
      paid: "badge-success",
      failed: "badge-error",
};

const AdminOrdersPage = async () => {
      const orders = await getAllOrders();

      return (
            <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <h2 className="mb-5 text-lg font-bold">Orders ({orders.length})</h2>

                  {orders.length === 0 ? (
                        <p className="text-sm text-base-content/60">No orders yet.</p>
                  ) : (
                        <div className="overflow-x-auto">
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th>Order</th>
                                                <th>Customer</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Payment</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {orders.map((order) => (
                                                <tr key={order._id} className="hover cursor-pointer">
                                                      <td>
                                                            <Link href={`/admin/orders/${order._id}`} className="link link-primary font-semibold">
                                                                  #{order._id.slice(-8).toUpperCase()}
                                                            </Link>
                                                            <p className="text-xs text-base-content/50">
                                                                  {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                            </p>
                                                      </td>
                                                      <td>
                                                            <p className="font-medium">{order.customerName}</p>
                                                            <p className="text-xs text-base-content/50">{order.customerEmail}</p>
                                                      </td>
                                                      <td>{order.items.length}</td>
                                                      <td className="font-bold text-primary">৳{order.total.toFixed(2)}</td>
                                                      <td>
                                                            <span className="badge badge-outline capitalize">{order.status}</span>
                                                      </td>
                                                      <td>
                                                            <span className={`badge capitalize ${paymentStatusBadgeClass[order.paymentStatus] ?? ""}`}>
                                                                  {order.paymentStatus}
                                                            </span>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default AdminOrdersPage;

import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOrderByIdForAdmin } from "@/actions/server/order";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

export const metadata: Metadata = {
      title: "Admin · Order Details",
};

const paymentMethodLabel: Record<string, string> = {
      cod: "Cash on delivery",
      card: "Card (Demo)",
};

const paymentStatusBadgeClass: Record<string, string> = {
      unpaid: "badge-warning",
      paid: "badge-success",
      failed: "badge-error",
};

type AdminOrderDetailProps = {
      params: Promise<{ id: string }>;
};

const AdminOrderDetailPage = async ({ params }: AdminOrderDetailProps) => {
      const { id } = await params;
      const order = await getOrderByIdForAdmin(id).catch(() => null);

      if (!order) {
            notFound();
      }

      return (
            <div className="space-y-6">
                  <div>
                        <h2 className="text-lg font-bold">Order #{order._id.slice(-8).toUpperCase()}</h2>
                        <p className="text-sm text-base-content/60">
                              {order.customerName} · {order.customerEmail}
                        </p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                        <div className="space-y-4 lg:col-span-2">
                              {order.items.map((item, index) => (
                                    <div
                                          key={`${item.productId}-${index}`}
                                          className="flex items-center gap-4 rounded-3xl border border-base-200 bg-base-100 p-4 shadow-sm"
                                    >
                                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 via-orange-50 to-rose-100">
                                                <Image src={item.image} alt={item.name} fill sizes="64px" unoptimized className="object-cover" />
                                          </div>
                                          <div className="flex flex-1 flex-col gap-1">
                                                <p className="font-bold leading-snug">{item.name}</p>
                                                <p className="text-sm text-base-content/60">
                                                      ৳{item.price.toFixed(2)} × {item.quantity}
                                                </p>
                                          </div>
                                          <p className="font-bold text-primary">৳{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                              ))}

                              <div className="rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                    <h3 className="mb-2 text-sm font-bold">Shipping to</h3>
                                    <p className="font-semibold">{order.shippingInfo.fullName}</p>
                                    <p className="text-sm text-base-content/70">{order.shippingInfo.phone}</p>
                                    <p className="text-sm text-base-content/70">
                                          {order.shippingInfo.address}, {order.shippingInfo.city}
                                    </p>
                                    {order.shippingInfo.notes ? (
                                          <p className="mt-2 text-sm italic text-base-content/60">“{order.shippingInfo.notes}”</p>
                                    ) : null}
                              </div>
                        </div>

                        <aside className="space-y-5">
                              <div className="space-y-3 rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                    <div className="flex justify-between text-sm text-base-content/70">
                                          <span>Payment method</span>
                                          <span className="font-semibold text-base-content">
                                                {paymentMethodLabel[order.paymentMethod] ?? order.paymentMethod}
                                          </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-base-content/70">
                                          <span>Payment status</span>
                                          <span className={`badge capitalize ${paymentStatusBadgeClass[order.paymentStatus] ?? ""}`}>
                                                {order.paymentStatus}
                                          </span>
                                    </div>
                                    {order.transactionId ? (
                                          <div className="flex items-center justify-between text-sm text-base-content/70">
                                                <span>Transaction ID</span>
                                                <span className="font-mono text-xs">{order.transactionId}</span>
                                          </div>
                                    ) : null}
                                    <div className="flex justify-between border-t border-base-200 pt-3 text-lg font-black">
                                          <span>Total</span>
                                          <span className="text-primary">৳{order.total.toFixed(2)}</span>
                                    </div>
                              </div>

                              <OrderStatusForm orderId={order._id} status={order.status} paymentStatus={order.paymentStatus} />
                        </aside>
                  </div>
            </div>
      );
};

export default AdminOrderDetailPage;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FiCheckCircle } from "react-icons/fi";
import { getOrderById } from "@/actions/server/order";
import ResendInvoiceButton from "@/components/buttons/ResendInvoiceButton";

const paymentMethodLabel: Record<"cod" | "card", string> = {
      cod: "Cash on delivery",
      card: "Card (Demo)",
};

const paymentStatusBadgeClass: Record<"unpaid" | "paid" | "failed", string> = {
      unpaid: "badge-warning",
      paid: "badge-success",
      failed: "badge-error",
};

type OrderConfirmationProps = {
      params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
      title: "Order Confirmation",
      description: "Your SuperKidz order has been placed.",
};

const OrderConfirmationPage = async ({ params }: OrderConfirmationProps) => {
      const { id } = await params;

      const order = await getOrderById(id).catch(() => null);

      if (!order) {
            notFound();
      }

      return (
            <section className="space-y-6 py-6 md:py-10">
                  <div className="flex flex-col items-center gap-3 rounded-4xl border border-base-200 bg-base-100 p-8 text-center shadow-lg">
                        <FiCheckCircle className="text-5xl text-success" />
                        <h1 className="text-2xl font-black md:text-3xl">Order placed successfully!</h1>
                        <p className="text-base-content/70">
                              Order #{order._id.slice(-8).toUpperCase()} · {order.status}
                        </p>
                        <div className="flex flex-col items-center gap-2 pt-1">
                              <p className="text-sm text-base-content/60">An invoice has been emailed to you.</p>
                              <ResendInvoiceButton orderId={order._id} />
                        </div>
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
                        </div>

                        <aside className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg">
                              <div>
                                    <h2 className="mb-2 text-lg font-bold">Shipping to</h2>
                                    <p className="font-semibold">{order.shippingInfo.fullName}</p>
                                    <p className="text-sm text-base-content/70">{order.shippingInfo.phone}</p>
                                    <p className="text-sm text-base-content/70">
                                          {order.shippingInfo.address}, {order.shippingInfo.city}
                                    </p>
                                    {order.shippingInfo.notes ? (
                                          <p className="mt-2 text-sm italic text-base-content/60">
                                                “{order.shippingInfo.notes}”
                                          </p>
                                    ) : null}
                              </div>

                              <div className="flex justify-between border-t border-base-200 pt-4 text-sm text-base-content/70">
                                    <span>Payment</span>
                                    <span className="font-semibold text-base-content">
                                          {paymentMethodLabel[order.paymentMethod]}
                                    </span>
                              </div>

                              <div className="flex items-center justify-between text-sm text-base-content/70">
                                    <span>Payment status</span>
                                    <span className={`badge capitalize ${paymentStatusBadgeClass[order.paymentStatus]}`}>
                                          {order.paymentStatus}
                                    </span>
                              </div>

                              {order.transactionId ? (
                                    <div className="flex items-center justify-between text-sm text-base-content/70">
                                          <span>Transaction ID</span>
                                          <span className="font-mono text-xs">{order.transactionId}</span>
                                    </div>
                              ) : null}

                              <div className="flex justify-between border-t border-base-200 pt-4 text-lg font-black">
                                    <span>Total</span>
                                    <span className="text-primary">৳{order.total.toFixed(2)}</span>
                              </div>
                        </aside>
                  </div>

                  <div className="flex justify-center">
                        <Link href="/products" className="btn btn-primary">
                              Continue shopping
                        </Link>
                  </div>
            </section>
      );
};

export default OrderConfirmationPage;

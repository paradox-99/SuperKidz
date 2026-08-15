'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FiHome, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { createOrder } from "@/actions/server/order";

export interface CheckoutItem {
      id: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
}

const CheckoutForm = ({ items, subtotal }: { items: CheckoutItem[]; subtotal: number }) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;

            const shippingInfo = {
                  fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
                  phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
                  address: (form.elements.namedItem("address") as HTMLInputElement).value,
                  city: (form.elements.namedItem("city") as HTMLInputElement).value,
                  notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
            };

            startTransition(async () => {
                  try {
                        const result = await createOrder(shippingInfo);
                        toast.success("Order placed successfully!");
                        router.push(`/orders/${result.orderId}`);
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Failed to place order");
                  }
            });
      };

      return (
            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3 lg:items-start">
                  <div className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg lg:col-span-2">
                        <h2 className="text-lg font-bold">Shipping details</h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                              <label className="input input-bordered flex items-center gap-2">
                                    <FiUser className="text-base-content/60" />
                                    <input required name="fullName" placeholder="Full name" className="grow" />
                              </label>

                              <label className="input input-bordered flex items-center gap-2">
                                    <FiPhone className="text-base-content/60" />
                                    <input required name="phone" type="tel" placeholder="Phone number" className="grow" />
                              </label>

                              <label className="input input-bordered flex items-center gap-2 sm:col-span-2">
                                    <FiMapPin className="text-base-content/60" />
                                    <input required name="address" placeholder="Street address" className="grow" />
                              </label>

                              <label className="input input-bordered flex items-center gap-2">
                                    <FiHome className="text-base-content/60" />
                                    <input required name="city" placeholder="City" className="grow" />
                              </label>
                        </div>

                        <textarea
                              name="notes"
                              placeholder="Delivery notes (optional)"
                              className="textarea textarea-bordered w-full"
                              rows={3}
                        />
                  </div>

                  <aside className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg lg:sticky lg:top-24">
                        <h2 className="text-lg font-bold">Order summary</h2>

                        <ul className="space-y-3 border-t border-base-200 pt-4">
                              {items.map((item) => (
                                    <li key={item.id} className="flex items-center gap-3">
                                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-amber-50 via-orange-50 to-rose-100">
                                                <Image src={item.image} alt={item.name} fill sizes="48px" unoptimized className="object-cover" />
                                          </div>
                                          <div className="flex flex-1 items-baseline justify-between gap-2 text-sm">
                                                <span className="text-base-content/70">{item.name} × {item.quantity}</span>
                                                <span className="shrink-0 font-semibold">৳{(item.price * item.quantity).toFixed(2)}</span>
                                          </div>
                                    </li>
                              ))}
                        </ul>

                        <div className="flex justify-between border-t border-base-200 pt-4 text-sm text-base-content/70">
                              <span>Delivery</span>
                              <span className="font-semibold text-base-content">Cash on delivery</span>
                        </div>

                        <div className="flex justify-between border-t border-base-200 pt-4 text-lg font-black">
                              <span>Total</span>
                              <span className="text-primary">৳{subtotal.toFixed(2)}</span>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={pending}>
                              {pending ? "Placing order…" : "Place Order"}
                        </button>
                  </aside>
            </form>
      );
};

export default CheckoutForm;

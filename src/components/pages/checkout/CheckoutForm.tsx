'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FiCreditCard, FiHome, FiInfo, FiMapPin, FiPhone, FiTruck, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { createOrder, type PaymentInput } from "@/actions/server/order";

export interface CheckoutItem {
      id: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
}

type PaymentMethod = "cod" | "card";

const luhnCheck = (digits: string) => {
      let sum = 0;
      let shouldDouble = false;

      for (let i = digits.length - 1; i >= 0; i -= 1) {
            let digit = Number(digits[i]);
            if (shouldDouble) {
                  digit *= 2;
                  if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
      }

      return sum % 10 === 0;
};

const CheckoutForm = ({ items, subtotal }: { items: CheckoutItem[]; subtotal: number }) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();
      const [processing, setProcessing] = useState(false);
      const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

      const [cardNumber, setCardNumber] = useState("");
      const [cardExpiry, setCardExpiry] = useState("");
      const [cardCvc, setCardCvc] = useState("");
      const [cardName, setCardName] = useState("");

      const validateCard = () => {
            const digits = cardNumber.replace(/\s+/g, "");

            if (!/^\d{13,19}$/.test(digits) || !luhnCheck(digits)) {
                  return "Enter a valid card number";
            }

            const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(cardExpiry.trim());
            if (!match) {
                  return "Enter expiry as MM/YY";
            }
            const month = Number(match[1]);
            const year = 2000 + Number(match[2]);
            if (month < 1 || month > 12) {
                  return "Enter a valid expiry month";
            }
            const expiryDate = new Date(year, month, 0, 23, 59, 59);
            if (expiryDate < new Date()) {
                  return "This card has expired";
            }

            if (!/^\d{3,4}$/.test(cardCvc.trim())) {
                  return "Enter a valid CVC";
            }

            if (!cardName.trim()) {
                  return "Enter the name on the card";
            }

            return null;
      };

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

            let payment: PaymentInput = { method: "cod" };

            if (paymentMethod === "card") {
                  const error = validateCard();
                  if (error) {
                        toast.error(error);
                        return;
                  }
                  const digits = cardNumber.replace(/\s+/g, "");
                  payment = { method: "card", last4: digits.slice(-4) };
            }

            setProcessing(true);

            startTransition(async () => {
                  try {
                        // Simulated processing delay — no real gateway is contacted.
                        if (paymentMethod === "card") {
                              await new Promise((resolve) => setTimeout(resolve, 900));
                        }
                        const result = await createOrder(shippingInfo, payment);
                        toast.success("Order placed successfully!");
                        router.push(`/orders/${result.orderId}`);
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Failed to place order");
                  } finally {
                        setProcessing(false);
                  }
            });
      };

      const busy = pending || processing;

      return (
            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3 lg:items-start">
                  <div className="space-y-6 lg:col-span-2">
                        <div className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg">
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

                        <div className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg">
                              <h2 className="text-lg font-bold">Payment method</h2>

                              <div className="grid gap-3 sm:grid-cols-2">
                                    <label
                                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-base-200"
                                                }`}
                                    >
                                          <input
                                                type="radio"
                                                name="paymentMethod"
                                                className="radio radio-primary"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                          />
                                          <FiTruck className="text-xl text-base-content/60" />
                                          <div>
                                                <p className="font-semibold">Cash on Delivery</p>
                                                <p className="text-xs text-base-content/60">Pay when your order arrives</p>
                                          </div>
                                    </label>

                                    <label
                                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-base-200"
                                                }`}
                                    >
                                          <input
                                                type="radio"
                                                name="paymentMethod"
                                                className="radio radio-primary"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                          />
                                          <FiCreditCard className="text-xl text-base-content/60" />
                                          <div>
                                                <p className="font-semibold">Card (Demo)</p>
                                                <p className="text-xs text-base-content/60">Simulated online payment</p>
                                          </div>
                                    </label>
                              </div>

                              {paymentMethod === "card" ? (
                                    <div className="space-y-4 rounded-2xl bg-base-200/70 p-4">
                                          <div className="flex items-start gap-2 rounded-xl bg-warning/15 p-3 text-xs text-base-content/80">
                                                <FiInfo className="mt-0.5 shrink-0 text-warning" />
                                                <span>
                                                      Demo only — this is a simulated payment flow. No real charge is made and no
                                                      full card number is sent to our server or stored anywhere.
                                                </span>
                                          </div>

                                          <div className="grid gap-4">
                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiCreditCard className="text-base-content/60" />
                                                      <input
                                                            autoComplete="off"
                                                            inputMode="numeric"
                                                            placeholder="Card number"
                                                            className="grow"
                                                            value={cardNumber}
                                                            onChange={(e) => setCardNumber(e.target.value)}
                                                            maxLength={19}
                                                      />
                                                </label>

                                                <label className="input input-bordered flex items-center gap-2">
                                                      <FiUser className="text-base-content/60" />
                                                      <input
                                                            autoComplete="off"
                                                            placeholder="Name on card"
                                                            className="grow"
                                                            value={cardName}
                                                            onChange={(e) => setCardName(e.target.value)}
                                                      />
                                                </label>

                                                <div className="grid grid-cols-2 gap-4">
                                                      <label className="input input-bordered flex items-center gap-2">
                                                            <input
                                                                  autoComplete="off"
                                                                  placeholder="MM/YY"
                                                                  className="grow"
                                                                  value={cardExpiry}
                                                                  onChange={(e) => setCardExpiry(e.target.value)}
                                                                  maxLength={5}
                                                            />
                                                      </label>
                                                      <label className="input input-bordered flex items-center gap-2">
                                                            <input
                                                                  autoComplete="off"
                                                                  inputMode="numeric"
                                                                  placeholder="CVC"
                                                                  className="grow"
                                                                  value={cardCvc}
                                                                  onChange={(e) => setCardCvc(e.target.value)}
                                                                  maxLength={4}
                                                            />
                                                      </label>
                                                </div>
                                          </div>
                                    </div>
                              ) : null}
                        </div>
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
                              <span>Payment</span>
                              <span className="font-semibold text-base-content">
                                    {paymentMethod === "cod" ? "Cash on delivery" : "Card (Demo)"}
                              </span>
                        </div>

                        <div className="flex justify-between border-t border-base-200 pt-4 text-lg font-black">
                              <span>Total</span>
                              <span className="text-primary">৳{subtotal.toFixed(2)}</span>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={busy}>
                              {busy ? "Placing order…" : "Place Order"}
                        </button>
                  </aside>
            </form>
      );
};

export default CheckoutForm;

'use client';

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/actions/server/order";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];
const paymentStatusOptions = ["unpaid", "paid", "failed"];

const OrderStatusForm = ({
      orderId,
      status,
      paymentStatus,
}: {
      orderId: string;
      status: string;
      paymentStatus: string;
}) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();
      const [nextStatus, setNextStatus] = useState(status);
      const [nextPaymentStatus, setNextPaymentStatus] = useState(paymentStatus);

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            startTransition(async () => {
                  try {
                        await updateOrderStatus(orderId, { status: nextStatus, paymentStatus: nextPaymentStatus });
                        toast.success("Order updated");
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not update order");
                  }
            });
      };

      return (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-base-200/70 p-5">
                  <h2 className="text-lg font-bold">Update order</h2>

                  <div className="space-y-1">
                        <label className="text-sm font-semibold">Order status</label>
                        <select
                              value={nextStatus}
                              onChange={(e) => setNextStatus(e.target.value)}
                              className="select select-bordered w-full capitalize"
                        >
                              {statusOptions.map((option) => (
                                    <option key={option} value={option} className="capitalize">
                                          {option}
                                    </option>
                              ))}
                        </select>
                  </div>

                  <div className="space-y-1">
                        <label className="text-sm font-semibold">Payment status</label>
                        <select
                              value={nextPaymentStatus}
                              onChange={(e) => setNextPaymentStatus(e.target.value)}
                              className="select select-bordered w-full capitalize"
                        >
                              {paymentStatusOptions.map((option) => (
                                    <option key={option} value={option} className="capitalize">
                                          {option}
                                    </option>
                              ))}
                        </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm w-full" disabled={pending}>
                        {pending ? "Saving…" : "Save changes"}
                  </button>
            </form>
      );
};

export default OrderStatusForm;

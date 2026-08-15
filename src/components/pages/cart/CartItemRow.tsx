'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { removeCartItem, updateCartItemQuantity } from "@/actions/server/cart";

export interface CartItemProps {
      id: string;
      productId: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
}

const CartItemRow = ({ item }: { item: CartItemProps }) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();
      const [action, setAction] = useState<"update" | "remove" | null>(null);

      const handleRemove = () => {
            setAction("remove");
            startTransition(async () => {
                  try {
                        await removeCartItem(item.id);
                        toast.success("Item removed from cart");
                        router.refresh();
                  } catch (error) {
                        toast.error("Could not remove item");
                  }
            });
      };

      const changeQuantity = (delta: number) => {
            const newQuantity = item.quantity + delta;
            if (newQuantity < 1) {
                  handleRemove();
                  return;
            }
            setAction("update");
            startTransition(async () => {
                  try {
                        await updateCartItemQuantity(item.id, newQuantity);
                        router.refresh();
                  } catch (error) {
                        toast.error("Could not update quantity");
                  }
            });
      };

      return (
            <div className="flex flex-col gap-4 rounded-3xl border border-base-200 bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center">
                  <Link
                        href={`/products/${item.productId}`}
                        className="relative h-24 w-24 shrink-0 self-center overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 via-orange-50 to-rose-100 sm:self-auto"
                  >
                        <Image src={item.image} alt={item.name} fill sizes="96px" unoptimized className="object-cover" />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                        <Link href={`/products/${item.productId}`} className="font-bold leading-snug hover:text-primary">
                              {item.name}
                        </Link>
                        <p className="text-sm text-base-content/60">৳{item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="join">
                              <button
                                    type="button"
                                    onClick={() => changeQuantity(-1)}
                                    disabled={pending}
                                    className="btn btn-sm join-item"
                                    aria-label="Decrease quantity"
                              >
                                    <FiMinus />
                              </button>
                              <span className="join-item flex w-10 items-center justify-center border-y border-base-300 text-sm font-semibold">
                                    {action === "update" && pending ? "…" : item.quantity}
                              </span>
                              <button
                                    type="button"
                                    onClick={() => changeQuantity(1)}
                                    disabled={pending}
                                    className="btn btn-sm join-item"
                                    aria-label="Increase quantity"
                              >
                                    <FiPlus />
                              </button>
                        </div>

                        <p className="w-20 text-right font-bold text-primary">
                              ৳{(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                              type="button"
                              onClick={handleRemove}
                              disabled={pending}
                              className="btn btn-ghost btn-sm text-error"
                              aria-label="Remove item"
                        >
                              {action === "remove" && pending ? "…" : <FiTrash2 />}
                        </button>
                  </div>
            </div>
      );
};

export default CartItemRow;

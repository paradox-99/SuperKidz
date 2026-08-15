import Link from "next/link";
import type { Metadata } from "next";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCartItemsByUserId } from "@/actions/server/cart";
import CartItemRow from "@/components/pages/cart/CartItemRow";
import ClearCartButton from "@/components/pages/cart/ClearCartButton";

export const metadata: Metadata = {
      title: "Your Cart",
      description: "Review the items in your SuperKidz cart before checkout.",
};

const EmptyState = ({
      title,
      description,
      ctaLabel,
      ctaHref,
}: {
      title: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
}) => (
      <div className="flex flex-col items-center gap-4 rounded-4xl border border-base-200 bg-base-100 px-6 py-20 text-center shadow-lg">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-base-200 text-4xl text-base-content/40">
                  <FiShoppingCart />
            </div>
            <div className="space-y-1">
                  <h1 className="text-2xl font-black">{title}</h1>
                  <p className="text-base-content/70">{description}</p>
            </div>
            <Link href={ctaHref} className="btn btn-primary">
                  {ctaLabel}
            </Link>
      </div>
);

const CartPage = async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
            return (
                  <EmptyState
                        title="Sign in to view your cart"
                        description="Your cart is saved to your account — sign in to pick up where you left off."
                        ctaLabel="Sign in"
                        ctaHref="/signin?callbackUrl=/cart"
                  />
            );
      }

      const cartItems = await getCartItemsByUserId(session.user.id);

      if (cartItems.length === 0) {
            return (
                  <EmptyState
                        title="Your cart is empty"
                        description="Looks like you haven't added anything yet. Explore our toys and find something they'll love."
                        ctaLabel="Browse products"
                        ctaHref="/products"
                  />
            );
      }

      const items = cartItems.map((item) => ({
            id: item._id,
            productId: item.productId.toString(),
            image: item.image,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
      }));

      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return (
            <section className="space-y-6 py-6 md:py-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link href="/products" className="btn btn-ghost btn-sm">
                              <FiArrowLeft /> Continue shopping
                        </Link>
                        <h1 className="text-2xl font-black md:text-3xl">
                              Your Cart{" "}
                              <span className="text-lg font-semibold text-base-content/50">
                                    ({itemCount} {itemCount === 1 ? "item" : "items"})
                              </span>
                        </h1>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                        <div className="space-y-4 lg:col-span-2">
                              {items.map((item) => (
                                    <CartItemRow key={item.id} item={item} />
                              ))}
                              <div className="flex justify-end">
                                    <ClearCartButton userId={session.user.id} />
                              </div>
                        </div>

                        <aside className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg lg:sticky lg:top-24">
                              <h2 className="text-lg font-bold">Order summary</h2>

                              <div className="space-y-2 border-t border-base-200 pt-4 text-sm">
                                    <div className="flex justify-between text-base-content/70">
                                          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                                          <span className="font-semibold text-base-content">৳{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base-content/70">
                                          <span>Delivery</span>
                                          <span className="font-semibold text-base-content">Calculated at checkout</span>
                                    </div>
                              </div>

                              <div className="flex justify-between border-t border-base-200 pt-4 text-lg font-black">
                                    <span>Total</span>
                                    <span className="text-primary">৳{subtotal.toFixed(2)}</span>
                              </div>

                              <button
                                    type="button"
                                    className="btn btn-primary btn-block btn-lg"
                                    disabled
                                    title="Checkout coming soon"
                              >
                                    Proceed to Checkout
                              </button>
                        </aside>
                  </div>
            </section>
      );
};

export default CartPage;

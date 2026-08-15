import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCartItemsByUserId } from "@/actions/server/cart";
import CheckoutForm from "@/components/pages/checkout/CheckoutForm";

export const metadata: Metadata = {
      title: "Checkout",
      description: "Confirm your shipping details and place your SuperKidz order.",
};

const CheckoutPage = async () => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
            redirect("/signin?callbackUrl=/checkout");
      }

      const cartItems = await getCartItemsByUserId(session.user.id);

      if (cartItems.length === 0) {
            redirect("/cart");
      }

      const items = cartItems.map((item) => ({
            id: item._id,
            image: item.image,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
      }));

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return (
            <section className="space-y-6 py-6 md:py-10">
                  <h1 className="text-2xl font-black md:text-3xl">Checkout</h1>
                  <CheckoutForm items={items} subtotal={subtotal} />
            </section>
      );
};

export default CheckoutPage;

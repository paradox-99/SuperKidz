import { sendEmail } from "@/lib/sendEmail";

type InvoiceItem = {
      name: string;
      price: number;
      quantity: number;
};

type InvoiceShippingInfo = {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      notes?: string;
};

export type InvoiceOrder = {
      _id: string;
      items: InvoiceItem[];
      subtotal: number;
      total: number;
      shippingInfo: InvoiceShippingInfo;
      status: string;
      paymentMethod?: "cod" | "card";
      paymentStatus?: "unpaid" | "paid" | "failed";
      transactionId?: string;
      createdAt: Date;
};

const paymentMethodLabel: Record<"cod" | "card", string> = {
      cod: "Cash on delivery",
      card: "Card (Demo)",
};

const buildInvoiceHtml = (order: InvoiceOrder, recipientName: string) => {
      const orderNumber = order._id.slice(-8).toUpperCase();
      const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
      });

      const rows = order.items
            .map(
                  (item) => `
            <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.name}</td>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">৳${item.price.toFixed(2)}</td>
                  <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">৳${(item.price * item.quantity).toFixed(2)}</td>
            </tr>`
            )
            .join("");

      return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
            <img src="https://i.ibb.co/PsHNwVDD/image.png" alt="SuperKidz" style="height:40px;width:auto;margin-bottom:12px;" />
            <p>Hi ${recipientName},</p>
            <p>Thanks for your order! Here's your invoice.</p>

            <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
                  <tr>
                        <td style="padding:2px 0;"><strong>Order #</strong></td>
                        <td style="padding:2px 0;">${orderNumber}</td>
                  </tr>
                  <tr>
                        <td style="padding:2px 0;"><strong>Date</strong></td>
                        <td style="padding:2px 0;">${orderDate}</td>
                  </tr>
                  <tr>
                        <td style="padding:2px 0;"><strong>Status</strong></td>
                        <td style="padding:2px 0;text-transform:capitalize;">${order.status}</td>
                  </tr>
                  <tr>
                        <td style="padding:2px 0;"><strong>Payment Method</strong></td>
                        <td style="padding:2px 0;">${paymentMethodLabel[order.paymentMethod ?? "cod"]}</td>
                  </tr>
                  <tr>
                        <td style="padding:2px 0;"><strong>Payment Status</strong></td>
                        <td style="padding:2px 0;text-transform:capitalize;">${order.paymentStatus ?? "unpaid"}</td>
                  </tr>
                  ${order.transactionId ? `
                  <tr>
                        <td style="padding:2px 0;"><strong>Transaction ID</strong></td>
                        <td style="padding:2px 0;">${order.transactionId}</td>
                  </tr>` : ""}
            </table>

            <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <thead>
                        <tr style="text-align:left;border-bottom:2px solid #ea580c;">
                              <th style="padding:8px 0;">Item</th>
                              <th style="padding:8px 0;text-align:center;">Qty</th>
                              <th style="padding:8px 0;text-align:right;">Price</th>
                              <th style="padding:8px 0;text-align:right;">Total</th>
                        </tr>
                  </thead>
                  <tbody>${rows}</tbody>
            </table>

            <table style="width:100%;margin-top:12px;font-size:14px;">
                  <tr>
                        <td style="text-align:right;padding:4px 0;">Subtotal</td>
                        <td style="text-align:right;padding:4px 0;width:100px;">৳${order.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                        <td style="text-align:right;padding:4px 0;font-weight:bold;font-size:16px;">Total</td>
                        <td style="text-align:right;padding:4px 0;font-weight:bold;font-size:16px;color:#ea580c;">৳${order.total.toFixed(2)}</td>
                  </tr>
            </table>

            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;font-size:14px;">
                  <p style="font-weight:bold;margin:0 0 4px;">Shipping to</p>
                  <p style="margin:0;">${order.shippingInfo.fullName}</p>
                  <p style="margin:0;">${order.shippingInfo.phone}</p>
                  <p style="margin:0;">${order.shippingInfo.address}, ${order.shippingInfo.city}</p>
                  ${order.shippingInfo.notes ? `<p style="margin:8px 0 0;font-style:italic;color:#6b7280;">"${order.shippingInfo.notes}"</p>` : ""}
            </div>

            <p style="margin-top:24px;font-size:12px;color:#6b7280;">
                  This is an automated invoice from SuperKidz. ${
                        order.paymentMethod === "card"
                              ? "Payment was processed via our demo card payment flow."
                              : "Payment is cash on delivery."
                  }
            </p>
      </div>`;
};

export const sendOrderInvoiceEmail = async (order: InvoiceOrder, recipientEmail: string, recipientName: string) => {
      await sendEmail({
            to: recipientEmail,
            subject: `Your SuperKidz order #${order._id.slice(-8).toUpperCase()} invoice`,
            html: buildInvoiceHtml(order, recipientName),
      });
};

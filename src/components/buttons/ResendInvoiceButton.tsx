'use client';

import { resendOrderInvoice } from "@/actions/server/order";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";

const ResendInvoiceButton = ({ orderId }: { orderId: string }) => {

      const [loading, setLoading] = useState(false);

      const handleResend = async () => {
            setLoading(true);
            try {
                  await resendOrderInvoice(orderId);
                  toast.success("Invoice sent to your email");
            } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not send invoice");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <button onClick={handleResend} className="btn btn-outline btn-sm gap-2" disabled={loading}>
                  <FiMail />
                  {loading ? "Sending..." : "Email invoice"}
            </button>
      );
};

export default ResendInvoiceButton;

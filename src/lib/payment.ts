export type PaymentMethod = "cod" | "card";
export type PaymentStatus = "unpaid" | "paid" | "failed";

export type PaymentInput = {
      method: PaymentMethod;
      last4?: string;
};

export type PaymentResult = {
      approved: boolean;
      status: PaymentStatus;
      transactionId?: string;
};

const generateTransactionId = () =>
      `SKZ-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

// Demo-only simulator: no real gateway is involved. A card ending in
// 0000 deliberately declines so the failure path is exercisable.
export const simulatePayment = ({ method, last4 }: PaymentInput): PaymentResult => {
      if (method === "cod") {
            return { approved: true, status: "unpaid" };
      }

      if (!last4 || !/^\d{4}$/.test(last4)) {
            return { approved: false, status: "failed" };
      }

      if (last4 === "0000") {
            return { approved: false, status: "failed" };
      }

      return { approved: true, status: "paid", transactionId: generateTransactionId() };
};

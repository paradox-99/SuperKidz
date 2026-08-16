"use server";

import { sendEmail } from "@/lib/sendEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendContactMessage = async (
      name: string,
      email: string,
      subject: string,
      message: string
) => {
      if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            throw new Error("Please fill in all fields");
      }

      if (!EMAIL_RE.test(email.trim())) {
            throw new Error("Please enter a valid email address");
      }

      if (!process.env.EMAIL_USER) {
            throw new Error("Contact form is not configured. Please email us directly.");
      }

      await sendEmail({
            to: process.env.EMAIL_USER,
            replyTo: email.trim(),
            subject: `[Contact Form] ${subject.trim()}`,
            html: `
                  <p><strong>Name:</strong> ${name.trim()}</p>
                  <p><strong>Email:</strong> ${email.trim()}</p>
                  <p><strong>Subject:</strong> ${subject.trim()}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message.trim().replace(/\n/g, "<br />")}</p>
            `,
      });

      return { status: "success" };
};

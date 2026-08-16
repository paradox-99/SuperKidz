"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMessageSquare, FiSend, FiTag, FiUser } from "react-icons/fi";
import { sendContactMessage } from "@/actions/server/contact";

const ContactForm = () => {
      const [pending, startTransition] = useTransition();

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;

            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

            startTransition(async () => {
                  try {
                        await sendContactMessage(name, email, subject, message);
                        toast.success("Message sent! We'll get back to you soon.");
                        form.reset();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Failed to send message");
                  }
            });
      };

      return (
            <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg sm:p-8"
            >
                  <h2 className="text-lg font-bold">Send us a message</h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                        <label className="input input-bordered flex items-center gap-2">
                              <FiUser className="text-base-content/60" />
                              <input required name="name" placeholder="Your name" className="grow" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2">
                              <FiMail className="text-base-content/60" />
                              <input required name="email" type="email" placeholder="Your email" className="grow" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 sm:col-span-2">
                              <FiTag className="text-base-content/60" />
                              <input required name="subject" placeholder="Subject" className="grow" />
                        </label>
                  </div>

                  <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-base-content/70">
                              <FiMessageSquare className="text-base-content/60" />
                              Message
                        </label>
                        <textarea
                              required
                              name="message"
                              placeholder="How can we help?"
                              className="textarea textarea-bordered w-full"
                              rows={5}
                        />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg gap-2" disabled={pending}>
                        {pending ? "Sending…" : (
                              <>
                                    Send Message
                                    <FiSend />
                              </>
                        )}
                  </button>
            </form>
      );
};

export default ContactForm;

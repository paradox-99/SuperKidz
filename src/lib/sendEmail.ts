import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
      },
});

type SendEmailOptions = {
      to: string;
      subject: string;
      html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
      await transporter.sendMail({
            from: `"SuperKidz" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
      });
};

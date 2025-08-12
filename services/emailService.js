import nodemailer from "nodemailer";
import { getEmailHtml } from "./emailTemplate";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(email, qrCodePath, qrCodeCid) {
    const html = getEmailHtml();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Confirmação de Inscrição - Para Elas",
    html,
    attachments: [
      {
        filename: "qrcode.png",
        path: qrCodePath,
        cid: qrCodeCid,
      },
    ],
  });
}
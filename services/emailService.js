import nodemailer from "nodemailer";
import { getEmailHtml } from "./emailTemplate.js";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(email, qrCodeBase64) {
  const html = getEmailHtml();

  console.log(`Enviando e-mail para ${email} com QR Code: ${qrCodeBase64}`);

  const qrCodeCid = "qrcode@paraelas";

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Confirmação de Inscrição - Para Elas",
    html,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeBase64.split("base64,")[1],
        encoding: "base64",
        cid: qrCodeCid,
      },
    ],
  });

  console.log(`E-mail enviado para ${email}`);
}
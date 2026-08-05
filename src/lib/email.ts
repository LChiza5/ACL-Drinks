import nodemailer from "nodemailer";
import { formatPrice } from "@/lib/utils";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendOrderConfirmation({
  to,
  orderNumber,
  total,
  items,
}: {
  to: string;
  orderNumber: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}) {
  if (!process.env.SMTP_HOST) return; // skip if SMTP not configured

  const rows = items
    .map(i => `<tr><td style="padding:6px 0">${i.name} ×${i.quantity}</td><td style="padding:6px 0;text-align:right">${formatPrice(i.price * i.quantity)}</td></tr>`)
    .join("");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "ACL Drinks <no-reply@acldrinks.cr>",
    to,
    subject: `Pedido ${orderNumber} confirmado 🍾`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;background:#12110F;color:#F5F2EC;padding:32px;border-radius:12px">
        <h2 style="color:#C9984A;margin-top:0">¡Tu pedido está confirmado!</h2>
        <p>Pedido: <strong style="font-family:monospace">${orderNumber}</strong></p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          ${rows}
          <tr style="border-top:1px solid #2A1F14">
            <td style="padding:10px 0;font-weight:700">Total</td>
            <td style="padding:10px 0;text-align:right;font-weight:700;color:#C9984A">${formatPrice(total)}</td>
          </tr>
        </table>
        <p style="color:#B8B1A7;font-size:14px">Te avisaremos cuando tu pedido esté en camino. ¡Salud! 🥂</p>
        <p style="color:#B8B1A7;font-size:12px">— ACL Drinks · Tilarán, Guanacaste</p>
      </div>
    `,
  });
}

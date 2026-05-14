import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function fmt(n) {
  return `Rs ${Number(n).toLocaleString("en-IN")}`;
}

function adminTemplate(o) {
  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#000;color:#fff;padding:32px;">
    <h2 style="margin:0 0 8px;font-weight:600;letter-spacing:-0.02em;">New Vajra PowerBank Order</h2>
    <p style="color:#999;margin:0 0 24px;">Order ID: <strong style="color:#fff">${o.orderId}</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#999;">Customer</td><td style="padding:8px 0;">${o.fullName}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Phone</td><td style="padding:8px 0;">${o.phone}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Email</td><td style="padding:8px 0;">${o.email || "—"}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Location</td><td style="padding:8px 0;">${o.location}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Product</td><td style="padding:8px 0;">${o.product} × ${o.quantity}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Total</td><td style="padding:8px 0;font-weight:600;">${fmt(o.total)}</td></tr>
      <tr><td style="padding:8px 0;color:#999;">Payment</td><td style="padding:8px 0;">${o.paymentMethod}</td></tr>
    </table>
  </div>`;
}

function customerTemplate(o) {
  return `
  <div style="font-family:Inter,system-ui,sans-serif;background:#000;color:#fff;padding:40px;max-width:560px;margin:0 auto;">
    <h1 style="margin:0 0 8px;font-weight:600;letter-spacing:-0.03em;font-size:28px;">Thank you, ${o.fullName.split(" ")[0]}.</h1>
    <p style="color:#999;line-height:1.6;margin:0 0 24px;">
      Your Vajra PowerBank order has been received. Our team will call you shortly to confirm delivery.
    </p>
    <div style="border:1px solid #1a1a1a;border-radius:16px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 4px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Order ID</p>
      <p style="margin:0;font-size:18px;font-weight:600;letter-spacing:-0.01em;">${o.orderId}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#999;">Product</td><td style="padding:6px 0;text-align:right;">${o.product} × ${o.quantity}</td></tr>
      <tr><td style="padding:6px 0;color:#999;">Total</td><td style="padding:6px 0;text-align:right;font-weight:600;">${fmt(o.total)}</td></tr>
      <tr><td style="padding:6px 0;color:#999;">Payment</td><td style="padding:6px 0;text-align:right;">Cash on Delivery</td></tr>
      <tr><td style="padding:6px 0;color:#999;">Delivery</td><td style="padding:6px 0;text-align:right;">2–5 business days</td></tr>
    </table>
    <p style="color:#666;font-size:12px;margin-top:32px;">Vajra PowerBank — Power, redefined.</p>
  </div>`;
}

export async function sendOrderEmails(order) {
  const transport = getTransport();
  if (!transport) {
    console.warn("[email] SMTP not configured — skipping");
    return false;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const adminEmail = process.env.ADMIN_EMAIL;

  const tasks = [];
  if (adminEmail) {
    tasks.push(
      transport.sendMail({
        from,
        to: adminEmail,
        subject: `New Order — ${order.orderId} — ${order.fullName}`,
        html: adminTemplate(order),
      }),
    );
  }

  if (order.email) {
    tasks.push(
      transport.sendMail({
        from,
        to: order.email,
        subject: `Vajra PowerBank — Order ${order.orderId} confirmed`,
        html: customerTemplate(order),
      }),
    );
  }

  await Promise.allSettled(tasks);
  return true;
}

import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/sheets";
import { sendOrderEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNIT_PRICE = 999;

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VAJRA-${ts}-${rand}`;
}

function validate(body) {
  const errors = [];
  if (!body || typeof body !== "object") {
    errors.push("Invalid payload");
    return errors;
  }
  if (!body.fullName || typeof body.fullName !== "string" || !body.fullName.trim())
    errors.push("Full name is required");
  if (
    !body.phone ||
    typeof body.phone !== "string" ||
    !/^[0-9+\s-]{7,15}$/.test(body.phone.trim())
  )
    errors.push("Valid phone number is required");
  if (
    body.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())
  )
    errors.push("Email is invalid");
  if (!body.location || !String(body.location).trim())
    errors.push("Location is required");

  const qty = Number(body.quantity);
  if (!Number.isFinite(qty) || qty < 1 || qty > 50)
    errors.push("Quantity must be between 1 and 50");

  return errors;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const errors = validate(body);
  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: errors.join(", ") },
      { status: 400 },
    );
  }

  const quantity = Number(body.quantity);
  const order = {
    orderId: generateOrderId(),
    timestamp: new Date().toISOString(),
    fullName: String(body.fullName).trim(),
    phone: String(body.phone).trim(),
    email: body.email ? String(body.email).trim() : "",
    location: String(body.location).trim(),
    product: "Vajra PowerBank",
    quantity,
    unitPrice: UNIT_PRICE,
    total: UNIT_PRICE * quantity,
    paymentMethod: "Cash on Delivery",
  };

  const results = await Promise.allSettled([
    appendOrderToSheet(order),
    sendOrderEmails(order),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[order] task ${i} failed:`, r.reason);
    }
  });

  return NextResponse.json({ ok: true, orderId: order.orderId });
}

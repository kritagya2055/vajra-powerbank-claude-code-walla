"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UNIT_PRICE = 999;

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    quantity: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = useMemo(
    () => UNIT_PRICE * Math.max(1, Number(form.quantity) || 1),
    [form.quantity],
  );

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Please enter your full name.");
    if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim()))
      return setError("Please enter a valid phone number.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email.");
    if (!form.location.trim()) return setError("Please enter your location.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          product: "Vajra PowerBank",
          unitPrice: UNIT_PRICE,
          total,
          paymentMethod: "Cash on Delivery",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Order failed");
      router.push(`/thank-you?id=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-medium tracking-tight">
            Vajra
          </Link>
          <Link
            href="/"
            className="text-[13px] text-white/50 hover:text-white transition-colors"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <section className="lg:col-span-3">
          <p className="text-[12px] uppercase tracking-[0.24em] text-electric font-medium">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            One step from power.
          </h1>
          <p className="mt-4 text-white/55 max-w-md">
            Cash on Delivery. Free shipping across Nepal.
          </p>

          <form onSubmit={onSubmit} className="mt-12 space-y-6">
            <Field
              label="Full Name"
              value={form.fullName}
              onChange={(v) => update("fullName", v)}
              placeholder="Your full name"
              autoComplete="name"
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              placeholder="98XXXXXXXX"
              autoComplete="tel"
              inputMode="tel"
            />
            <Field
              label="Email"
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="you@example.com (optional)"
              autoComplete="email"
              inputMode="email"
            />
            <Field
              label="Location"
              value={form.location}
              onChange={(v) => update("location", v)}
              placeholder="City, district, address"
              autoComplete="street-address"
            />

            {error && (
              <p className="text-[13px] text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 px-6 py-4 rounded-2xl bg-electric text-white font-medium text-[15px] tracking-tight hover:bg-electricGlow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-electric"
            >
              {submitting ? "Placing order..." : `Place Order — Rs ${total}`}
            </button>

            <p className="text-[12px] text-white/35 text-center">
              By placing this order you agree to pay in cash on delivery.
            </p>
          </form>
        </section>

        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-10 bg-glass rounded-3xl p-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 font-medium">
              Order Summary
            </p>

            <div className="mt-6 pb-6 border-b border-white/[0.06]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[15px] font-medium text-white">
                    Vajra PowerBank
                  </p>
                  <p className="mt-1 text-[12px] text-white/40">
                    Portable power, redefined
                  </p>
                </div>
                <p className="text-[15px] text-white tabular-nums">
                  Rs {UNIT_PRICE}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <label className="text-[13px] text-white/60">Quantity</label>
                <div className="flex items-center gap-1 bg-black/40 rounded-full border border-white/10 p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      update(
                        "quantity",
                        Math.max(1, Number(form.quantity) - 1),
                      )
                    }
                    className="w-7 h-7 rounded-full hover:bg-white/10 transition-colors text-[14px]"
                  >
                    −
                  </button>
                  <span className="px-3 text-[14px] tabular-nums min-w-[1.5rem] text-center">
                    {form.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      update("quantity", Number(form.quantity) + 1)
                    }
                    className="w-7 h-7 rounded-full hover:bg-white/10 transition-colors text-[14px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-[14px]">
              <Row label="Subtotal" value={`Rs ${total}`} />
              <Row label="Delivery" value="Free" />
              <Row label="Payment" value="Cash on Delivery" />
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-baseline justify-between">
              <span className="text-[14px] text-white/60">Total</span>
              <span className="text-2xl font-semibold tabular-nums">
                Rs {total}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
}) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-[0.16em] text-white/45 font-medium mb-2">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full bg-transparent border-b border-white/15 focus:border-electric outline-none py-3 text-[16px] text-white placeholder:text-white/25 transition-colors"
      />
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className="text-white tabular-nums">{value}</span>
    </div>
  );
}

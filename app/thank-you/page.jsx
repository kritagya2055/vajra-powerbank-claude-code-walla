"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouInner() {
  const params = useSearchParams();
  const id = params.get("id") || "VAJRA-XXXX";

  return (
    <div className="mx-auto max-w-2xl px-6 lg:px-10 py-24 md:py-32 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-electric/15 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke="#0066FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-10 text-[12px] uppercase tracking-[0.24em] text-electric font-medium">
        Order Confirmed
      </p>
      <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tightest text-gradient leading-[1.05]">
        Thank you.
      </h1>

      <p className="mt-6 text-white/55 max-w-md mx-auto">
        Your order has been received. Our team will call you shortly to confirm
        delivery details.
      </p>

      <div className="mt-12 inline-flex flex-col items-center bg-glass rounded-2xl px-8 py-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          Order ID
        </span>
        <span className="mt-2 text-xl font-medium tracking-tight tabular-nums">
          {id}
        </span>
      </div>

      <div className="mt-8 space-y-3">
        <p className="text-[14px] text-white/55">
          Payment method: <span className="text-white">Cash on Delivery</span>
        </p>
        <p className="text-[14px] text-white/55">
          Delivery: 2–5 business days across Nepal
        </p>
      </div>

      <div className="mt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-[14px] font-medium text-white hover:border-white/35 hover:bg-white/[0.04] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center">
          <Link href="/" className="text-[15px] font-medium tracking-tight">
            Vajra
          </Link>
        </div>
      </header>
      <Suspense fallback={<div className="py-24 text-center text-white/40">Loading...</div>}>
        <ThankYouInner />
      </Suspense>
    </main>
  );
}

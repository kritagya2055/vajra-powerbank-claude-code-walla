"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    q: "Is Cash on Delivery available?",
    a: "Yes. Pay in cash when your Vajra PowerBank arrives at your door. No upfront payment required.",
  },
  {
    q: "How long does delivery take?",
    a: "Anywhere in Nepal, delivery is typically 2 to 5 business days. Kathmandu Valley orders often arrive sooner.",
  },
  {
    q: "What is the battery capacity?",
    a: "Vajra PowerBank ships with a high-density cell tuned for multiple full-phone charges on a single top-up.",
  },
  {
    q: "How fast does it charge?",
    a: "It supports fast-charging input and output, so both the power bank and your devices replenish quickly.",
  },
  {
    q: "Do you accept returns?",
    a: "Yes. If your product arrives damaged or defective, contact support within 7 days for a replacement.",
  },
  {
    q: "How do I reach support?",
    a: "Our team will call you to confirm your order. For anything else, drop us a message and we will respond shortly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative w-full bg-black py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[12px] uppercase tracking-[0.24em] text-electric font-medium">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left py-6 md:py-7 group"
                >
                  <span className="text-[16px] md:text-lg font-medium tracking-tight text-white">
                    {it.q}
                  </span>
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full border border-white/15 transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-electric border-electric"
                        : "group-hover:border-white/30"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1.5v9M1.5 6h9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-[15px] text-white/60 leading-relaxed">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

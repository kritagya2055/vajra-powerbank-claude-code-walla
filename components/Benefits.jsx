"use client";
import { motion } from "framer-motion";

const items = [
  {
    title: "Fast Charging",
    desc: "Get to full power in record time.",
    icon: (
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Long Battery",
    desc: "Days of power on a single charge.",
    icon: (
      <>
        <rect
          x="2"
          y="7"
          width="16"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="4" y="9" width="10" height="6" rx="1" fill="currentColor" />
        <rect
          x="20"
          y="10"
          width="2"
          height="4"
          rx="0.5"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    title: "Compact Design",
    desc: "Slim, light, fits any pocket.",
    icon: (
      <>
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Travel-Friendly",
    desc: "Airline-safe and built to roam.",
    icon: (
      <path
        d="M2 12l8 4 4-10 4 12-4-2-12-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Multi-Device",
    desc: "Charge phones, tablets, and more.",
    icon: (
      <>
        <rect
          x="2"
          y="6"
          width="10"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="14"
          y="10"
          width="8"
          height="10"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </>
    ),
  },
];

export default function Benefits() {
  return (
    <section className="relative w-full bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <p className="text-[12px] uppercase tracking-[0.24em] text-electric font-medium">
            Why Vajra
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Engineered for every day.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-glass rounded-2xl p-6 md:p-7 h-full flex flex-col"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-electric/10 text-electric mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  {it.icon}
                </svg>
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                {it.title}
              </h3>
              <p className="mt-2 text-[13px] text-white/50 leading-relaxed">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

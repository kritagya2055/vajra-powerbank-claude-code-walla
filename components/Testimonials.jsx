"use client";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Ayush Baral",
    city: "Kathmandu",
    text: "Build quality is unreal for the price. Charged my phone three times before needing a top-up.",
  },
  {
    name: "Arun Ramtel",
    city: "Pokhara",
    text: "Delivered in two days, COD worked perfectly. Slim enough to slide into a jeans pocket.",
  },
  {
    name: "Bikal Karki",
    city: "Lalitpur",
    text: "The design alone is worth it. Feels like a flagship product. Charging is genuinely fast.",
  },
  {
    name: "Prabhakar Kafle",
    city: "Biratnagar",
    text: "Honest, premium product. I use it daily for travel and on my desk. No regrets.",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1 text-electric">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
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
            Customers
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Loved across Nepal.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-glass rounded-2xl p-8 md:p-10"
            >
              <Stars />
              <p className="mt-6 text-[17px] md:text-lg text-white/85 leading-relaxed">
                "{r.text}"
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric to-electricGlow flex items-center justify-center text-[13px] font-semibold">
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">{r.name}</p>
                  <p className="text-[12px] text-white/40">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

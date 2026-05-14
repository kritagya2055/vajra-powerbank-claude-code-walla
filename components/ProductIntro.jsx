"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProductIntro() {
  return (
    <section className="relative w-full bg-black py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="text-[12px] uppercase tracking-[0.24em] text-electric font-medium"
        >
          Vajra PowerBank
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={1}
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tightest text-gradient leading-[1.02]"
        >
          Power, redefined.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={2}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          A next-generation portable power solution designed for speed, durability,
          and everyday reliability.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={3}
          className="mt-12 flex items-baseline justify-center gap-4"
        >
          <span className="text-5xl md:text-6xl font-semibold tracking-tight">
            Rs 999
          </span>
          <span className="text-xl md:text-2xl text-white/30 line-through">
            Rs 1499
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={4}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Badge label="Cash on Delivery" />
          <Badge label="Free Delivery — Nepal" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          custom={5}
          className="mt-14"
        >
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-electric text-white font-medium text-[15px] tracking-tight hover:bg-electricGlow transition-all duration-300 glow-electric"
          >
            Order Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass text-[13px] text-white/80 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-electric" />
      {label}
    </span>
  );
}

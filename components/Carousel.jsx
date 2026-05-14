"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  { src: "/carousel-1.jpg", alt: "Vajra PowerBank — Purple edition" },
  { src: "/carousel-2.jpg", alt: "Vajra PowerBank — Midnight black" },
  { src: "/carousel-3.jpg", alt: "Vajra PowerBank — Detail logo" },
  { src: "/carousel-4.jpg", alt: "Vajra PowerBank — Black and purple" },
];

export default function Carousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % slides.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[12px] uppercase tracking-[0.24em] text-electric font-medium">
            Gallery
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
            Designed to be seen.
          </h2>
        </motion.div>

        <div className="rounded-3xl overflow-hidden bg-glass-strong">
          <div
            ref={trackRef}
            className="flex w-full snap-x snap-mandatory overflow-x-auto no-scrollbar"
          >
            {slides.map((s, i) => (
              <div
                key={i}
                className="relative w-full flex-shrink-0 snap-center aspect-[16/9]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-8 bg-electric" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

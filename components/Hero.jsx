"use client";

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-white/40">Vajra PowerBank</p>
        <p className="text-[13px] text-white/30">
          &copy; {new Date().getFullYear()} Vajra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

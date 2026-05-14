import "./globals.css";

export const metadata = {
  title: "Vajra PowerBank — Power, redefined.",
  description:
    "A next-generation portable power solution designed for speed, durability, and everyday reliability.",
  openGraph: {
    title: "Vajra PowerBank",
    description:
      "A next-generation portable power solution designed for speed, durability, and everyday reliability.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductIntro from "@/components/ProductIntro";
import Carousel from "@/components/Carousel";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-black">
      <Nav />
      <Hero />
      <ProductIntro />
      <Carousel />
      <Benefits />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

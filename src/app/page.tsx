import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

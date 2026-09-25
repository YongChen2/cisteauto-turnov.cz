import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <FadeIn>
          <WhyUs />
        </FadeIn>
        <FadeIn>
          <ServicesSection />
        </FadeIn>
        <FadeIn>
          <HowItWorks />
        </FadeIn>
        <FadeIn>
          <Faq />
        </FadeIn>
        <FadeIn>
          <Contact />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}

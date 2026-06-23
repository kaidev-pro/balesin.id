import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GeneratorCard from "@/components/GeneratorCard";
import FeatureSection from "@/components/FeatureSection";
import ExampleSection from "@/components/ExampleSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionCloudDivider } from "@/components/CloudDecorations";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SectionCloudDivider />
        <ScrollReveal>
          <GeneratorCard />
        </ScrollReveal>
        <SectionCloudDivider />
        <ScrollReveal>
          <FeatureSection />
        </ScrollReveal>
        <SectionCloudDivider />
        <ScrollReveal>
          <ExampleSection />
        </ScrollReveal>
        <SectionCloudDivider />
        <ScrollReveal>
          <TestimonialMarquee />
        </ScrollReveal>
        <SectionCloudDivider />
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

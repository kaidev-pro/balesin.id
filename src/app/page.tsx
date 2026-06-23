import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GeneratorCard from "@/components/GeneratorCard";
import FeatureSection from "@/components/FeatureSection";
import ExampleSection from "@/components/ExampleSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <GeneratorCard />
        <FeatureSection />
        <ExampleSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </>
  );
}

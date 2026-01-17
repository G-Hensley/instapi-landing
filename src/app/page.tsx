import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <HowItWorks />
      <Features />
      <InteractiveDemo />
      <Pricing />
      <FAQ />
      <WaitlistForm />
      <Footer />
    </main>
  );
}

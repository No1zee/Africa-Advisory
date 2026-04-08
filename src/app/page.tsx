import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SelectedMandates } from "@/components/SelectedMandates";
import { HubGrid } from "@/components/HubGrid";
import { ServiceSection } from "@/components/ServiceSection";
import { FounderNarrative } from "@/components/FounderNarrative";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Hero />
      
      <HubGrid />
      <ServiceSection />
      <FounderNarrative />
      <ContactCTA />
      
      <Footer />
    </div>
  );
}

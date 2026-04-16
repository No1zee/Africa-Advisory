import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SelectedMandates } from "@/components/SelectedMandates";
import { HubGrid } from "@/components/HubGrid";
import { ServiceSection } from "@/components/ServiceSection";
import { FounderNarrative } from "@/components/FounderNarrative";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { IntelligenceStrip } from "@/components/IntelligenceStrip";
import { FAQ } from "@/components/FAQ";
import { CinematicDivider } from "@/components/CinematicDivider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-base-obsidian text-secondary-parchment">
      <Hero />
      
      <IntelligenceStrip />
      
      <TrustStrip />
      
      {/* Prime Cinematic Segment */}
      <SelectedMandates />
      
      <ServiceSection />
      
      <HubGrid />
      
      <CinematicDivider />
      
      <FAQ />
      
      <FounderNarrative />
      
      <ContactCTA />
      
      <Footer />
    </div>
  );
}

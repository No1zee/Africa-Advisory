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
import { TickerBar } from "@/components/TickerBar";
import { ArchitecturalGrid } from "@/components/ArchitecturalGrid";
import { RevealManager } from "@/components/RevealManager";
import { BriefingDivider } from "@/components/BriefingDivider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-base-obsidian text-secondary-parchment relative">
      <RevealManager />
      <ArchitecturalGrid />
      
      <Hero />
      

      
      <IntelligenceStrip />
      
      <TrustStrip />
      
      <BriefingDivider label="SELECT CASE STUDIES" />
      
      <SelectedMandates />
      
      <BriefingDivider label="EXECUTION ARCHITECTURE" />
      
      <ServiceSection />
      
      <BriefingDivider label="REGIONAL CONNECTIVITY" />
      
      <HubGrid />
      
      <CinematicDivider />
      
      <FAQ />
      
      <FounderNarrative />
      
      <ContactCTA />
      
      <Footer />
      
      <TickerBar />
    </div>
  );
}

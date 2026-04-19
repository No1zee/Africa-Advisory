import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { SelectedMandates } from "@/components/SelectedMandates";
import { HubGrid } from "@/components/HubGrid";
import { ServiceSection } from "@/components/ServiceSection";
import { FounderNarrative } from "@/components/FounderNarrative";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { ArchitecturalGrid } from "@/components/ArchitecturalGrid";
import { RevealManager } from "@/components/RevealManager";
import { CredentialStrip } from "@/components/CredentialStrip";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <RevealManager />
      <ArchitecturalGrid />
      
      <div className="dark-half relative z-10 scale-[1.001]">
        <div className="reveal"><Hero /></div>
        <div className="reveal reveal-delay-2"><TrustStrip /></div>
        <div className="reveal"><SelectedMandates /></div>
      </div>
      
      <div className="relative z-20 transition-all duration-1000">
        <div className="reveal"><ServiceSection /></div>
        <div className="reveal"><HubGrid /></div>
        <div className="reveal"><FAQ /></div>
        <div className="reveal"><FounderNarrative /></div>
        <div className="reveal"><ContactCTA /></div>
      </div>
      
      <div className="dark-half">
        <div className="reveal"><CredentialStrip /></div>
        <Footer />
      </div>
    </div>
  );
}

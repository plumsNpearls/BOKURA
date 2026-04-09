import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ProblemSection } from "@/components/ProblemSection";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ThreeBackground } from "@/components/ThreeBackground";
import { FloatingCTA } from "@/components/FloatingCTA";
import { InquireModal } from "@/components/InquireModal";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { SectionReveal } from "@/components/SectionReveal";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-black text-foreground font-sans relative selection:bg-primary/30 scanline-overlay">
      <CustomCursor />
      <ScrollProgressBar />
      <ThreeBackground />

      <Navbar onOpenModal={handleOpenModal} />

      <main>
        <Hero onOpenModal={handleOpenModal} />

        <SectionReveal delay={0}>
          <Services />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ProblemSection />
        </SectionReveal>

        <SectionReveal delay={0}>
          <WhyUs />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <About />
        </SectionReveal>

        <SectionReveal delay={0}>
          <Testimonials />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <FAQ />
        </SectionReveal>

        <SectionReveal delay={0}>
          <FinalCTA onOpenModal={handleOpenModal} />
        </SectionReveal>
      </main>

      <SectionReveal delay={0}>
        <Footer />
      </SectionReveal>

      <FloatingCTA onOpenModal={handleOpenModal} />
      <InquireModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
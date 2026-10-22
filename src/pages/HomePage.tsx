import React, { useState } from 'react';
import { Skiper10 } from '../components/ui/skiper10';
import { HeroSection } from '../components/sections/HeroSection';
import { JourneySection } from '../components/sections/JourneySection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { CodingProfilesSection } from '../components/sections/CodingProfilesSection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { AchievementsSection } from '../components/sections/AchievementsSection';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* Skiper10: Double Stairs Preloader (renders first before the hero parallax) */}
      <Skiper10
        brandName="JAYANTH E"
        brandRole="AI & DATA SCIENCE"
        duration={1.8}
        numberOfColumns={5}
        onComplete={() => setIntroFinished(true)}
      />

      {/* Hero section with 3D Parallax ("JAYANTH" then "PORTFOLIO") unveiled after preloader */}
      <HeroSection />

      {/* Portfolio Chronology, Experience, Projects and Remaining Sections */}
      <JourneySection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CodingProfilesSection />
      <CertificatesSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;

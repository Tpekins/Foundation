import { Hero } from "../components/Hero";
import { Founder } from "../components/Founder";
import { Programs } from "../components/Programs";
import { ImpactStats } from "../components/ImpactStats";
import { RecentFieldLog } from "../components/RecentFieldLog";
import { CallToAction } from "../components/CallToAction";
import { Transect } from "../components/Transect";
import { SEO } from "../components/SEO";

export function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="From the cocoa farm to the classroom, we're proving that technology and agriculture can grow together. Our roots, mission, and the school we built from scratch - digital literacy, agriculture, and community care."
        path="/"
      />
      <Hero />
      <Transect thin />
      <Founder />
      <Programs />
      <ImpactStats />
      <RecentFieldLog />
      <CallToAction />
    </>
  );
}

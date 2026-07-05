import { Hero } from "../components/Hero";
import { Founder } from "../components/Founder";
import { Programs } from "../components/Programs";
import { ImpactStats } from "../components/ImpactStats";
import { RecentFieldLog } from "../components/RecentFieldLog";
import { CallToAction } from "../components/CallToAction";
import { Transect } from "../components/Transect";

export function Home() {
  return (
    <>
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

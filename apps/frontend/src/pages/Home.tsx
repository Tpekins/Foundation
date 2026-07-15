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
        title="Tiani Pekins Foundation"
        description="A grassroots engineering foundation in Buea, Cameroon - engineering the offline systems that keep digital literacy, agriculture, and community care running."
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

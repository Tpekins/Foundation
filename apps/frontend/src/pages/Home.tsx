import { Hero } from "../components/Hero";
import { Founder } from "../components/Founder";
import { Programs } from "../components/Programs";
import { Transect } from "../components/Transect";

export function Home() {
  return (
    <>
      <Hero />
      <Transect thin />
      <Founder />
      <Programs />
    </>
  );
}

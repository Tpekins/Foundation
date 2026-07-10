import { useState, useEffect } from "react";
import { Roots } from "../components/Roots";
import { SEO } from "../components/SEO";

export function AboutUs() {
  const [aboutData, setAboutData] = useState<{title: string, content: string, subtitle?: string} | null>(null);

  useEffect(() => {
    fetch('/api/about-us')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error("Failed to load about us data", err));
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about the Tiani Pekins Foundation our roots, mission, and the school we built from scratch in Buea, Cameroon."
        path="/about"
      />
      <section className="bg-soil text-paper relative overflow-hidden py-[80px] pb-[60px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(65deg, #fff 0, #fff 1px, transparent 1px, transparent 30px)" }}></div>
        <div className="max-w-[1140px] mx-auto px-7 relative z-10">
          <div className="font-mono text-[0.76rem] tracking-[0.12em] text-ochre uppercase mb-5 flex items-center gap-[10px]">
            <span className="text-signal">§</span> ABOUT THE FOUNDATION
          </div>
          <h1 className="font-display font-bold text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-6">
            {aboutData?.title || "Our Roots & Mission"}
          </h1>
          <p className="font-body text-[1.15rem] text-paper/[0.95] max-w-[620px] mb-8 leading-[1.6]">
            {aboutData?.subtitle || "This space is dedicated to our full story   how a vision born from local struggles turned into tangible action on the ground."}
          </p>
        </div>
      </section>
      
      <section className="bg-paper py-[78px]">
        <div className="max-w-[800px] mx-auto px-7">
          <div className="font-body text-ink-soft text-[1.15rem] leading-[1.8] space-y-6">
            {aboutData?.content ? (
              <p className="p-5 bg-paper-dim border border-ink-soft/10 text-ink rounded-sm whitespace-pre-wrap">
                {aboutData.content}
              </p>
            ) : (
              <p className="p-5 bg-paper-dim border border-ink-soft/10 italic text-ink rounded-sm">
                Our story is being written   check back soon for the full account of how a vision born from local struggles turned into tangible action on the ground.
              </p>
            )}
          </div>
        </div>
      </section>
      
      {/* We reuse the Roots component which documents the school building process */}
      <Roots />
    </>
  );
}

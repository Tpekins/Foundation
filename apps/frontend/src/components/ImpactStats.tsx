import { useState, useEffect } from "react";

interface Stat {
  value: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: "120+", label: "Children taught digital literacy" },
  { value: "1", label: "School built from scratch" },
  { value: "25+", label: "Community members engaged" },
  { value: "3", label: "Ongoing programs" },
];

export function ImpactStats() {
  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setStats(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-[78px]" style={{ background: "linear-gradient(180deg, #f5f0e8 0%, #ede4d4 100%)" }}>
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
          <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
            002 / Impact
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">Our impact, numbers that matter</h2>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          Not promises on paper   these are the real outcomes of showing up, week after week, in the communities we serve.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px]">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-ink leading-none mb-2">
                {stat.value}
              </p>
              <p className="font-body text-[0.9rem] text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

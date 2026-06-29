export function Programs() {
  return (
    <section className="bg-paper py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
          <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
            002 / Programs
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">What we actually do, week to week</h2>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          Not a single project   an ongoing set of commitments across the community. Each one runs on its own rhythm, and new visits get logged as they happen.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            { tag: "Digital Literacy", title: "Computers, from zero", desc: "Hands-on lessons for orphanage children who've never touched a keyboard   starting from the basics nobody taught us.", color: "border-t-cassava" },
            { tag: "Moral Education", title: "Character sessions, time to time", desc: "Recurring sessions at the community school focused on values and character, not just curriculum.", color: "border-t-laterite" },
            { tag: "Agriculture", title: "Farm days with the children", desc: "Harvesting cocoa and maize, planting together   hands-on work that doubles as a lesson in where food and effort come from.", color: "border-t-ochre" },
            { tag: "Giving", title: "Shoes, books, basics", desc: "Direct donations   shoes, school books, the everyday things that keep a child in class.", color: "border-t-cassava" },
            { tag: "Care Visits", title: "Hospitals & secondary schools", desc: "Recurring visits across multiple secondary schools and hospitals   not a one-time gesture, a standing commitment.", color: "border-t-laterite" },
          ].map((prog, i) => (
            <div key={i} className={`bg-paper border border-paper-dim border-t-4 ${prog.color} p-[26px_24px] rounded-sm transition-all hover:-translate-y-[3px] hover:shadow-[0_10px_22px_var(--color-ink)] hover:shadow-black/5`}>
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-soft uppercase mb-2 block">{prog.tag}</span>
              <h3 className="font-display font-bold text-[1.04rem] mb-2 text-ink">{prog.title}</h3>
              <p className="text-[0.92rem] text-ink-soft">{prog.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

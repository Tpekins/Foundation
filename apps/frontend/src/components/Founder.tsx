export function Founder() {
  return (
    <section id="founder" className="py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[50px] items-center">
          <div className="aspect-[16/9] md:aspect-[4/5] bg-[linear-gradient(160deg,var(--color-cassava-d),var(--color-soil))] rounded-sm flex items-center justify-center text-paper/[0.65] font-mono text-[0.78rem] text-center p-5 relative border border-paper-dim">
            [ Photo: Tiani harvesting cocoa, field site ]
            <div className="absolute bottom-[14px] left-[14px] font-mono text-[0.64rem] tracking-[0.08em] text-ochre">PHOTO   FIELD, BUEA</div>
          </div>
          <div>
            <blockquote className="font-body italic text-[1.3rem] leading-[1.5] text-ink border-l-[3px] border-laterite pl-6 mb-4">
              Growing up, I never had the chance to learn how to use a computer. Everything we build here   the school, the labs, the field visits   exists to close that same gap for the next child in this community.
            </blockquote>
            <p className="font-ui font-bold text-[0.93rem]">Tiani Pekins Ebika</p>
            <p className="font-ui text-ink-soft text-[0.84rem]">Founder & Lead Engineer</p>
            <a href="https://tianipekins.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] mt-4 font-ui font-semibold text-[0.84rem] text-laterite no-underline border-b border-current hover:text-ochre transition-colors">
              View technical research at tianipekins.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

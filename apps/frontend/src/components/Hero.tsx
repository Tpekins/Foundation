export function Hero() {
  return (
    <section className="bg-soil text-paper relative overflow-hidden py-[90px] pb-[76px]">
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(100deg,var(--color-paper)_0px,var(--color-paper)_1px,transparent_1px,transparent_34px)] opacity-[0.025]"></div>
      <div className="max-w-[1140px] mx-auto px-7 relative z-10">
        <div className="max-w-[760px]">
          <div className="font-mono text-[0.76rem] tracking-[0.12em] text-ochre uppercase mb-4 flex items-center gap-[10px] before:content-['§'] before:text-signal">
            FIELD LOG   BUEA, SILICON MOUNTAIN, CAMEROON
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.1] tracking-[-0.01em] mb-5">
            From <span className="text-ochre">red earth</span> to fingerprint sensor - we build the whole pipeline.
          </h1>
          <p className="font-body text-[1.12rem] text-paper/[0.92] max-w-[560px] mb-8">
            A grassroots foundation working across digital literacy, moral education, agriculture, and community care-engineering the offline hardware that runs underneath it, and giving Cameroon's informal workers a free way to be found.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <a href="/about#ourroots" className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] no-underline rounded-sm inline-flex items-center gap-2 transition-all cursor-pointer border-none bg-laterite text-paper hover:bg-ochre hover:text-soil hover:-translate-y-[1px] focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2">
              See the school build →
            </a>
            <a href="/initiatives" className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] no-underline rounded-sm inline-flex items-center gap-2 transition-all cursor-pointer border-[1.5px] border-paper/[0.6] text-paper bg-transparent hover:border-signal hover:text-signal hover:-translate-y-[1px] focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2">
              View our initiatives
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

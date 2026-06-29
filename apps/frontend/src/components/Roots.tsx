export function Roots() {
  return (
    <section id="ourroots" className="bg-paper-dim py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
          <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
            001 / Roots
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">Built with our hands, ground to roof.</h2>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          We don't design solutions on paper  we execute them. This is the permanent archive of our community school's full construction timeline, kept as proof of execution for partners and donors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[28px] mt-[36px]">
          <div className="bg-soil aspect-[16/10] rounded-sm flex items-center justify-center text-paper/[0.55] font-mono text-[0.76rem] text-center p-[18px] relative border border-ink/[0.1]">
            <span className="absolute w-[42px] h-[42px] rounded-full border-[1.5px] border-signal flex items-center justify-center text-signal top-[16px] left-[16px] text-[0.78rem]">▶</span>
            [ Video: School build, A to Z ]
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-[16/10]">
            <div className="bg-soil flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[foundation]</div>
            <div className="bg-soil/90 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[walls]</div>
            <div className="bg-soil/80 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[roofing]</div>
            <div className="bg-soil/95 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[opening day]</div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { DonateModal } from "./DonateModal";

export function CallToAction() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <>
      <section className="bg-soil text-paper py-[70px]">
        <div className="max-w-[1140px] mx-auto px-7 text-center">
          <div className="font-mono text-[0.74rem] tracking-[0.1em] text-ochre uppercase mb-4">
            Get Involved
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.4rem)] text-paper mb-4 tracking-[-0.01em]">
            Help us build what matters
          </h2>
          <p className="font-body text-paper/70 text-[1.05rem] max-w-[520px] mx-auto mb-8 leading-relaxed">
            Every donation keeps a child in class. Every partnership expands what we can build next.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setIsDonateOpen(true)}
              className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-8 py-[14px] bg-laterite text-paper rounded-sm hover:bg-ochre hover:text-soil transition-colors"
            >
              Donate Now
            </button>
            <a
              href="/our-roots"
              className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-8 py-[14px] border-[1.5px] border-paper/[0.5] text-paper rounded-sm hover:border-signal hover:text-signal transition-colors no-underline"
            >
              Learn More →
            </a>
          </div>
        </div>
      </section>
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </>
  );
}

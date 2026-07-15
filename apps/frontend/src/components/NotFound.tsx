import { Link } from "react-router-dom";
import { SEO } from "./SEO";

export function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to the Tiani Pekins Foundation homepage."
        path="/404"
      />
      <section className="bg-soil text-paper relative overflow-hidden py-[120px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(65deg, #fff 0, #fff 1px, transparent 1px, transparent 30px)" }}></div>
        <div className="max-w-[1140px] mx-auto px-7 relative z-10 text-center">
          <div className="font-mono text-[0.76rem] tracking-[0.12em] text-ochre uppercase mb-5 flex items-center justify-center gap-[10px]">
            <span className="text-signal">§</span> SIGNAL LOST
          </div>
          <h1 className="font-display font-extrabold text-[clamp(4rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em] mb-6 text-paper/20">
            404
          </h1>
          <p className="font-body text-[1.15rem] text-paper/[0.85] max-w-[420px] mx-auto mb-10 leading-[1.6]">
            This page doesn't exist yet. Maybe it's still underground, waiting to be built.
          </p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link
              to="/"
              className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] no-underline rounded-sm inline-flex items-center gap-2 transition-all cursor-pointer border-none bg-laterite text-paper hover:bg-ochre hover:text-soil hover:-translate-y-[1px]"
            >
              Back to Home →
            </Link>
            <Link
              to="/our-roots"
              className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] no-underline rounded-sm inline-flex items-center gap-2 transition-all cursor-pointer border-[1.5px] border-paper/[0.6] text-paper bg-transparent hover:border-signal hover:text-signal hover:-translate-y-[1px]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

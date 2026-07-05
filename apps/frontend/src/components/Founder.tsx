import { FounderCarousel } from "./FounderCarousel";

const FOUNDER_MEDIA = [
  {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=750&fit=crop",
    alt: "Tiani harvesting cocoa at the field site",
    label: "PHOTO   FIELD, BUEA",
  },
  {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=750&fit=crop",
    alt: "Teaching digital literacy in the community",
    label: "PHOTO   CLASSROOM, BUEA",
  },
  {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=750&fit=crop",
    alt: "Community outreach program",
    label: "PHOTO   COMMUNITY, BUEA",
  },
];

export function Founder() {
  return (
    <section id="founder" className="py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[50px] items-center">
          <FounderCarousel items={FOUNDER_MEDIA} autoSlideInterval={3000} />
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

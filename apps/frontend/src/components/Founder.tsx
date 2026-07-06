import { ZoomIn } from "lucide-react";
import { FounderCarousel } from "./FounderCarousel";

const FOUNDER_MEDIA = [
  {
    type: "image" as const,
    url: "https://res.cloudinary.com/dhhtwatmk/image/upload/q_auto:good,f_auto,w_800/v1783299122/IMG_4822_nzsaio.jpg",
    alt: "Tiani harvesting cocoa at the field site",
    label: "PHOTO   FIELD, BUEA",
  },
  {
    type: "image" as const,
    url: "https://res.cloudinary.com/dhhtwatmk/image/upload/q_auto:good,f_auto,w_800/v1783299120/IMG_4911_-_Copy_snzfyf.jpg",
    alt: "Teaching digital literacy in the community",
    label: "PHOTO   CLASSROOM, BUEA",
  },
  {
    type: "image" as const,
    url: "https://res.cloudinary.com/dhhtwatmk/image/upload/q_auto:good,f_auto,w_800/v1783299123/IMG_4917_uhdlrg.jpg",
    alt: "Community outreach program",
    label: "PHOTO   COMMUNITY, BUEA",
  },
  {
    type: "image" as const,
    url: "https://res.cloudinary.com/dhhtwatmk/image/upload/q_auto:good,f_auto,w_800/v1783300887/yu_pbbdoc.jpg",
    alt: "Field work in progress",
    label: "PHOTO   FIELD WORK, BUEA",
  },
  {
    type: "image" as const,
    url: "https://res.cloudinary.com/dhhtwatmk/image/upload/q_auto:good,f_auto,w_800/v1783300325/IMG_4979_-_Copy_adicsn.jpg",
    alt: "Team collaboration session",
    label: "PHOTO   TEAM, BUEA",
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
              Growing up, I never had the chance to learn how to use a computer. Everything we build here the school, the labs, the field visits exists to close that same gap for the next child in this community. From the cocoa farm to the classroom, we're proving that technology and agriculture can grow together.
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

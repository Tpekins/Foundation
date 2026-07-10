import { useState, useEffect } from "react";
import { FounderCarousel } from "./FounderCarousel";

interface RootsSection {
  id: string;
  section: string;
  order: number;
  title: string;
  description: string;
  videoTitle: string;
  youtubeId: string | null;
  imageUrls: string;
}

const DEFAULT_SECTIONS: RootsSection[] = [
  {
    id: 'default-build',
    section: 'build',
    order: 0,
    title: 'Built with our hands, ground to roof.',
    description: "We don't design solutions on paper we execute them. This is the permanent archive of our community school's full construction timeline from first stone to final beam.",
    videoTitle: 'School build, A to Z',
    youtubeId: null,
    imageUrls: '[]',
  },
  {
    id: 'default-transformation',
    section: 'transformation',
    order: 1,
    title: 'From construction to classroom',
    description: 'We laid the foundation not just in soil, but in hope. Today, children sit where we dreamed. They fill it with life.',
    videoTitle: '',
    youtubeId: null,
    imageUrls: '[]',
  },
  {
    id: 'default-computer-lab',
    section: 'computer-lab',
    order: 2,
    title: 'Building the computer lab, component by component.',
    description: "No lab exists yet we're building one from scratch. Local machines, hand-built benches, wired by our own hands.",
    videoTitle: 'Computer lab build, from scratch',
    youtubeId: null,
    imageUrls: '[]',
  },
  {
    id: 'default-children-lab',
    section: 'children-lab',
    order: 3,
    title: 'The children now inside the laboratory learning.',
    description: 'Where there was nothing, now there are fingers on keyboards and eyes on screens.',
    videoTitle: '',
    youtubeId: null,
    imageUrls: '[]',
  },
];

const DEFAULT_MEDIA: Record<string, { type: "image"; url: string; alt: string; label: string }[]> = {
  transformation: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=500&fit=crop",
      alt: "Construction phase - team at uncompleted school",
      label: "CONSTRUCTION   IN PROGRESS",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=500&fit=crop",
      alt: "Opening day - students in uniform at completed school",
      label: "OPENING DAY   FIRST CLASS",
    },
  ],
  "children-lab": [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=900&h=500&fit=crop",
      alt: "Children learning on computers in the lab",
      label: "LEARNING   IN PROGRESS",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=500&fit=crop",
      alt: "Students exploring digital tools",
      label: "DIGITAL   LITERACY",
    },
  ],
};

export function Roots() {
  const [sections, setSections] = useState<RootsSection[]>(DEFAULT_SECTIONS);

  useEffect(() => {
    fetch('/api/roots')
      .then(res => res.json())
      .then((data: RootsSection[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSections(data);
        }
      })
      .catch(err => console.error("Failed to load roots data", err));
  }, []);

  const getImages = (section: RootsSection): string[] => {
    if (!section.imageUrls) return [];
    try {
      return JSON.parse(section.imageUrls);
    } catch {
      return [];
    }
  };

  const getMedia = (section: RootsSection) => {
    const images = getImages(section);
    if (images.length > 0) {
      return images.map((url, i) => ({
        type: "image" as const,
        url,
        alt: `${section.title} - image ${i + 1}`,
        label: "",
      }));
    }
    return DEFAULT_MEDIA[section.section] || [];
  };

  const renderSection = (section: RootsSection) => {
    const sectionNumber = String(section.order + 1).padStart(3, '0');
    const images = getImages(section);
    const media = getMedia(section);

    if (section.section === 'build' || section.section === 'computer-lab') {
      return renderGridSection(section, sectionNumber, images);
    }

    if (section.section === 'transformation' || section.section === 'children-lab') {
      return renderCarouselSection(section, sectionNumber, media);
    }

    return null;
  };

  const renderGridSection = (section: RootsSection, sectionNumber: string, images: string[]) => {
    return (
      <div key={section.id} className="mb-[60px]">
        <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
          <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
            {sectionNumber} / Roots
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">
            {section.title}
          </h2>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          {section.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[28px]">
          {section.youtubeId ? (
            <div className="aspect-[16/10] rounded-sm overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${section.youtubeId}`}
                title={section.videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="bg-soil aspect-[16/10] rounded-sm flex items-center justify-center text-paper/[0.55] font-mono text-[0.76rem] text-center p-[18px] relative border border-ink/[0.1]">
              <span className="absolute w-[42px] h-[42px] rounded-full border-[1.5px] border-signal flex items-center justify-center text-signal top-[16px] left-[16px] text-[0.78rem]">▶</span>
              [ Video: {section.videoTitle || "Coming soon"} ]
            </div>
          )}
          <div className="grid grid-cols-2 gap-1 aspect-[16/10]" style={{ gridTemplateRows: images.length > 2 ? '1fr 1fr' : '1fr' }}>
            {images.length > 0 ? (
              images.map((url, i) => (
                <div key={i} className="bg-soil/90 rounded-[1px] overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <>
                <div className="bg-soil flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[foundation]</div>
                <div className="bg-soil/90 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[walls]</div>
                <div className="bg-soil/80 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[roofing]</div>
                <div className="bg-soil/95 flex items-center justify-center text-paper/[0.45] font-mono text-[0.68rem] rounded-[1px]">[opening day]</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCarouselSection = (section: RootsSection, sectionNumber: string, media: { type: "image"; url: string; alt: string; label: string }[]) => {
    return (
      <div key={section.id} className="mb-[60px]">
        <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
          <span className="font-mono text-[0.74rem] tracking-[0.1em] text-cassava bg-cassava/[0.08] border border-cassava/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
            {sectionNumber} / Roots
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">
            {section.title}
          </h2>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          {section.description}
        </p>
        <div className="w-full">
          <FounderCarousel
            items={media}
            autoSlideInterval={4000}
            aspectRatio="21/9"
          />
        </div>
      </div>
    );
  };

  return (
    <section id="ourroots" className="bg-paper-dim py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        {sections.map(renderSection)}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { FounderCarousel } from "./FounderCarousel";

interface RootsData {
  title: string;
  description: string;
  videoTitle: string;
  youtubeId: string | null;
  imageUrls: string;
}

const TRANSFORMATION_MEDIA = [
  {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=500&fit=crop",
    alt: "Construction phase - team at uncompleted school",
    label: "CONSTRUCTION   IN PROGRESS",
  },
  {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=500&fit=crop",
    alt: "Opening day - students in uniform at completed school",
    label: "OPENING DAY   FIRST CLASS",
  },
];

export function Roots() {
  const [data, setData] = useState<RootsData | null>(null);

  useEffect(() => {
    fetch('/api/roots')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load roots data", err));
  }, []);

  const images: string[] = (() => {
    if (!data?.imageUrls) return [];
    try {
      return JSON.parse(data.imageUrls);
    } catch {
      return [];
    }
  })();

  return (
    <section id="ourroots" className="bg-paper-dim py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">

        {/* 001 / Roots - The Build Archive */}
        <div className="mb-[60px]">
          <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
            <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
              001 / Roots
            </span>
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">
              {data?.title || "Built with our hands, ground to roof."}
            </h2>
          </div>
          <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
            {data?.description || "We don't design solutions on paper  we execute them. This is the permanent archive of our community school's full construction timeline  from first stone to final beam."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[28px]">
            {data?.youtubeId ? (
              <div className="aspect-[16/10] rounded-sm overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${data.youtubeId}`}
                  title={data.videoTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="bg-soil aspect-[16/10] rounded-sm flex items-center justify-center text-paper/[0.55] font-mono text-[0.76rem] text-center p-[18px] relative border border-ink/[0.1]">
                <span className="absolute w-[42px] h-[42px] rounded-full border-[1.5px] border-signal flex items-center justify-center text-signal top-[16px] left-[16px] text-[0.78rem]">▶</span>
                [ Video: {data?.videoTitle || "School build, A to Z"} ]
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

        {/* 002 / The Transformation - Before & After */}
        <div>
          <div className="flex items-baseline gap-[18px] mb-[14px] flex-wrap">
            <span className="font-mono text-[0.74rem] tracking-[0.1em] text-cassava bg-cassava/[0.08] border border-cassava/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
              002 / Roots
            </span>
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">
              From construction to classroom
            </h2>
          </div>
          <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
            We laid the foundation not just in soil, but in hope. Today, children sit where we dreamed. They fill it with life.
          </p>
          <div className="w-full">
            <FounderCarousel
              items={TRANSFORMATION_MEDIA}
              autoSlideInterval={4000}
              aspectRatio="21/9"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

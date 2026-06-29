import { useEffect, useState } from "react";
import type { FoundationLog } from "../types";

interface FormattedLog {
  id: string;
  date: string;
  isNew: boolean;
  tag: string;
  tagColor: string;
  title: string;
  content: string;
  imageUrls: string[];
  youtubeId: string | null;
}

const tagColorMap: Record<string, string> = {
  DONATION: 'text-laterite bg-laterite/[0.08] border-laterite/[0.25]',
  EDUCATION: 'text-cassava bg-cassava/[0.08] border-cassava/[0.25]',
  AGRICULTURE: 'text-ochre bg-ochre/[0.08] border-ochre/[0.25]',
  INFRASTRUCTURE: 'text-signal bg-signal/[0.08] border-signal/[0.25]',
  VISIT: 'text-ink-soft bg-ink-soft/[0.08] border-ink-soft/[0.25]',
};

// Tracks which entry's photo array is open in the lightbox, and which photo
// within that array is currently showing. null = closed.
interface LightboxState {
  logId: string;
  images: string[];
  index: number;
}

// A single photo thumbnail. Clicking it opens the lightbox for this entry's
// full photo set, starting at this photo's position.
function PhotoCard({
  url,
  onClick,
}: {
  url: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[150px] h-[110px] bg-paper-dim border border-ink-soft/30 rounded-sm overflow-hidden group cursor-zoom-in"
      aria-label="View larger photo"
    >
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-hover:brightness-95"
      />
    </button>
  );
}

function VideoCard({ youtubeId }: { youtubeId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="w-[150px] h-[110px] rounded-sm overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="Field log video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="relative w-[150px] h-[110px] bg-paper-dim border border-ink-soft/30 rounded-sm overflow-hidden group"
      aria-label="Play video"
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        className="w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/30 group-hover:bg-ink/40 transition-colors">
        <span className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-paper ml-[2px]" />
      </span>
    </button>
  );
}

// Full-screen overlay showing one photo at a time, with left/right arrow
// navigation through the current entry's own photo set only (never crosses
// into another log entry's photos).
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-paper/80 hover:text-paper font-mono text-[0.8rem] tracking-[0.1em] uppercase border border-paper/30 rounded-sm px-3 py-1.5 hover:border-paper/60 transition-colors"
        aria-label="Close"
      >
        Close ✕
      </button>

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-paper/80 hover:text-paper text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-paper/10 transition-colors"
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      <img
        src={images[index]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-paper/80 hover:text-paper text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-paper/10 transition-colors"
          aria-label="Next photo"
        >
          ›
        </button>
      )}

      {hasMultiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.74rem] text-paper/70 tracking-[0.08em]">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export function FieldLog() {
  const [logs, setLogs] = useState<FormattedLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    fetch('/api/field-logs')
      .then(res => res.json())
      .then(data => {
        // Map backend format to frontend UI format
        const formatted = data.map((log: FoundationLog, index: number) => {
          const dateObj = new Date(log.eventDate);
          const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
          const year = dateObj.getFullYear();

          // Parse imageUrls defensively: a malformed value on a single row
          // (e.g. a URL saved without quotes) shouldn't take down every
          // other entry on the page. Worst case, that one entry just shows
          // no photos instead of crashing the whole fetch.
          let parsedImageUrls: string[] = [];
          try {
            parsedImageUrls = log.imageUrls ? JSON.parse(log.imageUrls) : [];
          } catch {
            console.error(`FieldLog ${log.id}: imageUrls is not valid JSON ->`, log.imageUrls);
            parsedImageUrls = [];
          }

          return {
            id: log.id,
            date: `${month} ${year}`,
            isNew: index === 0, // Mark first item as new
            tag: log.category?.toUpperCase() || 'DONATION',
            tagColor: tagColorMap[log.category?.toUpperCase()] || 'text-laterite bg-laterite/[0.08] border-laterite/[0.25]',
            title: log.title,
            content: log.content,
            imageUrls: parsedImageUrls,
            youtubeId: log.youtubeId || null,
          };
        });

        // If empty (e.g. database not populated yet), use a fallback array
        if (formatted.length === 0) {
          setLogs([
            {
              id: '1',
              date: 'JUN 2024',
              isNew: true,
              tag: 'DONATION',
              tagColor: 'text-laterite bg-laterite/[0.08] border-laterite/[0.25]',
              title: 'Books and shoes delivered to St. Mary\'s Orphanage',
              content: 'A small drop-off of school books and shoes ahead of the new term   the kind of basics that keep a child in class.',
              imageUrls: [],
              youtubeId: null,
            }
          ]);
        } else {
          setLogs(formatted);
        }
      })
      .catch(err => {
        console.error("Failed to fetch logs", err);
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Derive the available filter pills from whatever tags actually exist in the
  // fetched logs, so this never goes stale as new categories get added later.
  const filterOptions = ['ALL', ...Array.from(new Set(logs.map(log => log.tag)))];

  const visibleLogs = activeFilter === 'ALL'
    ? logs
    : logs.filter(log => log.tag === activeFilter);

  function openLightbox(logId: string, images: string[], index: number) {
    setLightbox({ logId, images, index });
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function showPrev() {
    setLightbox((current) => {
      if (!current) return current;
      const newIndex = (current.index - 1 + current.images.length) % current.images.length;
      return { ...current, index: newIndex };
    });
  }

  function showNext() {
    setLightbox((current) => {
      if (!current) return current;
      const newIndex = (current.index + 1) % current.images.length;
      return { ...current, index: newIndex };
    });
  }

  return (
    <>
      <section className="bg-soil text-paper relative overflow-hidden py-[80px] pb-[60px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(65deg, #fff 0, #fff 1px, transparent 1px, transparent 30px)" }}></div>
        <div className="max-w-[1140px] mx-auto px-7 relative z-10">
          <div className="font-mono text-[0.76rem] tracking-[0.12em] text-ochre uppercase mb-5 flex items-center gap-[10px]">
            <span className="text-signal">§</span> RUNNING RECORD
          </div>
          <h1 className="font-display font-bold text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-6">
            The Field Log
          </h1>
          <p className="font-body text-[1.15rem] text-paper/[0.95] max-w-[620px] mb-8 leading-[1.6]">
            Every visit, donation, and conversation   logged as it happens.<br />
            Newest entries always appear first; nothing here is ever reordered by hand.
          </p>
        </div>
      </section>

      <section id="fieldlog" className="bg-paper py-[78px]">
        <div className="max-w-[1140px] mx-auto px-7">
          <div className="flex items-center gap-3 flex-wrap mb-[10px]">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`font-mono text-[0.72rem] tracking-[0.08em] uppercase px-[16px] py-[8px] rounded-full border transition-colors ${
                    isActive
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-transparent text-ink-soft border-ink-soft/30 hover:border-ink-soft/60 hover:text-ink'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Solid black divider, sitting right below the filter row */}
          <div className="border-t-2 border-ink mb-[10px]" />

          <div>
            {visibleLogs.length === 0 ? (
              <p className="font-body text-ink-soft text-[0.95rem] py-[40px]">
                No entries yet in this category.
              </p>
            ) : (
              visibleLogs.map((log, i) => (
                <div key={log.id} className={`grid grid-cols-1 md:grid-cols-[130px_1fr] gap-[30px] py-[35px] ${i === 0 ? '' : 'border-t border-ink-soft/10'}`}>
                  <div className="font-mono text-[0.74rem] text-ink-soft uppercase tracking-wider">
                    {log.date}<br/>
                    {log.isNew && <span className="inline-block mt-2 font-mono text-[0.6rem] tracking-[0.08em] text-soil bg-ochre px-[7px] py-[2px] rounded-sm font-bold">NEW</span>}
                  </div>
                  <div>
                    <span className={`inline-block font-mono text-[0.64rem] tracking-[0.1em] uppercase px-[10px] py-[3px] rounded-sm mb-[14px] border ${log.tagColor}`}>
                      {log.tag}
                    </span>
                    <h3 className="font-display font-bold text-[1.25rem] mb-2 text-ink">{log.title}</h3>
                    <p className="font-body text-ink-soft text-[1rem] max-w-[700px] mb-5 leading-relaxed">{log.content}</p>

                    {(log.imageUrls.length > 0 || log.youtubeId) && (
                      <div className="flex gap-3 flex-wrap">
                        {log.imageUrls.map((url, idx) => (
                          <PhotoCard
                            key={idx}
                            url={url}
                            onClick={() => openLightbox(log.id, log.imageUrls, idx)}
                          />
                        ))}
                        {log.youtubeId && <VideoCard youtubeId={log.youtubeId} />}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim text-ink relative overflow-hidden py-[70px] pb-[50px]">
        <div className="max-w-[1140px] mx-auto px-7 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[60px] items-center">
            <div>
              <h1 className="font-display font-bold text-[clamp(1.4rem,2vw,1.8rem)] leading-[1.1] tracking-[-0.01em] mb-4">
                How this page grows
              </h1>
              <p className="font-body text-[1rem] text-ink-soft max-w-[560px] leading-relaxed">
                Every time a new visit, donation, or interview happens, it gets added as one entry. The newest one always lands at the top   older entries quietly move down, in order, with no manual reshuffling. You only ever have to write the new one.
              </p>
            </div>
            <div className="bg-soil border border-paper/[0.1] p-6 rounded-sm font-mono text-[0.7rem] leading-[2.2] tracking-[0.05em] text-paper/60">
              <div className="text-signal flex items-center gap-2 mb-2">
                 <span className="bg-signal text-soil px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold">[NEW ENTRY]</span> 
                 <span>&gt; ARRIVES AT TOP</span>
              </div>
              <div>MAY 2024   DONATION</div>
              <div>MAY 2024   EQUIPMENT</div>
              <div>APR 2024   AGRICULTURE</div>
              <div className="mt-3 pt-3 border-t border-paper/10 text-ochre/80">... & everything else moves down</div>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

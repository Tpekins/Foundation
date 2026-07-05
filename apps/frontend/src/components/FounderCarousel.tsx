import { useState, useEffect, useCallback } from "react";

interface CarouselMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
  label?: string;
  thumbnailUrl?: string;
}

interface FounderCarouselProps {
  items: CarouselMedia[];
  autoSlideInterval?: number;
  aspectRatio?: string;
  className?: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function FounderCarousel({
  items,
  autoSlideInterval = 3000,
  aspectRatio = "4/5",
  className = "",
}: FounderCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const interval = setInterval(goToNext, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, autoSlideInterval, goToNext, items.length]);

  const renderMedia = (item: CarouselMedia) => {
    if (item.type === "video") {
      const youtubeId = extractYouTubeId(item.url);
      if (youtubeId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`}
            title={item.alt || "Video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          controls
          muted
          playsInline
          poster={item.thumbnailUrl}
        />
      );
    }
    return (
      <img
        src={item.url}
        alt={item.alt || ""}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div
      className={`relative w-full rounded-sm overflow-hidden border border-paper-dim ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${(index - activeIndex) * 100}%)`,
            }}
          >
            {renderMedia(item)}
            {item.label && (
              <div className="absolute bottom-[14px] left-[14px] font-mono text-[0.64rem] tracking-[0.08em] text-ochre">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-paper scale-110"
                  : index === (activeIndex + 1) % items.length
                  ? "bg-paper/60"
                  : "bg-paper/30"
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

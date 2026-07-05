import { useState, useEffect } from "react";

interface FieldLogEntry {
  id: string;
  date: string;
  tag: string;
  title: string;
  content: string;
}

const tagColorMap: Record<string, string> = {
  DONATION: "text-laterite",
  EDUCATION: "text-cassava",
  AGRICULTURE: "text-ochre",
  INFRASTRUCTURE: "text-signal",
  VISIT: "text-ink-soft",
};

export function RecentFieldLog() {
  const [entries, setEntries] = useState<FieldLogEntry[]>([]);

  useEffect(() => {
    fetch("/api/field-logs")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.slice(0, 3).map((log: { id: string; eventDate: string; category?: string; title: string; content: string }) => {
          const dateObj = new Date(log.eventDate);
          const month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
          const year = dateObj.getFullYear();
          return {
            id: log.id,
            date: `${month} ${year}`,
            tag: log.category?.toUpperCase() || "UPDATE",
            title: log.title,
            content: log.content,
          };
        });
        setEntries(formatted);
      })
      .catch(() => {});
  }, []);

  if (entries.length === 0) return null;

  return (
    <section className="bg-paper-dim py-[78px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="flex items-baseline justify-between mb-[14px] flex-wrap gap-4">
          <div className="flex items-baseline gap-[18px] flex-wrap">
            <span className="font-mono text-[0.74rem] tracking-[0.1em] text-laterite bg-laterite/[0.08] border border-laterite/[0.25] px-[9px] py-[3px] rounded-sm uppercase whitespace-nowrap">
              003 / Field Log
            </span>
            <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] text-ink tracking-[-0.01em]">
              From the Field
            </h2>
          </div>
          <a
            href="/field-log"
            className="font-ui font-bold text-[0.78rem] tracking-[0.04em] uppercase text-laterite hover:text-ochre transition-colors no-underline"
          >
            View all entries →
          </a>
        </div>
        <p className="font-body italic text-ink-soft text-[1.05rem] max-w-[620px] mb-[34px]">
          Every visit, donation, and conversation  logged as it happens. Here are the latest.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {entries.map((entry) => (
            <a
              key={entry.id}
              href="/field-log"
              className="block bg-paper border border-paper-dim p-[24px] rounded-sm hover:-translate-y-[2px] hover:shadow-[0_8px_20px_var(--color-ink)] hover:shadow-black/5 transition-all no-underline"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[0.68rem] text-ink-soft tracking-wider">
                  {entry.date}
                </span>
                <span
                  className={`font-mono text-[0.6rem] tracking-[0.1em] uppercase ${tagColorMap[entry.tag] || "text-ink-soft"}`}
                >
                  {entry.tag}
                </span>
              </div>
              <h3 className="font-display font-bold text-[1rem] text-ink mb-2 leading-snug">
                {entry.title}
              </h3>
              <p className="font-body text-ink-soft text-[0.88rem] line-clamp-2">
                {entry.content}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

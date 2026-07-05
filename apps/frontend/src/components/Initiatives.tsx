import { useState, useEffect, useMemo } from "react";
import { DonateModal } from "./DonateModal";
import { PartnerModal } from "./PartnerModal";
import type { Initiative } from "../types";

interface InitiativeCard {
  id: string;
  category?: string;
  status: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string | null;
  color: string;
}

const INITIATIVE_CATEGORIES = [
  'ALL', 'AGRICULTURE', 'EDUCATION', 'ENVIRONMENT',
  'GIG ECONOMY', 'HEALTH', 'TECH INFRASTRUCTURE'
];

export function Initiatives() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [initiatives, setInitiatives] = useState<InitiativeCard[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/initiatives')
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setInitiatives([
            {
              id: '1',
              category: 'GIG ECONOMY',
              status: 'Active   incubated, not owned',
              title: 'LocalHands.Africa',
              description: 'A free platform connecting local artisans   painters, diggers, hawkers   directly with the clients who need them.',
              link: 'https://localhands.africa',
              imageUrl: null,
              color: 'from-signal to-ochre'
            },
            {
              id: '2',
              category: 'TECH INFRASTRUCTURE',
              status: 'Hardware Deployment',
              title: 'Smart Infrastructure',
              description: 'Offline Biometric School Attendance System. A low-cost fingerprint attendance log that runs entirely offline against a localized database.',
              link: '#',
              imageUrl: null,
              color: 'from-cassava to-signal'
            }
          ]);
        } else {
          setInitiatives(data.map((item: Initiative, idx: number) => ({
            ...item,
            color: idx % 2 === 0 ? 'from-signal to-ochre' : 'from-cassava to-signal'
          })));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const visibleInitiatives = activeFilter === 'ALL'
    ? initiatives
    : initiatives.filter(item =>
        (item.category ?? '').toUpperCase() === activeFilter
      );

  return (
    <>
      <section className="bg-soil text-paper relative overflow-hidden py-[80px] pb-[60px]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(65deg, #fff 0, #fff 1px, transparent 1px, transparent 30px)" }}></div>
        <div className="max-w-[1140px] mx-auto px-7 relative z-10">
          <div className="font-mono text-[0.76rem] tracking-[0.12em] text-ochre uppercase mb-5 flex items-center gap-[10px]">
            <span className="text-signal">§</span> INCUBATED PROJECTS
          </div>
          <h1 className="font-display font-bold text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-6">
            Initiatives
          </h1>
          <p className="font-body text-[1.15rem] text-paper/[0.95] max-w-[620px] mb-8 leading-[1.6]">
            Independent projects we've built or incubated. Every new initiative lands here as its own card   the navigation stays simple no matter how many projects this grows to.
          </p>
        </div>
      </section>

      <section id="initiatives" className="bg-paper py-[78px]">
        <div className="max-w-[1140px] mx-auto px-7">

          <div className="flex items-center gap-3 flex-wrap mb-[10px]">
            {INITIATIVE_CATEGORIES.map((option) => {
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

          <div className="h-[2px] bg-gradient-to-r from-signal/50 via-ochre/40 to-signal/50 mb-9" />

          {visibleInitiatives.length === 0 ? (
            <p className="font-body text-ink-soft text-[0.95rem] py-[40px]">
              No initiatives yet in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
              {visibleInitiatives.map(initiative => (
                <div key={initiative.id} className="bg-soil rounded-[4px] p-[34px] relative overflow-hidden transition-transform hover:-translate-y-[3px] group">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${initiative.color || 'from-signal to-ochre'}`}></div>
                  <div className="flex gap-6">
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[0.66rem] tracking-[0.1em] uppercase text-signal mb-3 block">{initiative.status}</span>
                      <h3 className="font-display font-extrabold text-[1.3rem] text-paper mb-3">{initiative.title}</h3>
                      <p className="text-paper/[0.85] text-[0.94rem] mb-5">
                        {initiative.description}
                      </p>
                      {initiative.link && (
                        <a href={initiative.link} target={initiative.link?.startsWith('http') ? "_blank" : undefined} rel={initiative.link?.startsWith('http') ? "noopener noreferrer" : undefined} className="font-ui font-bold text-[0.74rem] tracking-[0.04em] uppercase px-[18px] py-[10px] rounded-sm inline-flex items-center transition-all cursor-pointer border-[1.5px] border-paper/[0.6] text-paper bg-transparent hover:border-signal hover:text-signal no-underline w-fit">
                          See how it works →
                        </a>
                      )}
                    </div>
                    {initiative.imageUrl && (
                      <div className="w-[140px] shrink-0 aspect-square rounded-[3px] overflow-hidden border border-paper/[0.15] group-hover:border-signal/40 transition-colors duration-300">
                        <img src={initiative.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 p-8 bg-paper border border-paper-dim rounded-sm">
             <h3 className="font-display font-bold text-xl text-ink mb-2">Join the Signal</h3>
             <p className="font-body text-ink-soft">We are open to collaborations with institutions, hardware engineers, and educators who share our vision for a technologically grounded Cameroon.</p>
             <div className="flex flex-wrap gap-4 mt-4">
               <button 
                 onClick={() => setIsPartnerOpen(true)}
                 className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] bg-laterite text-paper rounded-sm hover:bg-ochre hover:text-soil transition-colors"
               >
                  Partner with us
               </button>
               <button 
                 onClick={() => setIsDonateOpen(true)}
                 className="font-ui font-bold text-[0.8rem] tracking-[0.04em] uppercase px-6 py-[13px] bg-soil text-paper rounded-sm hover:bg-ink hover:text-paper transition-colors"
               >
                 Donate
               </button>
             </div>
          </div>
        </div>
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <PartnerModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
    </section>
    </>
  );
}

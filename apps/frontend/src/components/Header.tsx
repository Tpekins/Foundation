import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Transect } from "./Transect";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Our Roots', path: '/our-roots' },
    { name: 'Initiatives', path: '/initiatives' },
    { name: 'Field Log', path: '/field-log' }
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <Transect />
      <header className="bg-paper border-b border-paper-dim sticky top-0 z-50">
        <div className="w-full px-8 md:px-12 lg:px-[6vw] mx-auto py-[18px] flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-[10px] font-display font-extrabold text-[1.05rem] text-ink no-underline transition-all duration-300 ease-out hover:scale-105 hover:text-laterite">
            <span className="w-[10px] h-[10px] rounded-full bg-laterite shadow-[0_0_0_3px_var(--color-paper),0_0_0_4px_var(--color-soil)] shrink-0"></span>
            TIANI PEKINS<span className="text-ink-soft font-semibold text-[0.7em] ml-[2px]">.ORG</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex flex-wrap gap-[22px] list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `font-ui font-semibold text-[0.72rem] tracking-[0.06em] uppercase no-underline pb-1 transition-colors border-b-2 ${
                        isActive 
                          ? 'text-laterite border-laterite' 
                          : 'text-ink-soft border-transparent hover:text-laterite hover:border-laterite focus-visible:text-laterite focus-visible:border-laterite'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-[40px] h-[40px] gap-[5px] bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300"></span>
            <span className="block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300"></span>
            <span className="block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300"></span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-soil z-[200] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: 0 }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-[12px] right-[12px] w-[44px] h-[44px] bg-ochre flex items-center justify-center border-none cursor-pointer z-[210]"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" className="text-ink" />
            <line x1="18" y1="6" x2="6" y2="18" className="text-ink" />
          </svg>
        </button>

        {/* Nav links */}
        <ul className="list-none m-0 p-[70px_30px_30px] flex flex-col items-center">
          {navItems.map((item) => (
            <li key={item.name} className="w-full text-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block py-[18px] text-paper no-underline text-[16px] font-ui font-semibold tracking-[0.08em] uppercase border-b border-paper/25 transition-colors ${
                    isActive ? 'text-ochre' : 'text-paper hover:text-ochre'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

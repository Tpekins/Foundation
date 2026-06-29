import { Link, NavLink } from "react-router-dom";
import { Transect } from "./Transect";

export function Header() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Our Roots', path: '/about' },
    { name: 'Initiatives', path: '/initiatives' },
    { name: 'Field Log', path: '/field-log' }
  ];

  return (
    <>
      <Transect />
      <header className="bg-paper border-b border-paper-dim sticky top-0 z-50">
        <div className="w-full px-8 md:px-12 lg:px-[6vw] mx-auto py-[18px] flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-[10px] font-display font-extrabold text-[1.05rem] text-ink no-underline transition-all duration-300 ease-out hover:scale-105 hover:text-laterite">
            <span className="w-[10px] h-[10px] rounded-full bg-laterite shadow-[0_0_0_3px_var(--color-paper),0_0_0_4px_var(--color-soil)] shrink-0"></span>
            TIANI PEKINS<span className="text-ink-soft font-semibold text-[0.7em] ml-[2px]">.ORG</span>
          </Link>
          <nav className="flex items-center gap-6 flex-wrap">
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
        </div>
      </header>
    </>
  );
}

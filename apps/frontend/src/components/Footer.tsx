export function Footer() {
  return (
    <footer className="bg-soil text-paper py-[54px] pb-[34px]">
      <div className="max-w-[1140px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] mb-[34px]">
          <div className="text-center md:text-left">
            <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ochre uppercase mb-[10px] block">General & Donations</span>
            <a href="mailto:info@tianipekins.org" className="font-ui text-[0.88rem] text-paper/[0.92] no-underline hover:text-signal block mb-3">info@tianipekins.org</a>
          </div>
          <div className="text-center">
            <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ochre uppercase mb-[10px] block">Smart Lab Collaborations</span>
            <a href="mailto:labs@tianipekins.org" className="font-ui text-[0.88rem] text-paper/[0.92] no-underline hover:text-signal block">labs@tianipekins.org</a>
          </div>
          <div className="text-center md:text-right">
            <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ochre uppercase mb-[10px] block">Engineering Portfolio</span>
            <a href="https://tianipekins.com/" target="_blank" rel="noopener" className="font-ui text-[0.88rem] text-paper/[0.92] no-underline hover:text-signal block mb-1">tianipekins.com</a>
            <a href="mailto:tiani@tianipekins.com" className="font-ui text-[0.88rem] text-paper/[0.92] no-underline hover:text-signal block">tiani@tianipekins.com</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center pt-6 border-t border-paper/[0.15] font-mono text-[0.7rem] text-paper/[0.6] gap-[10px] text-center">
          <span>© 2026 Tiani Pekins Foundation   Buea, Cameroon</span>
          <span>Ground to Signal</span>
        </div>
      </div>
    </footer>
  );
}

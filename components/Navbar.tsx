'use client';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const items = [{ href: '#projects', label: 'Work' }, { href: '#skills', label: 'AI Stack' }, { href: '#background', label: 'Experience' }, { href: '#contact', label: 'Contact' }];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#projects');
  useEffect(() => {
    const sections = items.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/90 backdrop-blur">
    <nav className="shell flex h-16 items-center justify-between" aria-label="Main navigation">
      <a href="#top" className="font-display text-base font-semibold tracking-tight text-white md:text-[17px]">RITIK <span className="text-signal">MISHRA</span></a>
      <div className="hidden items-center gap-7 md:flex">{items.map((item) => <a key={item.href} href={item.href} className={`nav-link relative py-2 ${active === item.href ? 'text-white' : ''}`} aria-current={active === item.href ? 'location' : undefined}>{item.label}{active === item.href && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-signal" />}</a>)}</div>
      <button className="rounded-md p-2 text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div id="mobile-menu" className="border-t border-line bg-ink md:hidden"><div className="shell flex flex-col py-3">{items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center justify-between py-3 text-sm ${active === item.href ? 'text-white' : 'text-muted'} hover:text-white`} aria-current={active === item.href ? 'location' : undefined}>{item.label}{active === item.href && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}</a>)}</div></div>}
  </header>;
}

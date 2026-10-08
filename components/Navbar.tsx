'use client';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const items = [{ href: '#work', label: 'Work' }, { href: '#ai-stack', label: 'AI Stack' }, { href: '#experience', label: 'Experience' }, { href: '#education', label: 'Education' }, { href: '#certifications', label: 'Certifications' }, { href: '#at-a-glance', label: 'At a Glance' }, { href: '#contact', label: 'Contact' }];
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#work');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    if (!isHome) return;
    const sections = items.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);
  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme');
    const nextTheme = stored === 'light' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
  };
  const themeButton = <button type="button" className="theme-toggle rounded-md p-2 text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'border-line bg-ink/95 shadow-[0_8px_30px_rgba(0,0,0,.18)]' : 'border-line/70 bg-ink/90'} backdrop-blur`}>
    <nav className="shell flex h-16 items-center justify-between" aria-label="Main navigation">
      <Link href={isHome ? '#top' : '/'} className="brand-mark font-display text-base font-semibold tracking-tight text-white md:text-[17px]" aria-label="Ritik Mishra home" onClick={() => setOpen(false)}><span className="monogram" aria-hidden="true">RM</span><span>RITIK <span className="text-signal">MISHRA</span></span></Link>
      <div className="hidden items-center gap-7 lg:flex">{items.map((item) => { const href = isHome ? item.href : `/${item.href}`; const isActive = isHome && active === item.href; return <Link key={item.href} href={href} className={`nav-link relative py-2 ${isActive ? 'text-white' : ''}`} aria-current={isActive ? 'location' : undefined}>{item.label}{isActive && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-signal" />}</Link>; })}<a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-link">Resume</a>{themeButton}</div>
      <div className="flex items-center gap-1 lg:hidden">{themeButton}<button className="rounded-md p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>
    </nav>
    {open && <div id="mobile-menu" className="border-t border-line bg-ink lg:hidden"><div className="shell flex flex-col py-3">{items.map((item) => { const href = isHome ? item.href : `/${item.href}`; const isActive = isHome && active === item.href; return <Link key={item.href} href={href} onClick={() => setOpen(false)} className={`flex items-center justify-between py-3 text-sm ${isActive ? 'text-white' : 'text-muted'} hover:text-white`} aria-current={isActive ? 'location' : undefined}>{item.label}{isActive && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}</Link>; })}<a href="/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="py-3 text-sm text-muted hover:text-white">Resume</a></div></div>}
  </header>;
}

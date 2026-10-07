'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const railSections = [
  { id: 'work', label: 'WORK' },
  { id: 'ai-stack', label: 'AI STACK' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'at-a-glance', label: 'AT A GLANCE' },
  { id: 'contact', label: 'CONTACT' }
];

export function ScrollRail() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState('work');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: .2 });

  useEffect(() => {
    const sections = railSections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  return <aside className="scroll-rail" aria-label="Section navigation"><div className="scroll-rail__track"><motion.span className="scroll-rail__progress" style={{ scaleY: reducedMotion ? scrollYProgress : progress }} aria-hidden="true" />{railSections.map((section, index) => <button key={section.id} type="button" className={`scroll-rail__marker ${active === section.id ? 'scroll-rail__marker--active' : ''}`} style={{ top: `${(index / (railSections.length - 1)) * 100}%` }} onClick={() => goTo(section.id)} aria-label={`Go to ${section.label.toLowerCase()}`} aria-current={active === section.id ? 'location' : undefined}><span className="scroll-rail__dot" /><span className="scroll-rail__tooltip">{section.label}</span></button>)}</div></aside>;
}

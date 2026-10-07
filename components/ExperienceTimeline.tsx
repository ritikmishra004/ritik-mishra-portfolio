'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import type { TimelineItem } from '@/data/experience';
import { Reveal } from './Reveal';

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: .2, margin: '-8% 0px -8% 0px' });
  const reducedMotion = useReducedMotion();
  return <div ref={ref} className="timeline-line space-y-7"><motion.div className="timeline-line__progress" initial={{ scaleY: 0 }} animate={{ scaleY: reducedMotion || inView ? 1 : 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />{items.map((item, index) => <Reveal key={`${item.title}-${item.period}`} delay={index * .1}><article className="timeline-item"><p className="text-[11px] uppercase tracking-[.13em] text-signal">{item.period}</p><h3 className="mt-2 font-display text-xl text-white">{item.title}</h3>{item.organisation && <p className="mt-1 text-sm text-muted">{item.organisation}</p>}{(item.location || item.manager) && <p className="mt-2 text-xs text-muted">{item.location}{item.location && item.manager && <span className="mx-2 text-line">·</span>}{item.manager && <>Reporting Manager: {item.manager}</>}</p>}{item.description && <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>}{item.details && <ul className="mt-4 grid gap-2 sm:grid-cols-2">{item.details.map((detail) => <li key={detail} className="flex gap-2 text-xs leading-5 text-muted"><Check size={13} className="mt-1 shrink-0 text-signal" />{detail}</li>)}</ul>}</article></Reveal>)}</div>;
}

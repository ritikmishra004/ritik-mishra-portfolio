'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { ProjectScreenshot } from '@/data/projects';
import { Reveal } from './Reveal';

type OpenScreenshot = (index: number, trigger: HTMLElement) => void;

function ScreenshotLightbox({ screenshots, children }: { screenshots: ProjectScreenshot[]; children: (open: OpenScreenshot) => ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const current = openIndex === null ? null : screenshots[openIndex];

  const open = (index: number, trigger: HTMLElement) => { triggerRef.current = trigger; setOpenIndex(index); };
  const close = () => setOpenIndex(null);
  const previous = () => setOpenIndex((index) => index === null ? null : (index - 1 + screenshots.length) % screenshots.length);
  const next = () => setOpenIndex((index) => index === null ? null : (index + 1) % screenshots.length);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; triggerRef.current?.focus(); };
  }, [openIndex === null]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' && screenshots.length > 1) previous();
      if (event.key === 'ArrowRight' && screenshots.length > 1) next();
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openIndex, screenshots.length]);

  const modal = <AnimatePresence>{openIndex !== null && current ? <motion.div ref={dialogRef} key="screenshot-lightbox" className="screenshot-lightbox" role="dialog" aria-modal="true" aria-label={`${current.label} screenshot preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <motion.div className="screenshot-lightbox__dialog" initial={reducedMotion ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, scale: .97, y: 10 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }}>
      <button ref={closeButtonRef} type="button" className="screenshot-lightbox__close" onClick={close} aria-label="Close screenshot preview">×</button>
      {screenshots.length > 1 && <><button type="button" className="screenshot-lightbox__nav screenshot-lightbox__nav--previous" onClick={previous} aria-label="Previous screenshot">‹</button><button type="button" className="screenshot-lightbox__nav screenshot-lightbox__nav--next" onClick={next} aria-label="Next screenshot">›</button></>}
      <div className="screenshot-lightbox__media"><Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" priority /></div>
      <div className="screenshot-lightbox__caption"><span>{current.label}</span>{screenshots.length > 1 && <span>{openIndex + 1} / {screenshots.length}</span>}</div>
    </motion.div>
  </motion.div> : null}</AnimatePresence>;

  return <>{children(open)}{typeof document === 'undefined' ? null : createPortal(modal, document.body)}</>;
}

function triggerKeyDown(event: KeyboardEvent<HTMLElement>, index: number, open: OpenScreenshot) {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(index, event.currentTarget); }
}

export function ProjectScreenshotPreview({ screenshot }: { screenshot: ProjectScreenshot }) {
  const reducedMotion = useReducedMotion();
  return <ScreenshotLightbox screenshots={[screenshot]}>{(open) => <motion.figure className="project-screenshot-preview" role="button" tabIndex={0} aria-label={`Open ${screenshot.label} screenshot`} onClick={(event) => open(0, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, 0, open)} initial={reducedMotion ? false : { opacity: 0, y: 12, scale: .97, clipPath: 'inset(12% 0 12% 0)' }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0% 0)' }} viewport={{ once: false, amount: .2 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" loading="lazy" /><figcaption>{screenshot.label}</figcaption></motion.figure>}</ScreenshotLightbox>;
}

export function ProjectScreenshotShowcase({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  if (!screenshots.length) return null;
  const [main, ...supporting] = screenshots;
  return <ScreenshotLightbox screenshots={screenshots}>{(open) => <section className="project-screenshot-showcase" aria-label="Application screenshots">
    <Reveal><figure className="project-screenshot-main" role="button" tabIndex={0} aria-label={`Open ${main.label} screenshot`} onClick={(event) => open(0, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, 0, open)}><Image src={main.src} alt={main.alt} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-contain" /><figcaption>{main.label}</figcaption></figure></Reveal>
    {supporting.length > 0 && <div className="project-screenshot-supporting">{supporting.map((screenshot, index) => <Reveal key={screenshot.src} delay={(index + 1) * .08}><figure role="button" tabIndex={0} aria-label={`Open ${screenshot.label} screenshot`} onClick={(event) => open(index + 1, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, index + 1, open)}><div><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" loading="lazy" /></div><figcaption>{screenshot.label}</figcaption></figure></Reveal>)}</div>}
  </section>}</ScreenshotLightbox>;
}

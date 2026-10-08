'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { Project, ProjectScreenshot } from '@/data/projects';
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
    <motion.div className="screenshot-lightbox__dialog" initial={reducedMotion ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, scale: .97, y: 10 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
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

export function ProjectScreenshotPreview({ screenshot, screenshots }: { screenshot?: ProjectScreenshot; screenshots?: ProjectScreenshot[] }) {
  const activeList = screenshots && screenshots.length > 0 ? screenshots : screenshot ? [screenshot] : [];
  if (activeList.length === 0) return null;
  const preview = screenshot ?? activeList[0];
  const initialIndex = screenshot ? Math.max(0, activeList.findIndex((s) => s.src === screenshot.src)) : 0;
  const reducedMotion = useReducedMotion();
  return <ScreenshotLightbox screenshots={activeList}>{(open) => <motion.figure className="project-screenshot-preview" role="button" tabIndex={0} aria-label={`Open ${preview.label} screenshot`} onClick={(event) => open(initialIndex, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, initialIndex, open)} initial={reducedMotion ? false : { opacity: 0, y: 12, scale: .97, clipPath: 'inset(12% 0 12% 0)' }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0% 0)' }} viewport={{ once: false, amount: .2 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}><Image src={preview.src} alt={preview.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" loading="lazy" /><figcaption>{preview.label}</figcaption></motion.figure>}</ScreenshotLightbox>;
}

export function ProjectScreenshotShowcase({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  if (!screenshots.length) return null;
  const [main, ...supporting] = screenshots;
  return <ScreenshotLightbox screenshots={screenshots}>{(open) => <section className="project-screenshot-showcase" aria-label="Application screenshots">
    <Reveal><figure className="project-screenshot-main" role="button" tabIndex={0} aria-label={`Open ${main.label} screenshot`} onClick={(event) => open(0, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, 0, open)}><Image src={main.src} alt={main.alt} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-contain" /><figcaption>{main.label}</figcaption></figure></Reveal>
    {supporting.length > 0 && <div className="project-screenshot-supporting">{supporting.map((screenshot, index) => <Reveal key={screenshot.src} delay={(index + 1) * .08}><figure role="button" tabIndex={0} aria-label={`Open ${screenshot.label} screenshot`} onClick={(event) => open(index + 1, event.currentTarget)} onKeyDown={(event) => triggerKeyDown(event, index + 1, open)}><div><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top" loading="lazy" /></div><figcaption>{screenshot.label}</figcaption></figure></Reveal>)}</div>}
  </section>}</ScreenshotLightbox>;
}

export function ProjectScreenshotTeaser({ project }: { project: Project }) {
  const screenshots = project.screenshots;
  if (!screenshots || screenshots.length === 0) return null;

  const teaserScreenshots = [
    screenshots.find((s) => s.src.endsWith('01-login.png')),
    screenshots.find((s) => s.src.endsWith('02-local-agent-vscode.png')),
    screenshots.find((s) => s.src.endsWith('03-workspace-selection.png'))
  ].filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (teaserScreenshots.length === 0) return null;

  return <ScreenshotLightbox screenshots={screenshots}>{(open) => <div className="pt-2">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-[.18em] text-signal">PROJECT SCREENSHOTS</span>
      <Link href={`/projects/${project.slug}#screenshots`} className="group/link inline-flex items-center gap-1 text-[11px] text-muted transition hover:text-white" aria-label="View all 7 project screenshots in case study">
        <span>7 screenshots</span>
        <span aria-hidden="true" className="text-signal transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
      </Link>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {teaserScreenshots.map((item) => {
        const fullIndex = screenshots.findIndex((s) => s.src === item.src);
        return <button
          key={item.src}
          type="button"
          onClick={(e) => open(fullIndex >= 0 ? fullIndex : 0, e.currentTarget)}
          className="group/thumb relative block aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-ink/70 text-left transition duration-200 hover:border-signal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal cursor-zoom-in"
          aria-label={`${item.label} screenshot — Preview`}
          title={`${item.label} — Preview`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, 180px"
            className="object-cover object-top opacity-85 transition duration-300 group-hover/thumb:opacity-100 group-hover/thumb:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-1">
            <p className="truncate text-[9px] uppercase tracking-wider text-muted group-hover/thumb:text-white">
              {item.label}
            </p>
          </div>
        </button>;
      })}
    </div>
  </div>}</ScreenshotLightbox>;
}

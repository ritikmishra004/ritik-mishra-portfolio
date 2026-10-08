'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowUpRight, Calendar, CheckCircle, FileText, ZoomIn } from 'lucide-react';
import type { Certification } from '@/data/certifications';
import { Reveal } from './Reveal';

type OpenModal = (index: number, trigger: HTMLElement) => void;

function CertificateLightbox({
  certifications,
  openIndex,
  onClose,
  onNavigate
}: {
  certifications: Certification[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const current = openIndex !== null ? certifications[openIndex] : null;

  const previous = () => {
    if (openIndex === null) return;
    onNavigate((openIndex - 1 + certifications.length) % certifications.length);
  };

  const next = () => {
    if (openIndex === null) return;
    onNavigate((openIndex + 1) % certifications.length);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex !== null]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && certifications.length > 1) previous();
      if (event.key === 'ArrowRight' && certifications.length > 1) next();
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openIndex, certifications.length]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {openIndex !== null && current && (
        <motion.div
          ref={dialogRef}
          key="certificate-lightbox"
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} certificate preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="certificate-lightbox__dialog"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="certificate-lightbox__close"
              onClick={onClose}
              aria-label="Close certificate preview"
            >
              ×
            </button>

            {certifications.length > 1 && (
              <>
                <button
                  type="button"
                  className="certificate-lightbox__nav certificate-lightbox__nav--previous"
                  onClick={previous}
                  aria-label="Previous certificate"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="certificate-lightbox__nav certificate-lightbox__nav--next"
                  onClick={next}
                  aria-label="Next certificate"
                >
                  ›
                </button>
              </>
            )}

            <div className="certificate-lightbox__media">
              <Image
                src={current.image}
                alt={`${current.title} verified certificate`}
                fill
                sizes="(max-width: 1024px) 94vw, 1100px"
                className="object-contain"
                priority
              />
            </div>

            <div className="certificate-lightbox__caption">
              <div className="certificate-lightbox__meta">
                <span className="text-signal text-[11px] font-mono">{current.number}</span>
                <span className="text-white font-medium">{current.title}</span>
                <span className="text-muted">· {current.issuer}</span>
                {current.issueDate && <span className="text-muted hidden sm:inline">· {current.issueDate}</span>}
              </div>

              <div className="certificate-lightbox__actions">
                {current.pdfUrl && (
                  <>
                    <a
                      href={current.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary text-xs py-1.5 px-3"
                    >
                      <FileText size={13} aria-hidden="true" />
                      View PDF
                    </a>
                    <a
                      href={current.pdfUrl}
                      download
                      className="button-secondary text-xs py-1.5 px-2.5 hidden sm:inline-flex"
                      aria-label={`Download ${current.title} PDF`}
                    >
                      <ArrowDown size={13} aria-hidden="true" />
                    </a>
                  </>
                )}
                {current.credentialUrl && (
                  <a
                    href={current.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary text-xs py-1.5 px-3"
                  >
                    <CheckCircle size={13} className="text-signal" aria-hidden="true" />
                    Verify Credential
                  </a>
                )}
                <span className="text-muted text-[11px] font-mono pl-2">
                  {openIndex + 1} / {certifications.length}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open: OpenModal = (index, trigger) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  };

  const close = () => {
    setOpenIndex(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number,
    trigger: HTMLElement
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open(index, trigger);
    }
  };

  return (
    <>
      <div className="certification-grid">
        {certifications.map((cert, index) => (
          <Reveal key={cert.number} delay={index * 0.06} className="h-full">
            <article className="certification-card group flex flex-col h-full">
              <figure
                className="certification-card__preview"
                role="button"
                tabIndex={0}
                aria-label={`Open preview for ${cert.title}`}
                onClick={(e) => open(index, e.currentTarget)}
                onKeyDown={(e) => handleTriggerKeyDown(e, index, e.currentTarget)}
              >
                <div className="certification-card__image-container">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="certification-card__badge">
                  <ZoomIn size={12} aria-hidden="true" />
                  Preview
                </figcaption>
              </figure>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-signal">{cert.number}</span>
                {cert.issueDate && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                    <Calendar size={11} className="text-muted/70" aria-hidden="true" />
                    {cert.issueDate}
                  </span>
                )}
              </div>

              <h3 className="mt-2.5 font-display text-lg font-medium leading-6 text-white group-hover:text-signal transition-colors">
                {cert.title}
              </h3>
              <p className="mt-1.5 text-xs uppercase tracking-[.12em] text-muted">{cert.issuer}</p>

              <div className="mt-auto pt-5 flex items-center justify-between gap-2 border-t border-line/60">
                {cert.pdfUrl ? (
                  <>
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary text-xs py-2 px-3 gap-1.5"
                      aria-label={`View ${cert.title} PDF`}
                    >
                      View Certificate <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={(e) => open(index, e.currentTarget)}
                      className="text-xs text-muted hover:text-signal transition-colors inline-flex items-center gap-1 py-1 px-2"
                      aria-label={`Preview ${cert.title} image`}
                    >
                      <ZoomIn size={13} aria-hidden="true" />
                      Preview
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => open(index, e.currentTarget)}
                    className="button-secondary text-xs py-2 px-3 gap-1.5 w-full justify-center"
                    aria-label={`View ${cert.title} certificate image`}
                  >
                    View Certificate <ZoomIn size={13} aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <CertificateLightbox
        certifications={certifications}
        openIndex={openIndex}
        onClose={close}
        onNavigate={(newIndex) => setOpenIndex(newIndex)}
      />
    </>
  );
}

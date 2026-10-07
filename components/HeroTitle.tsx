'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function HeroTitle() {
  const reducedMotion = useReducedMotion();
  return <div className="relative mt-6 max-w-3xl"><h1 className="hero-title font-display text-[clamp(3.8rem,7vw,6rem)] font-medium leading-[1.08] tracking-[-.075em] text-white"><span className="hero-title-line"><motion.span className="hero-title-reveal" initial={reducedMotion ? false : { opacity: 0, y: 28, clipPath: 'inset(100% 0 -0.24em 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 -0.24em 0)' }} transition={{ duration: .82, ease: [0.22, 1, 0.36, 1] }}>AI Engineer</motion.span></span></h1><p className="hero-subtitle mt-4 overflow-visible font-display text-xl tracking-[-.035em] text-signal sm:text-2xl"><motion.span className="inline-block" initial={reducedMotion ? false : { opacity: 0, y: 18, clipPath: 'inset(100% 0 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: .68, delay: .24, ease: [0.22, 1, 0.36, 1] }}>GenAI &amp; Agentic Systems</motion.span></p></div>;
}

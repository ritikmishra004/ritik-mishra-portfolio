'use client';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.18, margin: '-8% 0px -8% 0px' });
  return <motion.div
    ref={ref}
    initial={reducedMotion ? false : { opacity: 0, y: 16, scale: .985 }}
    animate={reducedMotion || inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: .985 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  className={className}>{children}</motion.div>;
}

'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div
    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}

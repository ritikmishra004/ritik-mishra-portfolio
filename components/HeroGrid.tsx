'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function HeroGrid() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 28 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 28 });
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 3);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 3);
  };
  return <motion.div className="hero-grid-parallax" style={{ x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y }} onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} aria-hidden="true" />;
}

'use client';

import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

const heroNodes = ['LLM', 'RAG', 'Agents', 'Tools', 'Applications'];
type Point = { x: number; y: number };
type WorkflowKind = 'rag' | 'architecture' | 'blog';

function sequenceFor(nodes: string[], kind: WorkflowKind, mobile = false): Point[] {
  if (mobile) return nodes.map((_, index) => ({ x: 50, y: 9 + index * (82 / Math.max(nodes.length - 1, 1)) }));
  if (kind === 'rag') return [
    { x: 12, y: 28 }, { x: 37, y: 28 }, { x: 62, y: 28 }, { x: 87, y: 28 },
    { x: 87, y: 72 }, { x: 62, y: 72 }, { x: 37, y: 72 }, { x: 12, y: 72 }
  ];
  if (kind === 'blog') return [
    { x: 12, y: 28 }, { x: 37, y: 28 }, { x: 62, y: 28 }, { x: 87, y: 28 },
    { x: 87, y: 72 }, { x: 62, y: 72 }, { x: 37, y: 72 }, { x: 12, y: 72 }
  ];
  return nodes.map((_, index) => ({ x: 6 + index * (88 / Math.max(nodes.length - 1, 1)), y: 50 }));
}

function WorkflowTrack({ nodes, points, active, hovered, setHovered, markerId, mobile = false }: { nodes: string[]; points: Point[]; active: number; hovered: number | null; setHovered: (index: number | null) => void; markerId: string; mobile?: boolean }) {
  return <div className={`workflow-canvas ${mobile ? 'workflow-canvas--mobile' : 'workflow-canvas--desktop'}`}>
    <svg className="workflow-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs><marker id={markerId} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="none" stroke="currentColor" strokeWidth="1" /></marker></defs>
      {nodes.slice(0, -1).map((_, index) => { const from = points[index]; const to = points[index + 1]; const connected = active > index || hovered === index || hovered === index + 1; return <motion.path key={`${from.x}-${from.y}-${to.x}-${to.y}`} d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} className={connected ? 'workflow-connector workflow-connector--complete' : 'workflow-connector'} markerEnd={`url(#${markerId})`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: connected ? 1 : 0, opacity: connected ? 1 : .55 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }} />; })}
      {active >= 0 && active < nodes.length - 1 && <motion.circle className="workflow-signal" r="1.35" initial={{ cx: points[active].x, cy: points[active].y, opacity: 0 }} animate={{ cx: points[active + 1].x, cy: points[active + 1].y, opacity: 1 }} transition={{ duration: .56, ease: 'easeInOut' }} />}
    </svg>
    {nodes.map((node, index) => { const state = index === active ? 'workflow-node--active' : index < active ? 'workflow-node--complete' : ''; const focus = hovered === index ? 'workflow-node--hovered' : ''; return <div key={node} className={`workflow-node ${state} ${focus}`} style={{ left: `${points[index].x}%`, top: `${points[index].y}%` }} tabIndex={0} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} aria-label={`${node}, ${index === active ? 'active' : index < active ? 'completed' : 'pending'}`}><span>{String(index + 1).padStart(2, '0')}</span>{node}</div>; })}
  </div>;
}

function WorkflowDiagram({ nodes, kind, label, meta }: { nodes: string[]; kind: WorkflowKind; label: string; meta: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: .2, margin: '-8% 0px -8% 0px' });
  const [active, setActive] = useState(-1);
  const [runId, setRunId] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const markerId = `workflow-marker-${useId().replace(/:/g, '')}`;
  const desktopPoints = sequenceFor(nodes, kind);
  const mobilePoints = sequenceFor(nodes, kind, true);

  useEffect(() => {
    if (!inView) { setActive(-1); return; }
    setActive(-1);
    if (reducedMotion) { setActive(nodes.length - 1); return; }
    const start = window.setTimeout(() => setActive(0), 80);
    const timers = nodes.slice(1).map((_, index) => window.setTimeout(() => setActive(index + 1), 80 + (index + 1) * 620));
    return () => { window.clearTimeout(start); timers.forEach(window.clearTimeout); };
  }, [inView, reducedMotion, nodes.length, runId]);

  const replay = () => { setHovered(null); setActive(-1); setRunId((current) => current + 1); };
  const replayFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); replay(); } };

  return <div ref={ref} className={`project-visual project-visual--workflow project-visual--${kind}`} role="group" tabIndex={0} onClick={replay} onKeyDown={replayFromKeyboard} aria-label={`${label}. Activate to replay workflow.`}>
    <div className="project-visual__label"><span>{label}</span><span>{meta}</span></div>
    <div className="workflow-stage" aria-label={`${label}: ${nodes.join(' to ')}`}>
      <WorkflowTrack nodes={nodes} points={desktopPoints} active={active} hovered={hovered} setHovered={setHovered} markerId={markerId} />
      <WorkflowTrack nodes={nodes} points={mobilePoints} active={active} hovered={hovered} setHovered={setHovered} markerId={`${markerId}-mobile`} mobile />
    </div>
  </div>;
}

export function HeroSystemVisual() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: .25, margin: '-8% 0px -8% 0px' });
  const [active, setActive] = useState(-1);
  const [runId, setRunId] = useState(0);
  const pointerX = useMotionValue(0); const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 24 }); const y = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => { if (reducedMotion || event.pointerType === 'touch') return; const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 10); pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 10); };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
  useEffect(() => { if (!inView) { setActive(-1); return; } setActive(-1); if (reducedMotion) { setActive(heroNodes.length - 1); return; } const start = window.setTimeout(() => setActive(0), 80); const timers = heroNodes.slice(1).map((_, index) => window.setTimeout(() => setActive(index + 1), 80 + (index + 1) * 500)); return () => { window.clearTimeout(start); timers.forEach(window.clearTimeout); }; }, [inView, reducedMotion, runId]);
  const replay = () => { setActive(-1); setRunId((current) => current + 1); };
  const replayFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); replay(); } };
  return <motion.div ref={ref} className="system-visual" role="group" tabIndex={0} style={{ x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y }} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} onClick={replay} onKeyDown={replayFromKeyboard} aria-label="AI system flow from language models to applications. Activate to replay.">
    <div className="system-visual__legend"><span className="system-visual__status"><span className="live-dot" />LIVE AI SYSTEM</span><span className="system-visual__online">SYSTEM ONLINE</span></div>
    <div className="system-visual__hero-flow">
      <svg className="system-visual__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="hero-flow-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="none" stroke="currentColor" strokeWidth="1" /></marker></defs>{heroNodes.slice(0, -1).map((_, index) => <motion.path key={index} d={`M 50 ${12 + index * 19} L 50 ${30 + index * 19}`} className="hero-connector" markerEnd="url(#hero-flow-arrow)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active > index ? 1 : 0, opacity: active > index ? 1 : .3 }} transition={{ duration: .45 }} />)}{active >= 0 && active < heroNodes.length - 1 && <motion.circle className="workflow-signal" r="1.3" initial={{ cx: 50, cy: 12 + active * 19, opacity: 0 }} animate={{ cx: 50, cy: 30 + active * 19, opacity: 1 }} transition={{ duration: .45, ease: 'easeInOut' }} />}</svg>
      {heroNodes.map((node, index) => <motion.div key={node} className={`system-node system-node--${index} ${index === active ? 'system-node--active' : index < active ? 'system-node--complete' : ''}`} style={{ width: `${index === 2 ? 72 : index === 1 || index === 3 ? 84 : 100}%` }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: index <= active ? 1 : 0, y: index <= active ? 0 : 12 }} transition={{ duration: .5 }}><span className="system-node__index">0{index + 1}</span><span>{node}</span></motion.div>)}
    </div>
    <div className="system-visual__footer"><span>GROUNDING</span><span>ORCHESTRATION</span><span>TOOL USE</span><span>APPLICATIONS</span></div>
  </motion.div>;
}

function ToolsVisual() {
  const reducedMotion = useReducedMotion(); const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: false, amount: .2, margin: '-8% 0px -8% 0px' });
  const [revealed, setRevealed] = useState(-1); const [activeTool, setActiveTool] = useState<number | null>(null); const [runId, setRunId] = useState(0);
  const points = [{ x: 18, y: 20 }, { x: 82, y: 20 }, { x: 18, y: 80 }, { x: 82, y: 80 }]; const tools = ['RAG', 'Search', 'Stock', 'Calculator'];
  useEffect(() => { if (!inView) { setRevealed(-1); return; } setRevealed(-1); if (reducedMotion) { setRevealed(tools.length - 1); return; } const start = window.setTimeout(() => setRevealed(0), 80); const timers = tools.slice(1).map((_, index) => window.setTimeout(() => setRevealed(index + 1), 80 + (index + 1) * 360)); return () => { window.clearTimeout(start); timers.forEach(window.clearTimeout); }; }, [inView, reducedMotion, runId]);
  const replay = () => { setActiveTool(null); setRevealed(-1); setRunId((current) => current + 1); };
  const replayFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); replay(); } };
  const selected = activeTool ?? (revealed >= 0 && revealed < tools.length ? revealed : null);
  return <div ref={ref} className="project-visual project-visual--tools" role="group" tabIndex={0} onClick={replay} onKeyDown={replayFromKeyboard} aria-label="Multi-utility tool calling graph. Activate to replay."><div className="project-visual__label"><span>Tool calling surface</span><span>4 utilities</span></div><div className="tools-map"><svg className="tools-map__svg" viewBox="0 0 100 100" aria-hidden="true">{points.map((point, index) => <motion.line key={tools[index]} x1="50" y1="50" x2={point.x} y2={point.y} className={`tool-connector ${selected === index ? 'tool-connector--active' : ''}`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: revealed >= index ? 1 : 0, opacity: selected === index ? 1 : revealed >= index ? .72 : .2 }} transition={{ duration: .45 }} />)}{selected !== null && <motion.circle className="workflow-signal" r="1.2" initial={{ cx: 50, cy: 50 }} animate={{ cx: points[selected].x, cy: points[selected].y }} transition={{ duration: .45, ease: 'easeInOut' }} />}</svg><div className="tools-map__core"><span>LLM</span><small>agent</small></div>{tools.map((tool, index) => <motion.div key={tool} className={`tool-pill tool-pill--${index} ${selected === index ? 'tool-pill--active' : ''}`} onMouseEnter={() => setActiveTool(index)} onMouseLeave={() => setActiveTool(null)} onFocus={() => setActiveTool(index)} onBlur={() => setActiveTool(null)} tabIndex={0} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: revealed >= index ? 1 : 0, scale: revealed >= index ? 1 : .8 }} transition={{ delay: index * .05 }}>{tool}</motion.div>)}</div></div>;
}

function MetricsVisual({ project }: { project: Project }) {
  return <div className="project-visual project-visual--metrics"><div className="project-visual__label">Model snapshot <span>regression</span></div><div className="metric-visual-grid">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="metric-visual-line"><span />XGBoost Regressor <span /></div></div>;
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual.image) return <div className="project-visual project-visual--image"><div style={{ backgroundImage: `url(${project.visual.image})` }} aria-label={`${project.title} screenshot placeholder`} /></div>;
  if (project.visual.kind === 'architecture') return <WorkflowDiagram nodes={project.architecture.slice(0, 8)} kind="architecture" label="System architecture" meta="remote / local" />;
  if (project.visual.kind === 'tools') return <ToolsVisual />;
  if (project.visual.kind === 'metrics') return <MetricsVisual project={project} />;
  const isBlog = project.slug === 'ai-blog-writing-agent'; const nodes = isBlog ? ['Topic', 'Router', 'Research', 'Evidence', 'Planner', 'Workers', 'Reducer', 'Markdown'] : ['Documents', 'Chunking', 'Embeddings', 'FAISS', 'Top-4 retrieval', 'Context', 'Gemini', 'Answer'];
  return <WorkflowDiagram nodes={nodes} kind={isBlog ? 'blog' : 'rag'} label={isBlog ? 'Generation workflow' : 'Retrieval workflow'} meta="verified flow" />;
}

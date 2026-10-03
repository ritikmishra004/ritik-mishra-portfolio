'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

const heroNodes = ['LLM', 'RAG', 'Agents', 'Tools', 'Applications'];

export function HeroSystemVisual() {
  return <div className="system-visual" aria-label="AI system flow from language models to applications">
    <div className="system-visual__legend"><span className="live-dot" />Live system map <span className="text-muted">/ 01—05</span></div>
    <div className="system-visual__hero-flow">
      {heroNodes.map((node, index) => <motion.div key={node} className="system-node" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12, duration: .5 }}>
        <span className="system-node__index">0{index + 1}</span><span>{node}</span>
        {index < heroNodes.length - 1 && <motion.span className="system-node__connector" aria-hidden="true" animate={{ opacity: [.25, .85, .25] }} transition={{ repeat: Infinity, duration: 2.6, delay: index * .2 }} />}
      </motion.div>)}
    </div>
    <div className="system-visual__footer"><span>grounded intelligence</span><span>tool-aware workflows</span><span>useful software</span></div>
  </div>;
}

function ArchitectureVisual({ project }: { project: Project }) {
  const nodes = project.architecture.slice(0, 8);
  return <div className="project-visual project-visual--architecture"><div className="project-visual__label">System architecture <span>remote / local</span></div><div className="architecture-flow">{nodes.map((node, index) => <motion.div key={node} className="architecture-node" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }}><span>{String(index + 1).padStart(2, '0')}</span>{node}{index < nodes.length - 1 && <i aria-hidden="true" />}</motion.div>)}</div></div>;
}

function PipelineVisual({ project }: { project: Project }) {
  const nodes = project.slug === 'ai-blog-writing-agent' ? ['Topic', 'Router', 'Research', 'Evidence', 'Planner', 'Workers', 'Reducer', 'Markdown'] : ['Documents', 'Chunking', 'Embeddings', 'FAISS', 'Top-4 retrieval', 'Context', 'Gemini', 'Answer'];
  return <div className="project-visual project-visual--pipeline"><div className="project-visual__label">{project.slug === 'ai-blog-writing-agent' ? 'Generation workflow' : 'Retrieval workflow'} <span>verified flow</span></div><div className="pipeline-flow">{nodes.map((node, index) => <motion.div key={node} className="pipeline-node" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><span>{node}</span>{index < nodes.length - 1 && <b aria-hidden="true">↓</b>}</motion.div>)}</div></div>;
}

function ToolsVisual() {
  return <div className="project-visual project-visual--tools"><div className="project-visual__label">Tool calling surface <span>4 utilities</span></div><div className="tools-map"><div className="tools-map__core"><span>LLM</span><small>agent</small></div>{['RAG', 'Search', 'Stock', 'Calculator'].map((tool, index) => <motion.div key={tool} className={`tool-pill tool-pill--${index}`} initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .1 }}>{tool}</motion.div>)}</div></div>;
}

function MetricsVisual({ project }: { project: Project }) {
  return <div className="project-visual project-visual--metrics"><div className="project-visual__label">Model snapshot <span>regression</span></div><div className="metric-visual-grid">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="metric-visual-line"><span />XGBoost Regressor <span /></div></div>;
}

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual.image) return <div className="project-visual project-visual--image"><div style={{ backgroundImage: `url(${project.visual.image})` }} aria-label={`${project.title} screenshot placeholder`} /></div>;
  if (project.visual.kind === 'architecture') return <ArchitectureVisual project={project} />;
  if (project.visual.kind === 'tools') return <ToolsVisual />;
  if (project.visual.kind === 'metrics') return <MetricsVisual project={project} />;
  return <PipelineVisual project={project} />;
}

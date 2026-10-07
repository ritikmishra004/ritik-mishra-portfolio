import { ArrowDown, ArrowUpRight, BrainCircuit, Cpu, FileText, Layers3, Network, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { ProjectGrid } from '@/components/ProjectGrid';
import { HeroSystemVisual } from '@/components/SystemVisual';
import { projects } from '@/data/projects';
import { coreSkills, skillGroups } from '@/data/skills';
import { education, experience } from '@/data/experience';
import { social } from '@/data/social';
import { Reveal } from '@/components/Reveal';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroTitle } from '@/components/HeroTitle';
import { HeroGrid } from '@/components/HeroGrid';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ScrollRail } from '@/components/ScrollRail';
import { certifications } from '@/data/certifications';

function SectionHeading({ index, title, text }: { index: string; title: string; text?: string }) {
  return <Reveal><div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="section-kicker">{index}</p><h2 className="mt-4 font-display text-3xl font-medium tracking-[-.05em] text-white md:text-5xl">{title}</h2></div>{text && <p className="max-w-md text-sm leading-6 text-muted">{text}</p>}</div></Reveal>;
}

function AcademicTimeline() {
  return <div className="academic-timeline">{education.slice().reverse().map((item, index) => <Reveal key={item.title} delay={index * .08}><article className={`academic-card ${item.title.startsWith('B.Tech') ? 'academic-card--primary' : ''}`}><p className="eyebrow">{item.title}</p><h3 className="mt-3 font-display text-xl text-white">{item.organisation}</h3>{item.period && <p className="mt-3 text-sm text-muted">{item.period}</p>}</article></Reveal>)}</div>;
}

export default function Home() {
  const aiSystems = projects.filter((project) => project.featured);
  const mlProjects = projects.filter((project) => project.category === 'Machine Learning');
  const github = social.links.find((link) => link.label === 'GitHub');
  const linkedIn = social.links.find((link) => link.label === 'LinkedIn');
  return <main id="top"><Navbar /><ScrollProgress /><ScrollRail />
    <section className="hero-section shell relative grid gap-10 overflow-hidden pb-12 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16 lg:pb-16 lg:pt-20">
      <div className="hero-glow pointer-events-none absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl" />
      <HeroGrid />
      <div className="relative z-10"><p className="eyebrow hero-eyebrow text-[18px] md:text-[20px]">RITIK MISHRA</p><HeroTitle /><p className="hero-description mt-7 max-w-xl text-base leading-7 text-muted md:text-lg">I build intelligent applications using LLMs, RAG, AI agents, tool calling and modern AI engineering workflows.</p><div className="hero-actions mt-8 flex flex-wrap gap-3"><a href="#work" className="button-primary">Explore Work <ArrowDown size={15} /></a>{github?.href && <a href={github.href} target="_blank" rel="noreferrer" className="button-secondary">GitHub <ArrowUpRight size={15} /></a>}{linkedIn?.href && <a href={linkedIn.href} target="_blank" rel="noreferrer" className="button-secondary">LinkedIn <ArrowUpRight size={15} /></a>}{social.resumeUrl && <a href={social.resumeUrl} target="_blank" rel="noreferrer" className="button-secondary">Resume <FileText size={15} /></a>}</div><div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[.15em] text-muted"><span className="live-dot" />Building at the intersection of models and software</div></div>
      <Reveal><HeroSystemVisual /></Reveal>
      <div className="hero-metadata lg:col-span-2" aria-label="Personal metadata"><span>Greater Noida, India</span><i aria-hidden="true">•</i><span>B.Tech Information Technology</span><i aria-hidden="true">•</i><span>Gautam Buddha University</span><i aria-hidden="true">•</i><span>2026</span></div>
    </section>

    <section className="border-y border-line bg-panel/35"><div className="shell pb-8 pt-10 md:pb-12 md:pt-12"><div className="mb-7 flex items-end justify-between"><div><p className="section-kicker">00 / What I build</p><h2 className="mt-3 font-display text-2xl tracking-[-.04em] text-white md:text-3xl">AI engineering focus</h2></div><Sparkles className="text-signal" size={20} /></div><div className="grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-4"><Reveal className="h-full"><article className="focus-card h-full"><BrainCircuit className="text-signal" size={20} /><h3>Generative AI</h3><p>LLM applications, RAG systems, and grounded generation that turn model capability into useful interfaces.</p></article></Reveal><Reveal delay={.08} className="h-full"><article className="focus-card h-full"><Network className="text-signal" size={20} /><h3>Agentic AI</h3><p>LangGraph, tool calling, MCP, and human-in-the-loop workflows for systems that can act with control.</p></article></Reveal><Reveal delay={.16} className="h-full"><article className="focus-card h-full"><Layers3 className="text-signal" size={20} /><h3>AI engineering</h3><p>APIs, workflows, deployment, and stateful applications built around practical delivery.</p></article></Reveal><Reveal delay={.24} className="h-full"><article className="focus-card h-full"><Cpu className="text-signal" size={20} /><h3>ML / DL FOUNDATION</h3><p>Scikit-learn, TensorFlow, NLP, regression, classification, and model evaluation foundations.</p></article></Reveal></div></div></section>

    <section id="work" className="shell scroll-mt-20 pb-12 pt-8 md:pb-16 md:pt-10"><Reveal><SectionHeading index="01 / Selected work" title="AI systems I’ve built" text="Four different ways to make intelligence useful: coding, retrieval, writing, and tools." /><ProjectGrid projects={aiSystems} featured /></Reveal></section>
    <section className="shell py-12 md:py-16"><Reveal><SectionHeading index="02 / Supporting foundation" title="Machine learning projects" text="A compact foundation across NLP, classification, recommendations, and regression." /><ProjectGrid projects={mlProjects} /></Reveal></section>

    <section id="ai-stack" className="border-y border-line bg-panel/35 scroll-mt-20"><div className="shell py-16 md:py-20"><SectionHeading index="03 / AI stack" title="AI stack & capabilities" text="The tools and systems I use to build LLM applications, agentic workflows, and practical AI products." /><div className="skill-groups grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">{skillGroups.map((group, index) => <Reveal key={group.label} delay={index * .06} className="h-full"><article className={`skill-group flex h-full flex-col rounded-xl border p-5 transition hover:-translate-y-1 ${index < 2 ? 'border-signal/30 bg-signal/[.045]' : 'border-line bg-ink/70'}`}><div className="flex items-center justify-between"><span className={`text-[10px] ${index < 2 ? 'text-signal' : 'text-muted'}`}>0{index + 1}</span><span className={`skill-group__indicator h-1.5 w-1.5 rounded-full ${index < 2 ? 'bg-signal shadow-[0_0_10px_rgba(198,255,77,.7)]' : 'bg-muted/60'}`} /></div><h3 className="mt-8 whitespace-normal font-display text-lg tracking-normal text-white">{group.label}</h3><ul className="mt-5 space-y-2">{group.skills.map((skill) => <li key={skill} className="border-t border-line/80 pt-2 text-xs leading-5 text-muted">{skill}</li>)}</ul></article></Reveal>)}</div><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line/70 bg-ink/35 px-5 py-4"><span className="text-[10px] font-medium uppercase tracking-[.18em] text-signal">CORE</span><span className="hidden text-line sm:inline">/</span>{coreSkills.map((skill, index) => <span key={skill} className="text-xs text-muted">{skill}{index < coreSkills.length - 1 && <span className="ml-4 text-line">·</span>}</span>)}</div></div></section>

    <section id="experience" className="shell scroll-mt-20 py-16 md:py-20"><SectionHeading index="05 / Experience" title="Experience" text="The verified professional foundation behind the work." /><ExperienceTimeline items={experience} /></section>

    <section id="education" className="border-y border-line bg-panel/35 scroll-mt-20"><div className="shell py-16 md:py-20"><SectionHeading index="06 / Education" title="Education" text="The academic path supporting the work." /><AcademicTimeline /></div></section>

    <section id="certifications" className="shell scroll-mt-20 py-16 md:py-20"><SectionHeading index="07 / Certifications" title="Certifications" text="Six completed learning milestones across AI, data, and programming." /><div className="certification-grid">{certifications.map((cert, index) => <Reveal key={cert.number} delay={index * .06}><article className="certification-card"><div className="flex items-center justify-between"><span className="text-[10px] text-signal">{cert.number}</span><ArrowUpRight className="certification-arrow text-muted" size={15} /></div><h3 className="mt-7 font-display text-lg leading-6 text-white">{cert.title}</h3><p className="mt-3 text-xs uppercase tracking-[.12em] text-muted">{cert.issuer}</p></article></Reveal>)}</div></section>

    <section id="at-a-glance" className="border-y border-line bg-panel/35 scroll-mt-20"><div className="shell py-12 md:py-14"><SectionHeading index="At a glance" title="At a glance" text="A compact view of the person behind the systems." /><div className="glance-grid">{[['ROLE', 'AI Engineer'], ['FOCUS', 'GenAI & Agentic Systems'], ['BASED IN', 'Galaxy Vega, Techzone 4, Greater Noida West, India'], ['LANGUAGES', 'English · Hindi'], ['CERTIFICATIONS', '06 completed']].map(([label, value], index) => <Reveal key={label} delay={index * .06}><article className="glance-item"><p className="eyebrow">{label}</p><p className="mt-3 font-display text-lg text-white">{value}</p></article></Reveal>)}</div></div></section>

    {social.resumeUrl && <section className="border-y border-line"><div className="shell py-12 md:py-14"><div className="flex flex-col gap-6 rounded-2xl border border-line bg-panel p-7 md:flex-row md:items-center md:justify-between md:p-9"><div><p className="eyebrow">Resume</p><h2 className="mt-3 font-display text-2xl tracking-[-.04em] text-white">A concise view of my work.</h2></div><div className="flex flex-wrap gap-3"><a href={social.resumeUrl} target="_blank" rel="noreferrer" className="button-primary">View Resume <FileText size={15} /></a><a href={social.resumeUrl} download="Ritik-Mishra-Resume.pdf" className="button-secondary">Download Resume <ArrowDown size={15} /></a></div></div></div></section>}

    <section id="contact" className="scroll-mt-20 border-y border-line"><div className="shell grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20"><div><p className="section-kicker">05 / Contact</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-[-.06em] text-white md:text-6xl">Have an interesting AI problem?<br /><span className="text-signal">Let’s build something useful.</span></h2><p className="mt-5 text-sm text-muted">{social.email} <span className="mx-2 text-line">·</span> {social.phone}</p></div><div className="flex flex-wrap gap-3"><a href={`mailto:${social.email}`} className="button-primary">Email Me <ArrowUpRight size={15} /></a>{linkedIn?.href && <a href={linkedIn.href} target="_blank" rel="noreferrer" className="button-secondary">LinkedIn <ArrowUpRight size={15} /></a>}{github?.href && <a href={github.href} target="_blank" rel="noreferrer" className="button-secondary">GitHub <ArrowUpRight size={15} /></a>}</div></div></section>
    <footer className="border-t border-line"><div className="shell py-6 text-xs text-muted"><span>Ritik Mishra / AI Engineer</span></div></footer>
  </main>;
}

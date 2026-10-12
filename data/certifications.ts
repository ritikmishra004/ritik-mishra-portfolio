export type Certification = {
  number: string;
  title: string;
  issuer: string;
  image: string;
  pdfUrl: string | null;
  issueDate: string | null;
  credentialUrl: string | null;
};

export const certifications: Certification[] = [
  {
    number: '01',
    title: 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
    issuer: 'Udemy',
    image: '/certificates/previews/ai-engineer-core-track-llm-rag-qlora-agents.png',
    pdfUrl: '/certificates/pdfs/ai-engineer-core-track-llm-rag-qlora-agents.pdf',
    issueDate: '12 October 2026',
    credentialUrl: 'https://www.udemy.com/certificate/UC-3900b0a0-1dad-406d-a82e-10b646062038/'
  },
  {
    number: '02',
    title: 'Introduction to Generative AI Studio',
    issuer: 'Simplilearn SkillUp',
    image: '/certificates/previews/introduction-to-generative-ai-studio.png',
    pdfUrl: '/certificates/pdfs/introduction-to-generative-ai-studio.pdf',
    issueDate: '30 September 2026',
    credentialUrl: null
  },
  {
    number: '03',
    title: 'Generative AI for Everyone',
    issuer: 'Simplilearn SkillUp',
    image: '/certificates/previews/generative-ai-for-everyone.png',
    pdfUrl: '/certificates/pdfs/generative-ai-for-everyone.pdf',
    issueDate: '30 September 2026',
    credentialUrl: null
  },
  {
    number: '04',
    title: 'Python Coder',
    issuer: 'Kaggle',
    image: '/certificates/previews/python-coder.png',
    pdfUrl: null,
    issueDate: null,
    credentialUrl: null
  },
  {
    number: '05',
    title: 'Introduction to Machine Learning',
    issuer: 'Kaggle',
    image: '/certificates/previews/introduction-to-machine-learning.png',
    pdfUrl: null,
    issueDate: '11 March 2026',
    credentialUrl: null
  },
  {
    number: '06',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    image: '/certificates/previews/sql-basic.png',
    pdfUrl: '/certificates/pdfs/sql-basic.pdf',
    issueDate: '17 March 2026',
    credentialUrl: null
  },
  {
    number: '07',
    title: 'Data Science 101',
    issuer: 'IBM / Cognitive Class',
    image: '/certificates/previews/data-science-101.png',
    pdfUrl: '/certificates/pdfs/data-science-101.pdf',
    issueDate: '11 March 2026',
    credentialUrl: 'https://courses.cognitiveclass.ai/certificates/4d62eda376994ab18dcb436df7cbd438'
  }
];
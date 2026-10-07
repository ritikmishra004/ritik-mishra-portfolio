export type TimelineItem = { period: string; title: string; organisation: string | null; description: string | null; details?: string[]; location?: string | null; manager?: string | null };

export const experience: TimelineItem[] = [
  { period: '17 November 2025 – February 2026 · 3 months', title: 'Data Science Intern — Tech Team', organisation: 'Adviktech Beat Services (OPC) Private Limited', description: null, location: 'Greater Noida West, Sector 4, Uttar Pradesh', manager: 'Pawan Panchal', details: ['Data collection, cleaning, and preprocessing', 'Exploratory data analysis', 'Statistical methods and machine learning algorithms', 'Predictive model development and evaluation', 'Pandas, NumPy, Scikit-learn, and Matplotlib', 'Data visualization, dashboards, reports, and documentation'] }
];

export const education: TimelineItem[] = [
  { period: '2022 — 2026 · CGPA: 8.35 / 10', title: 'B.Tech in Information Technology', organisation: 'Gautam Buddha University', description: null },
  { period: '', title: '12th', organisation: 'D.S.R Modern School, Noida', description: null },
  { period: '', title: '10th', organisation: 'D.S.R Modern School, Noida', description: null }
];

export type TimelineItem = { period: string; title: string; organisation: string | null; description: string | null; details?: string[] };

export const experience: TimelineItem[] = [
  { period: 'Joined 17 November 2025 · 3 months', title: 'Data Science Intern — Tech Team', organisation: 'Adviktech Beat Services (OPC) Private Limited', description: null, details: ['Data collection, cleaning, and preprocessing', 'Exploratory data analysis', 'Statistical methods and machine learning algorithms', 'Predictive model development and evaluation', 'Pandas, NumPy, Scikit-learn, and Matplotlib', 'Data visualization, dashboards, reports, and documentation'] }
];

export const education: TimelineItem[] = [
  { period: 'Graduation year: 2026', title: 'B.Tech in Information Technology', organisation: 'Gautam Buddha University', description: 'CGPA: 8.35/10' }
];

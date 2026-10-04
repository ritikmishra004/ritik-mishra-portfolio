export type SocialLink = { label: string; href: string | null };

export const social = {
  name: 'Ritik Mishra' as string | null,
  email: 'ritikmishra1004@gmail.com' as string | null,
  phone: '8750156254' as string | null,
  links: [
    { label: 'GitHub', href: 'https://github.com/ritikmishra004' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ritikmishra-ai/' }
  ] satisfies SocialLink[],
  resumeUrl: '/resume.pdf' as string | null
};

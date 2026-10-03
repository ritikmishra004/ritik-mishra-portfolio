export function CaseStudy({ label, children }: { label: string; children: React.ReactNode }) {
  return <section className="grid gap-4 border-t border-line py-8 md:grid-cols-[11rem_1fr] md:gap-12">
    <h2 className="eyebrow pt-1">{label}</h2>
    <div className="max-w-2xl text-base leading-7 text-muted">{children}</div>
  </section>;
}

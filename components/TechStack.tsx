export function TechStack({ items }: { items: string[] }) {
  return <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
    {items.map((item) => <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{item}</li>)}
  </ul>;
}

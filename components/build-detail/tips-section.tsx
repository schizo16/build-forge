export function TipsSection({ tips }: { tips: string[] }) {
  if (!tips || tips.length === 0) return null

  return (
    <div className="rounded-lg border border-accent-gold/20 bg-forge-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-accent-gold">💡</span>
        <h3 className="font-display text-sm text-accent-gold">Tips &amp; Tricks</h3>
      </div>
      <ul className="space-y-2 pl-5 text-[11px] text-forge-muted">
        {tips.map((tip, i) => (
          <li key={i} className="list-disc">{tip}</li>
        ))}
      </ul>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef, useMemo } from "react"
import { useParams } from "next/navigation"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GAME_CONFIGS, type GameSlug } from "@/lib/utils"
import { walkthroughs } from "@/data/walkthrough/index"

gsap.registerPlugin(ScrollTrigger)

type ContentType = 'boss' | 'item' | 'npc' | 'tip' | 'bonfire' | 'normal'

function parseLine(line: string): { type: ContentType; text: string } {
  if (line.startsWith('[BOSS]')) return { type: 'boss', text: line.slice(6).trim() }
  if (line.startsWith('[ITEM]')) return { type: 'item', text: line.slice(6).trim() }
  if (line.startsWith('[NPC]')) return { type: 'npc', text: line.slice(5).trim() }
  if (line.startsWith('[TIP]')) return { type: 'tip', text: line.slice(5).trim() }
  if (line.startsWith('[BONFIRE]')) return { type: 'bonfire', text: line.slice(9).trim() }
  return { type: 'normal', text: line }
}

const TYPE_STYLES: Record<ContentType, { icon: string; color: string; bg: string; label: string }> = {
  boss: { icon: '🎯', color: '#DC2626', bg: '#DC262611', label: 'BOSS' },
  item: { icon: '📦', color: '#D4AF37', bg: '#D4AF3711', label: 'ITEM' },
  npc: { icon: '👤', color: '#A78BFA', bg: '#A78BFA11', label: 'NPC' },
  tip: { icon: '⚡', color: '#F59E0B', bg: '#F59E0B11', label: 'TIP' },
  bonfire: { icon: '🔥', color: '#F97316', bg: '#F9731611', label: 'BONFIRE' },
  normal: { icon: '', color: '#E4E0D8', bg: 'transparent', label: '' },
}

function ContentLine({ line }: { line: string }) {
  const { type, text } = parseLine(line)
  const style = TYPE_STYLES[type]

  if (type === 'normal') {
    return <p className="text-sm text-forge-text leading-relaxed">{text}</p>
  }

  return (
    <div className="flex gap-3 rounded-lg px-3 py-2" style={{ backgroundColor: style.bg }}>
      <span className="mt-0.5 shrink-0 text-sm">{style.icon}</span>
      <div className="min-w-0">
        <span className="inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider mb-1"
          style={{ color: style.color, backgroundColor: `${style.color}22` }}>
          {style.label}
        </span>
        <p className="text-sm leading-relaxed" style={{ color: style.color === '#E4E0D8' ? undefined : style.color }}>
          {text}
        </p>
      </div>
    </div>
  )
}

export default function WalkthroughPage() {
  const params = useParams()
  const game = params.game as string
  const config = GAME_CONFIGS[game as GameSlug]
  const wt = walkthroughs[game]

  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const [done, setDone] = useState<Record<number, boolean>>({})
  const [activeTab, setActiveTab] = useState<'areas' | 'npcs'>('areas')
  const progressRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const ex = localStorage.getItem(`wt-exp-${game}`)
      if (ex) setExpanded(JSON.parse(ex))
      const dn = localStorage.getItem(`wt-done-${game}`)
      if (dn) setDone(JSON.parse(dn))
    } catch {}
  }, [game])

  useEffect(() => {
    localStorage.setItem(`wt-exp-${game}`, JSON.stringify(expanded))
  }, [expanded, game])
  useEffect(() => {
    localStorage.setItem(`wt-done-${game}`, JSON.stringify(done))
  }, [done, game])

  const sortedSections = useMemo(() =>
    (wt?.sections ?? []).sort((a, b) => a.order - b.order),
    [wt]
  )

  const doneCount = Object.values(done).filter(Boolean).length
  const totalCount = sortedSections.length
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  useGSAP(() => {
    if (!progressRef.current) return
    gsap.to(progressRef.current, { width: `${pct}%`, duration: 0.6, ease: "power2.out" })
  }, [pct])

  const allNpcLines = useMemo(() =>
    sortedSections.flatMap(s =>
      s.content.filter(l => l.startsWith('[NPC]')).map((l, i) => ({ section: s, line: l, key: `${s.order}-${i}` }))
    ),
    [sortedSections]
  )

  if (!config || !wt) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <p className="text-forge-muted">Walkthrough not found</p>
      </div>
    )
  }

  const toggleSection = (order: number) => {
    setExpanded(prev => ({ ...prev, [order]: !prev[order] }))
  }

  const toggleDone = (order: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setDone(prev => ({ ...prev, [order]: !prev[order] }))
  }

  const scrollToSection = (order: number) => {
    const el = sectionsRef.current[order]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <p className="text-[10px] tracking-widest text-forge-muted uppercase">Build Forge / Walkthrough</p>
      <h1 className="mt-1 font-display text-2xl tracking-wider text-forge-text">{wt.name}</h1>

      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between text-xs text-forge-muted mb-2">
          <span>Progress: {doneCount}/{totalCount} sections</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-forge-surface overflow-hidden">
          <div ref={progressRef} className="h-full rounded-full bg-gradient-to-r from-accent-gold to-accent-amber"
            style={{ width: '0%' }} />
        </div>
      </div>

      <div className="flex gap-1 rounded-lg bg-forge-surface p-1 border border-forge-border w-fit mb-6">
        <button onClick={() => setActiveTab('areas')}
          className={`rounded-md px-4 py-1.5 text-xs transition-all ${activeTab === 'areas' ? 'bg-accent-gold text-black font-semibold' : 'text-forge-muted hover:text-forge-text'}`}>
          📍 Areas
        </button>
        <button onClick={() => setActiveTab('npcs')}
          className={`rounded-md px-4 py-1.5 text-xs transition-all ${activeTab === 'npcs' ? 'bg-accent-gold text-black font-semibold' : 'text-forge-muted hover:text-forge-text'}`}>
          👤 NPCs ({allNpcLines.length})
        </button>
      </div>

      {activeTab === 'npcs' ? (
        <div className="space-y-2">
          {allNpcLines.length === 0 && (
            <p className="text-sm text-forge-muted">No NPC entries found in this walkthrough.</p>
          )}
          {allNpcLines.map(({ section, line, key }) => (
            <div key={key} className="rounded-lg border border-forge-border bg-forge-surface p-4">
              <span className="text-[10px] text-forge-muted mb-1 block">{section.order}. {section.title}</span>
              <ContentLine line={line} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-8">
          <div ref={sidebarRef} className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-forge-muted mb-2">Sections</p>
              {sortedSections.map((s) => (
                <button key={s.order} onClick={() => scrollToSection(s.order)}
                  className={`block w-full text-left rounded px-2 py-1 text-xs transition-all hover:bg-forge-hover ${
                    done[s.order] ? 'text-accent-gold' : 'text-forge-muted hover:text-forge-text'
                  }`}>
                  <span className="mr-1">{done[s.order] ? '✓' : `${s.order}.`}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {sortedSections.map((section) => (
              <div key={section.order}
                ref={el => { sectionsRef.current[section.order] = el }}
                className="rounded-lg border border-forge-border bg-forge-surface overflow-hidden">
                <button onClick={() => toggleSection(section.order)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-forge-hover">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      done[section.order]
                        ? 'bg-accent-gold text-black'
                        : 'bg-forge-hover text-forge-muted'
                    }`}>
                      {done[section.order] ? '✓' : section.order}
                    </span>
                    <div>
                      <h3 className="font-display text-sm text-forge-text">{section.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span onClick={(e) => toggleDone(section.order, e)}
                      className={`rounded px-2 py-0.5 text-[10px] cursor-pointer transition-all ${
                        done[section.order]
                          ? 'bg-accent-green/20 text-accent-green'
                          : 'bg-forge-hover text-forge-muted hover:text-forge-text'
                      }`}>
                      {done[section.order] ? '✓ Done' : 'Mark done'}
                    </span>
                    <span className={`text-forge-muted text-sm transition-transform duration-200 ${
                      expanded[section.order] ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </div>
                </button>
                {expanded[section.order] && (
                  <div className="border-t border-forge-border px-4 py-3 space-y-2">
                    {section.content.map((line, i) => (
                      <ContentLine key={i} line={line} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

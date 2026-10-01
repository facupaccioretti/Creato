"use client"

import { Building2, ChevronLeft, ChevronRight, IceCreamCone } from "lucide-react"
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { CASES, PILLARS, WHATSAPP_URL, type CaseStudy } from "@/lib/content"

function CaseCover({ item }: { item: CaseStudy }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (item.images.length < 2) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % item.images.length), 3000)
    return () => window.clearInterval(timer)
  }, [item.images.length])
  const image = item.images[active]
  if (!image) {
    const Icon = item.id === "heladeria" ? IceCreamCone : item.id === "farmacias-3d" ? Building2 : Building2
    return <div className="flex h-full min-h-0 flex-col justify-end bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px] bg-graphite p-6"><Icon className="mb-auto size-16 text-orange/90" strokeWidth={1} aria-hidden="true" /><p className="font-display text-2xl text-white">{item.shortTitle}</p></div>
  }
  return <div role="img" aria-label={image.alt} className={`relative h-full min-h-0 shrink-0 bg-white bg-center ${image.kind === "photo" ? "bg-cover" : "bg-contain bg-no-repeat"}`} style={{ backgroundImage: `url("${image.src}")` }}><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" /></div>
}

function CaseCard({ item }: { item: CaseStudy }) {
  const [hovered, setHovered] = useState(false)
  const message = encodeURIComponent(`Hola, vi el caso "${item.shortTitle}" y quiero algo parecido.`)
  return <article tabIndex={0} aria-labelledby={`${item.id}-title`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)} onWheel={(event) => event.stopPropagation()} className={`case-card group relative flex shrink-0 flex-col rounded-xl bg-graphite text-white outline-none transition-[width,opacity] duration-500 ease-out focus-within:z-10 focus-visible:ring-2 focus-visible:ring-orange ${hovered ? "case-card-expanded" : ""}`}>
    <div className="case-cover relative shrink-0"><CaseCover item={item} /></div>
    <div className="case-summary min-h-[9.5rem] shrink-0 p-5"><div className="mb-3 flex flex-wrap gap-1.5">{item.areas.map((area) => <span key={area} className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/75">{PILLARS.find((pillar) => pillar.id === area)?.name.split(" ")[0]}</span>)}</div><h3 id={`${item.id}-title`} className="font-display text-xl leading-tight">{item.shortTitle}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">{item.project}</p></div>
    <div className="case-detail min-h-0 flex-1 bg-graphite p-5"><div className="pt-4"><h3 className="font-display text-lg">{item.title}</h3><p className="mt-3 text-sm text-white/75"><strong className="text-white">El proyecto:</strong> {item.project}</p><p className="mt-3 text-sm font-semibold text-white">Lo que hicimos:</p><ul className="mt-1 space-y-1 text-sm text-white/75">{item.work.map((entry) => <li key={entry} className="flex gap-2"><span className="text-orange">•</span><span>{entry}</span></li>)}</ul><a href={`${WHATSAPP_URL.split("?text=")[0]}?text=${message}`} onClick={(event) => event.stopPropagation()} className="mt-4 inline-block text-sm font-semibold text-orange hover:underline">Quiero algo así →</a></div></div>
  </article>
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)
  const edgeSpeedRef = useRef(1)
  const pointerRef = useRef({ x: -1, y: -1, inside: false })
  const loopWidthRef = useRef(0)
  const cases = CASES

  useEffect(() => {
    let frame = 0
    let lastTime = performance.now()
    const measure = () => {
      const track = trackRef.current
      if (track) loopWidthRef.current = track.scrollWidth / 2
    }
    const resizeObserver = new ResizeObserver(measure)
    if (trackRef.current) resizeObserver.observe(trackRef.current)
    measure()

    const tick = (time: number) => {
      const track = trackRef.current
      const elapsed = Math.min(40, time - lastTime)
      lastTime = time
      const loopWidth = loopWidthRef.current
      if (track && loopWidth > track.clientWidth && !dragRef.current.active) {
        const { x, inside } = pointerRef.current
        let multiplier = 1
        let paused = false
        if (inside) {
          const bounds = track.getBoundingClientRect()
          const edgeZone = Math.min(160, bounds.width * 0.18)
          const distance = Math.min(x - bounds.left, bounds.right - x)
          if (distance <= edgeZone) {
            multiplier = 1 + (1 - Math.max(0, distance) / edgeZone) * 0.7
          } else {
            paused = true
          }
        }
        edgeSpeedRef.current = multiplier
        if (!paused) {
          const baseSpeed = 0.09
          const next = track.scrollLeft + (baseSpeed * elapsed) * multiplier
          track.scrollLeft = next >= loopWidth ? next - loopWidth : next
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest("a, button")) return
    const track = trackRef.current
    if (!track) return
    dragRef.current = { active: true, startX: event.clientX, startScroll: track.scrollLeft }
    setDragging(true)
    track.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    pointerRef.current = { x: event.clientX, y: event.clientY, inside: true }
    if (dragRef.current.active) {
      const loopWidth = loopWidthRef.current
      const next = dragRef.current.startScroll - (event.clientX - dragRef.current.startX)
      track.scrollLeft = loopWidth ? ((next % loopWidth) + loopWidth) % loopWidth : next
    }
  }
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    dragRef.current.active = false
    setDragging(false)
    edgeSpeedRef.current = 1
  }
  const onPointerLeave = () => {
    if (!dragRef.current.active) pointerRef.current = { x: -1, y: -1, inside: false }
  }

  return <section aria-labelledby="casos-title" id="casos" className="snap-section flex min-h-0 flex-col bg-mist px-6 py-[clamp(1rem,5dvh,3rem)] text-navy md:px-10">
    <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
      <header className="mb-4 shrink-0 md:mb-6"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange">Casos de éxito</p><h2 id="casos-title" className="max-w-2xl font-display text-3xl leading-tight md:text-5xl">Negocios que escalaron con creato</h2><p className="mt-3 max-w-xl text-sm text-navy/70 md:text-base">Proyectos reales en las cinco áreas: del diseño de un local a un sistema de gestión.</p></div></header>
      <div ref={trackRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerLeave={onPointerLeave} onMouseMove={onPointerMove} onMouseLeave={onPointerLeave} className={`case-marquee min-h-0 flex-1 ${dragging ? "case-marquee-dragging" : ""}`}><div className="case-track flex h-full gap-4">{[...cases, ...cases].map((item, index) => <CaseCard key={`${item.id}-${index}`} item={item} />)}</div></div>
      <div className="mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-navy/15 pt-4"><p className="font-display text-lg md:text-xl">¿Tenés un proyecto parecido?</p><a className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange/85" href={`${WHATSAPP_URL.split("?text=")[0]}?text=${encodeURIComponent("Hola, quiero contarte sobre mi proyecto.")}`}>Contanos tu proyecto</a></div>
    </div>
  </section>
}

export function CaseArrow({ direction }: { direction: "left" | "right" }) { return direction === "left" ? <ChevronLeft /> : <ChevronRight /> }

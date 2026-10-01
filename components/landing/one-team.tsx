"use client"

import { useState } from "react"
import Image from "next/image"

const professionals = [
  "Arquitectura y espacios",
  "Diseño y comunicación",
  "Tecnología y sistemas",
  "Gestión y operaciones",
  "Eventos y producción",
  "Marketing y contenidos",
  "Finanzas y estrategia",
  "Legal y administración",
]

export function OneTeam() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<"next" | "previous">("next")
  const totalPages = Math.ceil(professionals.length / 4)
  const visibleProfessionals = professionals.slice(page * 4, page * 4 + 4)

  return (
    <section aria-labelledby="equipo-title" id="equipo" className="snap-section on-dark relative bg-graphite px-6 py-[clamp(1rem,5dvh,3rem)] text-white md:px-10">
      <div className="absolute inset-0 md:hidden">
        <Image src="/images/equipo.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-graphite/85" />
      </div>
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-10">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="equipo-title" className="text-3xl text-white md:text-5xl">Un solo equipo</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:mt-6 md:text-lg"><strong className="text-white">Liberate del desgaste de gestionar distintos equipos por separado.</strong> Integramos arquitectura, tecnología, diseño y gestión comercial para que enfoques toda tu energía en tu negocio. Un único interlocutor, visión global de tu proyecto y cero estrés para vos.</p>
            <ul className="mt-6 flex flex-col gap-3 text-white md:mt-8">
              <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />Comunicación centralizada (un único responsable).</li>
              <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />Presupuestos globales, claros y sin costos ocultos.</li>
            </ul>
          </div>
          <div className="relative hidden h-full max-h-[75dvh] min-h-0 overflow-x-clip rounded-xl md:block"><Image src="/images/equipo.png" alt="Equipo reunido revisando planos y una laptop" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" /></div>
        </div>
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <h2 className="text-3xl text-white md:text-5xl">Muchos profesionales</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">Una red de especialistas que reúne distintas miradas para resolver cada desafío con una visión integral.</p>
          <div className="relative mt-8 px-10"><button type="button" aria-label="Profesionales anteriores" disabled={page === 0} onClick={() => { setDirection("previous"); setPage((current) => Math.max(0, current - 1)) }} className="absolute left-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:pointer-events-none disabled:opacity-20"><span aria-hidden="true" className="text-xl leading-none">‹</span></button><div key={page} className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 professional-carousel-slide-${direction}`}>
            {visibleProfessionals.map((role) => (
              <article key={role} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3"><div className="size-14 shrink-0 rounded-full border border-white/15 bg-white/10" aria-hidden="true" /><div><h3 className="font-medium text-white">Nombre profesional</h3><p className="text-sm text-orange">{role}</p></div></div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">Descripción breve del profesional y su aporte al equipo.</p>
              </article>
            ))}
          </div><button type="button" aria-label="Siguientes profesionales" disabled={page === totalPages - 1} onClick={() => { setDirection("next"); setPage((current) => Math.min(totalPages - 1, current + 1)) }} className="absolute right-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:pointer-events-none disabled:opacity-20"><span aria-hidden="true" className="text-xl leading-none">›</span></button></div>
        </div>
      </div>
    </section>
  )
}

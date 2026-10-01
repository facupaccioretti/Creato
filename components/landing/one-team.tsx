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
    <section
      aria-labelledby="equipo-title"
      id="equipo"
      className="snap-section on-dark relative bg-graphite px-6 py-[clamp(1rem,3.5dvh,2.5rem)] text-white md:px-10"
    >
      <div className="absolute inset-0 md:hidden">
        <Image src="/images/equipo.png" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-graphite/85" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-5 md:gap-7">
        {/* Bloque superior: Un solo equipo */}
        <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-14">
          <div>
            <h2
              id="equipo-title"
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white leading-tight"
            >
              Un solo equipo
            </h2>
            <p className="mt-2.5 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-white/80">
              <strong className="text-white">Liberate del desgaste de gestionar distintos equipos por separado.</strong>{" "}
              Integramos arquitectura, tecnología, diseño y gestión comercial para que enfoques toda tu energía en tu negocio.
              Un único interlocutor, visión global y cero estrés.
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-xs sm:text-sm text-white/90 md:mt-4">
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                Comunicación centralizada (un único responsable).
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                Presupuestos globales, claros y sin costos ocultos.
              </li>
            </ul>
          </div>
          <div className="relative hidden h-full max-h-[30dvh] min-h-[180px] overflow-hidden rounded-xl md:block lg:max-h-[34dvh]">
            <Image
              src="/images/equipo.png"
              alt="Equipo reunido revisando planos y una laptop"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Bloque inferior: Muchos profesionales */}
        <div className="border-t border-white/10 pt-4 md:pt-5">
          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            Muchos profesionales
          </h3>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/65">
            Una red de especialistas que reúne distintas miradas para resolver cada desafío con una visión integral.
          </p>

          <div className="relative mt-4 px-8 md:mt-5 md:px-10">
            <button
              type="button"
              aria-label="Profesionales anteriores"
              disabled={page === 0}
              onClick={() => {
                setDirection("previous")
                setPage((current) => Math.max(0, current - 1))
              }}
              className="absolute left-0 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:pointer-events-none disabled:opacity-20 md:size-8"
            >
              <span aria-hidden="true" className="text-lg leading-none md:text-xl">‹</span>
            </button>

            <div
              key={page}
              className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 professional-carousel-slide-${direction}`}
            >
              {visibleProfessionals.map((role) => (
                <article
                  key={role}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3 md:p-3.5 transition-colors hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-11 shrink-0 rounded-full border border-white/15 bg-white/10"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="font-medium text-white text-xs sm:text-sm">
                        Nombre profesional
                      </h4>
                      <p className="text-[11px] sm:text-xs text-orange">{role}</p>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/60 line-clamp-2">
                    Descripción breve del profesional y su aporte al equipo.
                  </p>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Siguientes profesionales"
              disabled={page === totalPages - 1}
              onClick={() => {
                setDirection("next")
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }}
              className="absolute right-0 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:pointer-events-none disabled:opacity-20 md:size-8"
            >
              <span aria-hidden="true" className="text-lg leading-none md:text-xl">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

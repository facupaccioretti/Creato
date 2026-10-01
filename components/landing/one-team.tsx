"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TEAM_COPY, TEAM_ROLES } from "@/lib/content"
import { MOTION } from "@/lib/animation"

export function OneTeam() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<"next" | "previous">("next")
  const totalPages = Math.ceil(TEAM_ROLES.length / 4)
  const visibleRoles = TEAM_ROLES.slice(page * 4, page * 4 + 4)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from("[data-team-reveal]", {
      y: 40,
      opacity: 0,
      stagger: MOTION.stagger,
      ease: MOTION.ease.out,
      scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="equipo-title"
      id="equipo"
      className="on-dark relative overflow-hidden bg-graphite px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(233,109,69,.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.05),transparent_28%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-12 md:gap-16">
        {/* Bloque superior: Un solo equipo */}
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
          <div data-team-reveal>
            <p className="section-kicker">Una red, una dirección</p>
            <h2
              id="equipo-title"
              className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white"
            >
              {TEAM_COPY.title}
            </h2>
            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-white/75">
              {TEAM_COPY.description}
            </p>
            <ul className="mt-6 space-y-3 border-l-2 border-orange pl-5 text-sm sm:text-base text-white/90">
              {TEAM_COPY.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-team-reveal className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src="/images/equipo.png"
              alt="Equipo de Creato reunido trabajando en proyectos integrales"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/80">
              <span className="font-heading font-semibold text-white">creato<span className="text-orange">.</span></span>
              <span>Visión unificada y coordinación de principio a fin</span>
            </div>
          </div>
        </div>

        {/* Bloque inferior: Muchos profesionales con placeholders */}
        <div data-team-reveal className="border-t border-white/10 pt-8 md:pt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white">
                {TEAM_COPY.rolesTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/65">
                {TEAM_COPY.rolesDescription}
              </p>
            </div>

            {/* Controles de paginación de carrusel */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                aria-label="Profesionales anteriores"
                disabled={page === 0}
                onClick={() => {
                  setDirection("previous")
                  setPage((curr) => Math.max(0, curr - 1))
                }}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-orange hover:bg-orange hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                ‹
              </button>
              <span className="px-1 font-mono text-xs text-white/60">
                0{page + 1} / 0{totalPages}
              </span>
              <button
                type="button"
                aria-label="Siguientes profesionales"
                disabled={page === totalPages - 1}
                onClick={() => {
                  setDirection("next")
                  setPage((curr) => Math.min(totalPages - 1, curr + 1))
                }}
                className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-orange hover:bg-orange hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                ›
              </button>
            </div>
          </div>

          {/* Carrusel de tarjetas con placeholders para profesionales */}
          <div className="mt-6">
            <div
              key={page}
              className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 professional-carousel-slide-${direction}`}
            >
              {visibleRoles.map((role, idx) => (
                <article
                  key={role}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/60 hover:bg-white/[0.08]"
                >
                  <div>
                    <div className="flex items-center gap-3.5">
                      {/* Avatar placeholder */}
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Placeholder profesional"
                          fill
                          sizes="48px"
                          className="object-cover opacity-85 grayscale contrast-125 transition group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] text-orange">
                          0{page * 4 + idx + 1}
                        </span>
                        <h4 className="font-heading text-sm font-semibold text-white truncate">
                          Nombre profesional
                        </h4>
                        <p className="text-xs font-medium text-orange truncate">
                          {role}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3.5 text-xs leading-relaxed text-white/65 line-clamp-2">
                      Descripción breve del profesional y su aporte al equipo para coordinar y ejecutar cada aspecto del área.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/45">
                    <span>Especialista Creato</span>
                    <span className="text-orange/80 group-hover:text-orange transition-colors">Activo</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

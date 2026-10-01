"use client"

import { PILLARS } from "@/lib/content"
import { PillarCard } from "./pillar-card"

export function Pillars() {
  return (
    <section aria-labelledby="pilares-title" id="pilares" className="bg-white px-6 py-[clamp(1rem,5dvh,3rem)] md:px-10">
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <header className="shrink-0">
          <h2 id="pilares-title" className="text-3xl text-navy md:text-5xl">Evolucionamos cada área de tu negocio</h2>
          <p className="mt-2 max-w-md text-muted-foreground short:text-sm">Un equipo preparado para acompañar cada desafío de tu negocio.</p>
        </header>
        <ul className="mt-5 flex h-[34rem] shrink-0 flex-col gap-3 overflow-hidden lg:flex-row">
          {PILLARS.map((pillar) => (
            <li key={pillar.id} className="pillar-item h-full min-h-0 min-w-0 flex-1 transition-[flex] duration-500 ease-out">
              <PillarCard pillar={pillar} className="h-full min-h-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

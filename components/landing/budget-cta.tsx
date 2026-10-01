"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { ON_YOUR_OWN, WITH_US, BUDGET_STEPS } from "@/lib/content"
import { ContactActions, EmailLink } from "./contact-links"
import { SiteFooter } from "./site-footer"

export function BudgetCta() {
  const [tab, setTab] = useState<"traditional" | "experience">("experience")
  const list = tab === "traditional" ? ON_YOUR_OWN : WITH_US

  return (
    <>
      <section id="presupuesto" aria-labelledby="presupuesto-title" className="snap-section bg-muted px-6 py-[clamp(1rem,5dvh,3rem)] md:px-10">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="max-w-2xl">
            <h2 id="presupuesto-title" className="text-3xl text-navy md:text-5xl">Trabajemos juntos</h2>
            <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-lg">Contanos los desafíos de tu negocio y te armamos una propuesta global para resolverlos todos.</p>
          </div>
          <div className="mt-6 md:mt-10">
            <div role="tablist" aria-label="Comparación de caminos" className="mb-4 flex rounded-full bg-white p-1 md:hidden">
              <button role="tab" aria-selected={tab === "traditional"} onClick={() => setTab("traditional")} className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white">El camino tradicional</button>
              <button role="tab" aria-selected={tab === "experience"} onClick={() => setTab("experience")} className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white">La experiencia creato</button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Comparison title="El camino tradicional" items={ON_YOUR_OWN} icon="x" className="hidden md:block" />
              <Comparison title="La experiencia creato" items={WITH_US} icon="check" itemsOverride={list} />
            </div>
          </div>
        </div>
      </section>
      <section id="contacto" aria-labelledby="contacto-title" className="snap-section bg-navy px-6 py-6 text-white md:px-10">
        <div className="mx-auto flex h-full max-w-7xl flex-col">
          <div>
            <h2 id="contacto-title" className="text-3xl text-white md:text-5xl">¿Cómo seguimos?</h2>
            <ol className="mt-5 grid gap-4 sm:grid-cols-3">
              {BUDGET_STEPS.map((step, index) => <li key={step.title} className="border-t border-white/40 pt-3"><span className="font-heading text-orange">0{index + 1}</span><h3 className="mt-1 text-lg font-semibold">{step.title}</h3><p className="mt-1 text-sm text-white/75">{step.text}</p></li>)}
            </ol>
          </div>
          <div className="mt-auto space-y-5 pt-8">
            <ContactActions onDark className="w-full [&>a]:min-h-14 [&>a]:flex-1 [&>a]:justify-center" />
            <p className="text-sm text-white/75">También podés escribirnos a <EmailLink className="text-white" /></p>
            <SiteFooter />
          </div>
        </div>
      </section>
    </>
  )
}

function Comparison({ title, items, icon, className, itemsOverride }: { title: string; items: string[]; icon: "x" | "check"; className?: string; itemsOverride?: string[] }) {
  return <div className={`rounded-2xl p-5 md:p-7 ${icon === "check" ? "on-dark bg-navy text-white" : "bg-white text-navy"} ${className ?? ""}`}><h3 className="font-heading text-lg font-semibold">{title}</h3><ul className="mt-4 flex flex-col gap-2.5 text-sm md:gap-3 md:text-base">{(itemsOverride ?? items).map((item) => <li key={item} className="flex items-start gap-3"><span aria-hidden="true">{icon === "check" ? <Check className="mt-0.5 size-4 shrink-0 text-orange" /> : <X className="mt-0.5 size-4 shrink-0 text-graphite/50" />}</span>{item}</li>)}</ul></div>
}

export function ContactSection() {}

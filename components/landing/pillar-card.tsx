"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import type { Pillar } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ContactActions } from "./contact-links"

export function PillarCard({ pillar, className, expanded = false }: { pillar: Pillar; className?: string; expanded?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const titleId = `${pillar.id}-title`
  const openDialog = () => { dialogRef.current?.showModal(); setOpen(true) }
  const closeDialog = () => { dialogRef.current?.close(); setOpen(false) }

  useEffect(() => {
    const onHash = () => { if (window.location.hash === `#${pillar.id}`) { document.getElementById(pillar.id)?.closest(".snap-section")?.scrollIntoView({ behavior: "smooth", block: "start" }); openDialog() } }
    onHash(); window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pillar.id])

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = "" } }, [open])

  return <>
    <article id={pillar.id} className={cn("on-dark group relative h-full min-h-0 cursor-pointer overflow-hidden rounded-xl bg-navy text-white transition-[width,transform] duration-500", className)} onClick={openDialog} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDialog() } }} role="button" tabIndex={0}>
      <Image src={pillar.image} alt={pillar.alt} fill sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-end p-6 md:p-8"><div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-500 group-hover:mb-4 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mb-4 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"><div className="min-h-0 overflow-hidden"><p className="mb-4 max-w-sm text-sm leading-relaxed text-white/85">{pillar.headline}</p><ul className="flex flex-col gap-1.5">{pillar.services.map((service) => <li key={service} className="flex items-start gap-3 text-sm text-white md:text-base"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />{service}</li>)}</ul></div></div><div className="flex items-end justify-between gap-4"><h3 className="max-w-[80%] text-2xl leading-tight text-white"><span className="mb-2 block font-sans text-sm font-medium text-white/70">{pillar.number}</span>{pillar.name}</h3><button type="button" onClick={(event) => { event.stopPropagation(); openDialog() }} aria-haspopup="dialog" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-navy"><Plus className="size-5" aria-hidden="true" /><span className="sr-only">Ver más sobre {pillar.name}</span></button></div></div>
    </article>
    <dialog ref={dialogRef} aria-labelledby={titleId} onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) closeDialog() }} className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-2xl bg-white p-0 text-navy shadow-2xl backdrop:bg-black/60">
      <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-2"><div className="relative min-h-56 md:min-h-full"><Image src={pillar.image} alt={pillar.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="relative p-6 md:p-10"><button type="button" onClick={closeDialog} className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-navy/20 hover:bg-navy hover:text-white"><X className="size-5" aria-hidden="true" /><span className="sr-only">Cerrar</span></button><span className="font-heading text-sm font-semibold text-[#c2531a]">{pillar.number}</span><h2 id={titleId} className="mt-3 pr-8 text-3xl leading-tight">{pillar.name}</h2><p className="mt-5 font-semibold leading-relaxed">{pillar.headline}</p><p className="mt-3 leading-relaxed text-muted-foreground">{pillar.description}</p><ul className="mt-6 flex flex-col gap-3">{pillar.services.map((service) => <li key={service} className="flex items-start gap-3 text-sm"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />{service}</li>)}</ul><div className="mt-8"><ContactActions /></div></div></div>
    </dialog>
  </>
}


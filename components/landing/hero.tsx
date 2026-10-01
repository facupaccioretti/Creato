"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const sectionLinks = [
  ["Áreas", "#pilares"],
  ["Casos", "#casos"],
  ["Proceso", "#proceso"],
  ["Equipo", "#equipo"],
  ["Contacto", "#contacto"],
]

export function Hero() {
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY < 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <header className="on-dark relative flex h-dvh flex-col overflow-hidden bg-navy text-white"><Image src="/images/hero.png" alt="" fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-navy/60" aria-hidden="true" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" /><nav aria-label="Secciones principales" className={`absolute inset-x-0 top-0 z-10 transition-all duration-300 ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}><div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 md:px-10"><a href="#inicio" className="font-heading text-lg font-semibold tracking-[-0.04em] text-white">creato<span className="text-orange">.</span></a><div className="flex items-center gap-4 md:gap-6">{sectionLinks.map(([label, href]) => <a key={href} href={href} className="hidden text-sm text-white/80 transition-colors hover:text-white sm:inline">{label}</a>)}<a href="#contacto" className="whitespace-nowrap text-sm font-medium text-white/90 underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-white">Trabajá con nosotros</a></div></div></nav><div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-24 md:px-10 md:pb-32"><div className="mb-5 -translate-y-6 font-heading text-6xl font-semibold tracking-[-0.08em] text-white sm:text-8xl lg:text-9xl">creato<span className="text-orange">.</span></div><h1 className="max-w-4xl text-4xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">Muchas soluciones, un solo contacto.</h1><p className="mt-6 max-w-2xl text-lg text-white/85">Somos un equipo de profesionales que une sus talentos para brindar soluciones integrales. Nos especializamos en arquitectura, diseño, sistemas, tecnología, eventos y gestión, operando como un unico punto de contacto para que canalices todas tus necesidades a traves de un solo proveedor.</p></div></header>
}


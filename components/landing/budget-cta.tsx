"use client"

import { useState } from "react"
import { Check, X, Phone, Mail, MessageCircle } from "lucide-react"
import {
  ON_YOUR_OWN,
  WITH_US,
  WHATSAPP_URL,
  SCHEDULE_URL,
  CONTACT_EMAIL,
  PILLARS,
} from "@/lib/content"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function BudgetCta() {
  const [tab, setTab] = useState<"traditional" | "experience">("experience")
  const list = tab === "traditional" ? ON_YOUR_OWN : WITH_US

  return (
    <>
      <section
        id="presupuesto"
        aria-labelledby="presupuesto-title"
        className="snap-section bg-muted px-6 py-[clamp(1rem,5dvh,3rem)] md:px-10"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="max-w-2xl">
            <h2 id="presupuesto-title" className="text-3xl text-navy md:text-5xl">
              Trabajemos juntos
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-lg">
              Contanos los desafíos de tu negocio y te armamos una propuesta global para resolverlos todos.
            </p>
          </div>
          <div className="mt-6 md:mt-10">
            <div
              role="tablist"
              aria-label="Comparación de caminos"
              className="mb-4 flex rounded-full bg-white p-1 md:hidden"
            >
              <button
                role="tab"
                aria-selected={tab === "traditional"}
                onClick={() => setTab("traditional")}
                className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white"
              >
                El camino tradicional
              </button>
              <button
                role="tab"
                aria-selected={tab === "experience"}
                onClick={() => setTab("experience")}
                className="flex-1 rounded-full px-3 py-2 text-sm aria-selected:bg-navy aria-selected:text-white"
              >
                La experiencia creato
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Comparison
                title="El camino tradicional"
                items={ON_YOUR_OWN}
                icon="x"
                className="hidden md:block"
              />
              <Comparison
                title="La experiencia creato"
                items={WITH_US}
                icon="check"
                itemsOverride={list}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zona de Contacto & Footer Corporativo Simple (Estilo Autocity con fondo oscuro bg-navy / grafito) */}
      <footer
        id="contacto"
        aria-labelledby="contacto-title"
        className="snap-section on-dark border-t border-white/10 bg-navy px-6 py-12 text-white md:px-10 md:py-16"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-8">
            {/* Col 1: Logo & Redes Sociales */}
            <div className="lg:col-span-3">
              <a href="#inicio" className="font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                creato<span className="text-orange">.</span>
              </a>
              <div className="mt-5 flex items-center gap-3 text-white/75">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="Instagram de Creato"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="LinkedIn de Creato"
                >
                  <LinkedinIcon className="size-5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="WhatsApp de Creato"
                >
                  <MessageCircle className="size-5" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-orange"
                  aria-label="Correo de Creato"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </div>

            {/* Col 2: Áreas */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Áreas</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                {PILLARS.map((pillar) => (
                  <li key={pillar.id}>
                    <a href={`#${pillar.id}`} className="transition-colors hover:text-orange">
                      {pillar.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Nosotros */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Nosotros</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                <li>
                  <a href="#casos" className="transition-colors hover:text-orange">
                    Casos de éxito
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="transition-colors hover:text-orange">
                    Nuestra metodología
                  </a>
                </li>
                <li>
                  <a href="#equipo" className="transition-colors hover:text-orange">
                    Un solo equipo
                  </a>
                </li>
                <li>
                  <a href="#presupuesto" className="transition-colors hover:text-orange">
                    Presupuesto integral
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contacto */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-base font-bold text-white">Contacto</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange"
                  >
                    WhatsApp directo
                  </a>
                </li>
                <li>
                  <a
                    href={SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-orange"
                  >
                    Agendar videollamada
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="break-all transition-colors hover:text-orange"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Teléfono, Horarios y Ubicaciones */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-orange" aria-hidden="true" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-base font-bold text-white transition-colors hover:text-orange"
                >
                  +54 9 351 XXX XXXX
                </a>
              </div>
              <div className="mt-3.5 flex flex-col gap-1.5 text-xs text-white/70 leading-relaxed">
                <p>
                  <strong className="font-semibold text-white">Córdoba Capital y Buenos Aires:</strong> Lunes a Viernes de 9:00 a 18:00 hs
                </p>
                <p>
                  <strong className="font-semibold text-white">Atención comercial:</strong> Respuesta ágil en el día
                </p>
                <p>
                  <strong className="font-semibold text-white">Proyectos y obras:</strong> Cobertura presencial en Córdoba y región centro
                </p>
                <p>
                  <strong className="font-semibold text-white">Tecnología y gestión:</strong> Operatoria remota en todo el país
                </p>
                <p>
                  <strong className="font-semibold text-white">Pliegos y administración:</strong> {CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </div>

          {/* Subfooter inferior */}
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} creato.com.ar Todos los derechos reservados · Términos y Condiciones · Privacidad
            </p>
            <p className="font-heading text-xs font-semibold tracking-wider uppercase text-white/70">
              Muchas soluciones, un solo contacto.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

function Comparison({
  title,
  items,
  icon,
  className,
  itemsOverride,
}: {
  title: string
  items: string[]
  icon: "x" | "check"
  className?: string
  itemsOverride?: string[]
}) {
  return (
    <div
      className={`rounded-2xl p-5 md:p-7 ${
        icon === "check" ? "on-dark bg-navy text-white" : "bg-white text-navy"
      } ${className ?? ""}`}
    >
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm md:gap-3 md:text-base">
        {(itemsOverride ?? items).map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true">
              {icon === "check" ? (
                <Check className="mt-0.5 size-4 shrink-0 text-orange" />
              ) : (
                <X className="mt-0.5 size-4 shrink-0 text-graphite/50" />
              )}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

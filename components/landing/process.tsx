import { ArrowRight } from "lucide-react"
import { STEPS } from "@/lib/content"

export function Process() {
  return (
    <section
      aria-labelledby="proceso-title"
      id="proceso"
      className="snap-section bg-white px-6 py-[clamp(1rem,5dvh,3rem)] md:px-10"
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <header className="shrink-0">
          <h2 id="proceso-title" className="text-3xl text-navy md:text-5xl">
            Nuestra metodología
          </h2>
        </header>

        <ol className="flex flex-col justify-center gap-6 py-5 sm:grid sm:grid-cols-2 sm:content-center sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-navy pt-3 md:pt-5">
              <span className="font-heading text-6xl leading-none text-orange/80 lg:text-7xl tall:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base leading-snug text-navy md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-muted-foreground md:mt-2 md:text-lg">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex shrink-0 flex-col items-start gap-4 border-t border-navy/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-navy">
              ¿Arrancamos con el paso 1?
            </p>
            <p className="text-sm text-muted-foreground">
              Analizamos tu caso sin cargo y te presentamos una propuesta global a medida.
            </p>
          </div>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-orange hover:text-navy"
          >
            <span>Hablemos de tu caso</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

"use client"

export function SectionCarousel({ children }: { children: React.ReactNode }) {
  return <div className="section-carousel">{children}</div>
}

export function CarouselProgress() {
  return <nav aria-label="Secciones de la página" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">{sectionIds.map((id, index) => <a key={id} href={`#${id}`} aria-label={`Ir a la sección ${index + 1}`} className="size-2 rounded-full border border-navy/50 bg-white/70 transition-transform hover:scale-150" />)}</nav>
}

export { sectionIds }

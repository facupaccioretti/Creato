import { BudgetCta } from "@/components/landing/budget-cta"
import { Hero } from "@/components/landing/hero"
import { OneTeam } from "@/components/landing/one-team"
import { Pillars } from "@/components/landing/pillars"
import { Process } from "@/components/landing/process"
import { Services } from "@/components/landing/services"
import { SectionCarousel } from "@/components/landing/section-carousel"
import { WhatsAppFloat } from "@/components/landing/whatsapp-float"

export default function Home() {
  return (
    <>
      <SectionCarousel>
        <div id="inicio" className="snap-section"><Hero /></div>
        <main>
          <Pillars />
          <OneTeam />
          <Services />
          <Process />
          <BudgetCta />
        </main>
      </SectionCarousel>
      <WhatsAppFloat />
    </>
  )
}

import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/content"

export function WhatsAppFloat() { return <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-orange text-navy ring-4 ring-white transition-transform hover:scale-105 md:right-8 md:bottom-8 md:size-16"><MessageCircle className="size-7" aria-hidden="true" /><span className="sr-only">Hablemos por WhatsApp (se abre en una pestaña nueva)</span></a> }


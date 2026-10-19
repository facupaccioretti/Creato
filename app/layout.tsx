import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource/poppins/600.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'creato | Soluciones para tu negocio. Un solo presupuesto.',
  description:
    'Arquitectura comercial, identidad visual, tecnología y administración bajo un único presupuesto y un solo equipo.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico?v=3' },
      { url: '/creato-brujula-base.ico?v=3' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/favicon.ico?v=3',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#14284B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

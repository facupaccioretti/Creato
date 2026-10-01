# Documentación de Estructura y Arquitectura — Creato

Esta documentación detalla la arquitectura técnica, la jerarquía de componentes, el flujo de navegación, la capa de datos y el comportamiento interactivo/responsivo de la landing page de **Creato**.

---

## 1. Visión General del Proyecto

**Creato** es una plataforma web comercial orientada a comunicar una propuesta de valor integral para empresas y comercios: resolver múltiples áreas de negocio (arquitectura comercial, eventos y producción, diseño/marca, tecnología y sistemas, y gestión operativa) bajo **un único interlocutor y un único presupuesto**.

- **Enfoque de diseño:** Landing page fluida de alto impacto visual, con soporte completo para desktop y mobile, transiciones interactivas calibradas, modales modulares sin trampas de scroll, carruseles optimizados para touch/mouse y canales de contacto directo (WhatsApp y Calendly).
- **Idioma del sitio:** Español (`es-AR`).

---

## 2. Stack Tecnológico

| Herramienta / Librería | Versión | Propósito |
| :--- | :--- | :--- |
| **Next.js** | 16.3.x (App Router) | Framework React con arquitectura basada en componentes cliente y servidor. |
| **React** | 19.x | Biblioteca base para componentes UI, estado y ciclo de vida. |
| **Tailwind CSS** | 4.x | Motor de estilos utilitarios y variables temáticas en CSS (`@theme inline`). |
| **TypeScript** | 5.7.x | Tipado estático estricto y modelos de datos de dominio. |
| **GSAP & @gsap/react** | 3.15.x / 2.1.x | Motor de animaciones fluidas y ScrollTrigger para transiciones al scroll. |
| **Lenis** | 1.3.x | Smooth scrolling con aceleración inercial y control granular en modales. |
| **Lucide React** | 1.16.x | Conjunto de iconos vectoriales SVG. |
| **@vercel/analytics** | 1.6.x | Medición de tráfico y analíticas en producción. |

---

## 3. Estructura de Directorios

```text
Creato/
├── app/
│   ├── globals.css              # Variables de tema, reglas base, animaciones y parches accesibles (<dialog>)
│   ├── layout.tsx               # Root Layout: fuentes locales (Poppins, Inter), meta tags, viewport y Lenis
│   └── page.tsx                 # Página principal que orquesta secciones y el widget flotante
├── components/
│   ├── landing/
│   │   ├── hero.tsx             # Portada a pantalla completa con navegación superior flotante y reveal GSAP
│   │   ├── pillars.tsx          # Sección "Áreas": acordeón elástico (desktop) y chips + swipe card (mobile)
│   │   ├── pillar-card.tsx      # Tarjeta de pilar y modal nativo (<dialog>) con encabezado y footer fijos
│   │   ├── one-team.tsx         # Sección "Un solo equipo" y carrusel de especialistas con placeholders
│   │   ├── services.tsx         # Sección "Casos de éxito": marquee interactivo (desktop) y snap-scroll (mobile)
│   │   ├── process.tsx          # Sección "Metodología" en 4 etapas con línea de progreso scrubbed
│   │   ├── budget-cta.tsx       # Sección "Trabajemos juntos" (comparativa) y footer corporativo (#contacto)
│   │   ├── contact-links.tsx    # Botones reutilizables de WhatsApp, Calendly y correo electrónico
│   │   ├── help-panel.tsx       # Asistente de frases para conectar necesidades con áreas
│   │   ├── scroll-progress.tsx  # Barra superior fija indicadora de progreso de scroll
│   │   ├── smooth-scroll.tsx    # Proveedor global de Lenis + GSAP con navegación ancla suave
│   │   └── whatsapp-float.tsx   # Widget flotante no invasivo dual (WhatsApp + Calendly) con scroll-awareness
│   └── ui/
│       └── button.tsx           # Componente base de botón estilizado con CVA
├── data/                        # Documentación complementaria y briefs de contenido
├── lib/
│   ├── animation.ts             # Constantes centrales de animación (MOTION: duration, ease, stagger)
│   ├── content.ts               # Fuente única de verdad: textos, pilares, casos de éxito y datos de contacto
│   └── utils.ts                 # Utilidad `cn` (clsx + tailwind-merge)
└── public/
    ├── images/                  # Imágenes optimizadas de pilares, equipo, servicios y casos de estudio
    └── icons                    # Favicons y logos en formatos vectoriales y rasterizados
```

---

## 4. Estructura y Flujo de la Landing Page (`app/page.tsx`)

La página se organiza en una sola ruta vertical coordinada con navegación fluida y sin saltos bruscos:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Barra de progreso superior (ScrollProgress)                        │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Hero (#inicio)                                                      │
│    - Navbar flotante con desenfoque de fondo y autocompactado         │
│    - Tipografía identificatoria "creato." con acento naranja           │
│    - Título: "Muchas soluciones, un solo contacto."                    │
│    - Asistente "¿Cómo podemos ayudarte?" integrado                     │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Áreas (#pilares)                                                    │
│    - "Evolucionamos cada área de tu negocio"                           │
│    - Desktop: Acordeón horizontal elástico con hover / selección       │
│    - Mobile: Chips horizontales auto-desplazables + tarjeta swipeable  │
│    - Modal (<dialog>): Encabezado fijo, scroll de texto y footer CTA   │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Un solo equipo (#equipo)                                            │
│    - Propuesta de valor centralizada vs. contratar proveedores sueltos │
│    - Imagen corporativa y beneficios de comunicación única             │
│    - Subsección "Muchos profesionales": Tarjetas con placeholders      │
│      de especialistas, avatares, roles y paginador interactivo         │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Casos de éxito (#casos) — Negocios que escalaron con creato         │
│    - Altura vertical optimizada y compacta para pantallas estándar     │
│    - Desktop: Marquee continuo con aceleración/reversa por bordes      │
│    - Mobile: Carrusel táctil nativo con snap, peek y contador          │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Metodología (#proceso)                                              │
│    - 4 etapas secuenciales claras con línea animada por scroll         │
│    - Transición limpia hacia el área de contacto                       │
├────────────────────────────────────────────────────────────────────────┤
│ 7. Presupuesto & Contacto (#presupuesto / #contacto)                   │
│    - Comparativa: "Camino tradicional" vs. "Experiencia creato"       │
│    - Hub de contacto corporativo integral en columnas (estilo Autocity)│
│    - Teléfono/WhatsApp, horarios de atención y cobertura geográfica    │
│    - Subfooter de copyright y legales                                  │
├────────────────────────────────────────────────────────────────────────┤
│ * Widget Flotante Global (WhatsAppFloat)                               │
│    - Desktop: Dual pill elegante (WhatsApp + Agenda)                   │
│    - Mobile: Mini-pill ultra compacto (~135px) con atenuación y hide   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Descripción Detallada de Componentes y Optimizaciones

### 5.1. Encabezado y Navegación (`components/landing/hero.tsx`)
- **Fondo inmersivo:** Utiliza `next/image` con `priority` y capas de gradientes oscuros en `--color-navy`.
- **Barra de navegación flotante:** Píldora moderna con borde sutil y desenfoque `backdrop-blur-xl`, que se compacta al scrollear hacia abajo.
- **Anclajes rápidos:** Enlaces suaves a `#pilares`, `#casos`, `#proceso`, `#equipo` y `#contacto`.
- **Entrada cinemática:** Revelación GSAP con stagger para título y descripción.

### 5.2. Pilares de Servicio (`pillars.tsx` y `pillar-card.tsx`)
- **Desktop (>= lg):** Acordeón horizontal elástico. Al posicionar el cursor sobre una tarjeta, se expande armónicamente mientras las demás se contraen.
- **Mobile (< lg):**
  - **Chips horizontales:** Barra de píldoras (`01 Arquitectura`, `02 Eventos`, etc.) con indicador de scroll derecho.
  - **Rotación automática controlada:** Avanza cada 4.5 segundos únicamente cuando la sección está visible (`IntersectionObserver`), pausándose de inmediato ante interacción.
- **Modal de Detalle (`PillarModal`):**
  - **Integración con SmoothScroll:** Pausa automáticamente el scroll Lenis mientras el modal está abierto para evitar scroll de fondo indeseado, y lo reanuda al cerrar.

### 5.3. Un solo equipo y Especialistas (`components/landing/one-team.tsx`)
- **Propuesta de valor:** Bloque superior con título "Un solo equipo", beneficios clave e imagen institucional.
- **Placeholders de profesionales:** Bloque "Muchos profesionales" con carrusel paginado que muestra las tarjetas de especialistas con:
  - Avatar placeholder circular con filtro estilizado.
  - Nombre del profesional ("Nombre profesional").
  - Especialidad / Rol de la lista de áreas (`TEAM_ROLES`).
  - Descripción breve del aporte técnico.
  - Indicador de estado y controles numéricos de página (`01 / 02`).

### 5.4. Casos de Éxito (`components/landing/services.tsx`)
- **Huella vertical compacta:** Se redujo el espaciado vertical (`py-12 md:py-16`) y la altura de las tarjetas (`height: 420px`), garantizando que la sección completa se visualice sin desbordar pantallas de laptops estándar.
- **Desktop (>= lg):**
  - **Marquee continuo:** Animación `requestAnimationFrame` con aceleración en extremos y pausa de lectura en el centro.
  - **Hover Intent (130 ms):** Evita aperturas involuntarias al scrollear rápidamente por encima.
- **Mobile (< lg):**
  - Deslizamiento táctil con `snap-mandatory` y peek de la siguiente tarjeta.

### 5.5. Smooth Scrolling Persistente (`components/landing/smooth-scroll.tsx`)
- **Lenis + GSAP:** Integración de aceleración inercial en desktop mediante `gsap.ticker`.
- **Navegación por anclas suave:** Intercepta clics en enlaces hash (`#pilares`, `#casos`, `#contacto`, etc.) y aplica desplazamiento interpolado con offset compensatorio para la barra superior.
- **Fallback nativo:** En mobile y con preferencias de reducción de movimiento, preserva `scroll-behavior: smooth` nativo sin interferencias.

---

## 6. Fuente de Datos Centralizada (`lib/content.ts`)

Todo el contenido estático, enlaces y textos se encuentran desacoplados en `lib/content.ts`:

- **Canales de contacto:** `WHATSAPP_URL`, `SCHEDULE_URL`, `CONTACT_EMAIL`, `SOCIAL_LINKS`, `CONTACT_DETAILS`.
- **Estructura de negocio:**
  - `HERO`: Títulos, descripción y enlaces del menú.
  - `TEAM_COPY` y `TEAM_ROLES`: Datos de la sección de equipo y especialistas.
  - `PILLARS`: Datos tipados con los 5 ejes, imágenes, descripciones y servicios.
  - `CASES`: Proyectos reales documentados con capturas y galerías fotográficas.
  - `STEPS`: Los 4 pasos de la metodología de trabajo.
  - `ON_YOUR_OWN` y `WITH_US`: Puntos de dolor y beneficios para la sección comparativa.

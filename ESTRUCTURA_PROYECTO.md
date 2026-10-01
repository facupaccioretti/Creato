# Documentación de Estructura y Arquitectura — Creato

Esta documentación detalla la arquitectura técnica, la jerarquía de componentes, el flujo de navegación y la capa de datos de la landing page de **Creato**.

---

## 1. Visión General del Proyecto

**Creato** es una landing page comercial orientada a comunicar una propuesta de valor integral para empresas y comercios: resolver múltiples áreas de negocio (arquitectura comercial, eventos, diseño/marca, tecnología y gestión) bajo **un único interlocutor y un único presupuesto**.

- **Enfoque de diseño:** Landing page fluida de alto impacto visual, optimizada para desktop y mobile, con transiciones interactivas, modales de detalle, carruseles de casos de éxito y llamados a la acción (CTAs) directos hacia WhatsApp y Calendly.
- **Idioma del sitio:** Español (`es-AR`).

---

## 2. Stack Tecnológico

| Herramienta / Librería | Versión | Propósito |
| :--- | :--- | :--- |
| **Next.js** | 16.3.x (App Router) | Framework React, renderizado híbrido y optimización de assets. |
| **React** | 19.x | Biblioteca base para componentes UI y estado cliente. |
| **Tailwind CSS** | 4.x | Motor de estilos utilitarios y variables temáticas en CSS. |
| **TypeScript** | 5.7.x | Tipado estático y modelos de datos. |
| **Lucide React** | 1.16.x | Conjunto de iconos vectoriales. |
| **@vercel/analytics** | 1.6.x | Medición de tráfico y analíticas en producción. |

---

## 3. Estructura de Directorios

```text
Creato/
├── app/
│   ├── globals.css              # Variables de tema, fuentes, utilidades y animaciones personalizadas
│   ├── layout.tsx               # Root Layout: fuentes (Poppins, Inter), meta tags, viewport y Analytics
│   └── page.tsx                 # Página principal (Single Page Landing)
├── components/
│   ├── landing/
│   │   ├── hero.tsx             # Portada a pantalla completa con navegación superior dinámica
│   │   ├── pillars.tsx          # Sección "Áreas" con acordeón interactivo de 5 pilares
│   │   ├── pillar-card.tsx      # Tarjeta individual de pilar y modal nativo (<dialog>) con detalle
│   │   ├── one-team.tsx         # Sección "Un solo equipo" y carrusel de profesionales
│   │   ├── services.tsx         # Sección "Casos de éxito" con carrusel infinito / arrastrable (marquee)
│   │   ├── process.tsx          # Sección "Metodología" en 4 etapas
│   │   ├── budget-cta.tsx       # Sección "Trabajemos juntos" (comparativa) + "¿Cómo seguimos?" (contacto)
│   │   ├── contact-links.tsx    # Botones reutilizables de WhatsApp, Calendly y correo electrónico
│   │   ├── help-panel.tsx       # Asistente de frases para conectar necesidades con áreas
│   │   ├── site-footer.tsx      # Pie de página institucional y copyright
│   │   ├── section-carousel.tsx # Contenedor de scroll y snapping de secciones
│   │   ├── section-dots.tsx     # Indicador de navegación lateral por puntos (opcional / desacoplable)
│   │   └── whatsapp-float.tsx   # Botón flotante persistente de WhatsApp
│   └── ui/
│       └── button.tsx           # Componente base de botón estilizado con CVA
├── data/                        # Documentación complementaria y briefs de contenido
├── lib/
│   ├── content.ts               # Fuente única de verdad: textos, pilares, casos de éxito, datos de contacto
│   └── utils.ts                 # Utilidad `cn` (clsx + tailwind-merge)
└── public/
    ├── images/                  # Imágenes de pilares, equipo, servicios y casos de estudio
    └── icons                    # Favicons y logos en formatos vectoriales y rasterizados
```

---

## 4. Estructura de la Landing Page (`app/page.tsx`)

La página se organiza en una sola ruta vertical dividida en secciones lógicas, la mayoría configuradas con altura de pantalla completa (`snap-section` / `min-height: 100dvh`):

```
┌────────────────────────────────────────────────────────┐
│ 1. Hero (#inicio)                                      │
│    - Navbar autohiding con enlaces ancla               │
│    - Tipografía identificatoria "creato."              │
│    - Título: "Muchas soluciones, un solo contacto."     │
├────────────────────────────────────────────────────────┤
│ 2. Pilares (#pilares)                                  │
│    - Acordeón interactivo horizontal (desktop)         │
│    - 5 áreas de negocio con modal expansible           │
├────────────────────────────────────────────────────────┤
│ 3. Un solo equipo (#equipo)                            │
│    - Bloque de valor diferencial vs. contratar suelto  │
│    - Carrusel paginado de perfiles profesionales       │
├────────────────────────────────────────────────────────┤
│ 4. Casos de éxito (#casos)                             │
│    - Marquee arrastrable con casos reales              │
│    - Tarjetas con galería de fotos/capturas y enlace   │
├────────────────────────────────────────────────────────┤
│ 5. Metodología (#proceso)                              │
│    - 4 pasos numerados desde la reunión a la entrega   │
├────────────────────────────────────────────────────────┤
│ 6. Presupuesto & Contacto (#presupuesto / #contacto)   │
│    - Comparativa: "Camino tradicional" vs "creato"    │
│    - Pasos de cierre y enlaces directos de contacto    │
│    - Footer institucional                              │
└────────────────────────────────────────────────────────┘
```

---

## 5. Descripción Detallada de Componentes

### 5.1. Encabezado y Navegación (`components/landing/hero.tsx`)
- **Fondo inmersivo:** Utiliza `next/image` con `fill` y superposición en capas de gradientes oscuros sobre la paleta `--color-navy`.
- **Barra de navegación dinámica:** Oculta o muestra la barra con transiciones según la posición del scroll (`window.scrollY < 40`).
- **Anclajes rápidos:** Enlaces a `#pilares`, `#casos`, `#proceso`, `#equipo` y `#contacto`.

### 5.2. Pilares de Servicio (`pillars.tsx` y `pillar-card.tsx`)
- **Diseño acordeón:** En pantallas de escritorio, los 5 pilares se distribuyen en una fila elástica. Al hacer hover o focus en uno, se expande a `flex: 4` mientras los demás se comprimen a `flex: 1`.
- **Modal accesible:** Utiliza el elemento estándar de HTML `<dialog>` con bloqueo de scroll en el `body`, soporte para tecla `Escape` y accesibilidad para teclado.
- **Sincronización por URL:** Escucha cambios en el hash de la URL (`#arquitectura`, `#tecnologia`, etc.) para abrir automáticamente el modal correspondiente si el usuario ingresa con un enlace directo.

### 5.3. Un solo equipo (`components/landing/one-team.tsx`)
- **Propuesta de valor:** Contrapone la fricción de contratar múltiples proveedores dispersos frente al modelo centralizado.
- **Carrusel paginado:** Distribuye los 8 roles profesionales en páginas de a 4 elementos con animación direccional (izquierda/derecha).

### 5.4. Casos de Éxito (`components/landing/services.tsx`)
- **Marquee infinito interactivo:** Desplazamiento continuo mediante `requestAnimationFrame` que detecta la cercanía del cursor a los bordes para acelerar o pausar.
- **Soporte táctil y arrastre (drag-to-scroll):** Implementado con Pointer Events nativos (`setPointerCapture`), compatible tanto con mouse como en pantallas táctiles móviles.
- **Tarjetas expandibles:** Al hacer hover, la tarjeta se ensancha mostrando el alcance técnico del proyecto y un botón con mensaje predeterminado a WhatsApp.

### 5.5. Proceso de Trabajo (`components/landing/process.tsx`)
- Estructura limpia de 4 columnas en grid con números en gran escala (`01`, `02`, `03`, `04`) y llamada directa a agendar el paso 1.

### 5.6. Comparativa y Cierre (`components/landing/budget-cta.tsx`)
- **Tabs para móviles:** En pantallas reducidas permite alternar entre "El camino tradicional" y "La experiencia creato". En desktop se muestran ambas columnas en paralelo.
- **Bloque de conversión final:** Detalla 3 pasos de incorporación, botones de acción inmediata (WhatsApp y Calendly) y el pie de página (`SiteFooter`).

---

## 6. Fuente de Datos Centralizada (`lib/content.ts`)

Todo el contenido estático, enlaces y textos se encuentran desacoplados en `lib/content.ts` para facilitar su actualización sin tocar componentes JSX:

- **Canales de contacto:**
  - `WHATSAPP_URL`: Número y mensaje inicial prefijado.
  - `SCHEDULE_URL`: Enlace a Calendly para agendado de reuniones.
  - `CONTACT_EMAIL`: Dirección de contacto institucional.
- **Contenidos de negocio:**
  - `PILLARS`: Lista tipada (`Pillar`) con los 5 ejes, descripciones, imágenes y lista de servicios.
  - `CASES`: Casos reales documentados con áreas vinculadas, capturas de pantalla o fotografías y descripciones.
  - `STEPS`: Pasos de la metodología de trabajo.
  - `ON_YOUR_OWN` y `WITH_US`: Puntos de dolor y beneficios para la sección comparativa.
  - `BUDGET_STEPS`: Pasos finales antes del inicio del proyecto.

---

## 7. Identidad Visual y Sistema de Estilos (`globals.css`)

El proyecto utiliza Tailwind CSS v4 con variables semánticas personalizadas:

| Variable | Valor | Aplicación |
| :--- | :--- | :--- |
| `--color-navy` | `#171717` | Fondo principal oscuro, botones secundarios y textos principales. |
| `--color-graphite` | `#242424` | Fondos de tarjetas y contenedores intermedios. |
| `--color-mist` | `#f4f2ee` | Fondo claro alternativo para secciones de casos y descansos visuales. |
| `--color-orange` | `#e96d45` | Color de acento primario, puntos de foco, viñetas y botones de acción principal. |
| `--background` | `#faf9f6` | Tono blanco cálido base de la aplicación. |

### Tipografías
- **Textos de encabezados:** `Poppins` (definida en `--font-heading`).
- **Textos de cuerpo:** `Inter` (definida en `--font-sans`).

---

## 8. Guía de Mantenimiento

1. **Editar datos o textos:** Modificar directamente en `lib/content.ts`.
2. **Agregar un nuevo caso de estudio:** Añadir un nuevo objeto al arreglo `CASES` en `lib/content.ts` con sus imágenes correspondientes en `public/images/casos/`.
3. **Modificar información de contacto:** Actualizar las constantes `WHATSAPP_URL`, `SCHEDULE_URL` o `CONTACT_EMAIL` en `lib/content.ts`.

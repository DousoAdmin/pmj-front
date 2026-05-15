<!--
  ============================================================
  PÁGINA: Mis Organizaciones
  Ruta: /private/menu-dashboard/mis-organizaciones
  ============================================================

  ¿Qué hace esta página?
  Muestra todas las organizaciones a las que pertenece el usuario,
  con un buscador, filtros por categoría, estadísticas globales
  y tarjetas para cada organización.

  Si el usuario entra a una subruta (por ejemplo .../psicovibes),
  no se muestra esta vista — se muestra la vista de detalle
  via <NuxtPage />.
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { memberOrganizations } from '~/data/memberOrganizations'

// Le decimos a Nuxt que esta página usa el layout "dashboard"
// (el que tiene el sidebar morado lateral y el TopHeader)
definePageMeta({ layout: 'dashboard' })

// "useRoute" nos da info de la URL actual.
// Si la URL es exactamente "/private/menu-dashboard/mis-organizaciones"
// mostramos la lista. Si es más profundo (por ejemplo .../psicovibes)
// dejamos que NuxtPage muestre la vista de detalle del slug.
const route = useRoute()
const isDetailRoute = computed(() => route.path !== '/private/menu-dashboard/mis-organizaciones')

// ---------- ESTADÍSTICAS GLOBALES ----------
// Tomamos el arreglo de organizaciones que viene de "memberOrganizations.ts"
// y calculamos totales sumando los valores de cada una.
const organizationsCount = memberOrganizations.length // cuántas organizaciones hay en total
const totalProjects = memberOrganizations.reduce((total, organization) => total + organization.activeProjects, 0)
const totalEvents = memberOrganizations.reduce((total, organization) => total + organization.upcomingEvents, 0)
const totalMembers = memberOrganizations.reduce((total, organization) => total + organization.members, 0)

// ---------- ESTADO REACTIVO (cosas que cambian con el usuario) ----------
// Texto del buscador. Empieza vacío.
const search = ref('')
// Categoría seleccionada. "all" significa "todas".
const activeFilter = ref('all')

// ---------- CONFIG DE FILTROS ----------
// Cada filtro tiene:
// - label: lo que ve el usuario en el botón
// - value: la categoría real que se compara (debe coincidir con organization.badge)
// - accent: color de fondo del botón cuando está activo
// - dot: color del puntito de la izquierda cuando no está activo
const filters = [
  { label: 'Todas', value: 'all', accent: 'bg-slate-800', dot: 'bg-slate-700' },
  { label: 'Sociales', value: 'Social', accent: 'bg-[#522178]', dot: 'bg-[#522178]' },
  { label: 'Culturales', value: 'Cultural', accent: 'bg-[#F2780C]', dot: 'bg-[#F2780C]' },
  { label: 'Ambientales', value: 'Ambiental', accent: 'bg-[#00B140]', dot: 'bg-[#00B140]' },
  { label: 'Fundaciones', value: 'Fundación', accent: 'bg-indigo-600', dot: 'bg-indigo-500' },
]

// Mismo arreglo de arriba pero con un contador por filtro.
// Es "computed" porque depende de los datos (si cambian, se recalcula).
const filtersWithCount = computed(() => {
  return filters.map((f) => ({
    ...f,
    count:
      f.value === 'all'
        ? memberOrganizations.length // "Todas" muestra el total
        : memberOrganizations.filter((o) => o.badge === f.value).length,
  }))
})

// ---------- LÓGICA DEL FILTRADO + BÚSQUEDA ----------
// Devuelve solo las organizaciones que pasan los dos criterios:
//   1. Coinciden con el filtro de categoría activo
//   2. Coinciden con el texto del buscador (en nombre, categoría o descripción)
const filteredOrganizations = computed(() => {
  const q = search.value.trim().toLowerCase() // normalizamos el texto buscado
  return memberOrganizations.filter((organization) => {
    // ¿Pasa el filtro de categoría?
    const matchFilter = activeFilter.value === 'all' || organization.badge === activeFilter.value
    if (!matchFilter) return false

    // Si el buscador está vacío, ya pasa
    if (!q) return true

    // Si hay texto, revisamos si alguno de los campos lo contiene
    return (
      organization.name.toLowerCase().includes(q) ||
      organization.category.toLowerCase().includes(q) ||
      organization.shortDescription.toLowerCase().includes(q)
    )
  })
})

// ---------- DICCIONARIO DE ESTILOS POR CATEGORÍA ----------
// Cada badge tiene un set de clases para:
// - cover: el gradiente del techo de la tarjeta
// - pill: el chip con el nombre de la categoría
// - ring: el aro alrededor del logo
// - accent: color de acento (texto, barras, etc.)
const badgeMap: Record<string, { label: string; cover: string; pill: string; ring: string; accent: string; mono: string }> = {
  Social: {
    label: 'Social',
    cover: 'bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958]',
    pill: 'bg-white/95 text-[#522178]',
    ring: 'ring-[#522178]/15',
    accent: 'text-[#522178]',
    mono: 'text-[#522178]',
  },
  Cultural: {
    label: 'Cultural',
    cover: 'bg-gradient-to-br from-[#F2780C] via-[#ff8a2a] to-[#fbbf24]',
    pill: 'bg-white/95 text-[#F2780C]',
    ring: 'ring-[#F2780C]/15',
    accent: 'text-[#F2780C]',
    mono: 'text-[#F2780C]',
  },
  Ambiental: {
    label: 'Ambiental',
    cover: 'bg-gradient-to-br from-[#038C33] via-[#00B140] to-[#34d399]',
    pill: 'bg-white/95 text-[#038C33]',
    ring: 'ring-[#00B140]/20',
    accent: 'text-[#00B140]',
    mono: 'text-[#038C33]',
  },
  Fundación: {
    label: 'Fundación',
    cover: 'bg-gradient-to-br from-[#4338ca] via-[#6366f1] to-[#818cf8]',
    pill: 'bg-white/95 text-indigo-600',
    ring: 'ring-indigo-500/20',
    accent: 'text-indigo-500',
    mono: 'text-indigo-600',
  },
}

// Helper: devuelve los estilos del badge o un default si la categoría no existe
function getBadgeStyle(badge: string) {
  return (
    badgeMap[badge] || {
      label: badge,
      cover: 'bg-gradient-to-br from-slate-600 to-slate-800',
      pill: 'bg-white/95 text-slate-700',
      ring: 'ring-slate-300',
      accent: 'text-slate-600',
      mono: 'text-slate-700',
    }
  )
}
</script>

<template>
  <!--
    Si la URL es de una subruta (detalle de una organización),
    delegamos al sistema de rutas de Nuxt para que muestre el detalle.
  -->
  <NuxtPage v-if="isDetailRoute" />

  <!-- Si no, mostramos la lista completa: -->
  <div v-else class="min-h-screen bg-[#f4f0f8] py-4 lg:py-8">
    <div class="mx-auto max-w-7xl space-y-4 lg:space-y-6 px-3 sm:px-6 lg:px-8">

      <!-- ════════════════════════════════════════════════════
           HERO: cabecera morada con título, descripción y stats
           ════════════════════════════════════════════════════ -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] shadow-2xl shadow-[#522178]/20">
        <!-- Barra de 3 colores arriba (verde / naranja / violeta) -->
        <div class="h-1 flex">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>

        <!-- Decoraciones de fondo (círculos borrosos y puntos) que dan textura -->
        <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/[0.05] blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 bottom-0 w-56 h-56 rounded-full bg-[#F2780C]/[0.10] blur-3xl pointer-events-none"></div>
        <div
          class="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 20px 20px;"
        ></div>

        <div class="relative p-5 lg:p-8">
          <!-- Fila superior: título a la izquierda, botones de acción a la derecha -->
          <div class="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-5 mb-6">
            <div class="min-w-0 max-w-3xl">
              <!-- Chip con punto verde pulsante "Mis organizaciones" -->
              <div class="inline-flex items-center gap-2 rounded-full border border-[#00B140]/30 bg-[#00B140]/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#86efac] backdrop-blur-sm">
                <span class="relative flex h-2 w-2">
                  <!-- "animate-ping" crea el efecto de onda que se expande -->
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00B140]"></span>
                </span>
                Mis organizaciones
              </div>

              <h1 class="mt-4 text-2xl sm:text-3xl lg:text-[2.25rem] font-black tracking-tight text-white leading-[1.1]">
                Organizaciones aliadas que impulsan el cambio
                <span class="block text-[#F2780C]">en Mosquera.</span>
              </h1>

              <p class="mt-3 lg:mt-4 max-w-2xl text-sm lg:text-base text-white/65 leading-relaxed">
                Accede al panel interno de cada organización, revisa tu participación,
                sigue los proyectos activos y mantente al día con la agenda juvenil.
              </p>
            </div>

            <!-- Botones de acción rápida -->
            <div class="flex flex-wrap gap-2 shrink-0">
              <button class="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 backdrop-blur-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </button>
              <button class="inline-flex items-center gap-1.5 px-3 py-2 bg-[#00B140]/85 hover:bg-[#00B140] border border-[#00B140]/40 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#00B140]/25">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Vincular nueva
              </button>
            </div>
          </div>

          <!-- Stats globales: 4 tarjetitas pequeñas con totales -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 pt-5 border-t border-white/10">
            <!-- Cada bloque sigue el mismo patrón: icono coloreado + número + label -->
            <div class="rounded-2xl bg-white/[0.08] border border-white/10 p-3 lg:p-4 backdrop-blur-sm">
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="w-8 h-8 rounded-lg bg-[#F2780C]/20 border border-[#F2780C]/30 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p class="text-white text-2xl lg:text-3xl font-black leading-none tabular-nums">{{ organizationsCount }}</p>
              </div>
              <p class="text-white/55 text-[10px] uppercase tracking-[0.15em] font-black">Organizaciones</p>
            </div>

            <div class="rounded-2xl bg-white/[0.08] border border-white/10 p-3 lg:p-4 backdrop-blur-sm">
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="w-8 h-8 rounded-lg bg-[#00B140]/20 border border-[#00B140]/30 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <p class="text-white text-2xl lg:text-3xl font-black leading-none tabular-nums">{{ totalProjects }}</p>
              </div>
              <p class="text-white/55 text-[10px] uppercase tracking-[0.15em] font-black">Proyectos activos</p>
            </div>

            <div class="rounded-2xl bg-white/[0.08] border border-white/10 p-3 lg:p-4 backdrop-blur-sm">
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="w-8 h-8 rounded-lg bg-violet-400/20 border border-violet-400/30 flex items-center justify-center">
                  <svg class="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <p class="text-white text-2xl lg:text-3xl font-black leading-none tabular-nums">{{ totalEvents }}</p>
              </div>
              <p class="text-white/55 text-[10px] uppercase tracking-[0.15em] font-black">Eventos próximos</p>
            </div>

            <div class="rounded-2xl bg-white/[0.08] border border-white/10 p-3 lg:p-4 backdrop-blur-sm">
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="w-8 h-8 rounded-lg bg-sky-400/20 border border-sky-400/30 flex items-center justify-center">
                  <svg class="w-4 h-4 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p class="text-white text-2xl lg:text-3xl font-black leading-none tabular-nums">{{ totalMembers }}+</p>
              </div>
              <p class="text-white/55 text-[10px] uppercase tracking-[0.15em] font-black">Miembros vinculados</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════════════════
           BUSCADOR Y FILTROS
           ════════════════════════════════════════════════════ -->
      <section class="bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm p-3 lg:p-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Input de búsqueda con lupa y botón "X" para limpiar -->
          <div class="relative flex-1 group">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#522178] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <!--
              v-model conecta el input con la variable "search".
              Cuando el usuario escribe, "search" se actualiza automáticamente
              y el filtro de arriba se reactiva.
            -->
            <input
              v-model="search"
              type="text"
              placeholder="Buscar organización por nombre o categoría..."
              class="w-full pl-10 pr-10 py-2.5 lg:py-3 text-sm font-medium border border-slate-200 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#522178]/20 focus:border-[#522178]/40 bg-slate-50 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              v-if="search"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              @click="search = ''"
              aria-label="Limpiar"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!--
          Fila de filtros pill. En móvil hacemos scroll horizontal con CSS
          para que no rompa el layout cuando hay muchos.
        -->
        <div class="mt-3 -mx-1 px-1 overflow-x-auto filter-scroll">
          <div class="flex gap-2 min-w-max">
            <button
              v-for="filter in filtersWithCount"
              :key="filter.value"
              @click="activeFilter = filter.value"
              type="button"
              class="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs lg:text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap border"
              :class="
                activeFilter === filter.value
                  ? filter.accent + ' text-white border-transparent shadow-md'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:translate-y-[-1px]'
              "
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="activeFilter === filter.value ? 'bg-white' : filter.dot"></span>
              {{ filter.label }}
              <span
                class="text-[10px] tabular-nums px-1.5 py-0.5 rounded-md"
                :class="activeFilter === filter.value ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'"
              >
                {{ filter.count }}
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════════════════
           ESTADO VACÍO: cuando ningún filtro coincide
           ════════════════════════════════════════════════════ -->
      <section v-if="filteredOrganizations.length === 0" class="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center">
          <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p class="text-sm font-black text-slate-700">Sin resultados</p>
        <p class="text-xs text-slate-500 mt-1">Prueba con otro filtro o término de búsqueda.</p>
      </section>

      <!-- ════════════════════════════════════════════════════
           GRID DE ORGANIZACIONES (las tarjetas)
           ════════════════════════════════════════════════════ -->
      <section v-else>
        <!-- Encabezado de la sección: título "Tus aliadas" + contador -->
        <div class="flex items-center justify-between mb-3 px-1">
          <h2 class="text-xs lg:text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <span class="w-1 h-4 rounded-full bg-[#522178]"></span>
            Tus aliadas
          </h2>
          <span class="text-[10px] lg:text-xs text-slate-500 font-bold tabular-nums">
            {{ filteredOrganizations.length }} {{ filteredOrganizations.length === 1 ? 'organización' : 'organizaciones' }}
          </span>
        </div>

        <!--
          Grid responsive: 1 columna en mobile, 2 en tablet, 3 en desktop.
          v-for genera una tarjeta NuxtLink por cada organización filtrada.
        -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          <NuxtLink
            v-for="organization in filteredOrganizations"
            :key="organization.slug"
            :to="`/private/menu-dashboard/mis-organizaciones/${organization.slug}`"
            class="group relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#522178]/10 hover:-translate-y-1 hover:border-[#522178]/20 flex flex-col"
          >
            <!--
              COVER de la tarjeta (la "portada" de arriba).
              El gradiente cambia según la categoría: getBadgeStyle().cover
            -->
            <div class="relative h-24 lg:h-28 overflow-hidden" :class="getBadgeStyle(organization.badge).cover">
              <!-- Patrón de puntos sutil sobre el gradiente -->
              <div class="absolute inset-0 opacity-[0.18]" style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 14px 14px;"></div>
              <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

              <!-- Pill de la categoría (arriba a la izquierda) -->
              <span
                class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] shadow-md backdrop-blur-sm"
                :class="getBadgeStyle(organization.badge).pill"
              >
                <span class="w-1 h-1 rounded-full bg-current"></span>
                {{ getBadgeStyle(organization.badge).label }}
              </span>

              <!-- Pill de estado (arriba a la derecha) con punto verde pulsante -->
              <span class="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00B140]"></span>
                </span>
                {{ organization.status }}
              </span>
            </div>

            <!--
              LOGO redondo flotante: medio sobre el cover, medio sobre el contenido.
              Usamos -mt-12 para subirlo sobre el cover.
              Fondo blanco siempre (para que contraste contra cualquier cover).
              El logo se muestra como imagen o como monograma de letras coloreadas.
            -->
            <div class="relative -mt-12 mx-auto z-10">
              <div class="w-24 h-24 rounded-full bg-white shadow-xl shadow-black/15 ring-4 ring-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <!-- Si la organización tiene logo PNG, mostramos la imagen -->
                <img
                  v-if="organization.logoType === 'image'"
                  :src="organization.logoSrc"
                  :alt="organization.name"
                  class="w-[78%] h-[78%] object-contain"
                />
                <!-- Si no, mostramos el monograma (letras) en el color de la categoría -->
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100"
                >
                  <span class="text-2xl font-black tracking-tight" :class="getBadgeStyle(organization.badge).mono">
                    {{ organization.monogram }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Contenido principal de la tarjeta -->
            <div class="pt-3 px-5 pb-5 flex-1 flex flex-col">
              <!-- Nombre + categoría -->
              <h3 class="text-base lg:text-lg font-black text-slate-900 text-center tracking-tight leading-tight group-hover:text-[#522178] transition-colors">
                {{ organization.name }}
              </h3>
              <p class="text-[11px] text-slate-500 text-center mt-1 font-bold uppercase tracking-wider">
                {{ organization.category }}
              </p>

              <!-- Descripción corta (máx 2 líneas) -->
              <p class="text-xs lg:text-[13px] text-slate-600 text-center mt-3 line-clamp-2 leading-relaxed">
                {{ organization.shortDescription }}
              </p>

              <!-- 4 mini-métricas: miembros, proyectos, eventos, documentos -->
              <div class="grid grid-cols-4 gap-1.5 mt-4">
                <div class="text-center py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <p class="text-base font-black text-slate-900 tabular-nums leading-none">{{ organization.members }}</p>
                  <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Mbros</p>
                </div>
                <div class="text-center py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <p class="text-base font-black text-slate-900 tabular-nums leading-none">{{ organization.activeProjects }}</p>
                  <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Proy</p>
                </div>
                <div class="text-center py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <p class="text-base font-black text-slate-900 tabular-nums leading-none">{{ organization.upcomingEvents }}</p>
                  <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Evnts</p>
                </div>
                <div class="text-center py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <p class="text-base font-black text-slate-900 tabular-nums leading-none">{{ organization.documents }}</p>
                  <p class="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Docs</p>
                </div>
              </div>

              <!-- Barra de progreso "Avance semanal" -->
              <div class="mt-4">
                <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                  <span class="text-slate-400">Avance semanal</span>
                  <span :class="getBadgeStyle(organization.badge).accent">{{ organization.weeklyProgress }}%</span>
                </div>
                <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <!-- El ancho de la barra = el porcentaje. El gradiente coincide con el color de la categoría. -->
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :class="getBadgeStyle(organization.badge).cover"
                    :style="`width: ${organization.weeklyProgress}%`"
                  ></div>
                </div>
              </div>

              <!-- Footer: fecha de vinculación + botón "Ver detalle" -->
              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ organization.joinedAt }}
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-br from-[#522178] to-[#3d1958] text-white text-[10px] font-black uppercase tracking-widest shadow-md shadow-[#522178]/20 group-hover:from-[#5e2787] group-hover:to-[#4a1d6e] group-hover:scale-105 transition-all">
                  Ver detalle
                  <svg class="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/*
  Esto esconde la scrollbar horizontal de la fila de filtros en móvil.
  Sirve para Firefox (scrollbar-width) y para Chrome/Safari (::webkit-scrollbar).
*/
.filter-scroll {
  scrollbar-width: none;
}

.filter-scroll::-webkit-scrollbar {
  display: none;
}
</style>

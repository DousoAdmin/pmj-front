<!--
  ============================================================
  PÁGINA: Detalle de organización
  Ruta: /private/menu-dashboard/mis-organizaciones/[slug]
  ============================================================
  Vista del detalle de UNA organización específica.
  El [slug] en la URL es dinámico (ej: "psicovibes", "chikara",
  "fundacion-ecos-colombia"). Lo lee desde route.params.slug.

  Si no se encuentra la organización con ese slug → error 404.

  Contiene:
  - HERO morado con logo, nombre, status, avance semanal,
    botones Ver actividad / Gestionar
  - Barra de estado de gestión
  - GRID PRINCIPAL:
    · IZQUIERDA: 4 métricas, fortalezas + resumen institucional,
      actividad reciente
    · DERECHA: ficha institucional (rol, ingreso, ubicación),
      documentación
  - Sección de impacto: gráfico de barras de alcance, distribución
    de procesos activos, lectura rápida
  - GRID INFERIOR: pulso documental + líneas/iniciativas

  Datos: vienen del helper getMemberOrganizationBySlug() del
  archivo data/memberOrganizations.ts
-->

<script setup lang="ts">
import { computed } from 'vue'
import { createError } from 'h3'
import { getMemberOrganizationBySlug } from '~/data/memberOrganizations'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()

const organization = computed(() => getMemberOrganizationBySlug(String(route.params.slug)))

if (!organization.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Organizacion no encontrada',
  })
}

const organizationData = organization.value

const highlightStats = [
  { label: 'Miembros activos', value: `${organizationData.members}`, color: 'text-[#00B140]', icon: 'users' },
  { label: 'Proyectos activos', value: `${organizationData.activeProjects}`, color: 'text-[#F2780C]', icon: 'sparkles' },
  { label: 'Eventos proximos', value: `${organizationData.upcomingEvents}`, color: 'text-violet-300', icon: 'calendar' },
  { label: 'Documentos', value: `${organizationData.documents}`, color: 'text-sky-300', icon: 'document' },
]

const sideData = [
  { label: 'Rol dentro de la organizacion', value: organizationData.role, accent: 'bg-[#522178]' },
  { label: 'Ingreso a la red', value: organizationData.joinedAt, accent: 'bg-[#F2780C]' },
  { label: 'Estado actual', value: organizationData.status, accent: 'bg-[#00B140]' },
  { label: 'Ubicacion', value: organizationData.location, accent: 'bg-indigo-500' },
]

const metricIconMap: Record<string, string> = {
  'Miembros activos': 'users',
  'Proyectos activos': 'sparkles',
  'Eventos próximos': 'calendar',
  'Eventos proximos': 'calendar',
  Documentos: 'document',
}

const impactTrend = [
  { label: 'Ene', value: 18 },
  { label: 'Feb', value: 32 },
  { label: 'Mar', value: 47 },
  { label: 'Abr', value: 61 },
  { label: 'May', value: 79 },
  { label: 'Jun', value: 96 },
]

const maxImpactValue = Math.max(...impactTrend.map((item) => item.value))

const processDistribution = [
  {
    label: 'En ejecucion',
    value: organizationData.initiatives.filter((i) => i.status === 'En ejecución' || i.status === 'En ejecucion').length,
    color: '#522178',
    tone: 'bg-[#522178]/10 text-[#522178]',
  },
  {
    label: 'Abiertas',
    value: organizationData.initiatives.filter((i) => i.status === 'Abierta' || i.status === 'Abiertas').length,
    color: '#00B140',
    tone: 'bg-[#00B140]/10 text-[#00B140]',
  },
  {
    label: 'Planeacion',
    value: organizationData.initiatives.filter((i) => i.status === 'Planeación' || i.status === 'Planeacion').length,
    color: '#F2780C',
    tone: 'bg-[#F2780C]/10 text-[#F2780C]',
  },
]

const totalProcessCount = Math.max(1, processDistribution.reduce((sum, i) => sum + i.value, 0))

const documentHealth = [
  {
    label: 'Cargados',
    value: organizationData.documents,
    percentage: 100,
    color: '#00B140',
    surface: 'bg-[#00B140]/10 text-[#00B140]',
  },
  {
    label: 'Validados',
    value: Math.max(1, organizationData.documents - 2),
    percentage: Math.max(40, Math.round(((organizationData.documents - 2) / Math.max(organizationData.documents, 1)) * 100)),
    color: '#522178',
    surface: 'bg-[#522178]/10 text-[#522178]',
  },
  {
    label: 'Visibles',
    value: Math.max(1, organizationData.documents - 1),
    percentage: Math.max(55, Math.round(((organizationData.documents - 1) / Math.max(organizationData.documents, 1)) * 100)),
    color: '#F2780C',
    surface: 'bg-[#F2780C]/10 text-[#F2780C]',
  },
]
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-8">
    <div class="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">

      <!-- ── HEADER ── -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#34144d] shadow-2xl">
        <div class="flex h-1">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>
        <div class="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5"></div>
        <div class="absolute bottom-0 left-8 h-44 w-44 rounded-full bg-[#F2780C]/10"></div>

        <div class="relative p-6 lg:p-8">
          <div class="mb-5">
            <NuxtLink
              to="/private/menu-dashboard/mis-organizaciones"
              class="inline-flex items-center gap-2 rounded-2xl border border-[#F2780C]/30 bg-[#F2780C] px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#F2780C]/20 transition-all hover:bg-[#df6f08] hover:shadow-xl"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19 8 12l7-7" />
              </svg>
              Volver al listado
            </NuxtLink>
          </div>

          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-center gap-5">
              <div class="relative flex-shrink-0">
                <div v-if="organizationData.logoType === 'image'" class="h-24 w-24 rounded-3xl border border-white/10 bg-white p-2 shadow-xl">
                  <img :src="organizationData.logoSrc" :alt="organizationData.name" class="h-full w-full rounded-[20px] object-contain" />
                </div>
                <div v-else class="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-black shadow-xl" :class="organizationData.logoClass">
                  {{ organizationData.monogram }}
                </div>
                <span class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#522178] bg-[#00B140]">
                  <svg class="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>

              <div>
                <div class="mb-2 flex flex-wrap items-center gap-2">
                  <h1 class="text-2xl font-black tracking-tight text-white lg:text-3xl">{{ organizationData.name }}</h1>
                  <span class="inline-flex items-center rounded-full border border-[#00B140]/30 bg-[#00B140]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#86efac]">
                    {{ organizationData.status }}
                  </span>
                </div>
                <p class="text-sm text-white/75">
                  {{ organizationData.category }} ·
                  <span class="font-semibold text-[#F2780C]">{{ organizationData.location }}</span>
                </p>
                <div class="mt-5 flex flex-wrap items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-36 overflow-hidden rounded-full bg-white/15">
                      <div class="h-full rounded-full bg-gradient-to-r from-[#F2780C] to-[#fbbf24]" :style="{ width: `${organizationData.weeklyProgress}%` }"></div>
                    </div>
                    <span class="text-xs font-bold text-white">{{ organizationData.weeklyProgress }}% avance</span>
                  </div>
                  <span class="text-white/25">·</span>
                  <span class="text-xs text-white/60">{{ organizationData.role }}</span>
                  <span class="text-white/25">·</span>
                  <span class="text-xs text-white/60">{{ organizationData.reach }}</span>
                </div>
                <div class="mt-4 flex flex-wrap gap-1.5">
                  <span v-for="tag in [organizationData.badge, organizationData.category]" :key="tag" class="rounded-lg border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-white/75">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button type="button" class="rounded-xl border border-[#00B140]/40 bg-[#00B140]/85 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#00B140]/20 transition-all hover:bg-[#00B140]">
                Ver actividad
              </button>
              <button type="button" class="rounded-xl border border-[#F2780C]/40 bg-[#F2780C]/85 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#F2780C]/20 transition-all hover:bg-[#F2780C]">
                Gestionar organizacion
              </button>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-4">
            <div v-for="stat in highlightStats" :key="stat.label" class="flex items-center gap-3">
              <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                <svg v-if="stat.icon === 'users'" class="h-4 w-4 text-white/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 21a6 6 0 0 0-12 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 10a5 5 0 0 0-4-4.9M22 21a5 5 0 0 0-3-4.58M7 16.1A5 5 0 0 0 2 21" />
                </svg>
                <svg v-else-if="stat.icon === 'sparkles'" class="h-4 w-4 text-white/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Zm7 11 1 2.5L22.5 17 20 18l-1 2.5L18 18l-2.5-1 2.5-.5L19 14ZM5 14l.8 1.9L7.7 17l-1.9.8L5 19.7l-.8-1.9L2.3 17l1.9-.8L5 14Z" />
                </svg>
                <svg v-else-if="stat.icon === 'calendar'" class="h-4 w-4 text-white/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 2v4m8-4v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                </svg>
                <svg v-else class="h-4 w-4 text-white/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8l-6-6Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6" />
                </svg>
              </div>
              <div>
                <p class="text-base font-black leading-none text-white">{{ stat.value }}</p>
                <p class="mt-0.5 text-[10px] uppercase tracking-wide text-white/50">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── BARRA DE ESTADO ── -->
      <section class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs shadow-sm sm:flex-row sm:items-center sm:justify-between sm:text-sm">
        <div class="flex items-center gap-2 text-slate-600">
          <div class="h-1.5 w-1.5 rounded-full bg-[#F2780C]"></div>
          Estado de gestion: <strong class="ml-1 text-slate-900">{{ organizationData.status }}</strong>
        </div>
        <div class="hidden h-4 w-px bg-slate-200 sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600">
          <div class="h-1.5 w-1.5 rounded-full bg-[#00B140]"></div>
          Impacto visible: <strong class="ml-1 text-slate-900">{{ organizationData.reach }}</strong>
        </div>
        <div class="hidden h-4 w-px bg-slate-200 sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600">
          Meta semanal: <strong class="ml-1 text-slate-900">{{ organizationData.weeklyProgress }}% completada</strong>
        </div>
      </section>

      <div class="grid items-start gap-6 lg:grid-cols-3">
        <!-- IZQUIERDA -->
        <div class="lg:col-span-2 space-y-6">
          <!-- métricas -->
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div
              v-for="metric in organizationData.metrics"
              :key="metric.label"
              class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" :class="metric.surfaceClass">
                <svg v-if="metricIconMap[metric.label] === 'users'" class="h-4 w-4" :class="metric.accentClass" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 21a6 6 0 0 0-12 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                </svg>
                <svg v-else-if="metricIconMap[metric.label] === 'sparkles'" class="h-4 w-4" :class="metric.accentClass" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
                </svg>
                <svg v-else-if="metricIconMap[metric.label] === 'calendar'" class="h-4 w-4" :class="metric.accentClass" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 2v4m8-4v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                </svg>
                <svg v-else class="h-4 w-4" :class="metric.accentClass" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8l-6-6Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6" />
                </svg>
              </div>
              <p class="text-2xl font-black text-slate-900">{{ metric.value }}</p>
              <p class="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{{ metric.label }}</p>
              <span class="mt-2 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide" :class="metric.surfaceClass">
                Activo
              </span>
            </div>
          </div>

          <!-- fortalezas + actividad -->
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <!-- Fortalezas de la organización -->
              <div class="mb-5 flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#522178]/10">
                  <svg class="h-4 w-4 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black uppercase tracking-wide text-slate-900">Fortalezas de la organizacion</h2>
              </div>
              <ul class="space-y-3">
                <li v-for="strength in organizationData.strengths" :key="strength" class="flex items-start gap-3 rounded-2xl bg-[#f8f5fb] px-4 py-3 text-sm text-slate-700">
                  <span class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#00B140]"></span>
                  <span>{{ strength }}</span>
                </li>
              </ul>
              <div class="mt-6 rounded-2xl border border-[#522178]/10 bg-[#f8f5fb] p-4">
                <p class="text-xs font-black uppercase tracking-wide text-[#522178]">Resumen institucional</p>
                <p class="mt-3 text-sm leading-7 text-slate-600">{{ organizationData.longDescription }}</p>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <!-- Actividad reciente -->
              <div class="mb-5 flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F2780C]/10">
                  <svg class="h-4 w-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black uppercase tracking-wide text-slate-900">Actividad reciente</h2>
              </div>
              <div class="space-y-4">
                <div v-for="activity in organizationData.recentActivity" :key="activity.title" class="flex items-start gap-3">
                  <div
                    class="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                    :style="{ background: `${activity.accentClass === 'bg-[#522178]' ? '#522178' : activity.accentClass === 'bg-[#F2780C]' ? '#F2780C' : '#00B140'}18` }"
                  >
                    <span class="h-2 w-2 rounded-full" :class="activity.accentClass"></span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm leading-snug text-slate-700">{{ activity.title }}</p>
                    <p class="mt-0.5 text-[11px] text-slate-400">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-6 rounded-2xl border border-[#00B140]/15 bg-gradient-to-r from-[#00B140]/10 to-[#00B140]/5 p-4">
                <p class="text-sm font-black text-slate-900">Siguiente movimiento</p>
                <p class="mt-1 text-xs text-slate-600">Refuerza el dashboard cargando novedades, soportes y seguimiento a los procesos activos.</p>
                <button class="mt-4 rounded-xl bg-[#00B140] px-4 py-2 text-xs font-black text-white transition-colors hover:bg-[#009235]">Actualizar tablero</button>
              </div>
            </div>
          </div>
        </div>

        <!-- DERECHA -->
        <div class="space-y-6">
          <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <!-- Ficha institucional -->
            <div class="relative bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#34144d] px-6 py-5">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_45%)]"></div>
              <div class="relative">
                <p class="text-lg font-black text-white">Ficha institucional</p>
                <p class="mt-1 text-sm text-white/80">Datos base de vinculacion y estado del proceso dentro de la plataforma.</p>
              </div>
            </div>
            <div class="bg-white">
              <div
                v-for="(item, index) in sideData"
                :key="item.label"
                class="group px-5 py-4 transition-colors hover:bg-[#faf7fd]"
                :class="index !== sideData.length - 1 ? 'border-b border-black/5' : ''"
              >
                <div class="flex items-start gap-3">
                  <span class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" :class="item.accent"></span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-black uppercase tracking-widest text-slate-400">{{ item.label }}</p>
                    <p class="mt-1 text-sm font-bold text-slate-800">{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <!-- Documentación -->
            <div class="mb-4 flex items-center gap-2">
              <div class="flex h-7 w-7 items-center justify-center rounded-xl bg-[#00B140]/10">
                <svg class="h-3.5 w-3.5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375H14.25m-4.5 0H8.25m3.75 0V4.875c0-.621.504-1.125 1.125-1.125h.375c.298 0 .584.118.795.33l4.5 4.5c.211.211.33.497.33.795v4.875m-10.5 0h10.5" />
                </svg>
              </div>
              <h3 class="text-xs font-black uppercase tracking-widest text-slate-900">Documentacion</h3>
            </div>
            <div class="space-y-3">
              <div
                v-for="metric in organizationData.metrics.filter((item) => item.label === 'Documentos')"
                :key="metric.label"
                class="rounded-2xl bg-slate-50 p-4"
              >
                <p class="text-sm font-bold text-slate-800">{{ metric.value }} soportes registrados</p>
                <p class="mt-1 text-xs text-slate-500">Tablero documental actualizado y listo para seguimiento.</p>
              </div>
            </div>
            <button class="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#00B140]/20 bg-[#00B140]/10 px-4 py-2.5 text-xs font-black text-[#00B140] transition-colors hover:bg-[#00B140]/15">
              Revisar soportes
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="mb-5 flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#522178]/10">
                <svg class="h-4 w-4 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 17.25V21h18v-3.75M7.5 14.25l3-3 2.25 2.25L16.5 9l3 3" />
                </svg>
              </div>
              <div>
                <h2 class="text-sm font-black uppercase tracking-wide text-slate-900">Impacto e interaccion</h2>
                <p class="mt-0.5 text-xs text-slate-500">Evolucion aproximada de alcance juvenil en el semestre.</p>
              </div>
            </div>

            <div class="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
              <!-- Gráfico barras -->
              <div class="min-w-0 rounded-2xl bg-[#f8f5fb] p-4">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p class="text-xs font-black uppercase tracking-widest text-[#522178]">Alcance acumulado</p>
                    <p class="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{{ organizationData.reach }}</p>
                  </div>
                  <span class="whitespace-nowrap rounded-full bg-[#00B140]/10 px-3 py-1 text-[11px] font-black text-[#00B140]">
                    +{{ organizationData.weeklyProgress }}% ritmo semanal
                  </span>
                </div>
                <div class="mt-6 flex h-44 min-h-[176px] items-end justify-between gap-1 sm:gap-2">
                  <div
                    v-for="point in impactTrend"
                    :key="point.label"
                    class="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div class="flex h-full w-full items-end justify-center">
                      <div
                        class="w-full max-w-[36px] rounded-t-xl bg-gradient-to-t from-[#522178] via-[#6d28d9] to-[#8b5cf6] shadow-[0_8px_16px_rgba(82,33,120,0.18)] transition-all duration-300 hover:scale-[1.04]"
                        :style="{ height: `${Math.max(24, Math.round((point.value / maxImpactValue) * 140))}px` }"
                      ></div>
                    </div>

                    <div class="text-center">
                      <p class="text-[10px] font-black text-slate-700">{{ point.value }}</p>
                      <p class="text-[9px] uppercase tracking-wider text-slate-400">{{ point.label }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Procesos activos -->
              <div class="flex min-w-0 flex-col gap-4">
                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-xs font-black uppercase tracking-widest text-slate-400">Procesos activos</p>
                  <div class="mt-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="flex h-3 w-full overflow-hidden rounded-full">
                      <div
                        v-for="segment in processDistribution"
                        :key="segment.label"
                        :style="{ width: `${(segment.value / totalProcessCount) * 100}%`, background: segment.color }"
                      ></div>
                    </div>
                  </div>
                  <div class="mt-4 space-y-2.5">
                    <div v-for="segment in processDistribution" :key="segment.label" class="flex items-center justify-between gap-2">
                      <div class="flex min-w-0 items-center gap-2">
                        <span class="h-2.5 w-2.5 flex-shrink-0 rounded-full" :style="{ background: segment.color }"></span>
                        <span class="truncate text-sm font-semibold text-slate-700">{{ segment.label }}</span>
                      </div>
                      <span class="flex-shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-black" :class="segment.tone">
                        {{ segment.value }} inic.
                      </span>
                    </div>
                  </div>
                </div>

                <div class="rounded-2xl border border-slate-200 bg-white p-4">
                  <p class="text-xs font-black uppercase tracking-widest text-slate-400">Lectura rapida</p>
                  <ul class="mt-3 space-y-3 text-sm text-slate-600">
                    <li class="flex items-start gap-2">
                      <span class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#522178]"></span>
                      La organizacion mantiene una curva sostenida de participacion juvenil durante el semestre.
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#00B140]"></span>
                      {{ processDistribution[0].value + processDistribution[1].value }} procesos estan moviendo acciones visibles dentro de la red.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">

            <!-- Pulso documental -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F2780C]/10">
                  <svg class="h-4 w-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375H14.25m-4.5 0H8.25m3.75 0V4.875c0-.621.504-1.125 1.125-1.125h.375c.298 0 .584.118.795.33l4.5 4.5c.211.211.33.497.33.795v4.875m-10.5 0h10.5" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-sm font-black uppercase tracking-wide text-slate-900">Pulso documental</h2>
                  <p class="mt-0.5 text-xs text-slate-500">Visibilidad de soportes y estado general del tablero.</p>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="item in documentHealth" :key="item.label" class="rounded-2xl bg-slate-50 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-sm font-bold text-slate-800">{{ item.label }}</p>
                    <span class="flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black" :class="item.surface">{{ item.value }} items</span>
                  </div>
                  <div class="mt-3 h-3 overflow-hidden rounded-full bg-white">
                    <div class="h-full rounded-full transition-all duration-500" :style="{ width: `${item.percentage}%`, background: item.color }"></div>
                  </div>
                  <p class="mt-2 text-xs text-slate-500">{{ item.percentage }}% del tablero en estado visible.</p>
                </div>
              </div>
              <div class="mt-5 rounded-2xl border border-[#F2780C]/15 bg-[#fff7f1] p-4">
                <p class="text-sm font-black text-slate-900">Estado recomendado</p>
                <p class="mt-2 text-sm leading-6 text-slate-600">Mantener el flujo de carga documental y publicar novedades de proyectos para sostener el alcance y la trazabilidad institucional.</p>
              </div>
            </div>

            <!-- Líneas e iniciativas -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F2780C]/10">
                  <svg class="h-4 w-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black uppercase tracking-wide text-slate-900">Lineas e iniciativas</h2>
                <span class="ml-auto text-xs text-slate-400">{{ organizationData.initiatives.length }} procesos</span>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <article
                  v-for="initiative in organizationData.initiatives"
                  :key="initiative.title"
                  class="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  :class="initiative.accentClass === 'bg-[#522178]'
                    ? 'border-l-4 border-l-[#522178]'
                    : initiative.accentClass === 'bg-[#00B140]'
                      ? 'border-l-4 border-l-[#00B140]'
                      : 'border-l-4 border-l-[#F2780C]'"
                >
                  <span class="inline-block rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white" :class="initiative.accentClass">
                    {{ initiative.status }}
                  </span>
                  <h3 class="mt-3 text-base font-black leading-tight text-slate-900">{{ initiative.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-slate-600">{{ initiative.description }}</p>
                </article>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

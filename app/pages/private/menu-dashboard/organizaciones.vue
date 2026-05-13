<!--
  ============================================================
  PÁGINA: Organizaciones (panel general)
  Ruta: /private/menu-dashboard/organizaciones
  ============================================================
  Vista de gestión: lista todas las organizaciones acompañadas
  por Psicovibes (no las del usuario, sino las que Psicovibes
  atiende como servicio).

  Contiene:
  - Hero con stats globales (total / activas / exploración / sesiones)
  - 4 cards de métricas con barras de porcentaje
  - Tabla/grid de organizaciones con filtros (search, segmento, estado)
  - Sidebar derecho: distribuciones por segmento y por estado,
    actividad reciente y acciones rápidas

  TODO: los datos están mockeados en memoria (orgs[]).
  Cuando exista backend, reemplazar con fetch real.
-->

<script setup>
import { ref, computed } from 'vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'

definePageMeta({ layout: 'dashboard' })
// Aquí pongo esta sección porque sirve para ver mejor la pantalla de organizaciones.
// La vi en un dashboard y queda claro para David, Ximena y Jesús.

const search = ref('')
const filterSegment = ref('Todos')
const filterStatus = ref('Todos')

const segments = ['Todos', 'Comunidad educativa', 'Empresa y organizaciones', 'Colectivos sociales']
const statuses  = ['Todos', 'En acompañamiento', 'En exploración', 'Finalizado']

const orgs = ref([
  {
    id: 1,
    name: 'Colegio Horizontes Emocionales',
    segment: 'Comunidad educativa',
    city: 'Mosquera',
    status: 'En acompañamiento',
    line: 'Bienestar para docentes y estudiantes',
    since: 'Ene 2024',
    sessions: 12,
    avatar: 'CH',
    avatarBg: 'bg-[#522178]',
  },
  {
    id: 2,
    name: 'Empresa NovaTech',
    segment: 'Empresa y organizaciones',
    city: 'Bogotá',
    status: 'En exploración',
    line: 'Diagnóstico de clima laboral y talleres de estrés',
    since: 'Mar 2024',
    sessions: 3,
    avatar: 'NT',
    avatarBg: 'bg-indigo-500',
  },
  {
    id: 3,
    name: 'Colectivo Sentir para Sanar',
    segment: 'Colectivos sociales',
    city: 'Cundinamarca',
    status: 'Finalizado',
    line: 'Talleres vivenciales y acompañamiento psicoeducativo',
    since: 'Jun 2023',
    sessions: 24,
    avatar: 'SS',
    avatarBg: 'bg-[#F2780C]',
  },
  {
    id: 4,
    name: 'IED Simón Bolívar',
    segment: 'Comunidad educativa',
    city: 'Mosquera',
    status: 'En acompañamiento',
    line: 'Gestión emocional para adolescentes',
    since: 'Feb 2024',
    sessions: 8,
    avatar: 'SB',
    avatarBg: 'bg-[#522178]',
  },
  {
    id: 5,
    name: 'Fundación Raíces Jóvenes',
    segment: 'Colectivos sociales',
    city: 'Facatativá',
    status: 'En acompañamiento',
    line: 'Habilidades socioemocionales en jóvenes',
    since: 'Mar 2024',
    sessions: 6,
    avatar: 'RJ',
    avatarBg: 'bg-[#00B140]',
  },
  {
    id: 6,
    name: 'Constructora Horizonte',
    segment: 'Empresa y organizaciones',
    city: 'Bogotá',
    status: 'En exploración',
    line: 'Prevención de riesgos psicosociales',
    since: 'Abr 2024',
    sessions: 2,
    avatar: 'HZ',
    avatarBg: 'bg-sky-500',
  },
])

const statusMeta = {
  'En acompañamiento': { cls: 'text-[#00B140] bg-[#00B140]/10 border border-[#00B140]/20', dot: 'bg-[#00B140]' },
  'En exploración':    { cls: 'text-[#F2780C] bg-[#F2780C]/10 border border-[#F2780C]/20', dot: 'bg-[#F2780C]' },
  'Finalizado':        { cls: 'text-slate-500 bg-slate-100 border border-slate-200',         dot: 'bg-slate-400' },
}

const segmentMeta = {
  'Comunidad educativa':      { icon: 'school',    color: 'text-[#522178]', bg: 'bg-[#522178]/10' },
  'Empresa y organizaciones': { icon: 'building',  color: 'text-indigo-500', bg: 'bg-indigo-50' },
  'Colectivos sociales':      { icon: 'community', color: 'text-[#00B140]', bg: 'bg-[#00B140]/10' },
}

const filtered = computed(() => {
  return orgs.value.filter(o => {
    const matchSearch  = search.value === '' || o.name.toLowerCase().includes(search.value.toLowerCase()) || o.city.toLowerCase().includes(search.value.toLowerCase())
    const matchSeg     = filterSegment.value === 'Todos' || o.segment === filterSegment.value
    const matchStatus  = filterStatus.value  === 'Todos' || o.status  === filterStatus.value
    return matchSearch && matchSeg && matchStatus
  })
})

const totalActive      = computed(() => orgs.value.filter(o => o.status === 'En acompañamiento').length)
const totalExploration = computed(() => orgs.value.filter(o => o.status === 'En exploración').length)
const totalFinished    = computed(() => orgs.value.filter(o => o.status === 'Finalizado').length)
const totalSessions    = computed(() => orgs.value.reduce((acc, o) => acc + o.sessions, 0))
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

      <!-- ══ PAGE HERO ════════════════════════════════════════════ -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] shadow-2xl">
        <!-- top color bar -->
        <div class="h-1 flex">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>
        <!-- decorative -->
        <div class="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/4 pointer-events-none"></div>
        <div class="absolute right-32 bottom-0 w-48 h-48 rounded-full bg-[#F2780C]/8 pointer-events-none"></div>

        <div class="relative p-6 lg:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <!-- title -->
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h1 class="text-2xl lg:text-3xl font-black text-white tracking-tight">Organizaciones acompañadas</h1>
              </div>
              <p class="text-white/55 text-sm max-w-xl">
                Panorama general de empresas, instituciones educativas y colectivos que trabajan con Psicovibes en procesos de bienestar emocional.
              </p>
              <div class="flex flex-wrap gap-1.5 mt-4">
                <span v-for="tag in ['Bienestar emocional','Salud mental','Comunidad educativa','Colectivos','Empresas']" :key="tag"
                  class="px-2 py-0.5 bg-white/8 border border-white/10 text-white/50 text-[10px] rounded-lg">{{ tag }}</span>
              </div>
            </div>

            <!-- hero actions -->
            <div class="flex flex-wrap gap-2 flex-shrink-0">
              <button class="flex items-center gap-1.5 px-4 py-2.5 bg-[#00B140]/80 hover:bg-[#00B140] border border-[#00B140]/40 text-white text-xs font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#00B140]/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                Vincular organización
              </button>
              <button class="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/18 border border-white/10 text-white text-xs font-bold rounded-xl transition-all hover:scale-105 backdrop-blur-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Exportar reporte
              </button>
            </div>
          </div>

          <!-- ── inner stats ── -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              </div>
              <div>
                <p class="text-white font-black text-xl leading-none">{{ orgs.length }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">Total orgs</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-white font-black text-xl leading-none">{{ totalActive }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">En proceso</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-white font-black text-xl leading-none">{{ totalExploration }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">Exploración</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              </div>
              <div>
                <p class="text-white font-black text-xl leading-none">{{ totalSessions }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">Sesiones totales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ METRIC CARDS ═════════════════════════════════════════ -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#522178]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-[#522178] bg-[#522178]/10 px-1.5 py-0.5 rounded-full">todas</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ orgs.length }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total organizaciones</p>
          <p class="text-xs text-slate-400 mt-1">activas en procesos con Psicovibes</p>
        </div>
        <!-- En acompañamiento -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-[#00B140] bg-[#00B140]/10 px-1.5 py-0.5 rounded-full">activo</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ totalActive }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">En acompañamiento</p>
          <p class="text-xs text-slate-400 mt-1">con procesos de bienestar en curso</p>
        </div>
        <!-- En exploración -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-[#F2780C] bg-[#F2780C]/10 px-1.5 py-0.5 rounded-full">pendiente</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ totalExploration }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">En exploración</p>
          <p class="text-xs text-slate-400 mt-1">en fase de diagnóstico o propuesta</p>
        </div>
        <!-- Finalizadas -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">cerradas</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ totalFinished }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Finalizadas</p>
          <p class="text-xs text-slate-400 mt-1">procesos cerrados o pausados</p>
        </div>
      </div>

      <!-- ══ MAIN GRID: table left + sidebar right ═══════════════ -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        <!-- ── TABLE SECTION (2/3) ────────────────────────────── -->
        <div class="xl:col-span-2 flex flex-col gap-5">

          <!-- Search + filters -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
            <!-- search -->
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Buscar organización o ciudad..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#522178]/20 focus:border-[#522178]/40 bg-slate-50"
              />
            </div>
            <!-- segment filter -->
            <BaseSelect
              v-model="filterSegment"
              :options="segments.map(s => ({ label: s, value: s }))"
              placeholder="Segmento"
            />
            <!-- status filter -->
            <BaseSelect
              v-model="filterStatus"
              :options="statuses.map(s => ({ label: s, value: s }))"
              placeholder="Estado"
            />
          </div>

          <!-- Org cards grid -->
          <div v-if="filtered.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="org in filtered"
              :key="org.id"
              class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden group"
            >
              <!-- card top accent -->
              <div class="h-1" :class="{
                'bg-gradient-to-r from-[#00B140] to-[#00B140]/40': org.status === 'En acompañamiento',
                'bg-gradient-to-r from-[#F2780C] to-[#F2780C]/40': org.status === 'En exploración',
                'bg-gradient-to-r from-slate-300 to-slate-100':     org.status === 'Finalizado',
              }"></div>

              <div class="p-5">
                <!-- header row -->
                <div class="flex items-start gap-3 mb-3">
                  <!-- avatar -->
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" :class="org.avatarBg">
                    {{ org.avatar }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-black text-slate-900 leading-tight truncate group-hover:text-[#522178] transition-colors">{{ org.name }}</p>
                    <p class="text-[10px] text-slate-500 mt-0.5">{{ org.city }}</p>
                  </div>
                  <!-- status badge -->
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0" :class="statusMeta[org.status]?.cls">
                    <span class="w-1 h-1 rounded-full" :class="statusMeta[org.status]?.dot"></span>
                    {{ org.status }}
                  </span>
                </div>

                <!-- segment chip -->
                <div class="flex items-center gap-1.5 mb-3">
                  <div class="w-5 h-5 rounded-md flex items-center justify-center" :class="segmentMeta[org.segment]?.bg">
                    <!-- school icon -->
                    <svg v-if="segmentMeta[org.segment]?.icon === 'school'" class="w-3 h-3" :class="segmentMeta[org.segment]?.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                    <!-- building icon -->
                    <svg v-else-if="segmentMeta[org.segment]?.icon === 'building'" class="w-3 h-3" :class="segmentMeta[org.segment]?.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"/>
                    </svg>
                    <!-- community icon -->
                    <svg v-else class="w-3 h-3" :class="segmentMeta[org.segment]?.color" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span class="text-[10px] font-semibold text-slate-500">{{ org.segment }}</span>
                </div>

                <!-- line of work -->
                <p class="text-xs text-slate-600 leading-relaxed mb-4">{{ org.line }}</p>

                <!-- footer row -->
                <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div class="flex items-center gap-1 text-[10px] text-slate-400">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    Desde {{ org.since }}
                  </div>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                    <svg class="w-3 h-3 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    {{ org.sessions }} sesiones
                  </div>
                  <button class="text-[10px] font-bold text-[#522178] bg-[#522178]/8 hover:bg-[#522178]/15 px-2.5 py-1 rounded-lg transition-colors">
                    Ver detalle →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- empty state -->
          <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <p class="text-sm font-bold text-slate-500">Sin resultados</p>
            <p class="text-xs text-slate-400 mt-1">Intenta cambiar los filtros de búsqueda</p>
          </div>

          <!-- Tabla clásica (vista completa) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-black text-slate-900 uppercase tracking-wide">Vista de tabla completa</h3>
                <p class="text-xs text-slate-500 mt-0.5">{{ filtered.length }} organizaciones encontradas</p>
              </div>
              <button class="text-xs font-bold text-[#522178] bg-[#522178]/8 hover:bg-[#522178]/15 px-3 py-1.5 rounded-xl transition-colors">
                Exportar CSV
              </button>
            </div>
            <div class="overflow-x-auto org-scroll">
              <table class="w-full">
                <thead class="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Organización</th>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Segmento</th>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Ciudad</th>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Estado</th>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Sesiones</th>
                    <th class="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Acción</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="org in filtered" :key="'t' + org.id" class="hover:bg-slate-50/60 transition-colors group">
                    <td class="px-5 py-3.5">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0" :class="org.avatarBg">
                          {{ org.avatar }}
                        </div>
                        <span class="text-xs font-bold text-slate-800 group-hover:text-[#522178] transition-colors">{{ org.name }}</span>
                      </div>
                    </td>
                    <td class="px-5 py-3.5 text-xs text-slate-500">{{ org.segment }}</td>
                    <td class="px-5 py-3.5 text-xs text-slate-500">{{ org.city }}</td>
                    <td class="px-5 py-3.5">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="statusMeta[org.status]?.cls">
                        <span class="w-1 h-1 rounded-full" :class="statusMeta[org.status]?.dot"></span>
                        {{ org.status }}
                      </span>
                    </td>
                    <td class="px-5 py-3.5 text-xs font-bold text-slate-700">{{ org.sessions }}</td>
                    <td class="px-5 py-3.5">
                      <button class="text-[10px] font-bold text-[#522178] bg-[#522178]/8 hover:bg-[#522178]/15 px-2.5 py-1 rounded-lg transition-colors">
                        Ver →
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ── RIGHT SIDEBAR (1/3) ────────────────────────────── -->
        <div class="flex flex-col gap-5 xl:sticky xl:top-6">

          <!-- Distribución por segmento -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-7 h-7 rounded-xl bg-[#522178]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#522178]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Por segmento</h3>
            </div>
            <div class="space-y-3.5">
              <div v-for="s in [
                { label: 'Comunidad educativa',       count: orgs.filter(o=>o.segment==='Comunidad educativa').length,      color: '#522178' },
                { label: 'Empresa y organizaciones',  count: orgs.filter(o=>o.segment==='Empresa y organizaciones').length,  color: '#6366f1' },
                { label: 'Colectivos sociales',       count: orgs.filter(o=>o.segment==='Colectivos sociales').length,       color: '#00B140' },
              ]" :key="s.label">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-semibold text-slate-600">{{ s.label }}</span>
                  <span class="text-[10px] font-black text-slate-700">{{ s.count }}</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: Math.round((s.count / orgs.length) * 100) + '%', background: s.color }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Distribución por estado -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-7 h-7 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Por estado</h3>
            </div>
            <div class="space-y-2.5">
              <div v-for="st in [
                { label: 'En acompañamiento', count: totalActive,      pct: Math.round((totalActive / orgs.length)*100),      color: '#00B140' },
                { label: 'En exploración',    count: totalExploration,  pct: Math.round((totalExploration / orgs.length)*100),  color: '#F2780C' },
                { label: 'Finalizado',        count: totalFinished,     pct: Math.round((totalFinished / orgs.length)*100),     color: '#94a3b8' },
              ]" :key="st.label" class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full flex-shrink-0" :style="{ background: st.color }"></div>
                <span class="text-xs text-slate-600 flex-1">{{ st.label }}</span>
                <span class="text-xs font-black text-slate-700">{{ st.count }}</span>
                <span class="text-[10px] text-slate-400 w-8 text-right">{{ st.pct }}%</span>
              </div>
            </div>
          </div>

          <!-- Actividad reciente de orgs -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Actividad reciente</h3>
            </div>
            <div class="space-y-3">
              <div v-for="item in [
                { text: 'Colegio Horizontes completó sesión #12', time: 'hace 1h',   dot: 'bg-[#522178]' },
                { text: 'NovaTech agendó diagnóstico inicial',    time: 'hace 3h',   dot: 'bg-indigo-400' },
                { text: 'Fundación Raíces Jóvenes vinculada',     time: 'hace 1 día', dot: 'bg-[#00B140]' },
                { text: 'Constructora Horizonte en exploración',  time: 'hace 2 días', dot: 'bg-[#F2780C]' },
              ]" :key="item.text" class="flex items-start gap-2.5">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" :class="item.dot"></span>
                <div>
                  <p class="text-xs text-slate-700 leading-snug">{{ item.text }}</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones rápidas -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Acciones rápidas</h3>
            </div>
            <ul class="space-y-0.5">
              <li v-for="action in [
                { label: 'Vincular nueva organización',   cls: 'text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20' },
                { label: 'Registrar sesión realizada',    cls: 'text-[#00B140] bg-[#00B140]/10 hover:bg-[#00B140]/20' },
                { label: 'Enviar propuesta de servicio',  cls: 'text-[#F2780C] bg-[#F2780C]/10 hover:bg-[#F2780C]/20' },
                { label: 'Generar informe de impacto',    cls: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100' },
                { label: 'Actualizar estado de proceso',  cls: 'text-sky-500 bg-sky-50 hover:bg-sky-100' },
              ]" :key="action.label">
                <button class="w-full text-left flex items-center gap-2.5 px-2.5 py-2 text-xs text-slate-700 hover:bg-[#522178]/5 rounded-xl transition-colors">
                  <span class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" :class="action.cls">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                  </span>
                  {{ action.label }}
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.org-scroll::-webkit-scrollbar {
  height: 8px;
}

.org-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 9999px;
}

.org-scroll::-webkit-scrollbar-thumb {
  background: #F2780C;
  border-radius: 9999px;
  border: 2px solid rgba(0, 0, 0, 0.05);
}

.org-scroll::-webkit-scrollbar-thumb:hover {
  background: #ff8a2a;
}

.org-scroll {
  scrollbar-width: thin;
  scrollbar-color: #F2780C rgba(255, 255, 255, 0.4);
}
</style>

<!--
  ============================================================
  COMPONENTE: DashboardHome
  ============================================================
  Es el contenido principal de la página Inicio del dashboard.
  Lo usa /private/dashboard.vue.

  Estructura:
  - HERO: barra morada con el avatar/logo de Psicovibes,
    nombre, ubicación, barra de progreso de perfil, badges,
    botones de acción rápida y 4 mini-stats abajo.
  - BARRA DE ESTADO: indicadores de progreso, visibilidad,
    última actualización, alertas pendientes.
  - GRID PRINCIPAL (xl:3 columnas):
    · IZQUIERDA (2/3):
      - 6 cards de métricas (miembros, eventos, inscripciones,
        visitas perfil, publicaciones, estado admin)
      - Gráfico de barras de visitas últimos 7 días
      - Distribución de miembros por segmento
    · DERECHA (1/3):
      - Resumen de hoy (puntos importantes)
      - Próximos eventos
      - Actividad reciente
      - Acciones rápidas

  IMPORTANTE:
  Todos los datos están HARDCODEADOS para Psicovibes.
  Si queremos hacer este dashboard para múltiples organizaciones,
  habría que reemplazar las constantes locales por datos del
  backend o del store.
-->

<script setup lang="ts">
import { ref } from 'vue'

const orgName = ref('Psicovibes')

const chartData = [
  { day: 'Lun', visits: 38 },
  { day: 'Mar', visits: 92 },
  { day: 'Mié', visits: 61 },
  { day: 'Jue', visits: 44 },
  { day: 'Vie', visits: 115 },
  { day: 'Sáb', visits: 29 },
  { day: 'Dom', visits: 67 },
]
const maxVisits = Math.max(...chartData.map(d => d.visits))

const activity = [
  { icon: 'user',     color: '#522178', text: 'Laura Ramírez se unió como miembro',     time: 'hace 12 min' },
  { icon: 'calendar', color: '#00B140', text: 'Evento "Feria Cultural" confirmado',       time: 'hace 1h'     },
  { icon: 'doc',      color: '#F2780C', text: 'Solicitud de inscripción #47 recibida',   time: 'hace 2h'     },
  { icon: 'eye',      color: '#6366f1', text: 'Tu perfil alcanzó 2.4k visitas',          time: 'hace 3h'     },
  { icon: 'warn',     color: '#f43f5e', text: 'Documento "RUT" vence en 5 días',         time: 'hace 5h'     },
]

const events = [
  {
    name: 'Taller: Manejo del estrés y autocuidado',
    date: '15 Abr',
    attendees: 45,
    color: '#522178',
  },
  {
    name: 'Capacitación en bienestar emocional para empresas',
    date: '27 Abr',
    attendees: 30,
    color: '#00B140',
  },
  {
    name: 'Jornada comunitaria de salud mental',
    date: '10 May',
    attendees: 80,
    color: '#F2780C',
  },
]

const memberStats = [
  { label: 'Empresas y organizaciones', count: 48, pct: 35, color: '#522178' },
  { label: 'Comunidad educativa',       count: 56, pct: 40, color: '#F2780C' },
  { label: 'Colectivos sociales',       count: 36, pct: 25, color: '#00B140' },
]

const actions = [
  { label: 'Completa tu descripción',     colorClass: 'text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20' },
  { label: 'Sube imagen de portada',      colorClass: 'text-sky-500 bg-sky-50 hover:bg-sky-100' },
  { label: 'Publica tu próximo evento',   colorClass: 'text-[#00B140] bg-[#00B140]/10 hover:bg-[#00B140]/20' },
  { label: 'Responde solicitudes',        colorClass: 'text-[#F2780C] bg-[#F2780C]/10 hover:bg-[#F2780C]/20' },
  { label: 'Actualiza datos de contacto', colorClass: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100' },
  { label: 'Sube docs de validación',     colorClass: 'text-rose-500 bg-rose-50 hover:bg-rose-100' },
]

// Each card has explicit static Tailwind color classes (no dynamic hex concatenation)
const metricCards = [
  {
    label: 'Miembros activos', value: '1.1k', badge: '+5%',
    iconBg: 'bg-[#522178]/10', iconColor: 'text-[#522178]',
    badgeColor: 'text-[#00B140] bg-[#00B140]/10',
    btnClass: 'text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20',
    icon: 'users',
  },
  {
    label: 'Eventos activos', value: '8', badge: 'esta sem.',
    iconBg: 'bg-[#00B140]/10', iconColor: 'text-[#00B140]',
    badgeColor: 'text-[#F2780C] bg-[#F2780C]/10',
    btnClass: 'text-[#00B140] bg-[#00B140]/10 hover:bg-[#00B140]/20',
    icon: 'cal',
  },
  {
    label: 'Inscripciones', value: '42', badge: '5 pend.',
    iconBg: 'bg-[#F2780C]/10', iconColor: 'text-[#F2780C]',
    badgeColor: 'text-rose-500 bg-rose-50',
    btnClass: 'text-[#F2780C] bg-[#F2780C]/10 hover:bg-[#F2780C]/20',
    icon: 'clip',
  },
  {
    label: 'Visitas perfil', value: '2.4k', badge: '↑ 8%',
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500',
    badgeColor: 'text-[#00B140] bg-[#00B140]/10',
    btnClass: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
    icon: 'eye',
  },
  {
    label: 'Publicaciones', value: '15', badge: 'ayer',
    iconBg: 'bg-sky-50', iconColor: 'text-sky-500',
    badgeColor: 'text-slate-400 bg-slate-100',
    btnClass: 'text-sky-500 bg-sky-50 hover:bg-sky-100',
    icon: 'news',
  },
  {
    label: 'Estado admin', value: 'OK', badge: 'Sin alerta',
    iconBg: 'bg-[#00B140]/10', iconColor: 'text-[#00B140]',
    badgeColor: 'text-[#00B140] bg-[#00B140]/10',
    btnClass: 'text-rose-500 bg-rose-50 hover:bg-rose-100',
    icon: 'shield',
  },
]
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] shadow-2xl">
        <div class="h-1 flex">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>
        <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/4 pointer-events-none"></div>
        <div class="absolute right-20 bottom-0 w-40 h-40 rounded-full bg-[#F2780C]/10 pointer-events-none"></div>

        <div class="relative p-6 lg:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">


            <div class="flex items-center gap-5">
              <div class="relative flex-shrink-0">
                <img
                  src="/images/organizaciones/psicovibes/Logo_Psicovibes.png"
                  alt="Logo Psicovibes"
                  class="w-24 h-24 rounded-2xl object-cover shadow-xl ring-2 ring-white/20 bg-white"
                />
                <span class="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00B140] rounded-full border-2 border-[#522178] flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </span>
              </div>

              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h1 class="text-2xl lg:text-3xl font-black text-white tracking-tight">{{ orgName }}</h1>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00B140]/20 text-[#00B140] text-[10px] font-black rounded-full border border-[#00B140]/30 uppercase tracking-wide">
                    <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Verificada
                  </span>
                </div>
                <p class="text-white/65 text-sm">
                  Bienestar y salud mental ·
                  <span class="text-[#F2780C] font-semibold">Mosquera, Cundinamarca</span>
                </p>
                <div class="flex flex-wrap items-center gap-3 mt-3">
                  <div class="flex items-center gap-2">
                    <div class="w-28 h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-[#F2780C] to-[#fbbf24] rounded-full" style="width:90%"></div>
                    </div>
                    <span class="text-white/55 text-xs">90% perfil</span>
                  </div>
                  <span class="text-white/25">·</span>
                  <span class="text-white/55 text-xs">Programas activos en bienestar emocional</span>
                  <span class="text-white/25">·</span>
                  <span class="text-white/55 text-xs">Desde 2023</span>
                </div>
                <div class="flex flex-wrap gap-1.5 mt-3">
                  <span
                    v-for="tag in ['Bienestar emocional','Psicología','Empresas','Comunidad educativa','Colectivos sociales']"
                    :key="tag"
                    class="px-2 py-0.5 bg-white/8 border border-white/10 text-white/55 text-[10px] rounded-lg">{{ tag }}</span>
                </div>
              </div>
            </div>


            <div class="flex flex-wrap gap-2">
              <button class="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/18 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                Editar perfil
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/18 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                Ver público
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-[#00B140]/80 hover:bg-[#00B140] border border-[#00B140]/40 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#00B140]/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                Crear evento
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-[#F2780C]/80 hover:bg-[#F2780C] border border-[#F2780C]/40 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#F2780C]/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                Publicar novedad
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/18 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Miembros
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
            <div v-for="stat in [
              { value:'1.1k', label:'Miembros',       icon:'users', color:'text-[#F2780C]' },
              { value:'8',    label:'Eventos activos', icon:'cal',   color:'text-[#00B140]' },
              { value:'2.4k', label:'Visitas semana',  icon:'eye',   color:'text-violet-300' },
              { value:'3',    label:'Convocatorias',   icon:'meg',   color:'text-[#F2780C]' },
            ]" :key="stat.label" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg v-if="stat.icon==='users'" class="w-4 h-4" :class="stat.color" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
                <svg v-else-if="stat.icon==='cal'" class="w-4 h-4" :class="stat.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <svg v-else-if="stat.icon==='eye'" class="w-4 h-4" :class="stat.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" :class="stat.color" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                </svg>
              </div>
              <div>
                <p class="text-white font-black text-lg leading-none">{{ stat.value }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-3.5
               flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
               text-xs sm:text-sm"
      >
        <div class="flex items-center gap-2 text-slate-600 flex-wrap">
          <div class="w-1.5 h-1.5 rounded-full bg-[#F2780C]"></div>
          Perfil: <strong class="text-slate-900 ml-1">82% completado</strong>
          <button class="ml-1 text-[10px] text-[#522178] font-bold underline underline-offset-2">Completar</button>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600 flex-wrap">
          <div class="w-1.5 h-1.5 rounded-full bg-[#00B140] animate-pulse"></div>
          Visibilidad: <strong class="text-slate-900 ml-1">Alta</strong>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600 flex-wrap w-full sm:w-auto">
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Actualizado: <strong class="text-slate-900 ml-1">hace 3 días</strong>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          <span class="text-rose-500 font-semibold text-xs">1 alerta pendiente</span>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">


        <div class="xl:col-span-2 flex flex-col gap-6">


          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              v-for="card in metricCards"
              :key="card.label"
              class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="card.iconBg">


                  <svg v-if="card.icon==='users'" class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>

                  <svg v-else-if="card.icon==='cal'" class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>

                  <svg v-else-if="card.icon==='clip'" class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>

                  <svg v-else-if="card.icon==='eye'" class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <!-- news -->
                  <svg v-else-if="card.icon==='news'" class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>

                  <svg v-else class="w-5 h-5" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" :class="card.badgeColor">
                  {{ card.badge }}
                </span>
              </div>
              <p class="text-2xl font-black text-slate-900">{{ card.value }}</p>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 flex-1">{{ card.label }}</p>

              <button class="mt-3 w-full text-xs font-semibold rounded-lg py-1.5 transition-colors" :class="card.btnClass">
                Ver más →
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-[#522178]/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-black text-slate-900 uppercase tracking-wide">Visitas al perfil</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-[#00B140] font-bold bg-[#00B140]/10 px-2 py-1 rounded-full">↑ 8% semana</span>
                <span class="text-xs text-slate-400">últimos 7 días</span>
              </div>
            </div>
            <p class="text-3xl font-black text-slate-900 mb-5">
              446 <span class="text-sm font-normal text-slate-400">visitas totales</span>
            </p>
            <div class="flex items-end gap-2 h-36">
              <div v-for="d in chartData" :key="d.day" class="flex flex-col items-center gap-1.5 flex-1">
                <span class="text-[10px] font-bold text-slate-500">{{ d.visits }}</span>
                <div
                  class="w-full rounded-xl transition-all duration-300 hover:opacity-75"
                  :style="{
                    height: Math.max(8, Math.round((d.visits / maxVisits) * 112)) + 'px',
                    background: d.visits === maxVisits
                      ? 'linear-gradient(to top, #F2780C, #fbbf24)'
                      : 'linear-gradient(to top, #522178cc, #7c3aed55)'
                  }"
                ></div>
                <span class="text-[10px] text-slate-400 font-medium">{{ d.day }}</span>
              </div>
            </div>
          </div>


          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-8 h-8 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
              <h3 class="text-sm font-black text-slate-900 uppercase tracking-wide">Distribución de miembros</h3>
              <span class="ml-auto text-xs text-slate-400">1,100 total</span>
            </div>
            <div class="space-y-4">
              <div v-for="s in memberStats" :key="s.label" class="flex items-center gap-4">
                <span class="text-xs text-slate-600 w-28 flex-shrink-0">{{ s.label }}</span>
                <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: s.pct + '%', background: s.color }"></div>
                </div>
                <span class="text-xs font-bold text-slate-700 w-10 text-right">{{ s.count }}</span>
                <span class="text-[10px] text-slate-400 w-8 text-right">{{ s.pct }}%</span>
              </div>
            </div>
          </div>
        </div>


        <div class="flex flex-col gap-5 h-full justify-between">


          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#522178]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Resumen de hoy</h3>
            </div>
            <ul class="space-y-2.5">
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#F2780C] flex-shrink-0 mt-1.5"></span>
                4 inscripciones pendientes por aprobar
              </li>
              <li class="flex items-start gap-2.5 text-xs text-rose-600 font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5"></span>
                Documento "RUT" vence en 5 días
              </li>
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00B140] flex-shrink-0 mt-1.5"></span>
                2 eventos esta semana
              </li>
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5"></span>
                3 mensajes sin responder
              </li>
              <li class="flex items-start gap-2.5 text-xs text-slate-700">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-1.5"></span>
                1 publicación en borrador
              </li>
            </ul>
          </div>


          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Próximos eventos</h3>
            </div>
            <div class="space-y-2.5">
              <div v-for="ev in events" :key="ev.name"
                class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div class="w-1.5 h-10 rounded-full flex-shrink-0" :style="{ background: ev.color }"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 truncate">{{ ev.name }}</p>
                  <p class="text-[10px] text-slate-500">{{ ev.date }} · {{ ev.attendees }} asistentes</p>
                </div>
                <svg class="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>


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
              <div v-for="item in activity" :key="item.text" class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  :style="{ background: item.color + '18' }">
                  <svg v-if="item.icon==='user'" class="w-3.5 h-3.5" :style="{color:item.color}" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else-if="item.icon==='calendar'" class="w-3.5 h-3.5" :style="{color:item.color}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <svg v-else-if="item.icon==='doc'" class="w-3.5 h-3.5" :style="{color:item.color}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <svg v-else-if="item.icon==='eye'" class="w-3.5 h-3.5" :style="{color:item.color}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" :style="{color:item.color}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-slate-700 leading-snug">{{ item.text }}</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </div>


          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Acciones</h3>
            </div>
            <ul class="space-y-0.5">
              <li v-for="action in actions" :key="action.label">
                <button class="w-full text-left flex items-center gap-2.5 px-2.5 py-2 text-xs text-slate-700 hover:bg-[#522178]/5 rounded-xl transition-colors">
                  <span class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" :class="action.colorClass">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
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
</style>
<!--
  ============================================================
  PÁGINA: Perfil (privada / dashboard)
  Ruta: /private/menu-dashboard/perfil
  ============================================================
  Perfil personal del usuario logueado.

  Estructura:
  - HERO morado con avatar, nombre, badges, ubicación, barra
    de progreso de "fortaleza del perfil" + 4 stats rápidos
  - Barra de estado (perfil listo, visibilidad, meta semanal)
  - GRID PRINCIPAL:
    · IZQUIERDA: 4 cards de métricas (perfil/orgs/docs/eventos),
      fortaleza del perfil (con barras por sección),
      actividad reciente, organizaciones a las que pertenece,
      documentos, calendario
    · DERECHA: información personal (correo, teléfono, etc.)
      y formulario para unirse a una nueva organización

  TODO: datos hardcoded — cuando exista backend, conectar
  con la sesión del usuario actual.
-->

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const profileStrength = 86
const weeklyGoal = 72

const metricCards = [
  {
    label: 'Perfil completado',
    value: '86%',
    badge: '+12%',
    iconBg: 'bg-[#522178]/10',
    iconColor: 'text-[#522178]',
    badgeColor: 'text-[#00B140] bg-[#00B140]/10',
    btnClass: 'text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20',
    icon: 'profile',
  },
  {
    label: 'Organizaciones',
    value: '3',
    badge: '2 activas',
    iconBg: 'bg-[#F2780C]/10',
    iconColor: 'text-[#F2780C]',
    badgeColor: 'text-[#F2780C] bg-[#F2780C]/10',
    btnClass: 'text-[#F2780C] bg-[#F2780C]/10 hover:bg-[#F2780C]/20',
    icon: 'org',
  },
  {
    label: 'Documentos',
    value: '7',
    badge: '1 pendiente',
    iconBg: 'bg-[#00B140]/10',
    iconColor: 'text-[#00B140]',
    badgeColor: 'text-rose-500 bg-rose-50',
    btnClass: 'text-[#00B140] bg-[#00B140]/10 hover:bg-[#00B140]/20',
    icon: 'docs',
  },
  {
    label: 'Eventos',
    value: '4',
    badge: 'Este mes',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    badgeColor: 'text-indigo-500 bg-indigo-50',
    btnClass: 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
    icon: 'calendar',
  },
]

const quickStats = [
  { value: '3', label: 'Organizaciones vinculadas', color: 'text-[#F2780C]' },
  { value: '8', label: 'Aportes registrados', color: 'text-[#00B140]' },
  { value: '94%', label: 'Documentos al día', color: 'text-violet-300' },
  { value: '3', label: 'Eventos próximos', color: 'text-sky-300' },
]

const profileSections = [
  { label: 'Datos personales', pct: 95, color: '#522178' },
  { label: 'Participación organizacional', pct: 80, color: '#F2780C' },
  { label: 'Documentación', pct: 92, color: '#00B140' },
  { label: 'Disponibilidad y agenda', pct: 68, color: '#6366f1' },
]

const recentActivity = [
  { color: '#522178', title: 'Actualizaste tu información personal', time: 'Hace 2 horas' },
  { color: '#F2780C', title: 'Enviada solicitud para unirte a Red Joven Mosquera', time: 'Hoy, 10:20 AM' },
  { color: '#00B140', title: 'Documento de identidad validado correctamente', time: 'Ayer' },
  { color: '#6366f1', title: 'Confirmaste asistencia al taller de liderazgo juvenil', time: 'Hace 2 días' },
]

const documents = [
  { name: 'Documento de identidad', status: 'Verificado', tone: 'text-[#00B140] bg-[#00B140]/10' },
  { name: 'Certificado de residencia', status: 'En revisión', tone: 'text-[#F2780C] bg-[#F2780C]/10' },
  { name: 'Hoja de vida juvenil', status: 'Actualizado', tone: 'text-[#522178] bg-[#522178]/10' },
]

const upcomingEvents = [
  { day: '28', month: 'MAR', title: 'Mesa de participación juvenil', meta: 'Casa de la Cultura · 4:00 PM', color: '#522178' },
  { day: '03', month: 'ABR', title: 'Taller de formulación de proyectos', meta: 'Biblioteca Municipal · 9:00 AM', color: '#F2780C' },
  { day: '09', month: 'ABR', title: 'Jornada de networking comunitario', meta: 'Parque Central · 2:00 PM', color: '#00B140' },
]

const strengths = [
  'Perfil con alta visibilidad dentro de la plataforma',
  'Documentación casi completa y con validaciones recientes',
  'Participación activa en eventos y organizaciones',
]

const membershipHighlights = [
  {
    name: 'Psicovibes',
    category: 'Salud mental',
    summary: 'Acompañamiento en iniciativas de bienestar emocional y espacios de escucha juvenil.',
    status: 'Miembro principal',
    color: 'from-[#522178] to-[#3d1958]',
  },
  {
    name: 'Fundación Ecos Colombia',
    category: 'Educación ambiental y reciclaje',
    summary: 'Participación en jornadas de reciclaje, siembra y formación ambiental en Mosquera.',
    status: 'Voluntaria activa',
    color: 'from-[#00B140] to-[#009235]',
  },
  {
    name: 'Mesa de Rock y Metal de Mosquera',
    category: 'Social',
    summary: 'Apoyo en circulación cultural, encuentros juveniles y activaciones artísticas locales.',
    status: 'Aliada cultural',
    color: 'from-[#F2780C] to-[#ff8a2a]',
  },
]

const personalInfo = [
  { label: 'Correo institucional', value: 'usuariodemo@email.com', accent: 'text-[#522178]' },
  { label: 'Telefono de contacto', value: '+57 300 123 4567', accent: 'text-[#F2780C]' },
  { label: 'Barrio / sector', value: 'Compartir', accent: 'text-[#00B140]' },
  { label: 'Rol actual', value: 'Miembro activo', accent: 'text-sky-500' },
]
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#34144d] shadow-2xl">
        <div class="h-1 flex">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>

        <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none"></div>
        <div class="absolute left-10 bottom-0 w-40 h-40 rounded-full bg-[#F2780C]/10 pointer-events-none"></div>

        <div class="relative p-6 lg:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div class="flex items-center gap-5">
              <div class="relative flex-shrink-0">
                <div class="w-24 h-24 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm p-1 shadow-xl">
                  <img
                    src="/images/organizaciones/psicovibes/Logo_Psicovibes.png"
                    alt="Avatar del usuario"
                    class="w-full h-full rounded-[20px] object-contain bg-white p-2"
                  />
                </div>
                <span class="absolute -bottom-1 -right-1 w-7 h-7 bg-[#00B140] rounded-full border-2 border-[#522178] flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>

              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h1 class="text-2xl lg:text-3xl font-black text-white tracking-tight">Usuario Demo</h1>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00B140]/20 text-[#00B140] text-[10px] font-black rounded-full border border-[#00B140]/30 uppercase tracking-wide">
                    Perfil validado
                  </span>
                </div>
                <p class="text-white/70 text-sm">
                  Liderazgo juvenil y bienestar comunitario ·
                  <span class="text-[#F2780C] font-semibold">Mosquera, Cundinamarca</span>
                </p>

                <div class="flex flex-wrap items-center gap-3 mt-3">
                  <div class="flex items-center gap-2">
                    <div class="w-32 h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-[#F2780C] to-[#fbbf24] rounded-full"
                        :style="{ width: `${profileStrength}%` }"
                      ></div>
                    </div>
                    <span class="text-white/60 text-xs">{{ profileStrength }}% perfil</span>
                  </div>
                  <span class="text-white/25">·</span>
                  <span class="text-white/60 text-xs">3 organizaciones vinculadas</span>
                  <span class="text-white/25">·</span>
                  <span class="text-white/60 text-xs">Psicovibes como organizacion principal</span>
                  <span class="text-white/25">·</span>
                  <span class="text-white/60 text-xs">Disponibilidad alta</span>
                </div>

                <div class="flex flex-wrap gap-1.5 mt-3">
                  <span
                    v-for="tag in ['Participacion', 'Liderazgo', 'Salud mental', 'Comunidad', 'Juventud']"
                    :key="tag"
                    class="px-2 py-0.5 bg-white/10 border border-white/10 text-white/70 text-[10px] rounded-lg"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <button class="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
                Editar perfil
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-[#00B140]/85 hover:bg-[#00B140] border border-[#00B140]/40 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#00B140]/20">
                Completar documentos
              </button>
              <button class="flex items-center gap-1.5 px-3 py-2 bg-[#F2780C]/85 hover:bg-[#F2780C] border border-[#F2780C]/40 text-white text-xs font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#F2780C]/20">
                Unirme a una organizacion
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
            <div v-for="stat in quickStats" :key="stat.label" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <span class="text-sm font-black" :class="stat.color">{{ stat.value }}</span>
              </div>
              <div>
                <p class="text-white/95 font-black text-base leading-none">{{ stat.value }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-3.5
               flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
               text-xs sm:text-sm"
      >
        <div class="flex items-center gap-2 text-slate-600 flex-wrap">
          <div class="w-1.5 h-1.5 rounded-full bg-[#F2780C]"></div>
          Estado del perfil: <strong class="text-slate-900 ml-1">Listo para postularse</strong>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600 flex-wrap">
          <div class="w-1.5 h-1.5 rounded-full bg-[#00B140] animate-pulse"></div>
          Visibilidad: <strong class="text-slate-900 ml-1">Alta</strong>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 text-slate-600 flex-wrap">
          Meta semanal: <strong class="text-slate-900 ml-1">{{ weeklyGoal }}% completada</strong>
        </div>
        <div class="w-px h-4 bg-slate-200 hidden sm:block"></div>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          <span class="text-rose-500 font-semibold text-xs">1 documento por revisar</span>
        </div>
      </section>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div class="xl:col-span-2 flex flex-col gap-6">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              v-for="card in metricCards"
              :key="card.label"
              class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl overflow-visible" :class="card.iconBg">
                  <svg v-if="card.icon === 'profile'" class="h-[18px] w-[18px] shrink-0" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.499-1.632Z" />
                  </svg>
                  <svg v-else-if="card.icon === 'org'" class="h-[18px] w-[18px] shrink-0" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75ZM9 21V8.25m6 12.75V8.25M7.5 6h9" />
                  </svg>
                  <svg v-else-if="card.icon === 'docs'" class="h-[18px] w-[18px] shrink-0" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375H14.25m-4.5 0H8.25m3.75 0V4.875c0-.621.504-1.125 1.125-1.125h.375c.298 0 .584.118.795.33l4.5 4.5c.211.211.33.497.33.795v4.875m-10.5 0h10.5m-10.5 0A2.25 2.25 0 0 0 6 16.5v1.125A2.25 2.25 0 0 0 8.25 19.875h7.5A2.25 2.25 0 0 0 18 17.625V16.5a2.25 2.25 0 0 0-2.25-2.25" />
                  </svg>
                  <svg v-else class="h-[18px] w-[18px] shrink-0" :class="card.iconColor" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25v10.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75Z" />
                  </svg>
                </div>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" :class="card.badgeColor">
                  {{ card.badge }}
                </span>
              </div>

              <p class="text-2xl font-black text-slate-900">{{ card.value }}</p>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 flex-1">{{ card.label }}</p>

              <button class="mt-3 w-full text-xs font-semibold rounded-lg py-1.5 transition-colors" :class="card.btnClass">
                Ver mas
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-xl bg-[#522178]/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black text-slate-900 uppercase tracking-wide">Fortaleza del perfil</h2>
                <span class="ml-auto text-xs text-slate-400">Actualizado hoy</span>
              </div>

              <div class="space-y-4">
                <div v-for="section in profileSections" :key="section.label">
                  <div class="flex items-center justify-between text-xs mb-1.5">
                    <span class="text-slate-600 font-semibold">{{ section.label }}</span>
                    <span class="text-slate-900 font-black">{{ section.pct }}%</span>
                  </div>
                  <div class="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" :style="{ width: `${section.pct}%`, background: section.color }"></div>
                  </div>
                </div>
              </div>

              <div class="mt-6 p-4 rounded-2xl bg-[#f8f5fb] border border-[#522178]/10">
                <p class="text-xs font-black uppercase tracking-wide text-[#522178] mb-3">Lo mejor de tu perfil</p>
                <ul class="space-y-2">
                  <li v-for="item in strengths" :key="item" class="flex items-start gap-2 text-sm text-slate-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00B140] mt-2 flex-shrink-0"></span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black text-slate-900 uppercase tracking-wide">Actividad reciente</h2>
              </div>

              <div class="space-y-4">
                <div v-for="activity in recentActivity" :key="activity.title" class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 mt-0.5" :style="{ background: `${activity.color}18` }">
                    <div class="w-full h-full flex items-center justify-center">
                      <span class="w-2 h-2 rounded-full" :style="{ background: activity.color }"></span>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-slate-700 leading-snug">{{ activity.title }}</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">{{ activity.time }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-gradient-to-r from-[#00B140]/10 to-[#00B140]/5 border border-[#00B140]/15 p-4">
                <p class="text-sm font-black text-slate-900">Siguiente objetivo</p>
                <p class="text-xs text-slate-600 mt-1">Sube el certificado pendiente para dejar tu perfil al 100%.</p>
                <button class="mt-4 px-4 py-2 rounded-xl bg-[#00B140] text-white text-xs font-black hover:bg-[#009235] transition-colors">
                  Completar ahora
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-8 h-8 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25h6M9 12h6m-6 3.75h3" />
                </svg>
              </div>
              <h2 class="text-sm font-black text-slate-900 uppercase tracking-wide">Organizaciones a las que pertenece</h2>
              <span class="ml-auto text-xs text-slate-400">3 vinculaciones</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <article
                v-for="item in membershipHighlights"
                :key="item.name"
                class="rounded-3xl overflow-hidden border border-slate-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div class="h-28 bg-gradient-to-br p-5 flex items-end" :class="item.color">
                  <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white font-black text-lg">
                    {{ item.name.charAt(0) }}
                  </div>
                </div>
                <div class="p-5">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h3 class="text-base font-black text-slate-900 leading-tight">{{ item.name }}</h3>
                      <p class="text-xs text-slate-500 mt-1">{{ item.category }}</p>
                    </div>
                    <span class="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                      {{ item.status }}
                    </span>
                  </div>
                  <p class="text-sm text-slate-600 mt-3 leading-relaxed">
                    {{ item.summary }}
                  </p>
                  <button class="mt-4 w-full py-2 rounded-xl text-xs font-black bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    Ver organizacion
                  </button>
                </div>
              </article>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375H14.25m-4.5 0H8.25m3.75 0V4.875c0-.621.504-1.125 1.125-1.125h.375c.298 0 .584.118.795.33l4.5 4.5c.211.211.33.497.33.795v4.875m-10.5 0h10.5" />
                  </svg>
                </div>
                <h2 class="text-sm font-black text-slate-900 uppercase tracking-wide">Documentos</h2>
                <span class="ml-auto text-xs text-slate-400">7 archivos</span>
              </div>

              <div class="space-y-3">
                <div
                  v-for="document in documents"
                  :key="document.name"
                  class="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-slate-800">{{ document.name }}</p>
                    <p class="text-xs text-slate-500">Actualizado recientemente en tu perfil</p>
                  </div>
                  <span class="text-[10px] font-black px-2 py-1 rounded-full whitespace-nowrap" :class="document.tone">
                    {{ document.status }}
                  </span>
                </div>
              </div>

              <div class="mt-5 border-2 border-dashed border-[#00B140]/25 rounded-2xl p-6 text-center bg-[#00B140]/5">
                <p class="text-sm font-bold text-slate-800">Arrastra archivos o carga nuevos soportes</p>
                <p class="text-xs text-slate-500 mt-1">PDF, JPG o PNG hasta 10 MB</p>
                <button class="mt-4 px-4 py-2 rounded-xl bg-white text-[#00B140] border border-[#00B140]/20 font-black text-xs hover:bg-[#f6fff8] transition-colors">
                  Cargar documento
                </button>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h4.5" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25A2.25 2.25 0 0 1 6 3h12a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25V5.25Z" />
                  </svg>
                </div>
                <h2 class="text-sm font-black text-slate-900 uppercase tracking-wide">Calendario</h2>
              </div>

              <div class="space-y-3">
                <div
                  v-for="event in upcomingEvents"
                  :key="event.title"
                  class="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:shadow-sm transition-all"
                >
                  <div class="w-16 h-16 rounded-2xl text-white flex flex-col items-center justify-center font-black shadow-lg flex-shrink-0" :style="{ background: event.color }">
                    <span class="text-lg leading-none">{{ event.day }}</span>
                    <span class="text-[10px] tracking-widest">{{ event.month }}</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-bold text-slate-800">{{ event.title }}</p>
                    <p class="text-xs text-slate-500 mt-1">{{ event.meta }}</p>
                  </div>
                  <button class="text-xs font-bold text-[#522178] whitespace-nowrap">Ver</button>
                </div>
              </div>

              <div class="mt-5 rounded-2xl bg-[#522178]/5 border border-[#522178]/10 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-black text-slate-900">Disponibilidad semanal</p>
                    <p class="text-xs text-slate-500 mt-1">Martes y jueves con mayor actividad</p>
                  </div>
                  <span class="text-sm font-black text-[#522178]">{{ weeklyGoal }}%</span>
                </div>
                <div class="mt-3 h-3 bg-white rounded-full overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-[#522178] to-[#7c3aed]" :style="{ width: `${weeklyGoal}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div class="relative overflow-hidden bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#34144d] px-6 py-5 pb-[22px]">
              <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(58,32,112,0.4)_0%,rgba(58,32,112,1)_100%)]"></div>
              <div class="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.06)_0%,transparent_60%)]"></div>

              <div class="relative flex items-center gap-4">
                <div class="w-[68px] h-[68px] rounded-full border-2 border-[rgba(255,255,255,0.6)] shadow-[0_0_0_3px_rgba(255,255,255,0.15)] overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src="/images/organizaciones/psicovibes/Logo_Psicovibes.png"
                    alt="Logo Psicovibes"
                    class="w-full h-full object-contain p-2"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="text-lg font-black text-white">Informacion personal</p>
                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/18 text-white border border-white/20">
                      Perfil base
                    </span>
                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-[rgba(46,168,74,0.25)] text-[#86efac] border border-[rgba(134,239,172,0.25)]">
                      Activo
                    </span>
                  </div>
                  <p class="text-sm text-white/80 mt-1">Usuario vinculado a Psicovibes y articulado con procesos juveniles del municipio.</p>
                </div>
              </div>
            </div>

            <div class="bg-[rgba(255,255,255,0.97)] backdrop-blur-[8px]">
              <div
                v-for="(item, index) in personalInfo"
                :key="item.label"
                class="group px-5 py-4 transition-colors hover:bg-[rgba(124,58,237,0.03)]"
                :class="index !== personalInfo.length - 1 ? 'border-b border-black/5' : ''"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3 min-w-0">
                    <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" :class="item.accent.replace('text', 'bg')"></div>
                    <div class="min-w-0">
                      <p class="text-[11px] font-black uppercase tracking-widest text-slate-400">{{ item.label }}</p>
                      <p class="text-sm font-bold text-slate-800 mt-1 break-words">{{ item.value }}</p>
                    </div>
                  </div>

                  <button class="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold text-[#7C3AED] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-3xl border border-[#F2780C]/15 bg-white shadow-sm">
            <div class="relative px-5 pt-5 pb-6 bg-gradient-to-r from-[#F2780C] via-[#ff8a2a] to-[#f59e0b]">
              <div class="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>

              <div class="relative flex items-start gap-3">
                <div class="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div class="pt-1">
                  <h3 class="text-sm font-black uppercase tracking-widest text-white">Unirme a una organizacion</h3>
                  <p class="text-xs text-white/90 mt-1">Busca por nombre, area o codigo de invitacion.</p>
                </div>
              </div>
            </div>

            <div class="bg-white px-5 py-5">
              <label class="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#7B7590] mb-3">Codigo o nombre</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Ej. Red Joven Mosquera"
                  class="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F2780C]/20 focus:border-[#F2780C] transition-all"
                />
              </div>

              <div class="grid grid-cols-2 gap-2 mt-4">
                <div class="rounded-[10px] border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] px-3 py-2.5">
                  <p class="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]/80">Sugerencia</p>
                  <p class="text-xs font-semibold text-[#522178] mt-1">Psicovibes</p>
                </div>
                <div class="rounded-[10px] border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] px-3 py-2.5">
                  <p class="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]/80">Categoria</p>
                  <p class="text-xs font-semibold text-[#522178] mt-1">Social / Ambiental / Cultural</p>
                </div>
              </div>

              <button class="w-full mt-4 px-4 py-3.5 bg-gradient-to-r from-[#F2780C] to-[#ff8a2a] hover:from-[#df6f08] hover:to-[#f48b1d] text-white font-black tracking-[0.02em] rounded-xl transition-all shadow-[0_4px_14px_rgba(240,124,0,0.35)] hover:scale-[1.01]">
                Buscar organizacion
              </button>

              <div class="mt-4 rounded-[10px] bg-[rgba(240,124,0,0.07)] px-4 py-3">
                <p class="text-[12px] text-[#92400e] leading-relaxed">
                  Tambien puedes ingresar con un codigo de invitacion compartido por una organizacion o una mesa juvenil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
  ============================================================
  PÁGINA: Inscripciones (panel de gestión)
  Ruta: /private/menu-dashboard/inscripciones
  ============================================================
  Vista para revisar y aprobar/rechazar solicitudes de
  inscripción a eventos, talleres, programas y convocatorias
  de la organización.

  Contiene:
  - Hero con stats (total / pendientes / aprobadas / en revisión)
    y un mini-sparkline de la semana
  - 4 cards de métricas con barras de porcentaje
  - Lista de inscripciones con filtros (search, estado, tipo)
    y acciones Aprobar/Rechazar inline
  - Sidebar derecho: tasa de aprobación, distribuciones,
    timeline de últimas recibidas, acciones rápidas

  Funciones clave:
  - approve(id): cambia el estado a 'Aprobada'
  - reject(id): cambia el estado a 'Rechazada'
  - urgency(date): calcula si la solicitud es urgente
    (hoy, hace pocos días, o vieja)

  TODO: datos hardcoded — cuando exista backend, conectar.
-->

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'dashboard' })
// Aquí pongo esta sección porque siento que sirve para ver mejor el flujo de inscripciones.
// Lo vi en esta app y en un video de YouTube, y me pareció útil.

const search      = ref('')
const filterStatus = ref('Todos')
const filterType   = ref('Todos')

const statuses = ['Todos', 'Pendiente', 'Aprobada', 'Rechazada', 'En revisión']
const types    = ['Todos', 'Evento', 'Taller', 'Programa', 'Convocatoria']

const sparkData = [5, 8, 4, 12, 7, 15, 11]
const sparkMax  = Math.max(...sparkData)

const inscriptions = ref([
  { id:47, name:'Laura Ramírez',       org:'Colectivo Arte Vivo',         type:'Taller',       item:'Taller: Manejo del estrés y autocuidado',         date:'17 Mar 2025', status:'Pendiente',   avatar:'LR', avatarBg:'bg-[#522178]' },
  { id:46, name:'Carlos Herrera',      org:'IED Simón Bolívar',           type:'Evento',        item:'Feria Cultural Mosquera',                          date:'16 Mar 2025', status:'Aprobada',    avatar:'CH', avatarBg:'bg-[#00B140]' },
  { id:45, name:'Sofía Morales',       org:'Fundación Raíces Jóvenes',    type:'Programa',      item:'Programa de liderazgo juvenil',                    date:'15 Mar 2025', status:'En revisión', avatar:'SM', avatarBg:'bg-indigo-500' },
  { id:44, name:'Andrés Castillo',     org:'Empresa NovaTech',            type:'Taller',        item:'Capacitación en bienestar emocional',              date:'14 Mar 2025', status:'Aprobada',    avatar:'AC', avatarBg:'bg-[#522178]' },
  { id:43, name:'Valentina Cruz',      org:'Colectivo Sentir para Sanar', type:'Convocatoria',  item:'Convocatoria: Promotores de salud mental',         date:'13 Mar 2025', status:'Rechazada',   avatar:'VC', avatarBg:'bg-rose-400'  },
  { id:42, name:'Julián Ospina',       org:'Constructora Horizonte',      type:'Taller',        item:'Taller de comunicación asertiva',                  date:'12 Mar 2025', status:'Pendiente',   avatar:'JO', avatarBg:'bg-[#F2780C]' },
  { id:41, name:'María Fernanda López',org:'Colegio Horizontes',          type:'Evento',        item:'Jornada comunitaria de salud mental',              date:'11 Mar 2025', status:'Aprobada',    avatar:'ML', avatarBg:'bg-sky-500'   },
  { id:40, name:'Diego Vargas',        org:'Colectivo Arte Vivo',         type:'Programa',      item:'Programa de bienestar organizacional',             date:'10 Mar 2025', status:'En revisión', avatar:'DV', avatarBg:'bg-violet-500' },
])

const statusMeta = {
  'Pendiente':   { cls:'text-[#F2780C] bg-[#F2780C]/10 border border-[#F2780C]/20', dot:'bg-[#F2780C]', stripe:'bg-[#F2780C]'  },
  'Aprobada':    { cls:'text-[#00B140] bg-[#00B140]/10 border border-[#00B140]/20', dot:'bg-[#00B140]', stripe:'bg-[#00B140]'  },
  'Rechazada':   { cls:'text-rose-500 bg-rose-50 border border-rose-200',            dot:'bg-rose-400',  stripe:'bg-rose-400'   },
  'En revisión': { cls:'text-indigo-500 bg-indigo-50 border border-indigo-200',      dot:'bg-indigo-400',stripe:'bg-indigo-400' },
}

const typeMeta = {
  'Evento':       { color:'text-[#522178]', bg:'bg-[#522178]/10' },
  'Taller':       { color:'text-[#F2780C]', bg:'bg-[#F2780C]/10' },
  'Programa':     { color:'text-[#00B140]', bg:'bg-[#00B140]/10' },
  'Convocatoria': { color:'text-indigo-500', bg:'bg-indigo-50'   },
}

const filtered = computed(() => inscriptions.value.filter(i => {
  const q = search.value.toLowerCase()
  return (
    (!q || i.name.toLowerCase().includes(q) || i.item.toLowerCase().includes(q) || i.org.toLowerCase().includes(q)) &&
    (filterStatus.value === 'Todos' || i.status === filterStatus.value) &&
    (filterType.value   === 'Todos' || i.type   === filterType.value)
  )
}))

const pending  = computed(() => inscriptions.value.filter(i => i.status === 'Pendiente').length)
const approved = computed(() => inscriptions.value.filter(i => i.status === 'Aprobada').length)
const rejected = computed(() => inscriptions.value.filter(i => i.status === 'Rechazada').length)
const inReview = computed(() => inscriptions.value.filter(i => i.status === 'En revisión').length)

const approvalRate = computed(() => Math.round((approved.value / inscriptions.value.length) * 100))

const sparkDays = ['L','M','X','J','V','S','D']

function approve(id) {
  const i = inscriptions.value.find(x => x.id === id)
  if (i) i.status = 'Aprobada'
}
function reject(id) {
  const i = inscriptions.value.find(x => x.id === id)
  if (i) i.status = 'Rechazada'
}

function urgency(date) {
  const d = new Date(date.split(' ').reverse().join(' '))
  const diff = Math.round((Date.now() - d) / 86400000)
  if (diff <= 1) return { label: 'hoy', cls: 'text-rose-500 bg-rose-50' }
  if (diff <= 3) return { label: `hace ${diff}d`, cls: 'text-[#F2780C] bg-[#F2780C]/10' }
  return { label: `hace ${diff}d`, cls: 'text-slate-400 bg-slate-100' }
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">

      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] shadow-2xl">
        <div class="h-1 flex">
          <div class="flex-1 bg-[#00B140]"></div>
          <div class="flex-1 bg-[#F2780C]"></div>
          <div class="flex-1 bg-[#7c3aed]"></div>
        </div>
        <div class="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/4 pointer-events-none"></div>
        <div class="absolute right-24 bottom-0 w-48 h-48 rounded-full bg-[#F2780C]/8 pointer-events-none"></div>

        <div class="relative p-6 lg:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <h1 class="text-2xl lg:text-3xl font-black text-white tracking-tight">Inscripciones</h1>
                <span v-if="pending > 0"
                  class="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F2780C] text-white text-xs font-black rounded-full shadow-lg shadow-[#F2780C]/30 animate-pulse">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ pending }} pendientes
                </span>
              </div>
              <p class="text-white/55 text-sm max-w-xl">
                Gestiona y revisa todas las solicitudes de inscripción a eventos, talleres, programas y convocatorias.
              </p>
              <div class="flex flex-wrap gap-1.5 mt-4">
                <span v-for="tag in ['Eventos','Talleres','Programas','Convocatorias','Aprobaciones']" :key="tag"
                  class="px-2 py-0.5 bg-white/8 border border-white/10 text-white/50 text-[10px] rounded-lg">{{ tag }}</span>
              </div>
            </div>

            <div class="flex-shrink-0 bg-white/8 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[200px]">
              <p class="text-white/50 text-[10px] uppercase tracking-widest mb-1">Esta semana</p>
              <p class="text-white font-black text-2xl leading-none mb-3">
                {{ sparkData.reduce((a,b)=>a+b,0) }}
                <span class="text-[#00B140] text-xs font-bold ml-1">↑ 18%</span>
              </p>
              <!-- sparkline bars -->
              <div class="flex items-end gap-1 h-10">
                <div v-for="(v, i) in sparkData" :key="i" class="flex flex-col items-center gap-0.5 flex-1">
                  <div
                    class="w-full rounded-sm transition-all hover:opacity-80"
                    :style="{
                      height: Math.max(4, Math.round((v / sparkMax) * 32)) + 'px',
                      background: i === sparkData.length - 1 ? '#F2780C' : 'rgba(255,255,255,0.25)'
                    }"
                  ></div>
                  <span class="text-white/30 text-[8px]">{{ sparkDays[i] }}</span>
                </div>
              </div>
            </div>
          </div>


          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
            <div v-for="stat in [
              { value: inscriptions.length, label:'Total',       color:'text-white/80',   icon:'list'  },
              { value: pending,             label:'Pendientes',  color:'text-[#F2780C]',  icon:'clock' },
              { value: approved,            label:'Aprobadas',   color:'text-[#00B140]',  icon:'check' },
              { value: inReview,            label:'En revisión', color:'text-violet-300', icon:'eye'   },
            ]" :key="stat.label" class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg v-if="stat.icon==='list'" class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                <svg v-else-if="stat.icon==='clock'" class="w-4 h-4 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <svg v-else-if="stat.icon==='check'" class="w-4 h-4 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <svg v-else class="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <div>
                <p class="font-black text-xl leading-none text-white" :class="stat.color">{{ stat.value }}</p>
                <p class="text-white/50 text-[10px] uppercase tracking-wide mt-0.5">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">


        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#522178]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <span class="text-[10px] font-bold text-[#522178] bg-[#522178]/10 px-1.5 py-0.5 rounded-full">total</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ inscriptions.length }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Inscripciones</p>
          <!-- mini progress bar: aprobadas vs total -->
          <div class="mt-3">
            <div class="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Tasa de aprobación</span>
              <span class="font-bold text-[#00B140]">{{ approvalRate }}%</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#00B140] rounded-full transition-all duration-700" :style="{ width: approvalRate + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="text-[10px] font-bold text-[#F2780C] bg-[#F2780C]/10 px-1.5 py-0.5 rounded-full animate-pulse">urgente</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ pending }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Pendientes</p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Del total</span>
              <span class="font-bold text-[#F2780C]">{{ Math.round((pending/inscriptions.length)*100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#F2780C] rounded-full transition-all duration-700" :style="{ width: Math.round((pending/inscriptions.length)*100) + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="text-[10px] font-bold text-[#00B140] bg-[#00B140]/10 px-1.5 py-0.5 rounded-full">✓ ok</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ approved }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Aprobadas</p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Del total</span>
              <span class="font-bold text-[#00B140]">{{ Math.round((approved/inscriptions.length)*100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-[#00B140] rounded-full transition-all duration-700" :style="{ width: Math.round((approved/inscriptions.length)*100) + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>
            <span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full">revisar</span>
          </div>
          <p class="text-3xl font-black text-slate-900">{{ inReview }}</p>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">En revisión</p>
          <div class="mt-3">
            <div class="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Del total</span>
              <span class="font-bold text-indigo-500">{{ Math.round((inReview/inscriptions.length)*100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-400 rounded-full transition-all duration-700" :style="{ width: Math.round((inReview/inscriptions.length)*100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        <div class="xl:col-span-2 flex flex-col gap-5">

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input v-model="search" type="text" placeholder="Buscar por persona, evento u organización..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#522178]/20 focus:border-[#522178]/40 bg-slate-50 placeholder:text-slate-400"/>
            </div>
            <select v-model="filterStatus"
              class="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#522178]/20 text-slate-600 cursor-pointer">
              <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
            <select v-model="filterType"
              class="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#522178]/20 text-slate-600 cursor-pointer">
              <option v-for="t in types" :key="t">{{ t }}</option>
            </select>
            <!-- result count -->
            <div class="flex items-center gap-1.5 text-xs text-slate-400 flex-shrink-0 px-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              <span class="font-bold text-slate-600">{{ filtered.length }}</span> resultado{{ filtered.length !== 1 ? 's' : '' }}
            </div>
          </div>

          <div v-if="pending > 0 && filterStatus === 'Todos'"
            class="bg-[#F2780C]/8 border border-[#F2780C]/20 rounded-2xl p-4 flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[#F2780C]/15 flex items-center justify-center flex-shrink-0">
              <svg class="w-4.5 h-4.5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-black text-[#F2780C]">{{ pending }} solicitud{{ pending > 1 ? 'es' : '' }} pendiente{{ pending > 1 ? 's' : '' }} de revisión</p>
              <p class="text-xs text-[#F2780C]/70">Revísalas pronto para no dejar esperando a los participantes.</p>
            </div>
            <button @click="filterStatus = 'Pendiente'"
              class="text-xs font-bold text-white bg-[#F2780C] hover:bg-[#F2780C]/90 px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
              Ver ahora →
            </button>
          </div>

          <div v-if="filtered.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <p class="text-sm font-black text-slate-500">Sin resultados</p>
            <p class="text-xs text-slate-400 mt-1">Cambia los filtros para ver más inscripciones</p>
            <button @click="search=''; filterStatus='Todos'; filterType='Todos'"
              class="mt-3 text-xs font-bold text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20 px-3 py-1.5 rounded-xl transition-colors">
              Limpiar filtros
            </button>
          </div>

          <div v-for="ins in filtered" :key="ins.id"
            class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">

            <div class="h-1 rounded-t-2xl" :class="statusMeta[ins.status]?.stripe"></div>

            <div class="p-5">
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                <div class="flex items-start gap-3 flex-1 min-w-0">
                  <div class="relative flex-shrink-0">
                    <div class="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm" :class="ins.avatarBg">
                      {{ ins.avatar }}
                    </div>

                    <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" :class="statusMeta[ins.status]?.dot"></span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap mb-0.5">
                      <p class="text-sm font-black text-slate-900 group-hover:text-[#522178] transition-colors">{{ ins.name }}</p>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="[typeMeta[ins.type]?.bg, typeMeta[ins.type]?.color]">
                        {{ ins.type }}
                      </span>

                      <span v-if="ins.status === 'Pendiente'"
                        class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" :class="urgency(ins.date).cls">
                        {{ urgency(ins.date).label }}
                      </span>
                    </div>
                    <p class="text-xs font-semibold text-slate-700 truncate">{{ ins.item }}</p>
                    <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span class="text-[10px] text-slate-400">{{ ins.org }}</span>
                      <span class="text-slate-200">·</span>
                      <span class="text-[10px] text-slate-400">{{ ins.date }}</span>
                      <span class="text-slate-200">·</span>
                      <span class="text-[10px] text-slate-400">#{{ ins.id }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0 flex-wrap sm:flex-nowrap self-start sm:self-center">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" :class="statusMeta[ins.status]?.cls">
                    <span class="w-1.5 h-1.5 rounded-full" :class="statusMeta[ins.status]?.dot"></span>
                    {{ ins.status }}
                  </span>

                  <template v-if="ins.status === 'Pendiente' || ins.status === 'En revisión'">
                    <button @click="approve(ins.id)"
                      class="flex items-center gap-1 px-3 py-1.5 bg-[#00B140]/10 hover:bg-[#00B140] hover:text-white text-[#00B140] text-xs font-bold rounded-xl transition-all duration-200 group/btn">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                      Aprobar
                    </button>
                    <button @click="reject(ins.id)"
                      class="flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 text-xs font-bold rounded-xl transition-all duration-200">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                      Rechazar
                    </button>
                  </template>

                  <button class="p-2 text-slate-300 hover:text-[#522178] hover:bg-[#522178]/8 rounded-xl transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filterStatus !== 'Todos' || filterType !== 'Todos' || search" class="text-center">
            <button @click="search=''; filterStatus='Todos'; filterType='Todos'"
              class="text-xs text-slate-400 hover:text-[#522178] transition-colors underline underline-offset-2">
              Limpiar todos los filtros
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-5 xl:sticky xl:top-6">

          <div class="bg-gradient-to-br from-[#522178] to-[#3d1958] rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none"></div>
            <p class="text-white/60 text-[10px] uppercase tracking-widest mb-1">Tasa de aprobación</p>
            <p class="text-4xl font-black text-white mb-2">{{ approvalRate }}<span class="text-xl text-white/60">%</span></p>
            <div class="h-2 bg-white/15 rounded-full overflow-hidden">
              <div class="h-full bg-[#00B140] rounded-full transition-all duration-700" :style="{ width: approvalRate + '%' }"></div>
            </div>
            <p class="text-white/50 text-xs mt-2">{{ approved }} aprobadas de {{ inscriptions.length }} totales</p>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-7 h-7 rounded-xl bg-[#522178]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#522178]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Por estado</h3>
            </div>
            <div class="space-y-3.5">
              <div v-for="st in [
                { label:'Pendientes',  count:pending,  pct:Math.round((pending /inscriptions.length)*100), color:'#F2780C' },
                { label:'Aprobadas',   count:approved, pct:Math.round((approved/inscriptions.length)*100), color:'#00B140' },
                { label:'En revisión', count:inReview, pct:Math.round((inReview/inscriptions.length)*100), color:'#6366f1' },
                { label:'Rechazadas',  count:rejected, pct:Math.round((rejected/inscriptions.length)*100), color:'#f43f5e' },
              ]" :key="st.label">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full" :style="{ background: st.color }"></span>
                    <span class="text-xs font-semibold text-slate-600">{{ st.label }}</span>
                  </div>
                  <span class="text-xs font-black text-slate-700">
                    {{ st.count }} <span class="text-slate-400 font-normal text-[10px]">({{ st.pct }}%)</span>
                  </span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700" :style="{ width: st.pct + '%', background: st.color }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#F2780C]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Por tipo</h3>
            </div>

            <div class="space-y-2.5">
              <div v-for="tp in [
                { label:'Talleres',      count:inscriptions.filter(i=>i.type==='Taller').length,      color:'#F2780C' },
                { label:'Eventos',       count:inscriptions.filter(i=>i.type==='Evento').length,       color:'#522178' },
                { label:'Programas',     count:inscriptions.filter(i=>i.type==='Programa').length,     color:'#00B140' },
                { label:'Convocatorias', count:inscriptions.filter(i=>i.type==='Convocatoria').length, color:'#6366f1' },
              ]" :key="tp.label" class="flex items-center gap-3">
                <span class="text-xs text-slate-600 w-24 flex-shrink-0">{{ tp.label }}</span>
                <div class="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500"
                    :style="{ width: Math.round((tp.count / inscriptions.length) * 100) + '%', background: tp.color }"></div>
                </div>
                <span class="text-xs font-black text-slate-700 w-4 text-right">{{ tp.count }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Últimas recibidas</h3>
            </div>

            <div class="relative">

              <div class="absolute left-3 top-1 bottom-1 w-px bg-slate-100"></div>
              <div class="space-y-3 pl-8">
                <div v-for="ins in inscriptions.slice(0,5)" :key="'t'+ins.id" class="relative">

                  <div class="absolute -left-5 top-1 w-2 h-2 rounded-full border-2 border-white" :class="statusMeta[ins.status]?.dot"></div>
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-800 truncate">{{ ins.name }}</p>
                      <p class="text-[10px] text-slate-400 truncate">{{ ins.item }}</p>
                    </div>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" :class="statusMeta[ins.status]?.cls">
                      {{ ins.status === 'En revisión' ? 'Revisión' : ins.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-xl bg-[#00B140]/10 flex items-center justify-center">
                <svg class="w-3.5 h-3.5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest">Acciones</h3>
            </div>
            <ul class="space-y-0.5">
              <li v-for="action in [
                { label:'Aprobar todas las pendientes',  cls:'text-[#00B140] bg-[#00B140]/10 hover:bg-[#00B140]/20' },
                { label:'Exportar listado completo',     cls:'text-[#522178] bg-[#522178]/10 hover:bg-[#522178]/20' },
                { label:'Enviar confirmaciones masivas', cls:'text-sky-500 bg-sky-50 hover:bg-sky-100'              },
                { label:'Crear nueva convocatoria',      cls:'text-[#F2780C] bg-[#F2780C]/10 hover:bg-[#F2780C]/20' },
                { label:'Ver estadísticas detalladas',   cls:'text-indigo-500 bg-indigo-50 hover:bg-indigo-100'     },
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
</style>

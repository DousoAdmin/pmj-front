<!--
  ============================================================
  COMPONENTE: NewsHero
  ============================================================
  Es la tarjeta morada destacada del sidebar izquierdo en la
  página de Noticias. SOLO se muestra en desktop (en mobile
  está reemplazado por un strip compacto en noticias.vue).

  Contiene:
  - Icono con indicador verde pulsante "En vivo"
  - Título "Noticias" + subtítulo "Curaduría editorial"
  - Descripción
  - Chip "Actualizado hace X" (si hubo refresh manual)
  - Lista vertical de temas seleccionables (chips)
  - Botón gigante "Actualizar feed" con feedback de éxito
  - 4 stat cards (Resultados API / Visibles / Fuentes / Con imagen)

  Props que recibe del padre (noticias.vue):
  - totalResults, visibleCount, sourcesCount, withImageCount: stats
  - currentTopic: tema activo
  - isRefreshing: si está cargando
  - refreshSuccess: si acaba de actualizarse OK (muestra check verde)
  - lastRefreshedAt: timestamp del último refresh

  Eventos que emite:
  - 'refresh': cuando el usuario aprieta "Actualizar feed"
  - 'set-topic': cuando el usuario elige un tema (envía el value)
-->

<template>
  <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] shadow-2xl shadow-[#522178]/25">
    <div class="h-1 flex">
      <div class="flex-1 bg-[#00B140]"></div>
      <div class="flex-1 bg-[#F2780C]"></div>
      <div class="flex-1 bg-[#7c3aed]"></div>
    </div>

    <div class="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#F2780C]/[0.07] blur-3xl pointer-events-none"></div>
    <div class="absolute -left-20 bottom-0 w-56 h-56 rounded-full bg-[#7c3aed]/[0.10] blur-3xl pointer-events-none"></div>
    <div
      class="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
      style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 16px 16px;"
    ></div>

    <div class="relative p-5">
      <div class="flex items-start justify-between gap-3 mb-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="relative shrink-0">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/15 flex items-center justify-center backdrop-blur-sm shadow-xl">
              <svg class="w-5 h-5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
              <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00B140] border-2 border-[#3d1958]"></span>
            </span>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl xl:text-2xl font-black text-white tracking-tight leading-none">Noticias</h1>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="text-[9px] font-black uppercase tracking-[0.18em] text-[#00B140]">En vivo</span>
              <span class="text-white/20">·</span>
              <span class="text-[9px] text-white/55 font-medium uppercase tracking-widest">Curaduría editorial</span>
            </div>
          </div>
        </div>
      </div>

      <p class="text-white/60 text-[11px] leading-relaxed mb-3">
        Monitorea titulares y artículos relevantes para publicar contenido estratégico.
      </p>

      <div
        v-if="lastRefreshedAt"
        class="flex items-center gap-1.5 mb-4 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] font-medium text-white/70 w-fit"
      >
        <svg class="w-3 h-3 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Actualizado <span class="text-white/90 font-bold">{{ lastRefreshedLabel }}</span>
      </div>

      <div class="space-y-1.5 mb-4">
        <button
          v-for="t in topicList"
          :key="t.value"
          class="w-full group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer"
          :class="currentTopic === t.value
            ? 'bg-white border-white shadow-lg shadow-black/20'
            : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.09] hover:border-white/20 hover:translate-x-0.5'"
          @click="$emit('set-topic', t.value)"
        >
          <span class="flex items-center gap-2.5 min-w-0">
            <span
              class="w-2 h-2 rounded-full shrink-0 transition-all"
              :class="currentTopic === t.value ? t.activeDot : 'bg-white/25 group-hover:bg-white/55'"
            ></span>
            <span
              class="text-[11px] font-bold tracking-tight truncate"
              :class="currentTopic === t.value ? 'text-[#522178]' : 'text-white/85'"
            >
              {{ t.label }}
            </span>
          </span>
          <svg
            v-if="currentTopic === t.value"
            class="w-3.5 h-3.5 text-[#00B140] shrink-0"
            fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else
            class="w-3 h-3 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <button
        class="relative w-full inline-flex items-center justify-center gap-2 px-4 py-3 border text-white text-[11px] font-black uppercase tracking-[0.18em] rounded-xl transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
        :class="refreshSuccess
          ? 'bg-gradient-to-br from-[#00C34A] to-[#009235] border-[#00B140]/50 shadow-[#00B140]/40'
          : 'bg-gradient-to-br from-[#00B140] to-[#009235] hover:from-[#00C34A] hover:to-[#00A33A] border-[#00B140]/40 shadow-[#00B140]/30'"
        :disabled="isRefreshing"
        @click="$emit('refresh')"
      >
        <span
          v-if="refreshSuccess"
          class="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"
        ></span>
        <template v-if="refreshSuccess">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="relative">Feed actualizado</span>
        </template>
        <template v-else>
          <svg
            class="w-4 h-4 transition-transform duration-500"
            :class="isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.09 19A9 9 0 0020 12m-16 0a9 9 0 0114.91-7" />
          </svg>
          <span class="relative">{{ isRefreshing ? 'Actualizando...' : 'Actualizar feed' }}</span>
        </template>
      </button>

      <div class="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10">
        <div class="rounded-2xl bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/10 p-3 hover:from-white/[0.14] hover:to-white/[0.06] transition-all">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="w-7 h-7 rounded-lg bg-[#F2780C]/15 border border-[#F2780C]/25 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <span class="text-white font-black text-lg leading-none tabular-nums">{{ totalResults }}</span>
          </div>
          <p class="text-white/55 text-[8.5px] uppercase tracking-[0.18em] font-black">Resultados API</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/10 p-3 hover:from-white/[0.14] hover:to-white/[0.06] transition-all">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="w-7 h-7 rounded-lg bg-[#00B140]/15 border border-[#00B140]/25 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-[#00B140]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <span class="text-white font-black text-lg leading-none tabular-nums">{{ visibleCount }}</span>
          </div>
          <p class="text-white/55 text-[8.5px] uppercase tracking-[0.18em] font-black">Visibles</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/10 p-3 hover:from-white/[0.14] hover:to-white/[0.06] transition-all">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="w-7 h-7 rounded-lg bg-violet-400/15 border border-violet-400/25 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-violet-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h-2v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H5v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span class="text-white font-black text-lg leading-none tabular-nums">{{ sourcesCount }}</span>
          </div>
          <p class="text-white/55 text-[8.5px] uppercase tracking-[0.18em] font-black">Fuentes</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/10 p-3 hover:from-white/[0.14] hover:to-white/[0.06] transition-all">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-white font-black text-lg leading-none tabular-nums">{{ withImageCount }}</span>
          </div>
          <p class="text-white/55 text-[8.5px] uppercase tracking-[0.18em] font-black">Con imagen</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  totalResults: { type: Number, default: 0 },
  visibleCount: { type: Number, default: 0 },
  sourcesCount: { type: Number, default: 0 },
  withImageCount: { type: Number, default: 0 },
  currentTopic: { type: String, default: '' },
  isRefreshing: { type: Boolean, default: false },
  refreshSuccess: { type: Boolean, default: false },
  lastRefreshedAt: { type: Number, default: null },
})

defineEmits(['refresh', 'set-topic'])

const topicList = [
  { value: '', label: 'Todas las noticias', activeDot: 'bg-slate-700' },
  { value: 'salud mental', label: 'Salud mental', activeDot: 'bg-[#522178]' },
  { value: 'bienestar emocional', label: 'Bienestar emocional', activeDot: 'bg-[#00B140]' },
  { value: 'psicología comunitaria', label: 'Psicología comunitaria', activeDot: 'bg-[#F2780C]' },
]

const now = ref(Date.now())
let tickInterval = null

onMounted(() => {
  tickInterval = setInterval(() => {
    now.value = Date.now()
  }, 15000)
})

onBeforeUnmount(() => {
  if (tickInterval) clearInterval(tickInterval)
})

const lastRefreshedLabel = computed(() => {
  if (!props.lastRefreshedAt) return ''
  const diff = (now.value - props.lastRefreshedAt) / 1000
  if (diff < 5) return 'ahora mismo'
  if (diff < 60) return `hace ${Math.floor(diff)} s`
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`
  return `hace ${Math.floor(diff / 3600)} h`
})
</script>

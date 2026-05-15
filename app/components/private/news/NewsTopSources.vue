<!--
  ============================================================
  COMPONENTE: NewsTopSources
  ============================================================
  Es la tarjeta blanca "Top fuentes" que aparece en el sidebar
  izquierdo (solo desktop) y muestra las 5 fuentes con más
  artículos del feed actual.

  Cómo funciona:
  - Recibe la lista de artículos (filteredArticles) como prop
  - Agrupa los artículos por source.name y cuenta cuántos hay
    de cada fuente
  - Ordena de mayor a menor y se queda con los 5 primeros
  - Para cada fuente muestra: ranking (1-5), nombre, cantidad,
    porcentaje, y una barra de progreso con gradiente

  Si no hay artículos muestra un estado vacío.

  Props:
  - articles: arreglo de artículos del feed

  No emite eventos.
-->

<template>
  <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-1.5">
        <svg class="w-3 h-3 text-[#F2780C]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M3 17h12M3 17l-1 3h13l1-3M9 7a3 3 0 116 0 3 3 0 01-6 0zm12 4v6m0 0v3m0-3h-3m3 0h3" />
        </svg>
        Top fuentes
      </h3>
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest tabular-nums">
        {{ totalArticles }} notas
      </span>
    </div>

    <div v-if="topSources.length === 0" class="py-6 text-center">
      <div class="w-10 h-10 mx-auto mb-2 rounded-2xl bg-slate-100 flex items-center justify-center">
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p class="text-[11px] font-bold text-slate-500">Sin fuentes</p>
      <p class="text-[10px] text-slate-400 mt-0.5">Actualiza para cargar el feed.</p>
    </div>

    <ul v-else class="space-y-3">
      <li
        v-for="(source, i) in topSources"
        :key="source.name"
        class="group"
      >
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black shrink-0"
              :class="accentBgs[i % accentBgs.length]"
            >
              {{ i + 1 }}
            </span>
            <p class="text-[11px] font-bold text-slate-800 truncate group-hover:text-[#522178] transition-colors">
              {{ source.name }}
            </p>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="text-[10px] font-black text-slate-700 tabular-nums">{{ source.count }}</span>
            <span class="text-[9px] text-slate-400 font-bold tabular-nums">
              {{ Math.round((source.count / totalArticles) * 100) }}%
            </span>
          </div>
        </div>
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700"
            :class="accentBars[i % accentBars.length]"
            :style="{ width: (source.count / maxCount) * 100 + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  articles: { type: Array, default: () => [] },
})

const accentBgs = [
  'bg-[#522178]/10 text-[#522178]',
  'bg-[#F2780C]/10 text-[#F2780C]',
  'bg-[#00B140]/10 text-[#00B140]',
  'bg-indigo-100 text-indigo-600',
  'bg-sky-100 text-sky-600',
]

const accentBars = [
  'bg-gradient-to-r from-[#522178] to-[#7c3aed]',
  'bg-gradient-to-r from-[#F2780C] to-[#fbbf24]',
  'bg-gradient-to-r from-[#00B140] to-[#34d399]',
  'bg-gradient-to-r from-indigo-500 to-indigo-300',
  'bg-gradient-to-r from-sky-500 to-sky-300',
]

const totalArticles = computed(() => props.articles.length)

const topSources = computed(() => {
  const map = new Map()
  for (const article of props.articles || []) {
    const name = article?.source?.name || 'Desconocida'
    map.set(name, (map.get(name) || 0) + 1)
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const maxCount = computed(() =>
  topSources.value.length > 0 ? Math.max(...topSources.value.map((s) => s.count)) : 1,
)
</script>

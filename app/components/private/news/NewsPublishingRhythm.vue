<!--
  ============================================================
  COMPONENTE: NewsPublishingRhythm
  ============================================================
  Es la tarjeta "Ritmo de publicación" del sidebar (solo desktop).
  Muestra un gráfico de barras de los últimos 7 días con la
  cantidad de notas publicadas cada día, más una observación
  inteligente debajo.

  Cómo funciona:
  - Crea 7 "buckets" (uno por día, de hace 6 días a hoy)
  - Recorre los artículos y los pone en el bucket de su fecha
  - El día actual se pinta en naranja (resaltado)
  - Los otros días en gradiente morado-violeta
  - Calcula la tendencia comparando la primera mitad de la
    semana con la segunda mitad (↑/↓ con porcentaje)
  - Genera un insight automático: pico de la semana, hoy vs
    promedio, o "estable" si no hay variación notable

  Props:
  - articles: arreglo de artículos del feed

  No emite eventos.
-->

<template>
  <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-1.5">
          <svg class="w-3 h-3 text-[#522178]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 17l6-6 4 4 8-8M17 7h4v4" />
          </svg>
          Ritmo de publicación
        </h3>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
          7 días
        </span>
      </div>

      <div class="flex items-baseline gap-2 mb-4">
        <p class="text-2xl font-black tabular-nums text-slate-900">{{ totalLast7 }}</p>
        <span class="text-[10px] font-bold text-slate-500 leading-tight">
          notas en el rango
        </span>
        <span
          v-if="trendLabel"
          class="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
          :class="trendPositive ? 'bg-[#00B140]/10 text-[#00B140]' : 'bg-rose-50 text-rose-500'"
        >
          {{ trendPositive ? '↑' : '↓' }} {{ trendLabel }}
        </span>
      </div>

      <div class="flex items-end gap-1.5 h-20">
        <div
          v-for="day in last7Days"
          :key="day.key"
          class="flex-1 flex flex-col items-center gap-1.5 group"
        >
          <div class="w-full flex items-end justify-center h-12 relative">
            <span
              v-if="day.count > 0"
              class="absolute -top-4 text-[8px] font-black text-slate-500 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ day.count }}
            </span>
            <div
              class="w-full rounded-md transition-all duration-500"
              :class="day.isToday
                ? 'bg-gradient-to-t from-[#F2780C] to-[#fbbf24] shadow-md shadow-[#F2780C]/30'
                : 'bg-gradient-to-t from-[#522178]/60 to-[#7c3aed]/40 hover:from-[#522178] hover:to-[#7c3aed]'"
              :style="{ height: Math.max(6, Math.round((day.count / maxCount) * 48)) + 'px' }"
            ></div>
          </div>
          <span
            class="text-[8px] font-black uppercase tracking-wide"
            :class="day.isToday ? 'text-[#F2780C]' : 'text-slate-400'"
          >
            {{ day.label }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-[#522178]/[0.06] via-[#7c3aed]/[0.06] to-[#F2780C]/[0.08] px-4 py-2.5 border-t border-slate-100 flex items-start gap-2">
      <svg class="w-3 h-3 text-[#F2780C] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
      </svg>
      <p class="text-[10px] font-bold text-slate-700 leading-snug">{{ insight }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  articles: { type: Array, default: () => [] },
})

const dayLabels = ['D', 'L', 'M', 'X', 'J', 'V', 'S']

const last7Days = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const buckets = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    buckets.push({
      key: d.toISOString().slice(0, 10),
      date: d,
      count: 0,
      label: dayLabels[d.getDay()],
      isToday: i === 0,
    })
  }

  for (const article of props.articles || []) {
    if (!article?.publishedAt) continue
    const articleDate = new Date(article.publishedAt)
    articleDate.setHours(0, 0, 0, 0)
    const key = articleDate.toISOString().slice(0, 10)
    const bucket = buckets.find((b) => b.key === key)
    if (bucket) bucket.count++
  }

  return buckets
})

const maxCount = computed(() => {
  const max = Math.max(...last7Days.value.map((d) => d.count))
  return max > 0 ? max : 1
})

const totalLast7 = computed(() => last7Days.value.reduce((sum, d) => sum + d.count, 0))

const trend = computed(() => {
  const firstHalf = last7Days.value.slice(0, 3).reduce((s, d) => s + d.count, 0)
  const secondHalf = last7Days.value.slice(4).reduce((s, d) => s + d.count, 0)
  if (firstHalf === 0 && secondHalf === 0) return 0
  if (firstHalf === 0) return 100
  return Math.round(((secondHalf - firstHalf) / firstHalf) * 100)
})

const trendPositive = computed(() => trend.value >= 0)
const trendLabel = computed(() => {
  if (totalLast7.value === 0) return ''
  return `${Math.abs(trend.value)}%`
})

const insight = computed(() => {
  if (totalLast7.value === 0) return 'Sin actividad reciente. Actualiza el feed para cargar datos.'

  const peak = last7Days.value.reduce((acc, d) => (d.count > acc.count ? d : acc), last7Days.value[0])
  const today = last7Days.value[last7Days.value.length - 1]
  const avg = totalLast7.value / 7

  if (today.count > avg) {
    return `Hoy supera el promedio del rango (${today.count} vs ${avg.toFixed(1)}).`
  }
  if (peak.count > 0) {
    const peakDayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][peak.date.getDay()]
    return `Pico el ${peakDayName.toLowerCase()} con ${peak.count} ${peak.count === 1 ? 'nota' : 'notas'}.`
  }
  return 'Distribución estable durante la semana.'
})
</script>

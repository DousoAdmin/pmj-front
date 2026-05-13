<!--
  ============================================================
  COMPONENTE: NewsFilters
  ============================================================
  Es la barra blanca con el buscador + selector de orden que
  aparece arriba de la grilla de noticias.

  Contiene:
  - Input de búsqueda con icono lupa y botón X (cuando hay texto)
  - Selector "Más recientes / populares / relevantes" (usa BaseSelect)
  - SOLO EN DESKTOP: texto de ayuda + badge "Feed en vivo"
    (en mobile estos se ocultan para ahorrar espacio)

  Props:
  - search: texto actual del buscador (v-model bidireccional)
  - sortBy: criterio actual de orden (v-model bidireccional)
  - sortOptions: arreglo con las opciones del selector

  Eventos:
  - 'update:search': cuando el usuario escribe → bubble al padre
  - 'update:sortBy': cuando elige otra opción de orden
-->

<template>
  <div class="bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm p-2.5 lg:p-3 lg:space-y-3">
    <div class="flex flex-row gap-2">
      <div class="relative flex-1 group">
        <svg
          class="absolute left-3 lg:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#522178] transition-colors"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          :value="search"
          type="text"
          placeholder="Buscar..."
          class="w-full pl-9 lg:pl-10 pr-9 py-2.5 lg:py-3 text-sm font-medium border border-slate-200 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#522178]/20 focus:border-[#522178]/40 bg-slate-50 focus:bg-white transition-all placeholder:text-slate-400"
          @input="$emit('update:search', $event.target.value)"
        />
        <button
          v-if="search"
          class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          @click="$emit('update:search', '')"
          aria-label="Limpiar búsqueda"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <BaseSelect
        :model-value="sortBy"
        :options="sortOptions"
        placeholder="Ordenar"
        class="w-32 lg:w-56 shrink-0"
        @update:model-value="$emit('update:sortBy', $event)"
      />
    </div>

    <div class="hidden lg:flex flex-wrap items-center justify-between gap-2">
      <p class="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
        <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ajusta búsqueda y orden para curar contenido antes de publicar.
      </p>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#522178]/10 to-[#7c3aed]/10 border border-[#522178]/15 text-[#522178] text-[10px] font-black uppercase tracking-widest">
        <span class="relative flex h-1.5 w-1.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
          <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00B140]"></span>
        </span>
        Feed en vivo
      </span>
    </div>
  </div>
</template>

<script setup>
import BaseSelect from '~/components/ui/BaseSelect.vue'

defineProps({
  search: { type: String, default: '' },
  sortBy: { type: String, default: 'publishedAt' },
  sortOptions: { type: Array, default: () => [] },
})

defineEmits(['update:search', 'update:sortBy'])
</script>

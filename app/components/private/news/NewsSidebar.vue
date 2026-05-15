<!--
  ============================================================
  COMPONENTE: NewsSidebar
  ============================================================
  Es la tarjeta blanca con "Estado del feed" + "Pulso editorial"
  que aparece debajo del NewsHero en el sidebar izquierdo de
  la página de Noticias (solo desktop, oculto en mobile).

  Contiene:
  - "Estado del feed": indicador "Activo" + 3 datos (Tema actual,
    Última noticia, Resultados visibles)
  - Banner morado "Pulso editorial" con la frase
    "Hoy tienes X noticias listas para revisar"

  Props que recibe:
  - topic: tema actual (string)
  - latestDate: fecha de la última noticia (string ya formateada)
  - visibleCount: cuántas noticias hay visibles ahora

  No emite eventos (solo es informativo).
-->

<template>
  <div class="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm">
    <div class="px-4 pt-4 pb-3">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Estado del feed</h3>
        <span class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00B140]"></span>
          </span>
          <span class="text-[9px] font-black uppercase tracking-widest text-[#00B140]">Activo</span>
        </span>
      </div>

      <div class="space-y-2.5">
        <div class="flex items-start gap-2.5">
          <span class="w-1 h-1 rounded-full bg-[#00B140] mt-1.5 shrink-0"></span>
          <div class="min-w-0 flex-1">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400">Tema actual</p>
            <p class="text-[12px] font-bold text-slate-800 truncate">{{ topic || 'Todas las noticias' }}</p>
          </div>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-1 h-1 rounded-full bg-[#F2780C] mt-1.5 shrink-0"></span>
          <div class="min-w-0 flex-1">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400">Última noticia</p>
            <p class="text-[12px] font-bold text-slate-800 truncate">{{ latestDate }}</p>
          </div>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="w-1 h-1 rounded-full bg-[#522178] mt-1.5 shrink-0"></span>
          <div class="min-w-0 flex-1">
            <p class="text-[9px] uppercase tracking-widest font-black text-slate-400">Resultados visibles</p>
            <p class="text-[12px] font-bold text-slate-800 tabular-nums">{{ visibleCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative bg-gradient-to-br from-[#522178] via-[#4a1d6e] to-[#3d1958] mx-3 mb-3 rounded-2xl p-4 overflow-hidden shadow-lg shadow-[#522178]/20">
      <div class="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#F2780C]/25 blur-2xl pointer-events-none"></div>
      <div class="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-[#00B140]/20 blur-2xl pointer-events-none"></div>
      <div class="relative">
        <div class="flex items-center gap-1.5 mb-2">
          <svg class="w-3 h-3 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
          <h4 class="text-[9px] font-black uppercase tracking-[0.2em] text-white/85">Pulso editorial</h4>
        </div>
        <p class="text-[12px] font-bold leading-relaxed text-white">
          Hoy tienes
          <span class="inline-flex items-center justify-center px-2 mx-0.5 py-0.5 rounded-md bg-[#F2780C] text-white tabular-nums shadow-md shadow-[#F2780C]/30">
            {{ visibleCount }}
          </span>
          noticias listas para revisar.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topic: { type: String, default: '' },
  latestDate: { type: String, default: 'Sin fecha' },
  visibleCount: { type: Number, default: 0 },
})
</script>

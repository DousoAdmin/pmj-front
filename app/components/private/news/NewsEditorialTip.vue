<!--
  ============================================================
  COMPONENTE: NewsEditorialTip
  ============================================================
  Es la tarjeta naranja "Tip editorial" del sidebar (solo desktop).
  Muestra un consejo rotativo para curaduría de contenido.

  Cómo funciona:
  - Tiene un arreglo "tips" con 5 consejos en español
  - Un setInterval cambia el tip activo cada 7 segundos
  - La transición usa <Transition> con fade-in/out suave
  - Los dots inferiores indican qué tip está activo (el actual
    se alarga visualmente)

  Cuando el componente se desmonta, limpiamos el setInterval
  para no dejar timers fantasma.

  No recibe props, no emite eventos — es autónomo.
-->

<template>
  <div class="relative bg-gradient-to-br from-[#F2780C] via-[#ff8a2a] to-[#fbbf24] rounded-3xl overflow-hidden shadow-lg shadow-[#F2780C]/20">
    <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/15 blur-2xl pointer-events-none"></div>
    <div class="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-[#522178]/20 blur-2xl pointer-events-none"></div>
    <div
      class="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
      style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 14px 14px;"
    ></div>

    <div class="relative p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-md">
            <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" clip-rule="evenodd" />
            </svg>
          </div>
          <h4 class="text-[9px] font-black uppercase tracking-[0.2em] text-white/95">Tip editorial</h4>
        </div>
        <div class="flex items-center gap-1">
          <span
            v-for="(_, i) in tips"
            :key="i"
            class="w-1.5 h-1.5 rounded-full transition-all"
            :class="i === currentIndex ? 'bg-white w-4' : 'bg-white/30'"
          ></span>
        </div>
      </div>

      <Transition name="tip" mode="out-in">
        <p :key="currentIndex" class="text-[12px] font-bold text-white leading-relaxed">
          {{ tips[currentIndex] }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const tips = [
  'Curaduría: prioriza notas con imagen y fuente confiable para mejor alcance.',
  'Publica entre 9 y 11 a.m. — es la ventana con mayor tasa de clic juvenil.',
  'Cita siempre la fuente original cuando republiques una nota externa.',
  'Combina notas de salud mental con calls-to-action a tus organizaciones aliadas.',
  'Filtra por "Más populares" para detectar tendencias antes de programar contenido.',
]

const currentIndex = ref(0)
let rotateTimer = null

onMounted(() => {
  rotateTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % tips.length
  }, 7000)
})

onBeforeUnmount(() => {
  if (rotateTimer) clearInterval(rotateTimer)
})
</script>

<style scoped>
.tip-enter-active,
.tip-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tip-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.tip-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

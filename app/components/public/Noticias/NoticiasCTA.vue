<template>
  <section class="relative py-24 bg-[#038C33] overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

    <div class="container mx-auto px-6 relative z-10 text-center">
      <div class="max-w-4xl mx-auto">
        
        <div class="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 animate-reveal-scale">
          <svg class="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
          </svg>
          <span class="text-white text-[10px] font-black uppercase tracking-[0.2em]">Tu voz importa</span>
        </div>

        <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight animate-reveal-up">
          ¿Tienes una 
          <span class="inline-block px-4 py-1 bg-white text-[#038C33] rounded-2xl rotate-[1.5deg] shadow-xl ml-2">
            Noticia?
          </span>
        </h2>

        <p class="text-xl md:text-2xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-reveal-up" style="animation-delay: 0.2s">
          Comparte <span class="text-white font-black underline decoration-white/30">eventos, logros o convocatorias</span> con toda la comunidad juvenil de 
          <span class="inline-block px-2 bg-white text-[#038C33] font-black rounded-md shadow-sm">Mosquera</span>.
        </p>

        <div class="animate-reveal-up" style="animation-delay: 0.4s">
          <button
            type="button"
            class="group relative px-12 py-5 bg-[#64278C] text-white font-black text-xl rounded-4xl
                   hover:bg-[#522178] transform hover:-translate-y-2 transition-all duration-300
                   shadow-[0_20px_40px_rgba(100,39,140,0.4)] active:scale-95 focus:outline-none 
                   focus:ring-4 focus:ring-white/30"
            @click="emit('enviar')"
          >
            <span class="flex items-center">
              Enviar Noticia ahora
              <svg class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
        </div>

 
      </div>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['enviar'])
</script>

<style scoped>
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-reveal-up {
  animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-reveal-scale {
  animation: reveal-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
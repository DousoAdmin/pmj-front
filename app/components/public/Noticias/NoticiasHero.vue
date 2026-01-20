<template>
  <section 
    class="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#522178] pt-32 pb-16 md:pt-40"
    role="banner"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div 
        class="absolute inset-0 opacity-[0.08]" 
        style="background-image: radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px); background-size: 60px 60px;"
      ></div>
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border border-white/10 rounded-full animate-ping-slow"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 border border-white/5 rounded-full"></div>
      
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#038C33]/20 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F2780C]/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 text-center">
      
      <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-reveal-scale">
        <span class="w-2 h-2 bg-[#038C33] rounded-full animate-pulse"></span>
        <span class="text-white text-xs font-black uppercase tracking-[0.2em]">Actualidad Juvenil</span>
      </div>

      <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight tracking-tighter overflow-hidden">
        <span class="block animate-reveal-up">Últimas</span>
        <span 
          class="inline-block px-6 py-2 bg-white text-[#038C33] rounded-3xl -rotate-1 shadow-2xl animate-reveal-up"
          style="animation-delay: 0.2s"
        >
          Noticias
        </span>
      </h1>

      <p 
        class="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-reveal-up"
        style="animation-delay: 0.4s"
      >
        Mantente al día con los eventos, convocatorias y el impacto de la 
        <span class="text-[#F2780C] font-black bg-white/90 px-2 rounded-md">juventud</span> 
        en todo Mosquera.
      </p>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div class="w-px h-12 bg-linear-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- AJUSTE DE ESPACIO HEADER --- */
/* El pt-32 y md:pt-40 aseguran que el contenido empiece debajo del menú */

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(60px) skewY(2deg); }
  to { opacity: 1; transform: translateY(0) skewY(0); }
}

@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes ping-slow {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.1; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0) translateX(-50%); }
  50% { transform: translateY(10px) translateX(-50%); }
}

.animate-reveal-up { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-reveal-scale { animation: reveal-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-ping-slow { animation: ping-slow 8s linear infinite; }
.animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
</style>
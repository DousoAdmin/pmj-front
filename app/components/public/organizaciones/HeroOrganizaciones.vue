<template>
  <section 
    class="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#038C33] pt-28 pb-12"
  >
    <div class="absolute inset-0 pointer-events-none">
      
      <div 
        class="absolute inset-0 opacity-[0.06] animate-subtle-zoom" 
        style="background: 
          linear-gradient(135deg, #ffffff 25%, transparent 15%) -25px 0,
          linear-gradient(225deg, #ffffff 25%, transparent 15%) -25px 0,
          linear-gradient(315deg, #ffffff 25%, transparent 15%),
          linear-gradient(45deg, #ffffff 25%, transparent 15%);
          background-size: 50px 50px;"
      ></div>
      
      <div class="absolute -top-24 -left-24 w-150 h-150 bg-white rounded-full blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div class="absolute -bottom-24 -right-24 w-125 h-125 bg-[#F2780C] rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 text-center">
      
      <div class="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8 animate-reveal-scale">
        <span class="w-2 h-2 bg-[#F2780C] rounded-full animate-pulse"></span>
        <span class="text-white text-xs font-bold uppercase tracking-[0.2em]">Red de Liderazgo</span>
      </div>

      <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tighter py-2 overflow-hidden">
        <span class="block animate-reveal-up">Nuestras</span>
        <span 
          class="block text-transparent bg-clip-text bg-linear-to-r from-[#F2780C] via-[#ff983f] to-[#F2780C] italic drop-shadow-lg animate-reveal-up"
          style="animation-delay: 0.2s"
        >
          Organizaciones
        </span>
      </h1>

      <p 
        class="text-lg md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed animate-reveal-up"
        style="animation-delay: 0.4s"
      >
        Aliadas juveniles que impulsan el 
        <span class="text-[#ffb370] font-bold border-b-2 border-[#ffb370]/30">cambio real</span> 
        en Mosquera. Conecta, participa y transforma tu territorio.
      </p>

      <div 
        class="flex items-center justify-center space-x-4 animate-reveal-in"
        style="animation-delay: 0.6s"
      >
        <div class="w-12 h-1 bg-white/40 rounded-full origin-right animate-grow-x"></div>
        <div class="w-2 h-2 bg-[#F2780C] rounded-full animate-pulse"></div>
        <div class="w-12 h-1 bg-white/40 rounded-full origin-left animate-grow-x"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- ANIMACIONES --- */
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(60px) skewY(2deg); }
  to { opacity: 1; transform: translateY(0) skewY(0); }
}

@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes grow-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes subtle-zoom {
  from { transform: scale(1.1); opacity: 0; }
  to { transform: scale(1); opacity: 0.06; }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.05); opacity: 0.2; }
}

.animate-reveal-up { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-reveal-scale { animation: reveal-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-grow-x { animation: grow-x 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-subtle-zoom { animation: subtle-zoom 2.5s ease-out forwards; }
.animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }

/* Corrección de la letra 'g' */
h1 span {
  padding-bottom: 0.15em;
  line-height: 1.1;
}
</style>
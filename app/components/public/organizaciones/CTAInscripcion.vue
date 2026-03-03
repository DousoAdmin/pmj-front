<template>
  <section class="relative py-24 bg-[#F2780C] overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 blur-[120px] translate-x-1/2 translate-y-1/2"></div>

    <div class="container mx-auto px-6 relative z-10 text-center">
      <div class="max-w-4xl mx-auto">
        
        <div class="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 animate-reveal-scale">
          <span class="flex h-2 w-2 mr-3">
            <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span class="text-white text-[10px] font-black uppercase tracking-[0.2em]">Convocatoria Abierta 2026</span>
        </div>

        <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight animate-reveal-up">
          ¿Tu organización <br class="hidden md:block" /> 
          <span class="inline-block px-4 py-1 bg-white text-[#038C33] rounded-2xl shadow-lg mt-2">
            aún no es parte?
          </span>
        </h2>
        
        <p class="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-reveal-up" style="animation-delay: 0.2s">
          <span class="inline-block px-2 bg-white text-[#038C33] font-black italic rounded-md shadow-sm">Únete</span> 
          a la red más grande de liderazgo juvenil en 
          <span class="inline-block px-2 bg-white text-[#038C33] font-black rounded-md shadow-sm">Mosquera</span>. 
          <br class="hidden md:block" />
          Inscripciones abiertas del 
          <span class="bg-[#64278C] text-white px-4 py-1 rounded-lg font-black ml-1 shadow-xl inline-block mt-2 md:mt-0">
            15 Ene - 15 Feb
          </span>
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-reveal-up" style="animation-delay: 0.4s">
          <button 
            class="group relative px-12 py-5 bg-[#64278C] text-white font-black text-lg rounded-2xl 
                   hover:bg-[#522178] transform hover:-translate-y-1 transition-all duration-300 
                   shadow-[0_20px_40px_rgba(100,39,140,0.3)] active:scale-95"
          >
            <span class="flex items-center">
              Inscribir Organización
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </button>
          
          <NuxtLink 
            to="/private/formulario"
            class="group relative px-12 py-5 bg-[#038C33] text-white font-black text-lg rounded-2xl 
                  hover:bg-[#026c28] transform hover:-translate-y-1 transition-all duration-300 
                  shadow-[0_20px_40px_rgba(3,140,51,0.3)] active:scale-95"
          >
            <span class="flex items-center">
              Formulario de Inscripción
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </NuxtLink>

          <NuxtLink 
            to="/contacto"
            class="px-12 py-5 bg-white/10 backdrop-blur-md text-white font-black text-lg rounded-2xl 
                   hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 
                   border-2 border-white/40 hover:border-white/60 shadow-xl"
          >
            Más Información
          </NuxtLink>
        </div>
        
        <div class="mt-16 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-x-8 gap-y-4 animate-reveal-up" style="animation-delay: 0.6s">
          <div class="flex items-center text-white font-bold text-sm uppercase tracking-wider">
            <div class="bg-white p-1 rounded-full mr-2 shadow-sm">
              <svg class="w-4 h-4 text-[#038C33]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            </div>
            Activa en Mosquera
          </div>
          </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(30px); }
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
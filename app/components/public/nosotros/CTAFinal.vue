<template>
  <section class="py-24 md:py-32 bg-[#F2780C] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#522178] opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

    <div class="container mx-auto px-4 relative z-10 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-8 rotate-3 shadow-xl animate-bounce-slow">
        <svg class="w-8 h-8 text-[#F2780C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>

      <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter animate-fade-in-up">
        ¿Quieres Ser <span class="text-[#522178]">Parte?</span>
      </h2>
      
      <p class="text-xl md:text-3xl text-white font-medium mb-12 max-w-3xl mx-auto leading-tight animate-fade-in-up delay-200">
        Inscribe tu <span class="bg-[#522178] px-2 py-1 rounded-lg font-black italic">Organización Social</span> <br class="hidden md:block" /> 
        y transforma el presente de Mosquera.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-400">
        <NuxtLink 
          to="/public/" 
          class="group relative inline-flex items-center px-12 py-5 bg-[#522178] text-white font-black text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:bg-white hover:text-[#522178] transform hover:-translate-y-1"
        >
          Volver al Inicio
          <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }

/* Efecto de profundidad para el texto */
h2 {
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.05);
}
</style>
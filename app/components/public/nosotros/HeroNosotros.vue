<template>
  <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#038C33] pt-32 pb-20">
    
    <div class="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
    <div class="absolute bottom-1/4 right-10 w-48 h-48 bg-[#522178]/20 rounded-full animate-float-delayed"></div>

    <div class="relative z-10 container mx-auto px-4 text-center">
      
      <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/30 bg-white/10 mb-8 animate-fade-in-down">
        <span class="w-2 h-2 rounded-full bg-[#F2780C] animate-pulse"></span>
        <span class="text-xs font-black uppercase tracking-[0.3em] text-white">Gestión Institucional</span>
      </div>

      <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-[0.9] tracking-tighter animate-fade-in-up">
        Nuestra <br/>
        <span class="text-[#522178]">Mesa Directiva</span>
      </h1>

      <div class="flex items-center justify-center gap-6 mb-8 animate-fade-in-up delay-200">
        <div class="h-[2px] w-12 bg-white/30"></div>
        <p class="text-2xl md:text-4xl font-black text-white italic tracking-tight">
          2025 <span class="text-[#F2780C]">—</span> 2026
        </p>
        <div class="h-[2px] w-12 bg-white/30"></div>
      </div>

      <p class="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-300">
        Líderes comprometidos con la representación y el desarrollo de la juventud en todo el territorio mosqueruno.
      </p>

      <div class="mt-12 animate-fade-in-up delay-500">
        <button class="px-10 py-4 bg-[#F2780C] text-white font-black rounded-2xl transition-all duration-300 hover:bg-[#522178] shadow-2xl hover:shadow-[#F2780C]/30 transform hover:scale-105 active:scale-95 uppercase tracking-wider">
          CONOCER LÍDERES
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Animaciones de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de flotación */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-float {
  animation: float 7s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 10s ease-in-out infinite;
  animation-delay: 2s;
}

/* Delays */
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }

.animate-fade-in-up, .animate-fade-in-down {
  opacity: 0;
}
</style>
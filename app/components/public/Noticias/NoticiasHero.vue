<template>
  <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#64278C] via-[#13038c] to-[#F2780C]">
    <div class="relative z-10 container mx-auto px-4 text-center">
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
        Últimas
        <span class="block text-[#d21cff] drop-shadow-2xl animate-fade-up delay-200">
          Noticias
        </span>
      </h1>

      <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto font-light animate-fade-up delay-400 leading-relaxed">
        Eventos, convocatorias, logros y todo lo que pasa en la Plataforma Municipal de Juventudes.
      </p>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
</style>
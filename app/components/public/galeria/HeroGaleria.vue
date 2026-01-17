<template>
  <section class="relative pt-24 pb-20 md:pt-32 md:pb-32 flex items-center justify-center overflow-hidden bg-[#F2780C]">
    
    <div class="absolute inset-0 opacity-20" 
         style="background-image: radial-gradient(#ffffff 2px, transparent 2px); background-size: 30px 30px;">
    </div>

    <div class="absolute top-20 left-10 w-32 h-32 bg-[#522178] rounded-3xl rotate-12 opacity-10"></div>
    <div class="absolute bottom-20 right-10 w-48 h-48 bg-[#038C33] rounded-full opacity-10"></div>
    
    <div class="relative z-10 container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-3 px-4 py-2 bg-[#522178] rounded-lg mb-8 animate-fade-in-up">
        <div class="w-2 h-2 rounded-full bg-[#038C33]"></div>
        <span class="text-white text-xs font-black uppercase tracking-[0.3em]">Memoria Visual</span>
      </div>

      <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-[0.8] tracking-tighter animate-fade-in-up delay-100">
        Nuestra <br/>
        <span class="text-[#522178]">Galería</span>
      </h1>

      <div class="max-w-3xl mx-auto mt-8 animate-fade-in-up delay-200">
        <p class="text-xl md:text-2xl text-white font-bold leading-tight">
          Momentos que cuentan nuestra historia: <br class="hidden md:block"/>
          <span class="text-[#038C33] bg-white px-2 py-1 rounded-md inline-block mt-2">eventos, reuniones y logros</span> 
          juveniles en Mosquera.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

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

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

h1 {
  text-shadow: 6px 6px 0px rgba(82, 33, 120, 0.1);
}
</style>
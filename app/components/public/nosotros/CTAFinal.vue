<!-- components/nosotros/CTAFinal.vue -->
<template>
  <section class="py-20 bg-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-black text-[#64278C] mb-6 animate-fade-up">
        ¿Quieres Ser Parte?
      </h2>
      <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-up delay-200">
        Inscríbe tu <strong class="text-[#F2780C]">Organización Social</strong> 
        y participa en las decisiones de Mosquera.
      </p>
      <NuxtLink 
        to="/" 
        class="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#64278C] to-[#038C33] 
               text-white font-black text-lg rounded-full shadow-2xl 
               hover:shadow-[#038C33]/50 transform hover:scale-105 
               transition-all duration-300 animate-fade-up delay-400 
               focus:outline-none focus:ring-4 focus:ring-[#038C33]/50"
      >
        Volver al Inicio
        <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>
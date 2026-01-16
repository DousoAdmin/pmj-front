<!-- components/nosotros/HistoriaLogros.vue -->
<template>
  <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Historia -->
        <div>
          <h2 class="text-4xl md:text-5xl font-black mb-8 animate-fade-up">
            Nuestra Historia
          </h2>
          <div class="space-y-6 text-lg leading-relaxed">
            <p class="animate-fade-up delay-200">
              Desde <strong>2013</strong>, con la <strong>Ley 1622</strong>, 
              se reconoce el derecho de los jóvenes a participar activamente.
            </p>
            <p class="animate-fade-up delay-400">
              En <strong>2025</strong>, se elige la <strong>nueva Mesa Directiva</strong> 
              liderada por <strong>Johana Chavarro</strong> como Presidenta reelecta.
            </p>
          </div>
        </div>

        <!-- Logros clave -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-fade-up delay-500">
          <h3 class="text-2xl font-bold mb-6">Logros Clave 2025</h3>
          <ul class="space-y-4 text-lg">
            <li v-for="(logro, index) in logros" :key="index" class="flex items-center space-x-3">
              <svg class="w-7 h-7 text-[#F2780C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span v-html="logro"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const logros = [
  '<strong>+1.200 seguidores</strong> en Instagram',
  '<strong>25 millones de pesos</strong> en incentivo económico',
  '<strong>35 Organizaciones Juveniles</strong> activas'
]
</script>
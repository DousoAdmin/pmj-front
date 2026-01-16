<!-- components/nosotros/MesaDirectiva.vue -->
<template>
  <section class="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      <!-- Título con gradiente animado -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#64278C] via-[#038C33] to-[#F2780C] 
                     bg-clip-text text-transparent mb-6 animate-gradient-x">
          Mesa Directiva 2025
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto animate-fade-up delay-200">
          Nuestros representantes que trabajan incansablemente por la comunidad juvenil.
        </p>
      </div>

      <!-- Grid de miembros -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <MesaDirectivaCard 
          v-for="(member, index) in team" 
          :key="index"
          :member="member"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  team: {
    type: Array,
    required: true
  }
})
</script>
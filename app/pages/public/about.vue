<template>
  <div class="p-10 text-center">
    <h1 class="text-2xl font-bold text-green-600">
      Página About 🌱
    </h1>
    <p class="mt-4 text-gray-700">
      Esta es la vista <code>pages/about.vue</code>.
    </p>

    <!-- Enlace de vuelta al Inicio -->
    <NuxtLink to="/" class="mt-6 inline-block text-white bg-green-500 px-4 py-2 rounded">
      Volver al Inicio
    </NuxtLink>


    
  </div>
<Slider />
</template>


<script setup>
import Slider from '@/components/public/slider/Slider.vue'
definePageMeta({
  layout: 'external'
})
</script>
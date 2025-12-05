<template>
    <Slider />
  <div class="p-10 text-center">
    <h1 class="text-3xl font-bold text-blue-600">
      ¡Hola desde la página de inicio! 🎉
    </h1>
    <p class="mt-4 text-gray-700">
      Esta es la vista <code>pages/index.vue</code>.
    </p>

    <!-- Enlace hacia About -->
    <NuxtLink to="/about" class="mt-6 inline-block text-white bg-blue-500 px-4 py-2 rounded">
      Ir a la página About
    </NuxtLink>
  </div>
</template>
<script setup>
import Slider from '@/components/public/slider/Slider.vue'

</script>
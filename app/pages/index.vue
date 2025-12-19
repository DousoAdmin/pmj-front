<template>
  <Slider />
  <div class="p-10 text-center">
    <h1 class="text-3xl font-bold text-blue-600">
      Demo (legacy) - Inicio
    </h1>
    <p class="mt-4 text-gray-700">
      Esta página conserva el contenido que estaba en <code>pages/public/index.vue</code>.
    </p>

    <NuxtLink to="/about" class="mt-6 inline-block text-white bg-blue-500 px-4 py-2 rounded">
      Ir a Demo About
    </NuxtLink>
  </div>
</template>

<script setup>
import Slider from '@/components/public/slider/Slider.vue'
</script>

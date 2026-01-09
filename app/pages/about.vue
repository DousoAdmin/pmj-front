<template>
  <div class="p-10 text-center">
    <h1 class="text-2xl font-bold text-green-600">
      Demo (legacy) - About
    </h1>
    <p class="mt-4 text-gray-700">
      Esta página conserva el contenido que estaba en <code>pages/public/about.vue</code>.
    </p>
    <NuxtLink to="/" class="mt-6 inline-block text-white bg-green-500 px-4 py-2 rounded">
      Volver a Demo
    </NuxtLink>

    <div class="mt-8">
      <Slider />
    </div>
  </div>
</template>

<script setup>
import Slider from '@/components/public/slider/Slider.vue'

//prueba de comit
</script>

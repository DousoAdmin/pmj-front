<!-- components/ServiceCard.vue -->
<template>
  <article
    class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl 
           transform hover:-translate-y-4 transition-all duration-500 
           border border-purple-100 overflow-hidden animate-fade-up"
    :style="{ animationDelay: delay }"
    role="article"
    :aria-labelledby="`service-title-${index}`"
  >
    <!-- Fondo gradiente hover -->
    <div 
      class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
      :class="`bg-gradient-to-br ${gradient}`"
    ></div>

    <!-- Icono con fondo institucional -->
    <div 
      class="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center 
             shadow-2xl group-hover:scale-110 transition-transform duration-500"
      :class="`bg-gradient-to-br ${gradient}`"
    >
      <component 
        :is="icon" 
        class="w-12 h-12 text-white drop-shadow-lg"
        aria-hidden="true"
      />
    </div>

    <!-- Título -->
    <h3 
      :id="`service-title-${index}`"
      class="text-2xl font-black text-[#64278C] mb-4 text-center 
             group-hover:text-[#038C33] transition-colors duration-300"
    >
      {{ title }}
    </h3>

    <!-- Descripción -->
    <p class="text-gray-600 text-center leading-relaxed text-sm md:text-base">
      {{ description }}
    </p>

    <!-- Efecto brillo al hover -->
    <div 
      class="absolute inset-0 rounded-3xl bg-white opacity-0 
             group-hover:opacity-100 blur-xl scale-0 group-hover:scale-150 
             transition-all duration-700 -z-10"
    ></div>
  </article>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: Object,
  gradient: String,
  delay: String,
  index: Number
})
</script>
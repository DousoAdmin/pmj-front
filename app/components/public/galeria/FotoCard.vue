<!-- components/galeria/FotoCard.vue -->
<template>
  <article 
    class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
           cursor-pointer transform hover:scale-105 transition-all duration-500 
           animate-fade-up border border-gray-200"
    :style="{ animationDelay: `${(index + 1) * 50}ms` }"
    role="button"
    tabindex="0"
    :aria-label="`Ver foto: ${photo.title}, ${photo.date}`"
    @click="$emit('click')"
    @keydown.enter.prevent="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- Contenedor para mantener aspect ratio 1:1 -->
    <div class="relative pb-[100%]"> <!-- pb-[100%] crea un cuadrado perfecto -->
      <!-- Gradiente de fondo -->
      <div class="absolute inset-0 bg-gradient-to-br" :class="photo.gradient"></div>

      <!-- Overlay con información al hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 
                  transition-all duration-300 flex items-end p-4">
        <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p class="text-white font-bold text-sm md:text-base line-clamp-2">
            {{ photo.title }}
          </p>
          <p class="text-white/80 text-xs">{{ photo.date }}</p>
        </div>
      </div>

      <!-- Icono de zoom al hover -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 transform group-hover:scale-110">
        <div class="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full 
                    flex items-center justify-center shadow-lg">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  photo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['click'])
</script>
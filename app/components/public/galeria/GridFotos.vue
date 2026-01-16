<!-- components/galeria/GridFotos.vue -->
<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- Tarjeta de foto individual -->
        <FotoCard 
          v-for="(photo, index) in photos" 
          :key="index"
          :photo="photo"
          :index="index"
          @click="$emit('open-lightbox', index)"
        />
      </div>

      <!-- Mensaje sin resultados -->
      <NoResultados v-if="photos.length === 0" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['open-lightbox'])
</script>
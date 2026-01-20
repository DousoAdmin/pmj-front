<!-- components/organizaciones/NoResultadosOrganizaciones.vue -->
<template>
  <div class="col-span-full text-center py-20">
    <div class="max-w-md mx-auto">
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 
                  rounded-full flex items-center justify-center">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </div>
      <p class="text-xl text-gray-500 font-medium mb-3">
        No hay organizaciones en esta categoría aún.
      </p>
      <p class="text-gray-400">
        ¡Pronto tendremos más aliadas!
      </p>
      <button 
        @click="$emit('show-all')"
        class="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 
               rounded-lg transition-colors duration-300"
      >
        Ver todas las organizaciones
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'show-all': []
}>()
</script>
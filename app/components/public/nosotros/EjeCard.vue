<template>
  <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl 
              transform hover:-translate-y-2 transition-all duration-300 
              overflow-hidden border border-gray-100 flex flex-col items-center p-6 text-center h-full">
    
    <!-- Barra superior con el color dinámico del eje -->
    <div class="absolute top-0 left-0 w-full h-1.5" :style="{ backgroundColor: eje.colorEje }"></div>
    
    <!-- Contenedor del icono reducido y centrado -->
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md 
                group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 text-white"
         :style="{ backgroundColor: eje.colorEje }"
         v-html="eje.svgIcon">
    </div>

    <!-- Título de la carta -->
    <h3 class="text-lg md:text-xl font-black mb-2 tracking-tight" :style="{ color: eje.colorEje }">
      {{ eje.titulo }}
    </h3>

    <!-- Descripción -->
    <p class="text-gray-600 leading-snug text-xs md:text-sm" v-html="eje.descripcion"></p>
  </div>
</template>

<script setup>
defineProps({
  eje: {
    type: Object,
    required: true
  }
})
</script>
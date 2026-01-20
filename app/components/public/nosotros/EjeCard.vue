<template>
  <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
              transform hover:-translate-y-4 transition-all duration-500 
              overflow-hidden border border-gray-100">
    <div class="absolute inset-0 bg-linear-to-br from-[#64278C]/0 to-[#00B140]/0 
                group-hover:from-[#64278C]/10 group-hover:to-[#00B140]/10 
                transition-all duration-700"></div>
    <div class="absolute top-0 left-0 w-full h-2" :class="`bg-linear-to-r ${eje.gradiente}`"></div>
    
    <div class="p-8 text-center">
      <div :class="`w-32 h-32 mx-auto mb-6 bg-linear-to-br ${eje.gradiente} 
                    rounded-3xl flex items-center justify-center shadow-2xl 
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`">
        <EjeIcono :tipo="eje.icono" />
      </div>
      <h3 class="text-2xl font-black mb-4" :style="{ color: eje.colorTitulo }">
        {{ eje.titulo }}
      </h3>
      <p class="text-gray-700 leading-relaxed text-sm md:text-base" v-html="eje.descripcion"></p>
    </div>
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
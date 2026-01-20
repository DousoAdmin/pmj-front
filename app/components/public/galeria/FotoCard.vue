<template>
  <article 
    v-if="photo"
    class="group relative overflow-hidden bg-white border-4 border-slate-100 rounded-xl transition-all duration-500 hover:border-[#F2780C] hover:-translate-y-2 cursor-pointer"
    :style="{ animationDelay: `${(index + 1) * 50}ms` }"
    role="button"
    @click="$emit('click')"
  >
    <div class="relative pb-[100%] overflow-hidden rounded-lg">
      
      <div 
        class="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        :style="{ backgroundColor: photo?.bgColor || '#522178' }"
      >
        <NuxtImg 
          v-if="photo?.url" 
          :src="photo.url" 
          :alt="photo?.title || 'Foto de galería'"
          class="absolute inset-0 w-full h-full object-cover" 
        />
      </div>

      <div 
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 z-20"
        :class="index % 2 === 0 ? 'bg-[#522178]/90' : 'bg-[#038C33]/90'"
      >
        <div class="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <p class="text-white font-black text-lg md:text-xl leading-tight mb-2 uppercase tracking-tighter">
            {{ photo?.title || 'Sin Título' }}
          </p>
          
          <div class="flex items-center gap-2">
            <span class="h-1 w-8 bg-[#F2780C]"></span>
            <p class="text-white/80 font-bold text-xs uppercase tracking-widest">
              {{ photo?.date || '2025' }}
            </p>
          </div>
        </div>
      </div>

      <div class="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
        <div class="w-10 h-10 bg-[#F2780C] text-white flex items-center justify-center rounded-md shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
// Definimos las props de manera más robusta
const props = defineProps({
  photo: {
    type: Object,
    default: () => ({}) // Objeto vacío por defecto
  },
  index: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])
</script>

<style scoped>
article {
  box-shadow: 6px 6px 0px rgba(0,0,0,0.05);
}

article:hover {
  box-shadow: 10px 10px 0px rgba(242, 120, 12, 0.2);
}
</style>
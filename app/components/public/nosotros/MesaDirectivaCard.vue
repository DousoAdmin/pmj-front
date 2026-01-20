<template>
  <article
    class="group relative bg-white rounded-[2.5rem] p-8 shadow-md hover:shadow-2xl 
           border-2 border-slate-50 hover:border-[#F2780C]
           transform hover:-translate-y-4 transition-all duration-500"
    role="region"
    :aria-label="`Miembro de la Mesa Directiva: ${member.name}`"
  >
    <figure class="relative z-10">
      
      <div class="w-44 h-44 mx-auto mb-8 rounded-full overflow-hidden 
                  ring-8 ring-slate-100 group-hover:ring-[#F2780C]/20 transition-all duration-500">
        <NuxtImg 
          v-if="member.photo"
          :src="`/images/Mesa_directiva_2025/${member.photo}`"
          :alt="`Foto de ${member.name}`"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div 
          v-else 
          class="w-full h-full flex items-center justify-center text-4xl font-black text-white"
          :class="index % 2 === 0 ? 'bg-[#522178]' : 'bg-[#038C33]'"
        >
          {{ member.initials }}
        </div>
      </div>

      <figcaption class="text-center">
        <h3 class="text-xl md:text-2xl font-black text-[#522178] mb-1 leading-tight transition-colors group-hover:text-[#F2780C]">
          {{ member.name }}
        </h3>
        
        <p class="text-sm font-black text-[#F2780C] uppercase tracking-wider mb-4">
          {{ member.role }}
        </p>

        <div class="w-10 h-1 bg-[#038C33] mx-auto mb-4 group-hover:w-20 transition-all duration-500"></div>

        <div class="space-y-1">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-tighter leading-tight">
            {{ member.committee }}
          </p>
          <p class="text-[11px] font-medium text-slate-400 italic">
            {{ member.org }}
          </p>
        </div>
      </figcaption>
    </figure>

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-100 group-hover:bg-[#F2780C] group-hover:w-full rounded-b-[2.5rem] transition-all duration-500"></div>
  </article>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
/* Optimizamos la legibilidad del texto */
h3 {
  letter-spacing: -0.03em;
}

article {
  isolation: isolate;
}
</style>
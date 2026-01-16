<!-- components/nosotros/MesaDirectivaCard.vue -->
<template>
  <article 
    class="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
           transform hover:-translate-y-3 transition-all duration-500 
           animate-fade-up border border-gray-100"
    :style="{ animationDelay: `${(index + 1) * 150}ms` }"
    role="figure"
    :aria-label="`Miembro de la Mesa Directiva: ${member.name}`"
  >
    <!-- Fondo hover con gradiente -->
    <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 
                transition-opacity duration-500" :class="member.gradient"></div>

    <!-- Foto o iniciales -->
    <figure class="relative z-10 w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden 
                    shadow-2xl ring-4 ring-white 
                    group-hover:ring-[#F2780C]/60 transition-all duration-500">
      <img 
        v-if="member.photo"
        :src="`/images/Mesa_directiva_2025/${member.photo}`"
        :alt="`Foto oficial de ${member.name}, ${member.role}`"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div 
        v-else 
        class="w-full h-full flex items-center justify-center text-3xl font-black text-white"
        :class="member.gradient"
      >
        {{ member.initials }}
      </div>
    </figure>

    <!-- Información del miembro -->
    <figcaption class="relative z-10 text-center">
      <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-2 
                 group-hover:text-[#038C33] transition-colors duration-300">
        {{ member.name }}
      </h3>
      <p class="text-sm md:text-base font-bold text-[#F2780C] mb-1">
        {{ member.role }}
      </p>
      <p class="text-xs md:text-sm text-gray-600">{{ member.committee }}</p>
      <p class="text-xs md:text-sm text-gray-600">Org. {{ member.org }}</p>
    </figcaption>

    <!-- Efecto brillo al hover -->
    <div class="absolute inset-0 rounded-3xl bg-white opacity-0 
                group-hover:opacity-100 blur-xl scale-0 group-hover:scale-150 
                transition-all duration-700 -z-10"></div>
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
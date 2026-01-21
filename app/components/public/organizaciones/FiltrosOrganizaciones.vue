<!-- components/organizaciones/FiltrosOrganizaciones.vue -->
<template>
  <div>
    <section class="py-8 bg-white shadow-sm  top-0 z-40 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <!-- Botón de filtro -->
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 
                   hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#038C33]/30"
            :class="activeFilter === filter.value 
              ? 'bg-[#038C33] text-white shadow-lg ring-4 ring-[#038C33]/20' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            :aria-pressed="activeFilter === filter.value"
            role="tab"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="relative py-24 md:py-32 bg-[#522178] overflow-hidden">
      
<div 
  class="absolute inset-0 opacity-[0.2] animate-subtle-zoom" 
  style="background-image: 
    radial-gradient(circle, #ffffff 1px, transparent 1px), 
    radial-gradient(circle, #ffffff 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;"
></div>

      <div class="container mx-auto px-6 relative z-10">
        
        <div class="flex flex-col items-center mb-20 animate-fade-in">
          <div class="inline-flex items-center px-8 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div class="flex -space-x-2 mr-4">
               <span class="w-3 h-3 rounded-full bg-[#038C33] shadow-[0_0_10px_#038C33]"></span>
               <span class="w-3 h-3 rounded-full bg-[#F2780C] shadow-[0_0_10px_#F2780C]"></span>
            </div>
            <p class="text-sm md:text-base text-white/90 font-medium tracking-wide">
              Explora las <span class="font-black text-[#038C33] text-xl">{{ filteredOrgs.length }}</span> organizaciones juveniles
            </p>
          </div>
          <div class="w-px h-16 bg-linear-to-b from-white/20 to-transparent mt-6"></div>
        </div>

        <div 
          v-if="filteredOrgs && filteredOrgs.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
        >
          <TarjetaOrganizacion 
            v-for="(org, index) in filteredOrgs" 
            :key="org.name" 
            :organizacion="org"
            :index="index"
          />
        </div>

        <div v-else class="py-20 text-center">
          <NoResultadosOrganizaciones class="animate-bounce-subtle" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/* =============================================== */
/* 1. FILTROS DISPONIBLES */
/* =============================================== */
const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Sociales', value: 'social' },
  { label: 'Culturales', value: 'cultural' },
  { label: 'Fundaciones', value: 'fundacion' }
]

const activeFilter = ref('all')

/* =============================================== */
/* 2. DATOS DE ORGANIZACIONES (33 ejemplos reales) */
/* =============================================== */
interface Organizacion {
  name: string
  initials: string
  desc: string
  type: string
  gradient: string
  link: string
}

const orgs = ref<Organizacion[]>([
  // === SOCIALES (6) ===
  { name: 'Los Meseros', initials: 'OSJ1', desc: 'Juegos de mesa y dinámicas grupales', type: 'social', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Selah', initials: 'OSJ2', desc: 'Prevención de violencia escolar y bullying', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Psicovibes', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Red Solidaria de Apoyo Mutuo', initials: 'OSJ7', desc: 'Liderazgo juvenil comunitario', type: 'social', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Zafic', initials: 'OSJ8', desc: 'Cine foro y análisis audiovisual', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Comunidad M&F', initials: 'OSJ9', desc: 'Cultura asiática, anime y KPOP', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },

  // === CULTURALES (5) ===
  { name: 'Chikara', initials: 'OCJ1', desc: 'Cultura e idioma japonés', type: 'cultural', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Hijos del Zipa', initials: 'OCJ2', desc: 'Educación ambiental y artística', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Manos a la brocha', initials: 'OCJ3', desc: 'Muralismo y arte urbano', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Moravia', initials: 'OCJ4', desc: 'Danza urbana y hip hop', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Taroca', initials: 'OCJ5', desc: 'Danza folclórica colombiana', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },

  // === FUNDACIONES (5) ===
  { name: 'Fundación De Vuelta a la Vida', initials: 'DVV', desc: 'Salud mental y prevención del suicidio', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Fundación Ecos Colombia', initials: 'ECO', desc: 'Educación ambiental y reciclaje', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Sabotaje al consumo', initials: 'SAC', desc: 'Formación en liderazgo y consumo responsable', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Fundación Paloma', initials: 'FLP', desc: 'Apoyo a madres adolescentes', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Alternativa', initials: 'ALT', desc: 'Emprendimiento juvenil rural', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
])

/* =============================================== */
/* 3. FILTRO COMPUTADO - REACTIVIDAD */
/* =============================================== */
const filteredOrgs = computed(() => {
  if (activeFilter.value === 'all') return orgs.value
  return orgs.value.filter(org => org.type === activeFilter.value)
})
</script>
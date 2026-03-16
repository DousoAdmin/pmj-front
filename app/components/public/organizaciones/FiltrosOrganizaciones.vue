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
  link: string
  photo?: string
}

const orgs = ref<Organizacion[]>([
  // === SOCIALES (6) ===
  { name: 'Al Ritmo que nos mueve', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/al ritmo que nos mueve.png' },
  { name: 'Asociación Parceros por Colombia', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/parceros.jpg' },
  { name: 'Asociación SELAH', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Logos (7) - SELAH Organización.png' },
  { name: 'Asociación sin ánimo de Lucro De Vuelta a la Vida', initials: 'DVV', desc: 'Salud mental y prevención del suicidio', type: 'fundacion',  link: '#', photo: '/images/organizaciones/de vuelta a la vida.png' },
  { name: 'Chikara', initials: 'OCJ1', desc: 'Cultura e idioma japonés', type: 'cultural',  link: '#', photo: '/images/organizaciones/chikara_slogan - ChikaraOficial.png' },
  { name: 'Ciudadanía Robertista', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/LOGO CIUDADANIA ROBERTISTA - Andrea Rodriguez.jpeg' },
  { name: 'Club halcones de mosquera', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/logo halcones Image 2021-08-20 at 21.23.44 (1) (1) - JOSE AGUIRRE.jpeg' },
  { name: 'Colectiva Aluna', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Aluna logo - Paula Andrea Peña Sanchez.png' },
  { name: 'Colectivo Popular Juvenil ', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/logo cpj - Diego Escandon.jpg' },
  { name: 'Compañía de Danza Fizcaue', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Logo_Fizcaue - Manuela Alfonso.jpg' },
  { name: 'Comunidad M&F', initials: 'OSJ9', desc: 'Cultura asiática, anime y KPOP', type: 'social',  link: '#', photo: '/images/organizaciones/Comunidad MF.png' },
  { name: 'Fundación Ecos Colombia', initials: 'ECO', desc: 'Educación ambiental y reciclaje', type: 'fundacion',  link: '#', photo: '/images/organizaciones/7 Logo ECOS - negro,verde (1) - ECO-S COLOMBIA.png' },
  { name: 'Fundacion Dale Color a mi Vida', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/dale color a mi vida.jpeg' },
  { name: 'Fundación La Cruz', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/cruz.png' },
  { name: 'Fundación Tallos Vivos', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/11 - Fundacion Tallos Vivos.png' },
  { name: 'Fundisua', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/fundisua.jpg' },
  { name: 'Hijos del Zipa', initials: 'OCJ2', desc: 'Educación ambiental y artística', type: 'cultural', link: '#', photo: '/images/organizaciones/Logo de Hijos del Zipa sin fondo - David Cantor.png' },
  { name: 'Insart', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/insart.png' },
  { name: 'Juventud Agrícola Urbana (JAU)', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/LOGO COMPLETO - Juventud Agricola Urbana.png' },
  { name: 'Los Meseros', initials: 'OSJ1', desc: 'Juegos de mesa y dinámicas grupales', type: 'social',  link: '#', photo:'/images/organizaciones/meseros.png' },
  { name: 'M180° MOSQUERA', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/m180.png' },
  { name: 'Malas Hierbas', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#' },
  { name: 'Mesa de Rock y Metal de Mosquera', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/LOGOMESA (1)(4) - mesa de rock y metal mosquera.png' },
  { name: 'Milpa', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/milpa.jpeg' },
  { name: 'Mos-krea', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Logo MOS-KREA - Ingrid Katerinne Robayo Sánchez.jpeg' },
  { name: 'Mosquera Verde', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Mosquera Verde.jpg - Tatiana Cuitiva.jpeg' },
  { name: 'Moravia', initials: 'OCJ4', desc: 'Danza urbana y hip hop', type: 'cultural',  link: '#', photo: '/images/organizaciones/moravia.png' },
  { name: 'Psicovibes', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/logo 2 psicoivibes - PsicoVibes.png' },

  { name: 'Quinta esencia', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/QuintaEsencia.png' },
  { name: 'SINPAREDES TEATRO', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/SINPAREDES TEATRO.png' },
  { name: 'Sua', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/LOGO SUA  - santiago castillo - Gabriela Antonio.webp' },
  { name: 'Ventus', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social',  link: '#', photo: '/images/organizaciones/Ventus.png' },
  { name: 'Zafic', initials: 'OSJ8', desc: 'Cine foro y análisis audiovisual', type: 'social',  link: '#' },

  // === CULTURALES (5) ===

  // === FUNDACIONES (5) ===
])

/* =============================================== */
/* 3. FILTRO COMPUTADO - REACTIVIDAD */
/* =============================================== */
const filteredOrgs = computed(() => {
  if (activeFilter.value === 'all') return orgs.value
  return orgs.value.filter(org => org.type === activeFilter.value)
})
</script>
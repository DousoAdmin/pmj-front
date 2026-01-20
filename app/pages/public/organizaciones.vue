<!-- pages/organizaciones.vue -->
<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
    <!-- Componente Hero -->
    <HeroOrganizaciones />
    <!-- Componente CTA Final -->
    <CTAInscripcion />
    
    <!-- Componente Filtros -->
    <FiltrosOrganizaciones 
      :filters="filters"
      :activeFilter="activeFilter"
      @filter-change="activeFilter = $event"
    />
    
    <!-- Componente Grid de Organizaciones -->
    <GridOrganizaciones 
      :organizaciones="filteredOrgs"
    />
    
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

const activeFilter = ref('all') // Filtro activo por defecto

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
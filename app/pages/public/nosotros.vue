<!-- pages/nosotros.vue -->
<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
    <!-- Componente Hero -->
    <HeroNosotros />
    
    <!-- Componente Introducción Institucional -->
    <InstitucionalIntro />
    
    <!-- Componente Mesa Directiva -->
    <MesaDirectiva :team="team" />
    
    <!-- Componente Ejes de Acción -->
    <EjesAccion />
    
    <!-- Componente Historia y Logros -->
    <HistoriaLogros />
    
    <!-- Componente CTA Final -->
    <CTAFinal />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Datos de la Mesa Directiva
const team = ref([
  {
    name: 'Johana Chavarro',
    role: 'Presidenta',
    committee: 'Mesa Directiva',
    initials: 'JC',
    org: 'De Vuelta a la Vida',
    photo: 'Joha.jpeg',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Juan Esteban Parra',
    role: 'Vicepresidente',
    committee: 'Mesa Directiva',
    initials: 'JE',
    org: 'Los Meseros',
    photo: 'juanes.jpg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'David Cantor',
    role: 'Delegado Departamental y Provincial',
    committee: 'Representación',
    initials: 'DC',
    org: 'Hijos del Zipa',
    photo: 'David.jpg',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Nikhol Puerto',
    role: 'Delegada Provincial',
    committee: 'Representación',
    initials: 'NP',
    org: 'Malas Hierbas',
    photo: 'Nikhol.jpeg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'Kevin Parra',
    role: 'Comité de Comunicaciones',
    committee: 'Liderazgo',
    initials: 'KP',
    org: 'Comunidad M&F',
    photo: 'kevin.svg',
    gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]'
  },
  {
    name: 'Cristian Grajales',
    role: 'Comité de Ética',
    committee: 'Liderazgo',
    initials: 'CG',
    org: 'Juventud Agrícola Urbana JAU',
    photo: 'Cristian.jpeg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  }
])
</script>
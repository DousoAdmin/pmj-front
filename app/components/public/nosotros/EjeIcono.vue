<!-- components/nosotros/EjeIcono.vue -->
<template>
  <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <!-- Social -->
    <path 
      v-if="tipo === 'social'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    />
    
    <!-- Político -->
    <path 
      v-if="tipo === 'politico'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3-16h6"
    />
    
    <!-- Ambiental -->
    <path 
      v-if="tipo === 'ambiental'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 013-1.74"
    />
    <path 
      v-if="tipo === 'ambiental'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M20.488 18.5a9 9 0 11-18.978-.001A9 9 0 0120.488 18.5z"
    />
    
    <!-- Cultural -->
    <path 
      v-if="tipo === 'cultural'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 01-2-2"
    />
    
    <!-- Deportivo -->
    <path 
      v-if="tipo === 'deportivo'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M8.5 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM15.5 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM4 12a8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8z"
    />
    
    <!-- Emprendedor -->
    <path 
      v-if="tipo === 'emprendedor'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
    
    <!-- Educacional -->
    <path 
      v-if="tipo === 'educacional'"
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="1.5" 
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253M12 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332-.477-4.5-1.253"
    />
  </svg>
</template>

<script setup>
defineProps({
  tipo: {
    type: String,
    required: true,
    validator: (value) => [
      'social', 'politico', 'ambiental', 
      'cultural', 'deportivo', 'emprendedor', 'educacional'
    ].includes(value)
  }
})
</script>
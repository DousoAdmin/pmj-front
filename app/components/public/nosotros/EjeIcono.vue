<template>
  <svg 
    class="w-16 h-16 transition-transform duration-500 group-hover:scale-110" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-if="tipo === 'social'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </g>
    
    <g v-if="tipo === 'politico'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </g>
    
    <g v-if="tipo === 'ambiental'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11l-2 2m2-2l2 2m-2-2v5" />
    </g>
    
    <g v-if="tipo === 'cultural'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </g>
    
    <g v-if="tipo === 'deportivo'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.5a5 5 0 11-10 0M3 15.5a5 5 0 1010 0M12 7V3m0 18h-3m3 0h3m-3-14c4 0 4 4 4 4s-1.5 4-4 4-4-4-4-4 0-4 4-4z" />
    </g>
    
    <g v-if="tipo === 'emprendedor'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464L19.07 4.93m-4.714 1.93L11.5 5.5l-1.071 1.071-3.5 3.5a1 1 0 00-.214.309L5 15l1.714 1.714 4.62-1.714a1 1 0 00.309-.214l3.5-3.5L16.214 10.21l-1.393-1.393z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21l2-2m-4-4l2 2" />
    </g>
    
    <g v-if="tipo === 'educacional'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253M12 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332-.477-4.5-1.253" />
    </g>
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
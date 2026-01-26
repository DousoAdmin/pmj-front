<template>
  <div>
    <section class="py-8 bg-white shadow-sm top-0 z-40 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filtros de noticias">
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            @click="filtro = filter.id"
            
            class="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300
                   hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#038C33]/30 uppercase"
            :class="filtro === filter.id
              ? 'bg-[#038C33] text-white shadow-lg ring-4 ring-[#038C33]/20'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            :aria-pressed="filtro === filter.id"
            role="tab"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="relative py-24 md:py-32 bg-[#F2780C] overflow-hidden">
      
      <div 
        class="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 45px 45px;"
      ></div>

      <div class="absolute top-0 right-0 w-150 h-150 bg-[#038C33]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-150 h-150 bg-[#F2780C]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-xl">
            <h2 class="text-white text-3xl md:text-4xl font-black mb-4">
              Explora la actualidad
            </h2>
            <div class="h-1.5 w-24 bg-[#038C33] rounded-full"></div>
          </div>

          <div class="inline-flex items-center px-6 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <p class="text-sm md:text-base text-white/80 font-medium">
              Mostrando <span class="font-black text-[#522178] text-lg">{{ noticiasFiltradas.length }}</span> historias recientes
            </p>
          </div>
        </div>

        <div 
          v-if="noticiasFiltradas && noticiasFiltradas.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
        >
          <NoticiasTarjeta
            v-for="(noticia, index) in noticiasFiltradas"
            :key="noticia.id || index"
            :noticia="noticia"
            :index="index"
          />
        </div>

        <div v-else class="py-20 text-center bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm">
          <div class="mb-6 flex justify-center">
            <div class="p-6 bg-white/10 rounded-full animate-pulse">
              <svg class="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 3v4h4" />
              </svg>
            </div>
          </div>
          <h3 class="text-white text-xl font-bold mb-2">No se encontraron noticias</h3>
          <p class="text-white/60">Vuelve más tarde para conocer las novedades.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const filtro = ref('todas')

const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'comunicados', label: 'Comunicados' }
]

// TODO: reemplazar por tu data real / API
const noticias = ref([
  { title: 'Noticia 1', category: 'eventos' },
  { title: 'Noticia 2', category: 'comunicados' }
])

const noticiasFiltradas = computed(() => {
  if (filtro.value === 'todas') return noticias.value
  return noticias.value.filter(n => n.category === filtro.value)
})
</script>

<style scoped>
/* Animación para que el grid aparezca suavemente al cargar */
.container {
  animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
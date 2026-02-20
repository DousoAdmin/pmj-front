<!-- components/galeria/FiltrosGaleria.vue -->
<template>
  <div>
    <section class="py-8 bg-white shadow-sm top-0 z-40 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 
                   hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#038C33]/30"
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

    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <!-- Tarjeta de foto individual -->
          <FotoCard 
            v-for="(photo, index) in filteredPhotos" 
            :key="index"
            :photo="photo"
            :index="index"
            @click="openLightbox(index)"
          />
        </div>

        <!-- Mensaje sin resultados -->
        <NoResultados v-if="filteredPhotos.length === 0" />
      </div>
    </section>

    <Lightbox 
      :is-open="lightboxOpen"
      :current-photo="currentPhoto"
      :current-index="currentPhotoIndex"
      :total-photos="filteredPhotos.length"
      @close="closeLightbox"
      @prev="prevPhoto"
      @next="nextPhoto"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* =============================================== */
/* FILTROS DISPONIBLES */
/* =============================================== */
const activeFilter = ref('all')
const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Eventos', value: 'evento' },
  { label: 'Reuniones', value: 'reunion' },
  { label: 'Fiestas', value: 'fiesta' },
  { label: 'Momentos', value: 'momento' }
]

/* =============================================== */
/* FOTOS OFICIALES 2025 - DATOS REALES */
/* =============================================== */
const photos = ref([
  // === EVENTOS (16 fotos) ===
  { title: 'Taller de Emprendimiento 2025', date: '28 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Feria de Empleo Juvenil', date: '15 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Mesas Participativas CDI', date: '10 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Lanzamiento Plan Incentivos', date: '05 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Capacitación Liderazgo', date: '01 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Foro Juventud y Política', date: '25 Sep', category: 'Evento', type: 'evento', gradient: 'from-[#F2780C] to-[#64278C]' },
  
  // === REUNIONES (7 fotos) ===
  { title: 'Reunión Mesa Directiva', date: '27 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Planeación 2026', date: '22 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Consejo de Juventud', date: '18 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Actividades Mosquera Pila', date: '09 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#F2780C] to-[#64278C]' },

  // === FIESTAS (8 fotos) ===
  { title: 'Fiesta de Integración', date: '21 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Celebración +1.200 Inscritos', date: '16 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Halloween Juvenil', date: '31 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Cumpleaños Plataforma', date: '11 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#F2780C] to-[#64278C]' },

  // === MOMENTOS (10 fotos) ===
  { title: 'YayaFest 2025', date: '26 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Entrega de Certificados', date: '23 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Firma de Convenio', date: '19 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Visita a CDI La Cumbre', date: '13 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Premiación Concurso', date: '06 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#F2780C] to-[#64278C]' },
 { title: 'Primer Evento 2025', date: '15 Ene', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' }
])

/* =============================================== */
/* FILTRO REACTIVO */
/* =============================================== */
const filteredPhotos = computed(() => {
  if (activeFilter.value === 'all') return photos.value
  return photos.value.filter(photo => photo.type === activeFilter.value)
})

/* =============================================== */
/* ESTADO DEL LIGHTBOX Y NAVEGACIÓN */
/* =============================================== */
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)

const currentPhoto = computed(() => 
  filteredPhotos.value[currentPhotoIndex.value] || {}
)

/* =============================================== */
/* FUNCIONES DEL LIGHTBOX */
/* =============================================== */
const openLightbox = (index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const prevPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

const nextPhoto = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % filteredPhotos.value.length
}

/* =============================================== */
/* NAVEGACIÓN POR TECLADO (ACCESIBILIDAD) */
/* =============================================== */
onMounted(() => {
  const handleKey = (e) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
  }
  window.addEventListener('keydown', handleKey)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
    document.body.style.overflow = 'auto'
  })
})
</script>
<!-- pages/galeria.vue -->
<template>
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
    <!-- Componente Hero -->
    <HeroGaleria />
    
    <!-- Componente Filtros -->
    <FiltrosGaleria 
      :filters="filters"
      :activeFilter="activeFilter"
      @filter-change="activeFilter = $event"
    />
    
    <!-- Componente Grid de Fotos -->
    <GridFotos 
      :photos="filteredPhotos"
      @open-lightbox="openLightbox"
    />
    
    <!-- Componente Lightbox -->
    <Lightbox 
      :is-open="lightboxOpen"
      :current-photo="currentPhoto"
      :current-index="currentIndex"
      :total-photos="filteredPhotos.length"
      @close="closeLightbox"
      @prev="prevPhoto"
      @next="nextPhoto"
    />
    
    <!-- Componente CTA Final -->
    <CTAFotos />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* =============================================== */
/* ESTADO DEL LIGHTBOX Y NAVEGACIÓN */
/* =============================================== */
const lightboxOpen = ref(false)
const currentIndex = ref(0)

/* =============================================== */
/* FILTROS DISPONIBLES */
/* =============================================== */
const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Eventos', value: 'evento' },
  { label: 'Reuniones', value: 'reunion' },
  { label: 'Fiestas', value: 'fiesta' },
  { label: 'Momentos', value: 'momento' }
]
const activeFilter = ref('all')

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
  { title: 'Torneo Deportivo', date: '20 Sep', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Concierto Joven', date: '18 Sep', category: 'Evento', type: 'evento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Expo Arte Urbano', date: '12 Sep', category: 'Evento', type: 'evento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Salida de cine con Chikara', date: '08 Sep', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'SOFA 2025', date: '13 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Feria del Libro PMJ', date: '26 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Yaya Fest: Música y Artes', date: '24 May', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'SOFA 2025: Pabellón Interactivo', date: '12 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Feria del Libro: Taller Escritura', date: '25 Oct', category: 'Evento', type: 'evento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Yaya Fest: Stands', date: '24 May', category: 'Evento', type: 'evento', gradient: 'from-[#64278C] to-[#038C33]' },

  // === REUNIONES (7 fotos) ===
  { title: 'Reunión Mesa Directiva', date: '27 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Planeación 2026', date: '22 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Consejo de Juventud', date: '18 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Actividades Mosquera Pila', date: '09 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Comité de Comunicaciones', date: '04 Oct', category: 'Reunión', type: 'reunion', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Sesión con Gobernación', date: '30 Sep', category: 'Reunión', type: 'reunion', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Balance Trimestral', date: '26 Sep', category: 'Reunión', type: 'reunion', gradient: 'from-[#F2780C] to-[#64278C]' },

  // === FIESTAS (8 fotos) ===
  { title: 'Fiesta de Integración', date: '21 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Celebración +1.200 Inscritos', date: '16 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Halloween Juvenil', date: '31 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Cumpleaños Plataforma', date: '11 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Noche de Talentos', date: '07 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Karaoke Juvenil', date: '03 Oct', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Fiesta de Fin de Mes', date: '29 Sep', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Baile Temático', date: '24 Sep', category: 'Fiesta', type: 'fiesta', gradient: 'from-[#64278C] to-[#038C33]' },

  // === MOMENTOS (10 fotos) ===
  { title: 'YayaFest 2025', date: '26 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Entrega de Certificados', date: '23 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Firma de Convenio', date: '19 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Visita a CDI La Cumbre', date: '13 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Premiación Concurso', date: '06 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Foto Grupal Directiva', date: '02 Oct', category: 'Momento', type: 'momento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Voluntariado Comunitario', date: '28 Sep', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' },
  { title: 'Entrevista Local', date: '22 Sep', category: 'Momento', type: 'momento', gradient: 'from-[#F2780C] to-[#64278C]' },
  { title: 'Día del Joven', date: '12 Ago', category: 'Momento', type: 'momento', gradient: 'from-[#64278C] to-[#038C33]' },
  { title: 'Primer Evento 2025', date: '15 Ene', category: 'Momento', type: 'momento', gradient: 'from-[#038C33] to-[#F2780C]' }
])

/* =============================================== */
/* FILTRO REACTIVO */
/* =============================================== */
const filteredPhotos = computed(() => {
  if (activeFilter.value === 'all') return photos.value
  return photos.value.filter(photo => photo.type === activeFilter.value)
})

const currentPhoto = computed(() => 
  filteredPhotos.value[currentIndex.value] || {}
)

/* =============================================== */
/* FUNCIONES DEL LIGHTBOX */
/* =============================================== */
const openLightbox = (index) => {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const prevPhoto = () => {
  currentIndex.value = (currentIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

const nextPhoto = () => {
  currentIndex.value = (currentIndex.value + 1) % filteredPhotos.value.length
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
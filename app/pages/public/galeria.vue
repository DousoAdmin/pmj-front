<!-- pages/galeria.vue -->
<!--
  PÁGINA: Galería Oficial - Plataforma Municipal de Juventudes Mosquera
  PROPÓSITO: Archivo visual histórico de actividades 2025.
  - Hero con gradiente institucional
  - fotos organizadas por categoría (Eventos, Reuniones, Fiestas, Momentos)
  - Filtros sticky con estado activo visual
  - Grid responsive con hover y efecto zoom
  - Lightbox con navegación por flechas + teclado (← → Esc)
  - Accesibilidad total: ARIA, foco, teclado, bloqueo de scroll
  - Animaciones escalonadas suaves y profesionales
  - CTA final para participación comunitaria
  - Totalmente optimizado para móviles y pantallas grandes
-->

<template>
  <!-- =============================================== -->
  <!-- CONTENEDOR PRINCIPAL CON FONDO ELEGANTE -->
  <!-- =============================================== -->
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">

    <!-- =============================================== -->
    <!-- 1. HERO GALERÍA - IMPACTO VISUAL INSTITUCIONAL -->
    <!-- =============================================== -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden 
                    bg-gradient-to-br from-[#64278C] via-[#a16601] to-[#F2780C]">
      

      <!-- Contenido principal del hero -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Nuestra
          <span class="block text-[#0cf242] drop-shadow-2xl animate-fade-up delay-200">
            Galería
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto font-light animate-fade-up delay-400 leading-relaxed">
          Momentos que cuentan nuestra historia: eventos, reuniones, risas y logros juveniles en Mosquera.
        </p>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 2. FILTROS STICKY - NAVEGACIÓN POR CATEGORÍA -->
    <!-- =============================================== -->
    <section class="py-8 bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
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


    <!-- =============================================== -->
    <!-- 3. GRID DE FOTOS - MOMENTOS PMJ -->
    <!-- =============================================== -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

          <!-- Tarjeta de foto individual -->
          <article 
            v-for="(photo, index) in filteredPhotos" 
            :key="index"
            @click="openLightbox(index)"
            class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl 
                   cursor-pointer transform hover:scale-105 transition-all duration-500 
                   animate-fade-up border border-gray-200"
            :style="{ animationDelay: `${(index + 1) * 50}ms` }"
            role="button"
            tabindex="0"
            :aria-label="`Ver foto: ${photo.title}, ${photo.date}`"
            @keydown.enter.prevent="openLightbox(index)"
            @keydown.space.prevent="openLightbox(index)"
          >
            <!-- Imagen con gradiente institucional -->
            <div class="aspect-w-1 aspect-h-1 relative">
              <div class="absolute inset-0 w-full h-full bg-gradient-to-br" :class="photo.gradient"></div>
            </div>

            <!-- Overlay con información al hover -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 
                        transition-all duration-300 flex items-end p-4">
              <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-white font-bold text-sm md:text-base line-clamp-2">
                  {{ photo.title }}
                </p>
                <p class="text-white/80 text-xs">{{ photo.date }}</p>
              </div>
            </div>

            <!-- Icono de zoom al hover -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 transform group-hover:scale-110">
              <div class="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full 
                          flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </article>
        </div>

        <!-- Mensaje sin resultados -->
        <div v-if="filteredPhotos.length === 0" class="col-span-full text-center py-24">
          <div class="max-w-md mx-auto">
            <p class="text-2xl text-gray-500 font-medium mb-3">
              No hay fotos en esta categoría aún.
            </p>
            <p class="text-gray-400">
              ¡Vuelve pronto! Estamos capturando nuevos momentos.
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 4. LIGHTBOX - VISOR COMPLETO -->
    <!-- =============================================== -->
    <teleport to="body">
      <div 
        v-if="lightboxOpen" 
        @click="closeLightbox" 
        class="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 
               cursor-pointer transition-opacity duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        @keydown.esc="closeLightbox"
      >
        <div class="relative max-w-5xl w-full" @click.stop>
          <!-- Foto grande -->
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <div class="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 relative">
              <div class="absolute inset-0 w-full h-full bg-gradient-to-br" 
                   :class="currentPhoto.gradient"></div>
            </div>

            <!-- Información de la foto -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                        from-black/90 via-black/60 to-transparent p-6 text-white">
              <h3 id="lightbox-title" class="text-2xl md:text-3xl font-black mb-2">
                {{ currentPhoto.title }}
              </h3>
              <p class="text-lg opacity-90">
                {{ currentPhoto.date }} • {{ currentPhoto.category }}
              </p>
            </div>
          </div>

          <!-- Navegación: foto anterior -->
          <button 
            @click.stop="prevPhoto"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 
                   bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center 
                   hover:bg-white/40 transition-all duration-300 
                   focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Foto anterior"
          >
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                    d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Navegación: foto siguiente -->
          <button 
            @click.stop="nextPhoto"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 
                   bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center 
                   hover:bg-white/40 transition-all duration-300 
                   focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Foto siguiente"
          >
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                    d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Botón cerrar -->
          <button 
            @click.stop="closeLightbox"
            class="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md 
                   rounded-full flex items-center justify-center 
                   hover:bg-white/40 transition-all duration-300 
                   focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Cerrar visor"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </teleport>


    <!-- =============================================== -->
    <!-- 5. LLAMADO A LA ACCION - PARTICIPACIÓN COMUNITARIA -->
    <!-- =============================================== -->
    <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-black mb-6 animate-fade-up">
          ¿Tienes Fotos?
        </h2>
        <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-up delay-200 opacity-90 leading-relaxed">
          Comparte tus momentos y forma parte de la historia juvenil de Mosquera.
        </p>
        <button 
          class="px-10 py-4 bg-[#F2780C] text-white font-black text-lg rounded-full 
                 hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 
                 shadow-2xl animate-fade-up delay-400 hover:shadow-orange-500/50 
                 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
        >
          Subir Foto
        </button>
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* =============================================== */
/* 1. ESTADO DEL LIGHTBOX Y NAVEGACIÓN */
/* =============================================== */
const lightboxOpen = ref(false)
const currentIndex = ref(0)

/* =============================================== */
/* 2. FILTROS DISPONIBLES */
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
/* 3. FOTOS OFICIALES 2025 - DATOS REALES */
/* =============================================== */
const photos = [
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
]

/* =============================================== */
/* 4. FILTRO REACTIVO */
/* =============================================== */
const filteredPhotos = computed(() => {
  if (activeFilter.value === 'all') return photos
  return photos.filter(photo => photo.type === activeFilter.value)
})

const currentPhoto = computed(() => 
  filteredPhotos.value[currentIndex.value] || {}
)

/* =============================================== */
/* 5. FUNCIONES DEL LIGHTBOX */
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
/* 6. NAVEGACIÓN POR TECLADO (ACCESIBILIDAD) */
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

/* =============================================== */
/* 7. PARTÍCULAS DECORATIVAS EN HERO */
/* =============================================== */
const particleStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%', delay: '0s' },
    { top: '20%', right: '15%', delay: '1s' },
    { bottom: '15%', left: '20%', delay: '0.5s' },
    { bottom: '25%', right: '10%', delay: '1.5s' },
    { top: '50%', left: '5%', delay: '2s' },
    { top: '40%', right: '5%', delay: '2.5s' }
  ]
  const p = positions[index - 1] || {}
  return {
    top: p.top || 'auto',
    left: p.left || 'auto',
    right: p.right || 'auto',
    bottom: p.bottom || 'auto',
    animationDelay: p.delay || '0s'
  }
}
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES INSTITUCIONALES */
/* =============================================== */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(3deg); }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float { 
  animation: float 7s ease-in-out infinite; 
}

.animate-fade-up { 
  animation: fade-up 0.7s ease-out forwards; 
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }

/* Aspect ratio perfecto para fotos */
.aspect-w-1, .aspect-w-16, .aspect-w-4 {
  position: relative;
  padding-bottom: 100%;
}

.aspect-w-16 { padding-bottom: 56.25%; }
.aspect-w-4 { padding-bottom: 75%; }

.aspect-w-1 > *, .aspect-w-16 > *, .aspect-w-4 > * {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}

/* Recorte elegante de títulos largos */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
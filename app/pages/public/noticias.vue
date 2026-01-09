<!-- pages/noticias.vue -->
<!--
  PÁGINA: Últimas Noticias - Plataforma Municipal de Juventudes Mosquera
  PROPÓSITO: Mostrar noticias, eventos, convocatorias y logros oficiales
  CARACTERÍSTICAS PRINCIPALES:
  - Hero con gradiente 
  - Filtros sticky para navegación rápida por tipo de contenido
  - Grid responsive de tarjetas con imagen de fondo, tag y fecha
  - Animaciones escalonadas suaves
  - CTA final para envío de noticias por la comunidad
  - Totalmente accesible, responsive y optimizado para móviles
  - Datos reales y actualizados al 2025
-->

<template>
  <!-- =============================================== -->
  <!-- CONTENEDOR PRINCIPAL -->
  <!-- =============================================== -->
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">

    <!-- =============================================== -->
    <!-- 1. HERO SECTION -->
    <!-- =============================================== -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#64278C] via-[#13038c] to-[#F2780C]">
      <!-- Contenido principal del hero -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Últimas
          <span class="block text-[#d21cff] drop-shadow-2xl animate-fade-up delay-200">
            Noticias
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto font-light animate-fade-up delay-400 leading-relaxed">
          Eventos, convocatorias, logros y todo lo que pasa en la Plataforma Municipal de Juventudes.
        </p>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 2. FILTROS STICKY - NAVEGACIÓN POR CATEGORÍA -->
    <!-- =============================================== -->
    <section class="py-8 bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <!-- Botón de filtro con estado activo visual -->
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
    <!-- 3. GRID DE NOTICIAS - LISTADO PRINCIPAL -->
    <!-- =============================================== -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <!-- Tarjeta de noticia individual -->
          <article 
            v-for="(noticia, index) in filteredNoticias" 
            :key="index"
            class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                   transform hover:-translate-y-2 transition-all duration-500 
                   animate-fade-up border border-gray-100"
            :style="{ animationDelay: `${(index + 1) * 100}ms` }"
            role="article"
          >
            <!-- Imagen de fondo con gradiente institucional -->
            <div class="relative h-48 md:h-56 overflow-hidden">
              <!-- Overlay oscuro para mejor legibilidad -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
              
              <!-- Fondo con gradiente personalizado por noticia -->
              <div class="absolute inset-0 w-full h-full bg-gradient-to-br" :class="noticia.gradient"></div>

              <!-- Tag de categoría (Evento, Convocatoria, Logro) -->
              <div class="absolute bottom-4 left-4 z-20">
                <span class="px-4 py-1.5 bg-[#F2780C] text-white text-xs font-bold rounded-full 
                             shadow-lg ring-2 ring-white/50">
                  {{ noticia.tag }}
                </span>
              </div>
            </div>

            <!-- Contenido de la noticia -->
            <div class="p-6 md:p-8">
              <!-- Título principal -->
              <h3 class="text-xl md:text-2xl font-black text-[#64278C] mb-3 
                         group-hover:text-[#038C33] transition-colors duration-300 line-clamp-2">
                {{ noticia.title }}
              </h3>

              <!-- Descripción corta (máx 2 líneas) -->
              <p class="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                {{ noticia.desc }}
              </p>

              <!-- Metadatos: fecha y enlace -->
              <div class="flex items-center justify-between text-sm">
                <!-- Fecha con icono -->
                <time class="flex items-center space-x-2 text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>{{ noticia.date }}</span>
                </time>

                <!-- Enlace "Leer más" con animación -->
                <NuxtLink 
                  to="#" 
                  class="text-[#F2780C] font-bold hover:underline flex items-center space-x-1 
                         group-hover:space-x-2 transition-all duration-300"
                >
                  <span>Leer más</span>
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </article>

          <!-- Mensaje cuando no hay resultados -->
          <div v-if="filteredNoticias.length === 0" class="col-span-full text-center py-24">
            <div class="max-w-md mx-auto">
              <p class="text-2xl text-gray-500 font-medium mb-3">
                No hay noticias en esta categoría aún.
              </p>
              <p class="text-gray-400">
                ¡Vuelve pronto! Estamos trabajando en nuevo contenido para ti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 4. LLAMADO A LA ACCION - ENVÍO DE NOTICIAS -->
    <!-- =============================================== -->
    <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-black mb-6 animate-fade-up">
          ¿Tienes una Noticia?
        </h2>
        <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-up delay-200 opacity-90 leading-relaxed">
          Comparte eventos, logros o convocatorias con toda la comunidad juvenil de Mosquera.
        </p>
        <button 
          class="px-10 py-4 bg-[#F2780C] text-white font-black text-lg rounded-full 
                 hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 
                 shadow-2xl animate-fade-up delay-400 hover:shadow-orange-500/50 
                 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
        >
          Enviar Noticia
        </button>
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

/* =============================================== */
/* 1. FILTROS DISPONIBLES POR TIPO DE CONTENIDO */
/* =============================================== */
const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Eventos', value: 'evento' },
  { label: 'Convocatorias', value: 'convocatoria' },
  { label: 'Logros', value: 'logro' }
]

const activeFilter = ref('all') // Filtro activo por defecto: todas las noticias


/* =============================================== */
/* 2. DATOS DE NOTICIAS OFICIALES (6 ejemplos) */
/* =============================================== */
const noticias = [
  {
    title: 'Evento 1: Taller de Emprendimiento Juvenil',
    desc: 'Más de 80 jóvenes participaron en el taller de ideas del CDI La Cumbre. Se generaron 25 proyectos innovadores.',
    date: '28 Oct 2025',
    tag: 'Evento',
    type: 'evento',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    title: 'Convocatoria 1: Mosquera Pila 2025-2',
    desc: 'Apertura de inscripciones para puntos de Mosquera Pila. ¡Postúlate ya y recibe hasta $2.000.000!',
    date: '25 Oct 2025',
    tag: 'Convocatoria',
    type: 'convocatoria',
    gradient: 'bg-gradient-to-br from-[#F2780C] to-[#038C33]'
  },
  {
    title: 'Logro 1: Jóvenes Inscritos',
    desc: 'Récord histórico: 1.247 jóvenes inscritos en la Plataforma Municipal de Juventudes en 2025.',
    date: '20 Oct 2025',
    tag: 'Logro',
    type: 'logro',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#64278C]'
  },
  {
    title: 'Evento 2: Feria de Empleo Juvenil',
    desc: 'Participa en EmpleaYaya: 50 empresas ofrecen vacantes exclusivas para jóvenes de Mosquera.',
    date: '15 Oct 2025',
    tag: 'Evento',
    type: 'evento',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#F2780C]'
  },
  {
    title: 'Convocatoria 2: Plan de Incentivos 2025',
    desc: 'Financiamiento para proyectos juveniles de impacto social. Hasta $15 millones por iniciativa.',
    date: '10 Oct 2025',
    tag: 'Convocatoria',
    type: 'convocatoria',
    gradient: 'bg-gradient-to-br from-[#F2780C] to-[#038C33]'
  },
  {
    title: 'Logro 2: Nueva Directiva 2025',
    desc: 'Johana Chavarro electa nuevamente como Presidenta del Consejo Municipal de Juventud período 2025-2027.',
    date: '05 Oct 2025',
    tag: 'Logro',
    type: 'logro',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  }
]

/* =============================================== */
/* 3. FILTRO REACTIVO - ACTUALIZA LA LISTA AUTOMÁTICAMENTE */
/* =============================================== */
const filteredNoticias = computed(() => {
  if (activeFilter.value === 'all') return noticias
  return noticias.filter(noticia => noticia.type === activeFilter.value)
})

/* =============================================== */
/* 4. POSICIONES DINÁMICAS DE PARTÍCULAS EN EL HERO */
/* =============================================== */
const particleStyle = (index) => {
  const positions = [
    { top: '15%', left: '10%', delay: '0s' },
    { top: '25%', right: '15%', delay: '1s' },
    { bottom: '20%', left: '15%', delay: '0.5s' },
    { bottom: '30%', right: '10%', delay: '1.5s' },
    { top: '50%', left: '5%', delay: '2s' }
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
/* ANIMACIONES PERSONALIZADAS DE ALTO NIVEL */
/* =============================================== */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-30px) rotate(3deg); 
  }
}

@keyframes fade-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-float { 
  animation: float 7s ease-in-out infinite; 
}

.animate-fade-up { 
  animation: fade-up 0.8s ease-out forwards; 
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }

/* Recorte elegante de texto a 2 líneas */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mejora visual para títulos largos */
.line-clamp-2 {
  line-height: 1.4;
}
</style>
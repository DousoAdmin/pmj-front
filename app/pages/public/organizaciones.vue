<!-- pages/organizaciones.vue -->
<!--
  PÁGINA: Organizaciones Juveniles de Mosquera
  PROPÓSITO: Mostrar todas las organizaciones aliadas con filtro por categoría
  CARACTERÍSTICAS:
  - Hero con partículas flotantes animadas
  - Filtros sticky con estado activo visual
  - Grid responsive (1-4 columnas según pantalla)
  - Tarjetas con hover y animaciones escalonadas
  - CTA final para inscripción de nuevas organizaciones
  - Totalmente accesible y optimizado para móviles
  - Datos de ejemplo reales (33 organizaciones)
-->

<template>
  <!-- =============================================== -->
  <!-- CONTENEDOR PRINCIPAL CON FONDO SUAVE -->
  <!-- =============================================== -->
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">

    <!-- =============================================== -->
    <!-- 1. HERO SECTION - IMPACTO VISUAL -->
    <!-- =============================================== -->
    <section class="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden 
                    bg-gradient-to-br from-[#64278C] via-[#00ca47] to-[#F2780C]">

      <!-- Contenido del hero -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Nuestras
          <span class="block text-[#a811a3] drop-shadow-2xl animate-fade-up delay-200">
            Organizaciones
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto font-light animate-fade-up delay-400">
          Aliadas juveniles que impulsan el cambio en Mosquera. Conecta con ellas.
        </p>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 2. FILTROS STICKY - NAVEGACIÓN RÁPIDA -->
    <!-- =============================================== -->
    <section class="py-8 bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <!-- Botón de filtro -->
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 
                   hover:shadow-md active:scale-95"
            :class="activeFilter === filter.value 
              ? 'bg-[#038C33] text-white shadow-lg ring-4 ring-[#038C33]/20' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            :aria-pressed="activeFilter === filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 3. GRID DE ORGANIZACIONES -->
    <!-- =============================================== -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          <!-- Tarjeta de organización (con animación escalonada) -->
          <article 
            v-for="(org, index) in filteredOrgs" 
            :key="index"
            class="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl 
                   transform hover:-translate-y-2 transition-all duration-500 
                   animate-fade-up border border-gray-100"
            :style="{ animationDelay: `${(index + 1) * 70}ms` }"
          >
            <!-- Avatar con gradiente personalizado -->
            <div class="relative w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden 
                        shadow-xl ring-4 ring-white 
                        group-hover:ring-[#F2780C]/50 transition-all duration-300">
              <div class="w-full h-full flex items-center justify-center text-xl font-bold text-white"
                   :class="org.gradient">
                {{ org.initials }}
              </div>
            </div>

            <!-- Nombre de la organización -->
            <h3 class="text-lg md:text-xl font-bold text-[#64278C] mb-2 text-center 
                       group-hover:text-[#038C33] transition-colors duration-300">
              {{ org.name }}
            </h3>

            <!-- Descripción corta (máx 2 líneas) -->
            <p class="text-sm text-gray-600 mb-4 text-center line-clamp-2 min-h-10">
              {{ org.desc }}
            </p>

            <!-- Enlace de acción -->
            <NuxtLink 
              :to="org.link" 
              class="block text-center text-[#F2780C] font-bold hover:underline 
                     flex items-center justify-center space-x-1 mx-auto w-fit 
                     group-hover:space-x-2 transition-all duration-300"
            >
              <span>Visitar</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </article>

          <!-- Mensaje cuando no hay resultados -->
          <div v-if="filteredOrgs.length === 0" class="col-span-full text-center py-20">
            <p class="text-xl text-gray-500 font-medium">
              No hay organizaciones en esta categoría aún.
            </p>
            <p class="text-gray-400 mt-2">
              ¡Pronto tendremos más aliadas!
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 4. LLAMADO A LA ACCION - INSCRIPCIÓN -->
    <!-- =============================================== -->
    <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-black mb-6 animate-fade-up">
          ¿Tu Organización?
        </h2>
        <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-up delay-200 opacity-90">
          Únete a nuestra red de organizaciones. Inscríbete del <strong>15 ene al 15 feb 2026</strong>.
        </p>
        <button 
          class="px-10 py-4 bg-[#F2780C] text-white font-black text-lg rounded-full 
                 hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 
                 shadow-2xl animate-fade-up delay-400 hover:shadow-orange-500/50 
                 active:scale-95"
        >
          Inscribir Organización
        </button>
      </div>
    </section>

  </div>
</template>


<script setup>
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
const orgs = [
  // === SOCIALES (10) ===
  { name: 'Los Meseros', initials: 'OSJ1', desc: 'Juegos de mesa y dinámicas grupales', type: 'social', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Selah', initials: 'OSJ2', desc: 'Prevención de violencia escolar y bullying', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Psicovibes', initials: 'OSJ5', desc: 'Salud mental y perspectiva de género', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Red Solidaria de Apoyo Mutuo', initials: 'OSJ7', desc: 'Liderazgo juvenil comunitario', type: 'social', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Zafic', initials: 'OSJ8', desc: 'Cine foro y análisis audiovisual', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Comunidad M&F', initials: 'OSJ9', desc: 'Cultura asiática, anime y KPOP', type: 'social', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },

  // === CULTURALES (10) ===
  { name: 'Chikara', initials: 'OCJ1', desc: 'Cultura e idioma japonés', type: 'cultural', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Hijos del Zipa', initials: 'OCJ2', desc: 'Educación ambiental y artística', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Manos a la brocha', initials: 'OCJ3', desc: 'Muralismo y arte urbano', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Moravia', initials: 'OCJ4', desc: 'Danza urbana y hip hop', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Taroca', initials: 'OCJ5', desc: 'Danza folclórica colombiana', type: 'cultural', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },

  // === FUNDACIONES (13) ===
  { name: 'Fundación De Vuelta a la Vida', initials: 'DVV', desc: 'Salud mental y prevención del suicidio', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]', link: '#' },
  { name: 'Fundación Ecos Colombia', initials: 'ECO', desc: 'Educación ambiental y reciclaje', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]', link: '#' },
  { name: 'Sabotaje al consumo', initials: 'SAC', desc: 'Formación en liderazgo y consumo responsable', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Fundación Paloma', initials: 'FLP', desc: 'Apoyo a madres adolescentes', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
  { name: 'Alternativa', initials: 'ALT', desc: 'Emprendimiento juvenil rural', type: 'fundacion', gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]', link: '#' },
]

/* =============================================== */
/* 3. FILTRO COMPUTADO - REACTIVIDAD */
/* =============================================== */
const filteredOrgs = computed(() => {
  if (activeFilter.value === 'all') return orgs
  return orgs.filter(org => org.type === activeFilter.value)
})

/* =============================================== */
/* 4. ESTILOS DINÁMICOS PARA PARTÍCULAS */
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
/* ANIMACIONES PERSONALIZADAS */
/* =============================================== */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(3deg); }
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

/* Recorte de texto a 2 líneas */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
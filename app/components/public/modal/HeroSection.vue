<!-- components/HeroSection.vue -->
<!--
  COMPONENTE: HERO PRINCIPAL - Plataforma Municipal de Juventudes Mosquera
  CARACTERÍSTICAS:
  - Gradiente: #a84e0dd5 → #900095 → #8b04c4
  - Tipografía oficial con tamaños responsivos
  - Animaciones escalonadas
  - Botones con feedback visual y estados hover/active
  - Totalmente responsive
-->

<template>
  <!-- =============================================== -->
  <!-- HERO PRINCIPAL - ALTURA COMPLETA DE PANTALLA -->
  <!-- =============================================== -->
  <section 
    class="relative h-screen flex items-center justify-center overflow-hidden 
           bg-gradient-to-br from-[#a84e0dd5] via-[#900095] to-[#8b04c4]"
    role="banner"
    aria-labelledby="hero-title"
  >
    <!-- Fondo con efecto sutil -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- =============================================== -->
    <!-- CONTENIDO PRINCIPAL - TEXTO + BOTONES -->
    <!-- =============================================== -->
    <div class="relative z-10 container mx-auto px-4 text-center">
      
      <!-- Título principal oficial -->
      <h1 
        id="hero-title"
        class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight 
               drop-shadow-2xl animate-fade-up"
      >
        Plataforma Municipal de
        <span 
          class="block text-[#F2780C] drop-shadow-2xl animate-fade-up"
          style="animation-delay: 0.2s"
        >
          Juventudes Mosquera
        </span>
      </h1>

      <!-- Subtítulo oficial -->
      <p 
        class="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 max-w-5xl mx-auto 
               font-light leading-relaxed animate-fade-up"
        style="animation-delay: 0.4s"
      >
        Conecta jóvenes, organizaciones y oportunidades para el desarrollo 
        <strong class="font-bold text-[#F2780C]">social, cultural y educativo</strong> 
        de nuestro municipio.
      </p>

      <!-- Botones de acción principal -->
      <div 
        class="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up"
        style="animation-delay: 0.6s"
      >
        <!-- Botón: Conocer Más -->
        <NuxtLink
          to="/nosotros"
          class="group relative inline-flex items-center justify-center 
                 px-10 py-5 bg-white text-[#64278C] font-black text-lg rounded-full 
                 shadow-2xl hover:shadow-[#64278C]/50 transform hover:-translate-y-2 
                 active:scale-95 transition-all duration-300 
                 focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Conocer más sobre la Plataforma de Juventudes"
        >
          Conocer Más
          <svg 
            class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>

        <!-- Botón: Inscribirme Ahora (abre modal global) -->
        <button
          @click="$emit('open-modal')"
          class="px-10 py-5 bg-transparent border-4 border-white text-white 
                 font-black text-lg rounded-full backdrop-blur-sm
                 hover:bg-white hover:text-[#64278C] transform hover:-translate-y-2 
                 active:scale-95 transition-all duration-300
                 focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Inscribirme ahora en la Plataforma de Juventudes"
        >
          Inscribirme Ahora
        </button>
      </div>
    </div>

    <!-- =============================================== -->
    <!-- FLECHA INDICATIVA - SCROLL ABAJO -->
    <!-- =============================================== -->
    <div 
      class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce 
             cursor-pointer"
      role="button"
      tabindex="0"
      aria-label="Desplazarse hacia abajo"
      @click="scrollToNextSection"
      @keydown.enter.prevent="scrollToNextSection"
      @keydown.space.prevent="scrollToNextSection"
    >
      <svg 
        class="w-12 h-12 text-white drop-shadow-2xl" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

// ===============================================
// ESTADO GLOBAL DEL MODAL DE INSCRIPCIÓN
// ===============================================
const showModal = ref(false)

/**
 * Abre el modal de confirmación
 * Usado por HeroSection y AboutSection
 */
const openRegistrationModal = () => {
  showModal.value = true
  document.body.style.overflow = 'hidden' // Bloquea scroll
}

/**
 * Cierra el modal de forma segura
 * Restaura scroll y enfoca el botón que lo abrió (accesibilidad)
 */
const closeRegistrationModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

/**
 * Cierra al hacer click en el backdrop (fuera del modal)
 */
const closeOnBackdrop = (e) => {
  if (e.target === e.currentTarget) {
    closeRegistrationModal()
  }
}

/**
 * Cierre con tecla Escape (mejor accesibilidad)
 */
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeRegistrationModal()
    }
  })
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})

defineEmits(['open-modal'])

const router = useRouter()

// ===============================================
// FUNCIÓN: SCROLL SUAVE A LA SIGUIENTE SECCIÓN
// ===============================================
const scrollToNextSection = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES OFICIALES DEL HERO */
/* =============================================== */

/* Fade up escalonado */
@keyframes fade-up {
  from { 
    opacity: 0; 
    transform: translateY(40px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-up {
  animation: fade-up 1s ease-out forwards;
}

/* Bounce infinito para la flecha */
@keyframes bounce {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-15px); 
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

/* Mejora de contraste en móviles */
@media (max-width: 640px) {
  .animate-fade-up {
    animation-duration: 0.8s;
  }
}
</style>
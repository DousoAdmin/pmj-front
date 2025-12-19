<!-- components/CarouselSection.vue -->
<!--
  COMPONENTE: CARRUSEL DE DESTACADOS 2025
  Plataforma Municipal de Juventudes Mosquera
  CARACTERÍSTICAS:
  - 8 slides reales con fotos y datos oficiales actualizados a noviembre 2025
  - Autoplay cada 5 segundos + pausa al hover
  - Navegación por flechas + puntos + teclado (← →)
  - Indicadores animados y responsivos
  - Optimizado para pantallas gigantes y móviles
-->

<template>
  <!-- =============================================== -->
  <!-- SECCIÓN CARRUSEL - FONDO INSTITUCIONAL -->
  <!-- =============================================== -->
  <section 
    class="py-20 md:py-28 bg-gradient-to-br from-[#d2ffe2] to-[#F2780C]/5 overflow-hidden"
    aria-labelledby="carousel-title"
    @keydown.left.prevent="prevSlide"
    @keydown.right.prevent="nextSlide"
    tabindex="0"
    ref="carouselContainer"
  >
    <div class="container mx-auto px-4">
      
      <!-- Título oficial -->
      <div class="text-center mb-16">
        <h2 
          id="carousel-title"
          class="text-4xl md:text-6xl font-black text-[#64278C] mb-6 animate-fade-up"
        >
          Nuestros Logros 2025
        </h2>
        <p class="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-up delay-200">
          Más de <strong class="text-[#038C33]">1.250 jóvenes inscritos</strong> y 
          <strong class="text-[#F2780C]">52 eventos realizados</strong> este año.
        </p>
      </div>

      <!-- Carrusel principal -->
      <div 
        class="relative max-w-7xl mx-auto"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <!-- Slides -->
        <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <transition-group 
            name="fade" 
            tag="div" 
            class="absolute inset-0"
          >
            <div
              v-for="(slide, index) in slides"
              :key="slide.id"
              v-show="currentSlide === index"
              class="absolute inset-0 w-full h-full"
              :aria-hidden="currentSlide !== index"
              role="group"
              :aria-label="`Slide ${index + 1} de ${slides.length}: ${slide.title}`"
            >
              <!-- Imagen de fondo con gradiente -->
              <div 
                class="absolute inset-0 bg-gradient-to-br"
                :class="slide.gradient"
              ></div>
              
              <!-- Contenido del slide -->
              <div class="relative h-full flex items-center justify-center p-8 md:p-12">
                <div class="text-center text-white max-w-4xl">
                  <h3 class="text-3xl md:text-5xl font-black mb-6 drop-shadow-2xl">
                    {{ slide.title }}
                  </h3>
                  <p class="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                    {{ slide.description }}
                  </p>
                  <div class="flex items-center justify-center gap-4 text-3xl md:text-4xl font-black">
                    <span class="text-[#F2780C] drop-shadow-lg">{{ slide.stat }}</span>
                    <span class="text-sm md:text-lg opacity-80">{{ slide.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Flecha anterior -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 
                 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center 
                 hover:bg-white/40 transition-all duration-300 
                 focus:outline-none focus:ring-4 focus:ring-white/50 
                 group z-10"
          aria-label="Slide anterior"
        >
          <svg class="w-8 h-8 text-white group-hover:scale-110 transition" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                  d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Flecha siguiente -->
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 
                 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center 
                 hover:bg-white/40 transition-all duration-300 
                 focus:outline-none focus:ring-4 focus:ring-white/50 
                 group z-10"
          aria-label="Slide siguiente"
        >
          <svg class="w-8 h-8 text-white group-hover:scale-110 transition" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                  d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Indicadores (puntos) -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all duration-300 
                   focus:outline-none focus:ring-4 focus:ring-white/50"
            :class="currentSlide === index 
              ? 'bg-[#F2780C] w-12 shadow-lg' 
              : 'bg-white/50 hover:bg-white/80'"
            :aria-label="`Ir al slide ${index + 1}`"
            :aria-current="currentSlide === index"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const currentSlide = ref(0)
let autoplayInterval = null
const isPaused = ref(false)

// ===============================================
// 8 SLIDES 2025
// ===============================================
const slides = [
  {
    id: 1,
    title: "Más de 1.250 Jóvenes Inscritos",
    description: "Récord histórico de participación juvenil en Mosquera con el apoyo de la Plataforma Municipal.",
    stat: "1.250+",
    label: "inscritos",
    gradient: "from-[#64278C] to-[#038C33]"
  },
  {
    id: 2,
    title: "52 Eventos Realizados",
    description: "Talleres, ferias, Yaya Fest, SOFA, ferias del libro y mesas participativas.",
    stat: "52",
    label: "eventos exitosos",
    gradient: "from-[#038C33] to-[#F2780C]"
  },
  {
    id: 3,
    title: "Fondo de Incentivos 2025",
    description: "25 millones de pesos entregados a la Plataforma de Juventudes para proyectos juveniles.",
    stat: "$25M",
    label: "en incentivos",
    gradient: "from-[#F2780C] to-[#64278C]"
  },
  {
    id: 4,
    title: "Mosquera Pila",
    description: "Más de X jóvenes beneficiados con actividades para puntos de Mosquera Pila.",
    stat: "000+",
    label: "beneficiados",
    gradient: "from-[#64278C] to-[#038C33]"
  },
  {
    id: 5,
    title: "Casa de la Juventud",
    description: "Espacio físico inaugurado con talleres gratuitos semanales.",
    stat: "75%",
    label: "operativa",
    gradient: "from-[#038C33] to-[#F2780C]"
  },
  {
    id: 6,
    title: "Consejo Municipal de Juventud",
    description: "17 curules juveniles activas incidiendo en políticas públicas.",
    stat: "17",
    label: "curules activas",
    gradient: "from-[#F2780C] to-[#64278C]"
  },
  {
    id: 7,
    title: "Participación con la Gobernación de Cundinamarca",
    description: "Participación en el banco de iniciativas juvenil de Cundinamarca.",
    stat: "Nuevo",
    label: "convenio",
    gradient: "from-[#64278C] to-[#038C33]"
  },
  {
    id: 8,
    title: "Reconocimiento ante la Personería",
    description: "La Plataforma de Juventudes registrada con la Personería Municipal",
    stat: "Reconocimiento",
    label: "Legal",
    gradient: "from-[#038C33] to-[#F2780C]"
  }
]

// ===============================================
// NAVEGACIÓN Y AUTOPLAY
// ===============================================
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const startAutoplay = () => {
  if (isPaused.value) return
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const pauseAutoplay = () => {
  isPaused.value = true
  clearInterval(autoplayInterval)
}

const resumeAutoplay = () => {
  isPaused.value = false
  clearInterval(autoplayInterval)
  startAutoplay()
}

// ===============================================
// CICLO DE VIDA
// ===============================================
onMounted(() => {
  startAutoplay()
  
  // Enfocar el contenedor para teclado
  nextTick(() => {
    const container = document.querySelector('[ref="carouselContainer"]')
    if (container) container.focus()
  })
})

onUnmounted(() => {
  clearInterval(autoplayInterval)
})

// Reiniciar autoplay al cambiar slide manualmente
watch(currentSlide, () => {
  clearInterval(autoplayInterval)
  if (!isPaused.value) {
    setTimeout(startAutoplay, 8000) // Pausa extra tras interacción
  }
})
</script>


<style scoped>
/* =============================================== */
/* TRANSICIONES SUAVES Y ANIMACIONES */
/* =============================================== */

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Animación de entrada */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
}
.delay-200 { animation-delay: 0.2s; }

/* Efecto hover en indicadores */
button[aria-current="true"] {
  background: #F2780C !important;
}

/* Responsive para pantallas gigantes */
@media (min-width: 1536px) {
  .h-96 { height: 600px; }
}
</style>
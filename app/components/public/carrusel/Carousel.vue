<template>
  <section class="py-12 md:py-32 bg-[#00A036] overflow-hidden">
    <div class="container mx-auto px-4">
      
      <div class="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <span class="text-[#F2780C] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-xl md:text-xl block mb-2 md:mb-4">Gestión 2025</span>
        <h2 class="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
          Nuestra Huella en <br class="hidden md:block"/> el Territorio.
        </h2>
      </div>

      <div class="relative max-w-7xl mx-auto" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
        
        <div class="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 z-30">
          <button @click="prevSlide" class="nav-arrow" aria-label="Anterior">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
          </button>
        </div>
        <div class="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 z-30">
          <button @click="nextSlide" class="nav-arrow" aria-label="Siguiente">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div class="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-slate-100">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentSlide" class="flex flex-col md:flex-row min-h-fit md:min-h-[600px]">
              
              <div class="w-full md:w-[55%] order-1 md:order-2 p-4 md:p-8">
                <div 
                  class="w-full aspect-square md:h-full rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden flex items-center justify-center transition-all duration-700"
                  :style="{ backgroundColor: slides[currentSlide].hexColor }"
                >
                  <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, white 2px, transparent 2px); background-size: 30px 30px;"></div>
                  <span class="relative z-10 text-white font-black text-[8rem] md:text-[18rem] opacity-20">
                    {{ currentSlide + 1 }}
                  </span>
                </div>
              </div>

              <div class="w-full md:w-[45%] order-2 md:order-1 p-6 md:p-16 flex flex-col justify-center">
                <div class="mb-6 md:mb-8 text-center md:text-left">
                  <span class="text-6xl md:text-9xl font-black text-[#522178] leading-none block">
                    {{ slides[currentSlide].stat }}
                  </span>
                  <span class="text-sm md:text-xl font-bold text-[#00B140] uppercase tracking-widest">
                    {{ slides[currentSlide].label }}
                  </span>
                </div>
                
                <div class="space-y-4 text-center md:text-left">
                  <h3 class="text-2xl md:text-5xl font-black text-slate-800 leading-tight">
                    {{ slides[currentSlide].title }}
                  </h3>
                  <p class="text-base md:text-xl text-slate-500 leading-relaxed">
                    {{ slides[currentSlide].description }}
                  </p>
                </div>

                <div class="mt-8 flex justify-center md:justify-start">
                  <button class="cta-slide w-full md:w-auto" :style="{ backgroundColor: slides[currentSlide].hexColor }">
                    VER LOGRO
                  </button>
                </div>
              </div>

            </div>
          </transition>
        </div>

        <div class="mt-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 px-4">
          <div class="flex md:hidden gap-4 w-full">
            <button @click="prevSlide" class="nav-arrow-mobile flex-1" aria-label="Anterior">Anterior</button>
            <button @click="nextSlide" class="nav-arrow-mobile flex-1" aria-label="Siguiente">Siguiente</button>
          </div>

          <div class="flex gap-2">
            <button
              v-for="(_, index) in slides"
              :key="index"
              @click="currentSlide = index"
              class="h-2 rounded-full transition-all duration-500"
              :class="currentSlide === index ? 'w-10 md:w-16 bg-[#522178]' : 'w-2 bg-slate-300'"
            ></button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let autoplayInterval = null

const slides = [
  {
    id: 1,
    title: "Crecimiento de Inscritos",
    description: "La confianza de los jóvenes mosquerunos en nuestras instituciones ha superado todas las expectativas este año.",
    stat: "1.250",
    label: "Liderazgos",
    hexColor: "#522178"
  },
  {
    id: 2,
    title: "Agenda de Alto Impacto",
    description: "52 eventos diseñados para potenciar el talento artístico, deportivo y tecnológico de nuestra juventud.",
    stat: "52",
    label: "Eventos",
    hexColor: "#00B140"
  },
  {
    id: 3,
    title: "Incentivos al Talento",
    description: "Gestionamos recursos directos para que las iniciativas juveniles no se queden solo en ideas.",
    stat: "$25M",
    label: "Inversión",
    hexColor: "#F2780C"
  }
]

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % slides.length }
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }
const startAutoplay = () => { autoplayInterval = setInterval(nextSlide, 7000) }
const pauseAutoplay = () => clearInterval(autoplayInterval)
const resumeAutoplay = () => startAutoplay()

onMounted(startAutoplay)
onUnmounted(() => clearInterval(autoplayInterval))
</script>

<style scoped>
/* Flechas Desktop */
.nav-arrow {
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #522178;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.nav-arrow:hover {
  background-color: #522178;
  color: white;
  transform: scale(1.1);
}

/* Botones Navegación Móvil */
.nav-arrow-mobile {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 800;
  color: #522178;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.cta-slide {
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

/* Transición optimizada */
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s ease-in; }
.slide-fade-enter-from { opacity: 0; transform: translateY(10px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* Ajuste para pantallas muy pequeñas */
@media (max-width: 380px) {
  .text-6xl { font-size: 3.5rem; }
  .text-4xl { font-size: 2rem; }
}
</style>
<template>
  <!-- =============================================== -->
  <!-- HERO PRINCIPAL - ALTURA COMPLETA DE PANTALLA -->
  <!-- =============================================== -->
<section 
  class="relative min-h-0 md:min-h-[100dvh] flex flex-col md:items-center md:justify-center overflow-hidden bg-[#522178] pt-28 pb-12 md:pt-32 md:pb-20"
  role="banner"
  aria-labelledby="hero-title"
>
    <!-- Patrón de fondo geométrico sutil -->
<div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none texture-grain"></div>
      
      <div class="absolute inset-0 opacity-[0.07]" 
     style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2240%22 viewBox=%220 0 80 40%22%3E%3Cpath d=%22M0 40 L40 0 L80 40%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221.5%22/%3E%3C/svg%3E'); background-size: 80px 40px;">
</div>

      <div class="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-linear-to-br from-[#F2780C]/10 to-white/5 blur-xl md:blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-linear-to-tr from-white/5 to-[#F2780C]/10 blur-xl md:blur-3xl"></div>
    </div>

    <!-- =============================================== -->
    <!-- CONTENIDO PRINCIPAL - TEXTO + BOTONES -->
    <!-- =============================================== -->
    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0">
      <div class="max-w-7xl mx-auto">
        <div class="text-center lg:text-left lg:flex lg:items-center lg:justify-between lg:gap-12">
          <!-- Columna izquierda: Texto -->
          <div class="lg:w-1/2 lg:pr-0">
            <!-- Etiqueta -->
            <div 
              class="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-8 animate-fade-up"
            >
              <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#F2780C] mr-2 animate-pulse"></span>
              <span class="text-xs md:text-sm font-semibold text-white uppercase tracking-wide">
                Plataforma Municipal
              </span>
            </div>

            <!-- Título principal oficial -->
            <h1 
              id="hero-title"
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight animate-fade-up"
              :style="{ animationDelay: '0.1s' }"
            >
              <span class="block">Juventudes</span>
              <span 
                class="block bg-linear-to-r from-[#F2780C] to-[#FF9E5E] bg-clip-text text-transparent mt-1 md:mt-2"
              >
                Mosquera
              </span>
            </h1>

            <!-- Subtítulo oficial -->
            <p 
              class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-up"
              :style="{ animationDelay: '0.3s' }"
            >
              Conectamos jóvenes, organizaciones y oportunidades para el desarrollo 
              <span class="text-[#F2780C] font-semibold">social, cultural y educativo</span> 
              de nuestro municipio.
            </p>

            <!-- Botones de acción principal -->
            <div 
              class="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-up"
              :style="{ animationDelay: '0.4s' }"
            >
              <!-- Botón primario: Explorar Plataforma -->
              <NuxtLink
                to="/public/nosotros"
                class="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-[#00A036] text-white font-bold text-sm md:text-base lg:text-lg rounded-lg md:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#F2780C]/40 transform hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A036] focus:ring-offset-2 focus:ring-offset-[#2A1B5E] overflow-hidden"
                aria-label="Explorar la Plataforma de Juventudes"
              >
                <!-- Fondo animado en hover -->
                <div class="absolute inset-0 bg-linear-to-r from-[#00A036] to-[#00ae3a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span class="relative z-10 flex items-center">
                  Explorar Plataforma
                  <svg 
                    class="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                <!-- Efecto sutil en hover -->
                <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NuxtLink>

              <!-- Botón secundario: Unirse Ahora -->
              <button
                @click="$emit('open-modal')"
                class="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white text-white font-bold text-sm md:text-base lg:text-lg rounded-lg md:rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/80 transform hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2A1B5E] overflow-hidden"
                aria-label="Unirse ahora a la Plataforma de Juventudes"
              >
                <!-- Fondo sutil en hover -->
                <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span class="relative z-10 flex items-center justify-center">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Unirse Ahora
                </span>
                
                <!-- Borde animado en hover -->
                <div class="absolute inset-0 border border-transparent group-hover:border-white/30 rounded-lg md:rounded-xl transition-all duration-300"></div>
              </button>
            </div>

            <!-- Estadísticas o características rápidas -->
            <div 
              class="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4 animate-fade-up"
              :style="{ animationDelay: '0.5s' }"
            >
              <div class="text-center p-2 md:p-4 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F2780C]/30 transition-colors duration-300">
                <div class="text-lg md:text-xl lg:text-2xl font-bold text-[#F2780C]">500+</div>
                <div class="text-xs md:text-sm text-gray-300">Jóvenes</div>
              </div>
              <div class="text-center p-2 md:p-4 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-colors duration-300">
                <div class="text-lg md:text-xl lg:text-2xl font-bold text-white">50+</div>
                <div class="text-xs md:text-sm text-gray-300">Organizaciones</div>
              </div>
              <div class="text-center p-2 md:p-4 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F2780C]/30 transition-colors duration-300">
                <div class="text-lg md:text-xl lg:text-2xl font-bold text-[#F2780C]">100+</div>
                <div class="text-xs md:text-sm text-gray-300">Oportunidades</div>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Elemento visual -->



          
          <!-- Columna derecha: Elemento visual -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ===============================================
// EMIT PARA ABRIR MODAL
// ===============================================
const emit = defineEmits(['open-modal'])

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
/* Textura de ruido analógico */
.texture-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3group%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
/* Fade up escalonado */
@keyframes fade-up {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-up {
  opacity: 0;
  animation: fade-up 0.8s ease-out forwards;
}

/* Float animation para tarjetas */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(var(--tw-rotate)); 
  }
  50% { 
    transform: translateY(-10px) rotate(var(--tw-rotate)); 
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Bounce suave para la flecha */
@keyframes bounce-slow {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-5px); 
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Mejora de contraste y rendimiento en móviles */
@media (max-width: 1024px) {
  .animate-float {
    animation: fade-up 0.8s ease-out forwards;
  }
}

@media (max-width: 640px) {
  .animate-fade-up {
    animation-duration: 0.6s;
  }
  
  .animate-bounce-slow {
    animation-duration: 1.5s;
  }
}
</style>
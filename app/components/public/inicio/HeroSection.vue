<template>
  <section 
    class="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#522178] py-12 md:py-24"
    role="banner"
    aria-labelledby="hero-title"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 opacity-[0.05] texture-pattern"></div>
      
      <div class="absolute top-1/4 -left-20 w-64 md:w-[30rem] h-64 md:h-[30rem] rounded-full bg-[#F2780C]/20 blur-[100px] will-change-transform"></div>
      <div class="absolute bottom-1/4 -right-20 w-64 md:w-[30rem] h-64 md:h-[30rem] rounded-full bg-[#00A036]/20 blur-[100px] will-change-transform"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 sm:px-8 lg:px-12 mt-16 md:mt-0">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        
        <div class="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
          <div class="animate-fade-up">
            <span class="inline-block text-[#F2780C] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 border-b-2 border-[#F2780C] pb-1">
              Plataforma Municipal
            </span>
            <h1 id="hero-title" class="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.95] tracking-tighter mb-6 md:mb-8">
              <span class="text-[#00ae3a]">Juventudes</span> <br class="hidden sm:block" /> de
              <span class="text-[#F2780C]">Mosquera</span>
            </h1>
          </div>

          <div class="max-w-2xl mx-auto lg:mx-0 animate-fade-up animation-delay-200">
            <p class="text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium px-2 sm:px-0">
              Conectamos 
              <span class="inline-block px-2 sm:px-3 py-0.5 bg-white text-[#522178] rounded-full font-bold shadow-lg -rotate-1">organizaciones</span>, 
              fortalecemos el 
              <span class="text-[#00ae3a] font-black">liderazgo joven</span> 
              y transformamos ideas en 
              <span class="inline-block px-2 sm:px-3 py-0.5 bg-[#F2780C] text-white rounded-md font-bold shadow-md rotate-1">acciones reales</span>.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 md:mt-12 animate-fade-up animation-delay-300">
            <NuxtLink to="/public/nosotros" class="w-full sm:w-auto px-8 py-4 bg-[#00A036] hover:bg-[#00ae3a] text-white font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
              ¡Conócenos!
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NuxtLink>

            <button @click="scrollToForm" class="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95">
              Unirse Ahora
            </button>
          </div>

          <div class="mt-12 md:mt-16 grid grid-cols-3 gap-3 sm:gap-6 animate-fade-up animation-delay-500">
            <div v-for="(stat, i) in stats" :key="i" class="p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center lg:items-start transition-colors hover:bg-white/10">
              <span class="text-xl sm:text-3xl font-black text-white" :class="{'text-[#F2780C]': i === 1}">{{ stat.value }}</span>
              <span class="text-[8px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest text-center lg:text-left">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-2/5 flex justify-center items-center order-1 lg:order-2 mb-4 lg:mb-0">
          <div 
            class="relative w-44 h-44 sm:w-64 sm:h-64 lg:w-96 lg:h-96 group cursor-pointer"
            @mouseenter="showMotivation"
            @mouseleave="hideMotivation"
          >
            <div class="absolute inset-0 bg-gradient-to-tr from-[#F2780C]/30 to-[#038C33]/20 rounded-full blur-[60px] animate-pulse-glow will-change-transform group-hover:scale-125 transition-transform duration-700"></div>
            
            <Transition name="pop">
              <div v-if="currentMessage" class="absolute -top-12 left-0 right-0 flex justify-center z-30 pointer-events-none">
                <div class="bg-white text-[#522178] px-4 py-2 rounded-xl font-black text-[10px] sm:text-xs shadow-2xl uppercase border-2 border-[#F2780C] whitespace-nowrap">
                  {{ currentMessage }}
                </div>
              </div>
            </Transition>

            <NuxtImg 
              src="/images/favicon.webp" 
              alt="Logo Juventudes" 
              loading="eager"
              fetchpriority="high"
              class="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-float-slow will-change-transform group-hover:rotate-3 transition-transform duration-500" 
            />

            <div class="hidden lg:block absolute top-0 right-0 w-4 h-4 bg-[#F2780C] rounded-full animate-orbit"></div>
            <div class="hidden lg:block absolute bottom-10 left-0 w-3 h-3 bg-[#00A036] rounded-full animate-orbit-slow"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const currentMessage = ref('')
const motivations = [
  "¡El futuro es tuyo!", 
  "¡Haz que tu voz cuente!", 
  "¡Mosquera cree en ti!",
  "¡Liderazgo que transforma!",
  "¡Únete al cambio!",
  "¡Tu idea tiene poder!"
]

const stats = [
  { value: '500+', label: 'Jóvenes' },
  { value: '33+', label: 'Organizaciones' },
  { value: '50+', label: 'Líderes' }
]

const showMotivation = () => {
  const filtered = motivations.filter(m => m !== currentMessage.value)
  currentMessage.value = filtered[Math.floor(Math.random() * filtered.length)]
}

const hideMotivation = () => {
  currentMessage.value = ''
}

const scrollToForm = () => {
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.texture-pattern {
  background-image: radial-gradient(circle, #fff 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Animaciones con aceleración de Hardware */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px) translateZ(0); }
  to { opacity: 1; transform: translateY(0) translateZ(0); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateZ(0); }
  50% { transform: translateY(-15px) translateZ(0); }
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
  50% { transform: scale(1.15) translateZ(0); opacity: 0.5; }
}

.animate-fade-up { opacity: 0; animation: fade-up 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards; }
.animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-500 { animation-delay: 0.5s; }

/* Transición del Mensaje Pop */
.pop-enter-active { 
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
}
.pop-leave-active { 
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes pop-in {
  0% { transform: scale(0.5) translateZ(0); opacity: 0; }
  100% { transform: scale(1) translateZ(0); opacity: 1; }
}

/* Orbits */
@keyframes orbit {
  from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
}
.animate-orbit { animation: orbit 12s linear infinite; }
.animate-orbit-slow { animation: orbit 18s linear infinite reverse; }
</style>
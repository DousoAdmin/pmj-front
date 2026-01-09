<template>
  <header class="relative bg-gradient-to-r from-[#00B140] via-[#00A036] to-[#008C2E] shadow-2xl sticky top-0 z-50 border-b border-white/10 overflow-visible">
    
    <div class="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
      <svg class="w-full h-full min-w-[1000px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="url(#waveGradient)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z">
          <animate attributeName="d" dur="12s" repeatCount="indefinite"
            values="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z;
                    M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,138.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z;
                    M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z" />
        </path>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F2780C"/><stop offset="50%" stop-color="#64278C"/><stop offset="100%" stop-color="#F2780C"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="relative px-4 py-4 md:py-5">
      <div class="flex justify-between items-center max-w-7xl mx-auto">

        <NuxtLink to="/public/" class="flex items-center space-x-3 group z-10">
          <div class="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-1 shadow-2xl group-hover:scale-110 transition-all duration-300">
            <div class="w-full h-full bg-gradient-to-br from-[#F2780C] to-[#64278C] rounded-full flex items-center justify-center">
              <span class="text-white font-black text-xl md:text-2xl drop-shadow-md">pmj</span>
            </div>
          </div>
          <div class="hidden sm:block leading-none">
            <h1 class="text-xl md:text-2xl font-black text-white tracking-tight">Plataforma de Juventudes</h1>
            <p class="text-[#F2780C] font-bold tracking-[0.25em] text-sm uppercase">Mosquera</p>
          </div>
        </NuxtLink>

        <nav class="hidden [@media(min-width:1208px)]:flex items-center space-x-1 z-10">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
            class="relative px-8 py-3 rounded-full font-bold text-white transition-all duration-300 group overflow-hidden min-w-[120px] flex flex-col items-center justify-center text-center"
            active-class="active-link"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            <div class="relative z-10">
              <span class="block transition-transform duration-300 group-hover:-translate-x-2">{{ item.name }}</span>
              
              <svg class="absolute top-1/2 -right-6 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:-right-5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
              </svg>
            </div>

            <span class="active-indicator absolute bottom-1 h-1 w-0 bg-[#F2780C] rounded-full transition-all duration-300"></span>
          </NuxtLink>
        </nav>

        <button @click="isMobileOpen = true" class="[@media(min-width:1208px)]:hidden p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20 z-10">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="fixed inset-0 z-[150] pointer-events-none" :class="{ 'pointer-events-auto': isMobileOpen }">
      <Transition name="fade">
        <div v-if="isMobileOpen" @click="isMobileOpen = false" class="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"></div>
      </Transition>

      <Transition name="slide">
        <div v-if="isMobileOpen" class="absolute right-0 top-0 bottom-0 w-[280px] sm:w-[320px] bg-[#00B140] shadow-2xl pointer-events-auto flex flex-col border-l border-white/20 overflow-hidden">
          <div class="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#F2780C] rounded-full blur-[80px] opacity-20"></div>

          <div class="flex items-center justify-between p-6 border-b border-white/10 relative z-10">
            <span class="text-white font-black uppercase tracking-widest">Navegación</span>
            <button @click="isMobileOpen = false" class="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <nav class="flex flex-col p-4 space-y-2 relative z-10">
            <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
              @click="isMobileOpen = false"
              class="px-6 py-4 rounded-2xl text-white font-bold text-xl flex flex-col group transition-all"
              active-class="mobile-active-link"
            >
              <div class="flex items-center justify-between w-full">
                <span>{{ item.name }}</span>
                <svg class="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              <span class="active-indicator-mobile h-1 w-0 bg-[#F2780C] rounded-full transition-all duration-300 mt-1"></span>
            </NuxtLink>
          </nav>

          <div class="mt-auto p-8 border-t border-white/10 text-center relative z-10">
            <p class="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">Mosquera Joven</p>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isMobileOpen = ref(false)

const navItems = [
  { name: 'Inicio', path: '/public/' },
  { name: 'Nosotros', path: '/public/nosotros' },
  { name: 'Noticias', path: '/public/noticias' },
  { name: 'Galería', path: '/public/galeria' },
  { name: 'Organizaciones', path: '/public/organizaciones' }
]

watch(isMobileOpen, (val) => {
  if (process.client) document.body.style.overflow = val ? 'hidden' : 'auto'
})

const handleEscape = (e) => { if (e.key === 'Escape') isMobileOpen.value = false }
onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => window.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
/* Transiciones Drawer */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

/* Lógica de Item Activo (Desktop) */
.active-link .active-indicator {
  width: 40px; /* Tamaño de la línea fija al centro */
}
.active-link {
  background: rgba(255, 255, 255, 0.1);
}

/* Lógica de Item Activo (Móvil) */
.mobile-active-link .active-indicator-mobile {
  width: 40px;
}
.mobile-active-link {
  background: rgba(255, 255, 255, 0.15);
  color: #F2780C !important;
}

header {
  overflow: visible !important;
}
</style>
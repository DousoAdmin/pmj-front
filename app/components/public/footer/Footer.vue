<template>
  <footer class="relative bg-white pt-20 pb-10 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-1.5 flex">
      <div class="h-full w-1/3 bg-[#00B140]"></div>
      <div class="h-full w-1/3 bg-[#F2780C]"></div>
      <div class="h-full w-1/3 bg-[#522178]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
        
        <div class="lg:col-span-5 space-y-8">
          <NuxtLink to="/public/" class="inline-flex items-center space-x-4 group">
  <div class="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110">
    <NuxtImg 
      src="/images/favicon.webp" 
      alt="Logo Juventudes Mosquera" 
      class="w-full h-full object-contain -translate-x-1"
    />
  </div>

  <div>
    <h2 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter leading-none">
      PLATAFORMA <span class="text-[#00B140]">MUNICIPAL</span>
    </h2>
    <p class="text-[#F2780C] text-xs sm:text-sm font-black uppercase tracking-[0.3em] mt-1">
      Juventudes de Mosquera
    </p>
  </div>
</NuxtLink>
          
          <p class="text-gray-500 text-lg leading-relaxed max-w-md font-medium">
            Construyendo el futuro de Mosquera a través del liderazgo, la participación y el cambio social.
          </p>

          <div class="flex space-x-4">
            <a v-for="social in socials" :key="social.name" :href="social.url"
                target="_blank" rel="noopener noreferrer"
               class="w-12 h-12 rounded-xl border-2 border-gray-50 flex items-center justify-center text-gray-400 hover:border-current transition-all duration-300 hover:-translate-y-1"
               :class="social.hoverClass">
               <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h3 class="text-[#522178] font-black uppercase text-[11px] tracking-[0.25em] mb-8">Explorar</h3>
          <ul class="grid grid-cols-1 gap-4">
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink :to="item.path" class="text-gray-500 hover:text-[#00B140] font-bold text-sm flex items-center group">
                <span class="w-0 group-hover:w-4 h-0.5 bg-[#00B140] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <div class="bg-gray-50 rounded-4xl p-8 border border-gray-100 relative">
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-[#F2780C]/5 rounded-full -z-10"></div>
            
            <h3 class="text-gray-900 font-black text-xl mb-4">¿Representas una organización?</h3>
            <p class="text-gray-500 text-sm mb-6 leading-relaxed">
              Registra tu grupo juvenil y haz parte de las decisiones que transforman nuestro territorio.
            </p>
            
            <button @click="$emit('open-registration')" 
                    class="group w-full py-4 bg-[#522178] text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-gray-900 transition-all flex items-center justify-center space-x-3">
              <span>Registrarse ahora</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="pt-10 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div class="flex items-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-tighter">
            <svg class="w-4 h-4 text-[#00B140]" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
            <span>Mosquera, Cundinamarca</span>
          </div>
          <div class="flex items-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-tighter">
            <svg class="w-4 h-4 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.455 5.454l.774-1.547a1 1 0 011.06-.54l4.435.741a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            <span>+57 319 383 1573</span>
          </div>
        </div>

        <p class="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          © {{ new Date().getFullYear() }} Plataforma de Juventudes
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { h } from 'vue'

const navItems = [
  { name: 'Inicio', path: '/public/' },
  { name: 'Nosotros', path: '/public/nosotros' },
  { name: 'Noticias', path: '/public/noticias' },
  { name: 'Galería', path: '/public/galeria' },
  { name: 'Organizaciones', path: '/public/organizaciones' }
]

// Iconos Sólidos Corregidos
const FacebookIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' })
])

const InstagramIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  // Path del cuerpo principal, el círculo central y el punto superior
  h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.698.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z' }),
  h('path', { d: 'M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z' }),
  h('circle', { cx: '18.406', cy: '5.594', r: '1.44' })
])
const socials = [
  { name: 'Facebook', url: 'https://www.facebook.com/pmjmosquera/', icon: FacebookIcon, hoverClass: 'hover:text-[#522178] hover:shadow-lg hover:shadow-[#522178]/10' },
  { name: 'Instagram', url: 'https://www.instagram.com/pmj_mosquera/', icon: InstagramIcon, hoverClass: 'hover:text-[#F2780C] hover:shadow-lg hover:shadow-[#F2780C]/10' }
]
</script>

<style scoped>
/* Optimizamos el renderizado de fuentes */
h2, h3, button {
  letter-spacing: -0.02em;
}

/* Efecto suave para los enlaces */
a {
  backface-visibility: hidden;
}
</style>
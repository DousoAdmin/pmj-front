<!-- components/layout/LayoutHeader.vue -->
<!--
  =============================================================================
  HEADER 
  =============================================================================

  DESCRIPCIÓN GENERAL
  -------------------
  • Navegación responsive (desktop + móvil)
  • Menú móvil full-screen con overlay y backdrop-blur
  • Ondas SVG animadas de fondo

  RESPONSIVE BREAKPOINTS
  ----------------------
  - sm: 640px  → muestra texto del logo
  - xl: 1208px → muestra navegación desktop

  DEPENDENCIAS
  ------------
  • NuxtLink (Nuxt 3)
  • Vue 3 Composition API + <script setup>
  • Tailwind CSS v3+
  • SVG inline con animación SMIL

  FUNCIONALIDADES CLAVE
  ---------------------
  1. Menú móvil con bloqueo de scroll
  2. Cierre del menú con tecla Escape
  3. Navegación reactiva que cierra el menú al hacer click
  4. Efectos hover con transiciones suaves
  5. Ondas decorativas animadas infinitas
  =============================================================================
-->

<template>
  <!-- 
    HEADER PRINCIPAL
    - sticky + top-0: siempre visible al hacer scroll
    - z-50: por encima de todo contenido
    - border-b: separación visual sutil
    - overflow-visible: permite que el menú móvil sobresalga
  -->
  <header class="relative bg-gradient-to-r from-[#00B140] via-[#00A036] to-[#008C2E] shadow-2xl sticky top-0 z-50 border-b border-white/10 overflow-visible">

    <!-- 
      ONDAS DECORATIVAS ANIMADAS 
      - opacity-10: sutil, no distrae del contenido
      - pointer-events-none: no interfieren con clicks
      - SMIL animation: cambia la forma de la onda cada 12s
      - Gradiente naranja-morado-naranja 
    -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <svg class="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="url(#waveGradient)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z">
          <animate 
            attributeName="d" 
            values="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z;
                    M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,138.7C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L0,320Z;
                    M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L0,320Z" 
            dur="12s" 
            repeatCount="indefinite"
          />
        </path>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F2780C"/>
            <stop offset="50%" stop-color="#64278C"/>
            <stop offset="100%" stop-color="#F2780C"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- CONTENEDOR PRINCIPAL DEL HEADER -->
    <div class="relative px-4 py-5">
      <div class="flex justify-between items-center max-w-7xl mx-auto">

        <!-- 
          LOGO + NOMBRE OFICIAL 
          - NuxtLink: navegación SPA sin recarga
          - group: habilita hover en todo el contenedor
          - Efectos hover: explosión de luz + escala + rotación
        -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <!-- Explosión de luz al hover -->
            <div class="absolute inset-0 w-16 h-16 bg-white/30 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-700"></div>
            <!-- Círculo del logo -->
            <div class="relative w-20 h-20 bg-white rounded-full p-1 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <div class="w-full h-full bg-gradient-to-br from-[#F2780C] to-[#64278C] rounded-full flex items-center justify-center">
                <span class="text-white font-black text-2xl drop-shadow-md">YAYA</span>
              </div>
            </div>
          </div>
          <!-- Texto del logo (oculto en móviles) -->
          <div class="hidden sm:block">
            <h1 class="text-2xl md:text-3xl font-black text-white drop-shadow-lg tracking-tight">
              Plataforma de Juventudes
            </h1>
            <p class="text-lg md:text-xl font-bold text-[#F2780C] tracking-widest -mt-1">
              MOSQUERA
            </p>
          </div>
        </NuxtLink>

        <!-- 
          NAVEGACIÓN DESKTOP 
          - Oculta hasta 1208px (clase personalizada con @media)
          - Efecto de brillo deslizante al hover
          - Icono de flecha que aparece al hover
        -->
        <nav class="hidden [@media(min-width:1208px)]:flex items-center space-x-1">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="relative px-6 py-3 rounded-full font-bold text-white transition-all duration-300 group overflow-hidden text-sm md:text-base"
            @click="isMobileOpen = false"
          >
            <!-- Brillo deslizante -->
            <span class="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
            <span class="relative z-10 flex items-center space-x-2">
              <span>{{ item.name }}</span>
              <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </NuxtLink>
        </nav>

        <!-- 
          BOTÓN MENÚ MÓVIL 
          - Visible solo en pantallas < 1208px
          - Glassmorphism con backdrop-blur
          - Animación de rotación al abrir/cerrar
        -->
        <button 
          @click="isMobileOpen = !isMobileOpen"
          class="[@media(min-width:1208px)]:hidden p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 shadow-lg z-50"
          aria-label="Abrir menú móvil"
        >
          <svg class="w-6 h-6 text-white transition-transform duration-300" :class="{ 'rotate-180': isMobileOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <!-- Icono hamburguesa -->
            <path v-if="!isMobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/>
            <!-- Icono X (cerrar) -->
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 
      MENÚ MÓVIL FULL-SCREEN 
      - fixed + inset-0: cubre toda la pantalla
      - z-[60]: por encima del header pero debajo de modales
      - @click fuera del menú: cierra automáticamente
    -->
    <div 
      v-if="isMobileOpen"
      class="fixed inset-0 z-[60] flex flex-col"
      @click="isMobileOpen = false"
    >
      <!-- Overlay oscuro con blur -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>

      <!-- Contenido del menú móvil -->
      <nav class="relative mt-20 bg-gradient-to-b from-[#00B140] to-[#008C2E] shadow-2xl">
        <div class="px-4 py-8 space-y-3 max-w-7xl mx-auto">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="isMobileOpen = false"
            class="block px-8 py-5 rounded-2xl font-bold text-white text-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-between group backdrop-blur-sm"
          >
            <span>{{ item.name }}</span>
            <!-- Flecha animada al hover -->
            <svg class="w-7 h-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

/* ========================================
   ESTADO REACTIVO
   ======================================== */
// Controla si el menú móvil está abierto o cerrado
const isMobileOpen = ref(false)

/* ========================================
   DATOS DE NAVEGACIÓN
   ======================================== */
// Items del menú principal - fáciles de mantener
const navItems = [
  { name: 'Inicio', path: '/public/' },
  { name: 'Nosotros', path: '/public/nosotros' },
  { name: 'Noticias', path: '/public/noticias' },
  { name: 'Galería', path: '/public/galeria' },
  { name: 'Organizaciones', path: '/public/organizaciones' }
]

/* ========================================
   EFECTOS SECUNDARIOS
   ======================================== */
// Bloquea el scroll del body cuando el menú móvil está abierto
watch(isMobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : 'auto'
})

// Cierra el menú al presionar Escape
const handleEscape = (e) => {
  if (e.key === 'Escape') isMobileOpen.value = false
}

// Registro y limpieza de eventos
onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto' // Restaurar siempre
})
</script>

<style scoped>
/* 
  ESTILOS ESPECÍFICOS 
  - overflow-visible !important: evita que el menú móvil sea cortado
  - Usado solo en este componente para no afectar globalmente
*/
header {
  overflow: visible !important;
}
</style>
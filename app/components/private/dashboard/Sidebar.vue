
<template>
  <!-- Overlay (solo móvil cuando está abierto) -->
  <div
    v-show="open"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    @click="$emit('toggle')"
  />

  <nav
    class="fixed lg:static top-0 left-0 z-50 h-screen
           flex flex-col bg-gradient-to-b from-[#522178] to-[#3d1958]
           overflow-hidden will-change-transform
           transition-[transform,width] duration-300 ease-in-out"
    :class="
      open
        ? 'w-64 translate-x-0 border-r border-white/10'
        : 'w-64 -translate-x-full border-r-0 lg:w-0 lg:translate-x-0'
    "
  >

    <div class="h-1 flex flex-shrink-0">
      <div class="flex-1 bg-[#00B140]"></div>
      <div class="flex-1 bg-[#F2780C]"></div>
      <div class="flex-1 bg-[#522178]"></div>
    </div>


    <div class="p-6 flex items-center justify-between border-b border-white/10 flex-shrink-0">
      <NuxtLink to="/public/" class="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
        <img
          ref="brandLogo"
          src="/images/favicon.webp"
          alt="logo"
          class="w-12 h-12 object-contain transition-opacity duration-300"
          :class="props.hideBrandLogo ? 'opacity-0' : 'opacity-100'"
        />
        <div>
          <h3 class="font-black text-sm text-white">Plataforma<br/><span class="text-[#00B140]">Municipal</span></h3>
          <p class="text-xs text-[#F2780C] font-black uppercase tracking-widest">Juventudes</p>
        </div>
      </NuxtLink>
      <button
        type="button"
        @click="$emit('toggle')"
        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:rotate-6 flex-shrink-0 bg-[#522178] hover:bg-[#3d1958]"
        :aria-label="open ? 'Ocultar menú' : 'Mostrar menú'"
      >
      
        <svg v-if="open" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white transform rotate-180">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <!-- Profile -->
    <div class="p-4 flex items-center gap-3 border-b border-white/10 flex-shrink-0">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B140] to-[#009235] flex items-center justify-center text-white font-black text-sm">U</div>
      <div>
        <p class="text-sm font-black text-white">Usuario Demo</p>
        <p class="text-xs text-gray-400">Organización</p>
      </div>
    </div>

    <!-- Navigation (Grouped by sections) -->
    <div class="flex-1 overflow-y-auto custom-scroll">
      <!-- GENERAL Section -->
      <div class="pt-4">
        <p class="px-6 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">General</p>
        <ul class="space-y-1 px-3">
          <SidebarItem
            v-for="item in generalItems"
            :key="item.key"
            :to="item.to"
            :label="item.label"
            :itemClass="item.itemClass"
            :iconColor="item.iconColor"
          >
            <template #icon>
              <span v-html="item.icon" />
            </template>
          </SidebarItem>
        </ul>
      </div>

      <!-- GESTIÓN Section -->
      <div class="pt-6">
        <p class="px-6 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Gestión</p>
        <ul class="space-y-1 px-3">
          <SidebarItem
            v-for="item in gestionItems"
            :key="item.key"
            :to="item.to"
            :label="item.label"
            :itemClass="item.itemClass"
            :iconColor="item.iconColor"
          >
            <template #icon>
              <span v-html="item.icon" />
            </template>
          </SidebarItem>
        </ul>
      </div>

      <!-- CONTENIDO Section -->
      <div class="pt-6">
        <p class="px-6 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Contenido</p>
        <ul class="space-y-1 px-3">
          <SidebarItem
            v-for="item in contenidoItems"
            :key="item.key"
            :to="item.to"
            :label="item.label"
            :itemClass="item.itemClass"
            :iconColor="item.iconColor"
          >
            <template #icon>
              <span v-html="item.icon" />
            </template>
          </SidebarItem>
        </ul>
      </div>
    </div>

    <!-- Footer actions (always at bottom) -->
    <div class="p-4 border-t border-white/10 flex-shrink-0 space-y-3 bg-black/20">
      <NuxtLink to="/public/" class="flex items-center gap-3 px-3 py-2.5 w-full text-white rounded-lg font-black text-sm hover:bg-white/5 transition-colors duration-200 group">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 bg-[#00B140]">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875a2.25 2.25 0 0 1 4.5 0V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M12 12.75h.008v.008H12v-.008Z"/></svg>
        </div>
        Menú Principal
      </NuxtLink>
      <NuxtLink to="/private/menu-dashboard/settings" class="flex items-center gap-3 px-3 py-2.5 w-full text-white rounded-lg font-black text-sm hover:bg-white/5 transition-colors duration-200 group">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 bg-[#522178]">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg>
        </div>
        Configuración
      </NuxtLink>
      <button class="flex items-center gap-3 px-3 py-2.5 w-full text-white rounded-lg font-black text-sm hover:bg-white/5 transition-colors duration-200 group">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 bg-[#F2780C]">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"/></svg>
        </div>
        Cerrar sesión
      </button>
    </div>
  </nav>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { ref, watch } from 'vue'

const brandLogo = ref(null)

const props = defineProps({
  open: { type: Boolean, default: true },
  hideBrandLogo: { type: Boolean, default: false },
})

defineEmits(['toggle'])

defineExpose({ brandLogo })

// Debug: log when open prop changes
watch(() => props.open, (newVal) => {
  console.log('Sidebar.vue: open prop changed to', newVal)
})

// GENERAL section
const generalItems = [
  { key: 'inicio', to: '/private/dashboard', label: 'Inicio', itemClass: 'sidebar-item--inicio', iconColor: 'bg-[#00B140]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h7v7H3V3zm11 0h7v4h-7V3zM3 14h7v7H3v-7zm11 6h7v1h-7v-1z"/></svg>' }
]

// GESTIÓN section
const gestionItems = [
  { key: 'organizaciones', to: '/private/menu-dashboard/organizaciones', label: 'Organizaciones', itemClass: 'sidebar-item--organizaciones', iconColor: 'bg-[#F2780C]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>' },
  { key: 'inscripciones', to: '/private/menu-dashboard/inscripciones', label: 'Inscripciones', itemClass: 'sidebar-item--inscripciones', iconColor: 'bg-[#522178]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>' },
  { key: 'usuarios', to: '/private/menu-dashboard/usuarios', label: 'Usuarios', itemClass: 'sidebar-item--usuarios', iconColor: 'bg-[#00B140]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' }
]

// CONTENIDO section
const contenidoItems = [
  { key: 'noticias', to: '/private/menu-dashboard/noticias', label: 'Noticias', itemClass: 'sidebar-item--noticias', iconColor: 'bg-[#F2780C]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/></svg>' },
  { key: 'galeria', to: '/private/menu-dashboard/galeria', label: 'Galería', itemClass: 'sidebar-item--galeria', iconColor: 'bg-[#522178]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>' },
  { key: 'reportes', to: '/private/menu-dashboard/reportes', label: 'Reportes', itemClass: 'sidebar-item--reportes', iconColor: 'bg-[#00B140]', icon: '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>' }
]
</script>

<style scoped>
.font-black { letter-spacing: -0.02em; }

.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #F2780C;
  border-radius: 9999px;
  border: 2px solid rgba(0, 0, 0, 0.15);
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #ff8a2a;
}

.custom-scroll::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #F2780C rgba(255, 255, 255, 0.06);
}
</style>

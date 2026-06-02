<template>
  <header 
    class="fixed top-0 left-0 right-0 z-110 transition-all duration-500 ease-in-out border-b"
    :class="[isScrolled ? 'bg-[#522178]/90 backdrop-blur-xl shadow-2xl py-2 border-white/10' : 'bg-transparent py-4 sm:py-6 border-transparent']"
  >
    <div class="max-w-360 mx-auto px-4 sm:px-6 lg:px-12 relative">
      <div class="flex justify-between items-center gap-4">

        <NuxtLink to="/" class="flex items-center group z-10 shrink-0">
          <div class="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110">
            <NuxtImg src="/images/favicon.webp" alt="Logo" class="w-full h-full object-contain" />
          </div>

          <div class="flex flex-col justify-center bg-white p-2.5 px-4 rounded-2xl shadow-lg border-l-4 border-gray-100 ml-4">
            <h1 class="font-black leading-none tracking-tighter uppercase text-[12px] sm:text-lg lg:text-xl">
              <span class="text-black">Plataforma</span>
              <span class="text-[#00B140] ml-1">Municipal</span>
            </h1>
            <p class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#F2780C] mt-1">
              Juventudes de Mosquera
            </p>
          </div>
        </NuxtLink>

        <nav class="hidden xl:flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 mx-4 shadow-inner">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
            class="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 text-white hover:bg-white/10"
            active-class="active-nav-link">
            {{ item.name }}
          </NuxtLink>
        </nav>

        <div class="hidden xl:flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 gap-2 shadow-inner">
          <NuxtLink to="/private/auth/login" 
            class="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all duration-300">
            Iniciar Sesión
          </NuxtLink>
          <NuxtLink to="/private/auth/register" 
            class="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white bg-[#00B140] hover:bg-[#009235] shadow-lg shadow-[#00B140]/20 transition-all duration-300">
            Regístrate
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-4 shrink-0 xl:hidden">
          <button @click="isMobileOpen = true"
            class="flex flex-col justify-center items-end space-y-1.5 w-10 h-10 group z-50"
            aria-label="Menú">
            <span class="h-1 w-8 rounded-full bg-white shadow-sm transition-all"></span>
            <span class="h-1 w-5 rounded-full bg-[#F2780C] group-hover:w-8 transition-all shadow-sm"></span>
            <span class="h-1 w-6 rounded-full bg-[#00B140] group-hover:w-8 transition-all shadow-sm"></span>
          </button>
        </div>

      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMobileOpen" class="fixed inset-0 z-200 xl:hidden">
          <div class="absolute inset-0 bg-[#2D1244]/80 backdrop-blur-md" @click="isMobileOpen = false"></div>
          
          <Transition name="slide-custom">
            <div v-if="isMobileOpen"
              class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#522178]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col border-l border-white/20">
              
              <div class="p-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-r from-white/5 to-transparent opacity-50"></div>
                
                <div class="flex items-center space-x-4 relative z-10">
                  <div class="flex items-center justify-center transition-transform duration-300">
                    <NuxtImg 
                      src="/images/favicon.webp" 
                      alt="Logo" 
                      class="w-14 h-14 sm:w-16 sm:h-16 object-contain" 
                    />
                  </div>

                  <div class="flex flex-col justify-center">
                    <h2 class="font-black text-white uppercase tracking-tighter text-sm sm:text-base leading-none">
                      <span>Plataforma</span>
                      <span class="text-[#00B140] ml-1.5">Municipal</span>
                    </h2>
                    <p class="text-[9px] sm:text-[10px] text-[#F2780C] font-black uppercase tracking-[0.15em] mt-1.5 leading-tight">
                      Juventudes de Mosquera
                    </p>
                  </div>
                </div>

                <button @click="isMobileOpen = false" 
                  class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 active:scale-90 transition-all">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                <div class="px-4 mb-4">
                  <p class="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Explorar</p>
                </div>
                
                <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" @click="isMobileOpen = false"
                  class="group flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 border border-transparent hover:bg-white/10 hover:border-white/10 hover:translate-x-1"
                  active-class="mobile-active-link-enhanced">
                  
                  <div class="flex items-center space-x-4">
                    <div class="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" :class="item.staticColor">
                      <component :is="item.icon" class="w-5.5 h-5.5 text-white" />
                    </div>
                    <span class="font-black text-white uppercase tracking-widest text-[11px]">{{ item.name }}</span>
                  </div>

                  <svg class="w-4 h-4 text-white/20 group-hover:text-[#F2780C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </nav>

              <div class="p-6 space-y-4 bg-black/30 backdrop-blur-xl border-t border-white/10">
                 <div class="flex flex-col gap-3">
                   <NuxtLink to="/private/auth/login" @click="isMobileOpen = false"
                      class="group flex items-center justify-center w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all active:scale-[0.98]">
                      <span class="group-hover:mr-2 transition-all">Iniciar Sesión</span>
                    </NuxtLink>

                    <NuxtLink to="/private/auth/register" @click="isMobileOpen = false"
                      class="flex items-center justify-center w-full p-4 rounded-2xl bg-[#00B140] text-white font-black uppercase tracking-widest text-[11px] shadow-[0_10px_20px_rgba(0,177,64,0.3)] hover:bg-[#009235] transition-all active:scale-[0.98]">
                      Regístrate
                    </NuxtLink>
                 </div>
                 
                 <p class="text-center text-[9px] text-white/30 uppercase tracking-[0.2em]">Mosquera • 2026</p>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, h } from "vue";

const isScrolled = ref(false);
const isMobileOpen = ref(false);

// --- Iconos en Render Functions ---
const HomeIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }),
  ]);
const UsersIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }),
  ]);
const PhotoIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }),
  ]);
const OrgIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }),
  ]);
const DashboardIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }),
  ]);

// --- Items de Navegación Principal ---
const navItems = [
  {
    name: "Inicio",
    path: "/",
    icon: HomeIcon,
    staticColor: "bg-[#00B140]",
  },
  {
    name: "Nosotros",
    path: "/public/nosotros",
    icon: UsersIcon,
    staticColor: "bg-[#F2780C]",
  },
  {
    name: "Galería",
    path: "/public/galeria",
    icon: PhotoIcon,
    staticColor: "bg-[#F2780C]",
  },
  {
    name: "Organizaciones",
    path: "/public/organizaciones",
    icon: OrgIcon,
    staticColor: "bg-[#00B140]",
  },
  {
    name: "Dashboard",
    path: "/private/dashboard",
    icon: DashboardIcon,
    staticColor: "bg-[#522178]",
  },
];

// --- Lógica de Scroll y Body Lock ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

watch(isMobileOpen, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.active-nav-link {
  background-color: #f2780c !important;
  color: white !important;
  box-shadow: 0 4px 20px rgba(242, 120, 12, 0.4);
}

.mobile-active-link-enhanced {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-custom-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-custom-leave-active {
  transition: all 0.4s ease-in;
}

.slide-custom-enter-from,
.slide-custom-leave-to {
  transform: translateX(100%);
}

header {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
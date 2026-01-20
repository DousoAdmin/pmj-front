<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out" :class="[
    isScrolled
      ? 'bg-white/5 backdrop-blur-xl shadow-2xl py-3'
      : 'bg-transparent py-6',
  ]">
    <div class="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
      :class="isScrolled ? 'bg-white/10 opacity-100' : 'opacity-0'"></div>

    <div class="max-w-350 mx-auto px-4 sm:px-6 lg:px-12 relative">
      <div class="flex justify-between items-center gap-2 sm:gap-8">
        <NuxtLink to="/public/"
          class="flex items-center space-x-2 sm:space-x-4 group z-10 flex-1 lg:flex-none min-w-0 w-full lg:w-auto">
          <div
            class="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <NuxtImg src="/images/favicon.webp" alt="Logo"
              class="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </div>

          <div
            class="flex flex-col justify-center border-l border-white/20 pl-2 sm:pl-4 space-y-1.5 min-w-0 lg:min-w-max">
            <h1 class="font-black leading-none tracking-tighter uppercase text-[15px] sm:text-2xl lg:text-3xl">
              <span class="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm shadow-sm inline-block">
                <span class="text-black">Plataforma</span>
                <span class="text-[#00B140] ml-1">Municipal</span>
              </span>
            </h1>

            <div class="flex">
              <p
                class="bg-white px-2 py-0.5 rounded-sm text-[8px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[#F2780C] shadow-sm">
                Juventudes de Mosquera
              </p>
            </div>
          </div>
        </NuxtLink>

        <nav
          class="hidden xl:flex items-center space-x-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
            class="px-6 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 text-white hover:bg-white/10 whitespace-nowrap"
            active-class="active-nav-link">
            {{ item.name }}
          </NuxtLink>
        </nav>

        <div class="flex items-center space-x-2 sm:space-x-6 shrink-0">
          <div class="hidden lg:flex items-stretch p-1 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <NuxtLink to="/public/auth/Login"
              class="px-6 py-2.5 text-[12px] font-black tracking-widest text-white rounded-xl">LOGIN</NuxtLink>
            <NuxtLink to="/public/auth/Register"
              class="px-8 py-2.5 bg-[#00B140] text-white text-[12px] font-black rounded-xl shadow-lg">REGISTRARSE
            </NuxtLink>
          </div>

          <button @click="isMobileOpen = true"
            class="xl:hidden flex flex-col justify-center items-end space-y-1.5 w-10 h-10 group z-50 shrink-0">
            <span class="h-1 w-8 rounded-full bg-white shadow-sm"></span>
            <span class="h-1 w-5 rounded-full bg-[#F2780C] group-hover:w-8 transition-all shadow-sm"></span>
            <span class="h-1 w-6 rounded-full bg-[#00B140] group-hover:w-8 transition-all shadow-sm"></span>
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMobileOpen" class="fixed inset-0 z-100 xl:hidden">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isMobileOpen = false"></div>
          <Transition name="slide-custom">
            <div v-if="isMobileOpen"
              class="absolute right-0 top-0 bottom-0 w-[320px] bg-[#522178] shadow-2xl flex flex-col border-l border-white/10">
              <div class="p-8 flex items-center justify-between border-b border-white/10">
                <div class="flex items-center space-x-4 min-w-0">
                  <div class="w-12 h-12 shrink-0">
                    <NuxtImg src="/images/favicon.webp" alt="Logo" class="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <span class="font-black text-white uppercase italic tracking-tighter text-xl truncate">Menú</span>
                </div>
                <button @click="isMobileOpen = false" class="text-white/50 hover:text-white transition-colors">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav class="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
                <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" @click="isMobileOpen = false"
                  class="group flex items-center space-x-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                  active-class="mobile-active-link">
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12"
                    :class="item.staticColor">
                    <component :is="item.icon" class="w-6 h-6 text-white" />
                  </div>
                  <span class="font-black text-white uppercase tracking-widest text-sm">{{ item.name }}</span>
                </NuxtLink>
              </nav>
              <div class="p-8 bg-black/20 space-y-4">
                <NuxtLink to="/public/auth/Login" @click="isMobileOpen = false"
                  class="w-full py-4 text-white font-black text-center text-xs tracking-widest block border border-white/20 rounded-xl">
                  INICIAR SESIÓN</NuxtLink>
                <NuxtLink to="/public/auth/Register" @click="isMobileOpen = false"
                  class="w-full py-4 bg-[#00B140] text-white font-black rounded-xl text-center text-xs tracking-widest block shadow-lg shadow-[#00B140]/20">
                  REGISTRARSE</NuxtLink>
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

// Iconos (Mantenidos de tu original)
const HomeIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    }),
  ]);
const UsersIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    }),
  ]);
const NewsIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    }),
  ]);
const PhotoIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    }),
  ]);
const OrgIcon = () =>
  h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    }),
  ]);

const navItems = [
  {
    name: "Inicio",
    path: "/public/",
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
    name: "Noticias",
    path: "/public/noticias",
    icon: NewsIcon,
    staticColor: "bg-[#522178]",
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
];

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
/* Estilos ajustados */
.active-nav-link {
  background-color: #f2780c !important;
  color: white !important;
  box-shadow: 0 4px 20px rgba(242, 120, 12, 0.4);
}

.mobile-active-link {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.mobile-active-link span {
  color: #f2780c !important;
}

/* Transiciones */
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

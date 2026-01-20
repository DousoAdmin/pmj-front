<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
    :class="[
      isScrolled
        ? 'bg-white/10 backdrop-blur-lg shadow-md py-2'
        : 'bg-transparent py-5',
    ]"
  >
    <div
      class="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500"
      :class="isScrolled ? 'opacity-100' : 'bg-transparent opacity-0'"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex justify-between items-center">
        <NuxtLink
          to="/public/"
          class="flex items-center space-x-3 sm:space-x-4 group z-10 shrink-0"
        >
          <div
            class="relative w-14 h-14 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          >
            <img
              src="/images/favicon.webp"
              alt="Logo Plataforma Juventudes"
              class="w-full h-full object-contain -translate-x-1 sm:-translate-x-2 drop-shadow-md"
            />
          </div>

          <div class="flex flex-col justify-center">
            <h1
              :class="[
                isScrolled
                  ? 'text-white bg-[#522178]/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg text-sm sm:text-2xl'
                  : 'text-white text-base sm:text-2xl',
              ]"
              class="font-black leading-none transition-all duration-300 tracking-tight whitespace-nowrap"
            >
              Plataforma Juventudes
            </h1>
            <p
              :class="[
                isScrolled
                  ? 'text-[#00B140] bg-white px-3 py-1 rounded-lg shadow-sm mt-2'
                  : 'text-[#F2780C] mt-1',
              ]"
              class="text-[11px] sm:text-[16px] font-black uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center justify-center text-center mx-auto lg:mx-0 w-max"
            >
              Mosquera
            </p>
          </div>
        </NuxtLink>

        <nav
          class="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md p-1 rounded-full transition-all duration-500"
          :class="{ 'bg-gray-100': isScrolled }"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-5 py-2 rounded-full text-sm font-bold transition-all duration-300"
            :class="
              isScrolled
                ? 'text-gray-700 hover:text-[#522178] hover:bg-white'
                : 'text-white hover:bg-white/20'
            "
            active-class="active-nav-link"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <div class="hidden lg:flex items-center">
          <div 
            class="flex items-stretch p-1 rounded-full transition-all duration-500 border"
            :class="isScrolled ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/10 border-white/20 backdrop-blur-md'"
          >
            <NuxtLink
              to="/public/auth/Login"
              class="px-5 py-2 text-[12px] font-black tracking-wider transition-all duration-300 rounded-full flex items-center"
              :class="isScrolled ? 'text-[#522178] hover:bg-gray-100' : 'text-white hover:bg-white/20'"
            >
              INICIAR SESIÓN
            </NuxtLink>

            <NuxtLink
              to="/public/auth/Register"
              class="px-6 py-2 text-[12px] font-black tracking-wider rounded-full shadow-md transition-all duration-300 active:scale-95 flex items-center"
              :class="[
                isScrolled
                  ? 'bg-[#00B140] text-white hover:bg-[#008f33] shadow-[#00B140]/20'
                  : 'bg-white text-[#00B140] hover:shadow-lg',
              ]"
            >
              REGISTRARSE
            </NuxtLink>
          </div>
        </div>

        <button 
          @click="isMobileOpen = true"
          class="lg:hidden flex flex-col justify-center items-end space-y-1.5 w-9 h-9 group"
          :class="isScrolled ? 'text-[#522178]' : 'text-white'"
        >
          <span class="h-0.5 w-7 rounded-full bg-current transition-all"></span>
          <span class="h-0.5 w-5 rounded-full bg-[#F2780C] transition-all group-hover:w-7"></span>
          <span class="h-0.5 w-6 rounded-full bg-[#00B140] transition-all group-hover:w-7"></span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMobileOpen" class="fixed inset-0 z-100 lg:hidden">
          <div
            class="absolute inset-0 bg-[#522178]/30 backdrop-blur-sm"
            @click="isMobileOpen = false"
          ></div>

          <Transition name="slide-custom">
            <div
              v-if="isMobileOpen"
              class="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col"
            >
              <div class="p-6 flex items-center justify-between border-b border-gray-50">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 flex items-center justify-center">
                    <img src="/images/favicon.webp" alt="Logo" class="w-full h-full object-contain" />
                  </div>
                  <span class="font-black text-[#522178] uppercase text-[14px] tracking-widest">Menú</span>
                </div>
                <button @click="isMobileOpen = false" class="p-2 text-gray-400 hover:text-[#522178]">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.path"
                  :to="item.path"
                  @click="isMobileOpen = false"
                  class="group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 hover:bg-gray-50"
                  active-class="mobile-active-link"
                >
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm" :class="item.staticColor">
                    <component :is="item.icon" class="w-5 h-5 text-white" />
                  </div>
                  <span class="font-bold text-gray-700 group-hover:text-[#522178]">{{ item.name }}</span>
                </NuxtLink>
              </nav>

              <div class="p-6 mt-auto bg-gray-50 space-y-3">
                <NuxtLink
                  to="/public/auth/Login"
                  @click="isMobileOpen = false"
                  class="w-full py-3 text-[#522178] font-black text-center text-sm tracking-widest block"
                >
                  INICIAR SESIÓN
                </NuxtLink>
                <NuxtLink
                  to="/public/auth/Register"
                  @click="isMobileOpen = false"
                  class="w-full py-4 bg-[#00B140] text-white font-black rounded-xl shadow-lg shadow-[#00B140]/20 text-center text-sm tracking-widest block active:scale-95 transition-all"
                >
                  REGISTRARSE
                </NuxtLink>
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
const HomeIcon = () => h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })]);
const UsersIcon = () => h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" })]);
const NewsIcon = () => h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" })]);
const PhotoIcon = () => h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })]);
const OrgIcon = () => h("svg", { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [h("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" })]);

const navItems = [
  { name: "Inicio", path: "/public/", icon: HomeIcon, staticColor: "bg-[#00B140]" },
  { name: "Nosotros", path: "/public/nosotros", icon: UsersIcon, staticColor: "bg-[#F2780C]" },
  { name: "Noticias", path: "/public/noticias", icon: NewsIcon, staticColor: "bg-[#522178]" },
  { name: "Galería", path: "/public/galeria", icon: PhotoIcon, staticColor: "bg-[#F2780C]" },
  { name: "Organizaciones", path: "/public/organizaciones", icon: OrgIcon, staticColor: "bg-[#00B140]" },
];

const handleScroll = () => { isScrolled.value = window.scrollY > 20; };

watch(isMobileOpen, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => { window.removeEventListener("scroll", handleScroll); });
</script>

<style scoped>
.active-nav-link {
  background-color: #522178 !important;
  color: white !important;
}

.mobile-active-link {
  background-color: #f8fafc;
}
.mobile-active-link span {
  color: #522178 !important;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-custom-enter-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-custom-leave-active { transition: all 0.2s ease-in; }
.slide-custom-enter-from, .slide-custom-leave-to { transform: translateX(100%); }

header {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>
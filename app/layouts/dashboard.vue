<template>
  <div class="min-h-screen flex relative">
    <Sidebar
      ref="sidebarRef"
      :open="isSidebarOpen"
      :hideBrandLogo="hideBrandLogo"
      @toggle="isSidebarOpen = !isSidebarOpen"
    />

    <main class="flex-1 flex flex-col w-full min-w-0">
      
      <div class="lg:hidden p-4 bg-white/5 border-b border-white/10">
        <button
          type="button"
          class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          @click="isSidebarOpen = !isSidebarOpen"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div class="flex-1">
        <slot />
      </div>
    </main>

    <button
      v-if="!isSidebarOpen"
      type="button"
      @click="openWithFly()"
      class="flex lg:flex items-center gap-3 fixed left-0 top-24 z-50
             py-3 pr-4 pl-0 rounded-r-3xl shadow-xl
             bg-gradient-to-b from-[#522178] to-[#3d1958]
             border border-white/10 transition-all duration-300 group hover:pr-6"
      aria-label="Ir al menú"
      title="Ir al menú"
    >
      <!--Asomar logo -->
      <span class="w-10 h-16 overflow-hidden flex items-center">
        <img
          ref="handleLogo"
          src="/images/favicon.webp"
          alt="logo"
          class="w-16 h-16 object-contain opacity-95
                 -ml-6 rotate-[18deg]
                 transition-all duration-300
                 group-hover:-ml-3 group-hover:rotate-[10deg]"
        />
      </span>

      <span class="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 text-white
                   transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </span>

      <span class="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span class="px-3 py-1.5 rounded-xl text-xs font-black text-white bg-black/60 backdrop-blur border border-white/10 shadow-lg whitespace-nowrap">
          Ir al menú
        </span>
      </span>
    </button>

    <div v-if="fly.show" class="fixed pointer-events-none z-[9999]" :style="fly.style">
      <img src="/images/favicon.webp" class="w-full h-full object-contain" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '~/components/private/dashboard/Sidebar.vue'

const isSidebarOpen = ref(false)
const sidebarRef = ref(null)
const handleLogo = ref(null)
const hideBrandLogo = ref(false)

const fly = reactive({
  show: false,
  src: '/images/favicon.webp',
  style: {},
  opacity: 1,
})

function handleResize() {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // ejecutar al montar
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function rectOf(el) {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { x: r.left, y: r.top, w: r.width, h: r.height }
}

const px = (n) => `${Math.round(n)}px`

function finishFlyAtLogo(to) {
  // 1) SNAP (sin transición, clava exacto al logo)
  fly.style.transition = 'none'
  fly.style.left = px(to.x)
  fly.style.top = px(to.y)
  fly.style.width = px(to.w)
  fly.style.height = px(to.h)
  fly.style.transform = 'translate3d(0,0,0) rotate(0deg)'

  // 2) Espera 1 frame → prende el logo real
  requestAnimationFrame(() => {
    hideBrandLogo.value = false

    // 3) Espera 1 frame → apaga el fly
    requestAnimationFrame(() => {
      fly.show = false
    })
  })
}

async function openWithFly() {
  const from = rectOf(handleLogo.value)
  if (!from) {
    isSidebarOpen.value = true
    return
  }

  // mostrar logo volador EN ORIGEN sin animación (gap zero)
  fly.show = true
  fly.opacity = 1
  fly.style = {
    left: px(from.x),
    top: px(from.y),
    width: px(from.w),
    height: px(from.h),
    transform: 'translate3d(0,0,0) rotate(18deg)',
    transition: 'none',
  }

  hideBrandLogo.value = true

  isSidebarOpen.value = true
  await nextTick()

  await new Promise(r => setTimeout(r, 320))

  const toEl = sidebarRef.value?.brandLogo
  const to = rectOf(toEl?.value || toEl)
  if (!to) return

  fly.style = {
    left: px(from.x),
    top: px(from.y),
    width: px(from.w),
    height: px(from.h),
    transform: 'translate3d(0,0,0) rotate(18deg)',
    transition:
      'left 520ms cubic-bezier(.2,.9,.2,1), top 520ms cubic-bezier(.2,.9,.2,1), width 520ms, height 520ms, transform 520ms',
  }

  await new Promise(r => requestAnimationFrame(r))

  fly.style = {
    ...fly.style,
    left: px(to.x),
    top: px(to.y),
    width: px(to.w),
    height: px(to.h),
    transform: 'translate3d(0,0,0) rotate(0deg)',
  }

  setTimeout(() => {
    finishFlyAtLogo(to)
  }, 540)
}
</script>

<style scoped>
@keyframes peek {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

.animate-peek {
  animation: peek 1.6s ease-in-out infinite;
}
</style>


<template>
  <div class="min-h-screen flex relative">
    <!-- Sidebar con prop isFlying -->
    <Sidebar
      ref="sidebarRef"
      :open="isSidebarOpen"
      :hideBrandLogo="hideBrandLogo"
      :isFlying="isFlying"
      @toggle="onToggleSidebar"
    />

    <main class="flex-1 flex flex-col w-full min-w-0">
      <TopHeader
        ref="topHeaderRef"
        :username="'Usuario Demo'"
        :organization="'Organización Demo'"
        :notifCount="4"
        :msgCount="1"
        :sidebarOpen="isSidebarOpen"
        @openMenuFly="openWithFly"
        @toggleSidebar="isSidebarOpen = true"
        @search="onSearch"
        @openNotifications="onNotifications"
        @openMessages="onMessages"
        @openProfile="onProfile"
      />

      <div class="flex-1">
        <slot />
      </div>
    </main>

    <div v-if="fly.show" class="fixed pointer-events-none z-[9999]" :style="{ ...fly.style, willChange: 'left, top, width, height, transform' }">
      <img src="/images/favicon.webp" class="w-full h-full object-contain" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '~/components/private/dashboard/Sidebar.vue'
import TopHeader from '~/components/private/dashboard/TopHeader.vue'

const isSidebarOpen = ref(false)
const sidebarRef = ref(null)
const topHeaderRef = ref(null)
const hideBrandLogo = ref(false)
const isFlying = ref(false)

function onSearch(query) {
  console.log('Buscar texto:', query)
}

function onNotifications() {
  console.log('Abrir notificaciones')
}

function onMessages() {
  console.log('Abrir mensajes')
}

function onProfile() {
  console.log('Abrir perfil')
}

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
  handleResize() 
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
  fly.style.transition = 'none'
  fly.style.left = px(to.x)
  fly.style.top = px(to.y)
  fly.style.width = px(to.w)
  fly.style.height = px(to.h)
  fly.style.transform = 'translate3d(0,0,0) rotate(0deg)'
  fly.style.opacity = 1

  requestAnimationFrame(() => {
    hideBrandLogo.value = false

    requestAnimationFrame(() => {
      fly.style.transition = 'opacity 140ms ease-out'
      fly.style.opacity = 0

      setTimeout(() => {
        fly.show = false
        fly.style.opacity = 1 
      }, 150)
    })
  })
}



async function openWithFly() {
  if (isFlying.value) return

  const fromEl = topHeaderRef.value?.yayaBtn
  const from = rectOf(fromEl)
  if (!from) {
    isSidebarOpen.value = true
    return
  }

  isFlying.value = true // ✅ ANTES de abrir sidebar

  // hide header button immediately (no transition) to avoid visual duplication
  const btn = topHeaderRef.value?.yayaBtn
  if (btn) {
    btn.style.transition = 'none'
    btn.style.opacity = '0'
  }

  fly.show = true
  fly.style = {
    left: px(from.x),
    top: px(from.y),
    width: px(from.w),
    height: px(from.h),
    transform: 'translate3d(0,0,0) rotate(18deg)',
    opacity: 1,
    transition: 'none',
  }

  hideBrandLogo.value = true

  isSidebarOpen.value = true
  await nextTick()
  await new Promise(r => setTimeout(r, 50))

  const toEl = sidebarRef.value?.brandLogo
  const to = rectOf(toEl)
  if (!to) {
    if (btn) {
      btn.style.transition = ''
      btn.style.opacity = ''
    }
    fly.show = false
    hideBrandLogo.value = false
    isFlying.value = false
    return
  }

  requestAnimationFrame(() => {
    fly.style = {
      ...fly.style,
      transition:
        'left 520ms cubic-bezier(.2,.9,.2,1), top 520ms cubic-bezier(.2,.9,.2,1), width 520ms, height 520ms, transform 520ms',
    }

    requestAnimationFrame(() => {
      fly.style = {
        ...fly.style,
        left: px(to.x),
        top: px(to.y),
        width: px(to.w),
        height: px(to.h),
        transform: 'translate3d(0,0,0) rotate(0deg)',
      }
    })
  })

  setTimeout(() => {
    hideBrandLogo.value = false
    fly.show = false
    if (btn) {
      btn.style.transition = ''
      btn.style.opacity = ''
    }
    isFlying.value = false
  }, 540)
}

async function closeWithFly() {
  if (isFlying.value) return

  const fromEl = sidebarRef.value?.brandLogo
  const from = rectOf(fromEl)

  if (!from) {
    isSidebarOpen.value = false
    hideBrandLogo.value = false
    return
  }

  isFlying.value = true 

  hideBrandLogo.value = true
  fly.show = true
  fly.style = {
    left: px(from.x),
    top: px(from.y),
    width: px(from.w),
    height: px(from.h),
    transform: 'translate3d(0,0,0) rotate(0deg)',
    opacity: 1,
    transition: 'none',
  }

  // cierro sidebar para que el header vuelva a su layout normal
  isSidebarOpen.value = false
  await nextTick()
  await new Promise(r => requestAnimationFrame(r))

  const toEl = topHeaderRef.value?.yayaBtn
  const to = rectOf(toEl)

  if (!to) {
    fly.show = false
    hideBrandLogo.value = false
    isFlying.value = false
    return
  }

  // inicio transición al botón del header
  requestAnimationFrame(() => {
    fly.style = {
      ...fly.style,
      transition:
        'left 520ms cubic-bezier(.2,.9,.2,1), top 520ms cubic-bezier(.2,.9,.2,1), width 520ms, height 520ms, transform 520ms',
    }

    requestAnimationFrame(() => {
      fly.style = {
        ...fly.style,
        left: px(to.x),
        top: px(to.y),
        width: px(to.w),
        height: px(to.h),
        transform: 'translate3d(0,0,0) rotate(18deg)',
      }
    })
  })

  setTimeout(() => {
    fly.show = false
    isFlying.value = false
  }, 540)
}

function onToggleSidebar() {
  if (isSidebarOpen.value) {
    // Cerrar sin animación (inmediato)
    isSidebarOpen.value = false
    hideBrandLogo.value = false
  } else {
    // Abrir con animación fly
    openWithFly()
  }
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


<template>
  <div class="min-h-screen flex relative">
    <Sidebar
      ref="sidebarRef"
      :open="isSidebarOpen"
      :hideBrandLogo="hideBrandLogo"
      @toggle="isSidebarOpen = !isSidebarOpen"
    />

    <main class="flex-1 flex flex-col w-full min-w-0">
      <TopHeader
        :username="'Usuario Demo'"
        :organization="'Organización Demo'"
        :notifCount="4"
        :msgCount="1"
        :sidebarOpen="isSidebarOpen"
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

    <div v-if="fly.show" class="fixed pointer-events-none z-[9999]" :style="fly.style">
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
const handleLogo = ref(null)
const hideBrandLogo = ref(false)

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
  // SNAP exacto al logo
  fly.style.transition = 'none'
  fly.style.left = px(to.x)
  fly.style.top = px(to.y)
  fly.style.width = px(to.w)
  fly.style.height = px(to.h)
  fly.style.transform = 'translate3d(0,0,0) rotate(0deg)'
  fly.style.opacity = 1

  requestAnimationFrame(() => {
    // prende el logo real
    hideBrandLogo.value = false

    // fade out del fly para evitar parpadeo
    requestAnimationFrame(() => {
      fly.style.transition = 'opacity 140ms ease-out'
      fly.style.opacity = 0

      setTimeout(() => {
        fly.show = false
        fly.style.opacity = 1 // reset para próxima vez
      }, 150)
    })
  })
}

async function openWithFly() {
  const from = rectOf(handleLogo.value)
  if (!from) {
    isSidebarOpen.value = true
    return
  }

  fly.show = true
  fly.opacity = 1
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

  await new Promise(r => setTimeout(r, 320))

  const toEl = sidebarRef.value?.brandLogo
  const to = rectOf(toEl)
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


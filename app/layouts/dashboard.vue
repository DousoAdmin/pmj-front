<!--
  ============================================================
  LAYOUT: dashboard
  ============================================================

  ¿Qué es un "layout" en Nuxt?
  Un layout es el "marco" general donde se monta el contenido
  de las páginas. Aquí está el sidebar morado izquierdo, el
  TopHeader morado superior, y un hueco (<slot />) donde cada
  página privada inyecta su contenido.

  ¿Qué hace este layout?
  1. Muestra el Sidebar lateral con la navegación
  2. Muestra el TopHeader con búsqueda, notificaciones y avatar
  3. Coordina la animación "fly" del yaya entre el botón del
     header y el logo del sidebar al abrir el menú
  4. Resetea el scroll al cambiar de página
  5. En móvil pone el sidebar en modo overlay; en desktop usa
     grid de 2 columnas
-->

<template>
  <!--
    Contenedor principal del dashboard.
    - "h-screen overflow-hidden" lo fija a la altura de la ventana
      y previene que la página entera scrollee — solo scrollea el <main>.
    - "flex flex-col" en móvil apila sidebar + main verticalmente
      (aunque el sidebar usa position:fixed, así que en realidad
      el main toma toda la altura).
    - "lg:grid" en desktop convierte el contenedor en CSS Grid
      de dos columnas (sidebar + main).
    - dashboardLayoutStyle define el ancho de la columna del sidebar
      según si está abierto o cerrado (16rem o 0rem).
  -->
  <div
    class="relative h-screen overflow-hidden flex flex-col lg:grid lg:transition-[grid-template-columns] lg:duration-300 lg:ease-in-out"
    :style="dashboardLayoutStyle"
  >
    <!-- Sidebar lateral con la navegación -->
    <Sidebar
      ref="sidebarRef"
      :open="isSidebarOpen"
      :hideBrandLogo="hideBrandLogo"
      :isFlying="isFlying"
      @toggle="onToggleSidebar"
    />

    <!--
      Main = el área de contenido donde se renderizan las páginas.
      - "flex-1 min-h-0" permite que tome todo el espacio disponible
        y que el overflow-y-auto funcione (sin min-h-0, los flex
        children no se contraen para activar el scroll).
      - "overflow-y-auto" hace que SOLO esta sección scrollee.
    -->
    <main
      ref="mainRef"
      class="flex w-full min-w-0 min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden transition-[padding,margin,width] duration-300 ease-in-out"
    >
      <!-- Header morado superior (siempre arriba) -->
      <TopHeader
        ref="topHeaderRef"
        :username="'Usuario Demo'"
        :organization="'Psicovibes'"
        :avatarUrl="'/images/organizaciones/psicovibes/Logo_Psicovibes.png'"
        :notifCount="4"
        :msgCount="1"
        :sidebarOpen="isSidebarOpen"
        @openMenuFly="openWithFly"
        @toggleSidebar="onToggleSidebar"
        @search="onSearch"
        @openNotifications="onNotifications"
        @openMessages="onMessages"
        @openProfile="onProfile"
      />

      <!--
        <slot /> = aquí Nuxt inyecta el contenido de la página actual
        (Mis Organizaciones, Noticias, Dashboard Home, etc.).
      -->
      <div class="flex-1">
        <slot />
      </div>
    </main>

    <!--
      Elemento "fly" del yaya: la imagen que VUELA desde el botón
      del header hasta el logo del sidebar (o viceversa).
      - "fixed" + "z-[9999]" lo pone encima de TODO mientras vuela.
      - "pointer-events-none" hace que no bloquee clics.
      - Solo se renderiza cuando fly.show = true.
    -->
    <div v-if="fly.show" class="fixed pointer-events-none z-[9999]" :style="{ ...fly.style, willChange: 'left, top, width, height, transform' }">
      <img src="/images/favicon.webp" class="w-full h-full object-contain" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from '#imports'
import Sidebar from '~/components/private/dashboard/Sidebar.vue'
import TopHeader from '~/components/private/dashboard/TopHeader.vue'

// ============================================================
// ESTADOS REACTIVOS
// ============================================================

// ¿Está abierto el sidebar?
const isSidebarOpen = ref(true)

// Referencias a elementos del DOM (los necesitamos para medir
// posiciones y para animar el yaya volando entre ellos).
const mainRef = ref(null)
const sidebarRef = ref(null)
const topHeaderRef = ref(null)

// Cuando el yaya está volando, ocultamos temporalmente el logo
// real del sidebar para que no se vea duplicado.
const hideBrandLogo = ref(false)

// Bandera para evitar disparar la animación dos veces si el
// usuario hace doble click rápido.
const isFlying = ref(false)

const route = useRoute()
const router = useRouter()

// ============================================================
// LAYOUT EN DESKTOP (grid de 2 columnas)
// ============================================================

// Si el sidebar está abierto, la primera columna mide 16rem (256px).
// Si está cerrado, mide 0 (queda colapsado).
// La transición CSS-grid de width crea el efecto de "expandir/colapsar".
const dashboardLayoutStyle = computed(() => ({
  gridTemplateColumns: isSidebarOpen.value ? '16rem minmax(0, 1fr)' : '0rem minmax(0, 1fr)',
}))

// Solo en cliente (no en SSR): log de rutas Nuxt para debug
if (import.meta.client) {
  console.log('Rutas Nuxt:', router.getRoutes().map((r) => r.path))
}

// ============================================================
// HANDLERS DE EVENTOS DEL HEADER (todavía sin implementar)
// ============================================================

let resetBurstTimer = null

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

// ============================================================
// OBJETO QUE CONTROLA LA ANIMACIÓN "FLY" DEL YAYA
// ============================================================
// "reactive" porque queremos que Vue actualice el DOM cuando
// cambian sus propiedades (show, style, etc.).
const fly = reactive({
  show: false,        // true = mostrar el yaya flotante; false = ocultarlo
  src: '/images/favicon.webp',  // imagen del yaya
  style: {},          // posición + transición CSS aplicada
  opacity: 1,
})

// ============================================================
// RESPONSIVE: abrir/cerrar el sidebar según el ancho de pantalla
// ============================================================
// Al cambiar el tamaño de ventana, abrimos el sidebar en
// desktop (≥1024px) y lo cerramos en mobile.
function handleResize() {
  isSidebarOpen.value = window.innerWidth >= 1024
}

// ============================================================
// RESET DE SCROLL AL CAMBIAR DE PÁGINA
// ============================================================
// Al navegar entre páginas, forzamos que el scroll vuelva al
// inicio en TODOS los contenedores con scroll (window, main,
// sidebar). Sirve para que el usuario empiece a leer desde
// arriba la nueva página.
function resetDashboardScroll() {
  if (import.meta.client) {
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  if (mainRef.value) {
    mainRef.value.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    mainRef.value.scrollTop = 0
  }

  const sidebarScroll = sidebarRef.value?.navScroll
  if (sidebarScroll) {
    sidebarScroll.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    sidebarScroll.scrollTop = 0
  }
}

// Hacemos el reset varias veces seguidas (cada 50ms, 24 veces)
// porque Nuxt a veces tarda en renderizar la nueva página y
// hay que asegurarse de que el reset toma efecto.
function startResetBurst() {
  if (!import.meta.client) return

  if (resetBurstTimer) {
    clearInterval(resetBurstTimer)
  }

  let runs = 0
  resetDashboardScroll()

  resetBurstTimer = window.setInterval(() => {
    resetDashboardScroll()
    runs += 1

    if (runs >= 24) {
      clearInterval(resetBurstTimer)
      resetBurstTimer = null
    }
  }, 50)
}

// ============================================================
// CICLO DE VIDA DEL COMPONENTE
// ============================================================

// Cuando el dashboard se monta en el DOM:
onMounted(() => {
  // Escuchar cambios de tamaño de ventana
  window.addEventListener('resize', handleResize)
  handleResize() // y ejecutarlo una vez de entrada

  // Reset de scroll inicial (varias veces para asegurar que toma efecto)
  nextTick(() => {
    startResetBurst()
    requestAnimationFrame(() => {
      startResetBurst()
      setTimeout(() => {
        startResetBurst()
      }, 120)
    })
  })

  // También al navegar (back/forward del browser) y al recargar
  window.addEventListener('load', startResetBurst)
  window.addEventListener('pageshow', startResetBurst)
})

// Cuando el dashboard se desmonta (sale de pantalla):
// limpiamos los listeners para evitar memory leaks.
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('load', startResetBurst)
  window.removeEventListener('pageshow', startResetBurst)

  if (resetBurstTimer) {
    clearInterval(resetBurstTimer)
    resetBurstTimer = null
  }
})

// Cuando cambia la URL, también resetear el scroll
watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    startResetBurst()
  }
)

// ============================================================
// HELPERS DE MEDICIÓN
// ============================================================

// Devuelve la posición (x, y) y tamaño (w, h) de un elemento del DOM
// usando getBoundingClientRect (coordenadas relativas al viewport).
function rectOf(el) {
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { x: r.left, y: r.top, w: r.width, h: r.height }
}

// Helper para convertir un número en string con "px" al final.
// Ejemplo: px(48) = "48px"
const px = (n) => `${Math.round(n)}px`

// ============================================================
// ANIMACIÓN "FLY" — YAYA VOLANDO AL ABRIR EL MENÚ
// ============================================================
//
// IDEA GENERAL:
// Cuando el usuario toca el botón del yaya en el header,
// queremos que el yaya VUELE desde su posición en el header
// hasta su posición final en el logo del sidebar.
// Mientras vuela, escondemos los logos originales para que
// no se vea duplicado.
//
// PASOS:
// 1. Capturar la posición ORIGEN (botón del header)
// 2. Calcular la posición DESTINO (logo del sidebar) según el
//    tipo de pantalla (mobile vs desktop, porque el sidebar
//    se anima distinto en cada uno)
// 3. Crear el elemento "fly" en la posición origen, rotado 18°
// 4. Disparar la animación: posición y rotación cambian hacia
//    el destino con una curva suave (cubic-bezier)
// 5. Al final, hacer CROSSFADE: revelar el logo del sidebar
//    mientras el fly se desvanece → así no hay "brinco" visible
// ============================================================
async function openWithFly() {
  // Si ya estamos animando, no hacer nada (anti-doble-click)
  if (isFlying.value) return

  // ----- PASO 1: capturar posición origen (botón del header) -----
  const fromEl = topHeaderRef.value?.yayaBtn
  const from = rectOf(fromEl)
  if (!from) {
    // Si por algún motivo el botón no existe, abrir el sidebar normal
    isSidebarOpen.value = true
    return
  }

  // Detectar si estamos en mobile (menos de 1024px)
  const isMobile = import.meta.client && window.innerWidth < 1024
  const flyDuration = 620 // ms — duración del vuelo
  const flyEasing = 'cubic-bezier(0.32, 0.72, 0, 1)' // curva suave estilo Apple

  isFlying.value = true

  // Ocultar el botón del yaya en el header de manera instantánea
  // (para que no se vea duplicado cuando aparezca el fly).
  const btn = topHeaderRef.value?.yayaBtn
  if (btn) {
    btn.style.transition = 'none'
    btn.style.opacity = '0'
  }

  // ----- PASO 3: crear el elemento fly en la posición origen -----
  // Le damos opacidad 1, posición = botón del header, rotación 18°.
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

  // Ocultar el logo real del sidebar (para no duplicar al final).
  hideBrandLogo.value = true

  // ----- PASO 2: calcular posición destino según el viewport -----
  // En mobile el sidebar se desliza con translateX (cambia su posición),
  // así que el rect del logo cuando está CERRADO está "fuera de pantalla"
  // a la izquierda. Para saber dónde va a quedar cuando esté ABIERTO,
  // sumamos el ancho del sidebar (288px).
  //
  // En desktop el sidebar se anima con grid-template-columns
  // (cambia su ANCHO de 0 a 16rem). El logo del sidebar tiene
  // un rect inválido mientras la columna mide 0, así que primero
  // abrimos el sidebar y esperamos a que el grid se expanda lo
  // suficiente para tener una medida válida.
  let to
  const toEl = sidebarRef.value?.brandLogo

  if (isMobile) {
    const closedRect = rectOf(toEl)
    if (closedRect) {
      const sidebarWidthPx = 288 // ancho del sidebar en mobile (w-72 = 18rem)
      to = {
        x: closedRect.x + sidebarWidthPx,
        y: closedRect.y,
        w: closedRect.w,
        h: closedRect.h,
      }
    }
    isSidebarOpen.value = true
  } else {
    // Desktop: abrir primero, esperar a la expansión, después medir
    isSidebarOpen.value = true
    await nextTick()
    await new Promise(r => setTimeout(r, 60))
    to = rectOf(toEl)
  }

  // Si no pudimos calcular el destino, abortar limpiamente.
  if (!to || !to.w) {
    if (btn) {
      btn.style.transition = ''
      btn.style.opacity = ''
    }
    fly.show = false
    hideBrandLogo.value = false
    isFlying.value = false
    return
  }

  // Esperar 1 frame para que Vue aplique los estilos iniciales
  // antes de cambiar a los estilos finales (sino no se anima).
  await nextTick()
  await new Promise(r => requestAnimationFrame(r))

  // ----- PASO 4: aplicar la transición CSS y los estilos finales -----
  // Primero declaramos la transición (left, top, width, height, transform).
  fly.style = {
    ...fly.style,
    transition: `left ${flyDuration}ms ${flyEasing}, top ${flyDuration}ms ${flyEasing}, width ${flyDuration}ms ${flyEasing}, height ${flyDuration}ms ${flyEasing}, transform ${flyDuration}ms ${flyEasing}`,
  }

  // En el siguiente frame, cambiamos los valores finales → CSS anima.
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

  // ----- PASO 5: crossfade al final para que no haya "brinco" -----
  // Un poco antes de que termine la animación (flyDuration - 80ms):
  //   - Revelamos el logo real del sidebar
  //   - Empezamos a desvanecer el fly (opacity → 0 en 220ms)
  // Resultado: el cambio entre fly y logo se ve fluido.
  setTimeout(() => {
    hideBrandLogo.value = false
    fly.style = {
      ...fly.style,
      transition: `opacity 220ms ease-out, ${fly.style.transition || ''}`,
      opacity: 0,
    }
  }, Math.max(0, flyDuration - 80))

  // Limpieza final: ocultar el fly y restaurar el botón del header
  setTimeout(() => {
    fly.show = false
    fly.style = { ...fly.style, opacity: 1 } // resetear para próxima vez
    if (btn) {
      btn.style.transition = ''
      btn.style.opacity = ''
    }
    isFlying.value = false
  }, flyDuration + 200)
}

// ============================================================
// ANIMACIÓN INVERSA: yaya vuelve del sidebar al header al cerrar
// (Actualmente no se usa — el cierre es un slide simple — pero
//  se deja por si en el futuro queremos animación al cerrar también)
// ============================================================
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

  // Cerramos el sidebar para que el header vuelva a su layout
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

  // Animar del logo del sidebar al botón del header
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

// ============================================================
// TOGGLE PRINCIPAL DEL SIDEBAR
// ============================================================
// Llamado cuando el usuario clickea el botón del yaya
// (en header) o el botón "X" del propio sidebar.
function onToggleSidebar() {
  // Si ya está abierto → simple toggle, sin animación de yaya
  if (isSidebarOpen.value) {
    isSidebarOpen.value = false
    hideBrandLogo.value = false
    return
  }
  // Si está cerrado → abrir CON animación del yaya volando
  // (esto funciona tanto en mobile como en desktop)
  openWithFly()
}
</script>

<style scoped>
/*
  Animación de "peek" (asomarse): el yaya se mueve sutilmente
  hacia la derecha y vuelve, como llamando la atención.
  Esta animación se aplica con la clase .animate-peek (la usa
  el botón del header del Sidebar, ver TopHeader/Sidebar).
*/
@keyframes peek {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

.animate-peek {
  animation: peek 1.6s ease-in-out infinite;
}
</style>

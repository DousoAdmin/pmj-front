<!--
  ============================================================
  PÁGINA: Noticias
  Ruta: /private/menu-dashboard/noticias
  ============================================================

  ¿Qué hace esta página?
  Es el panel editorial donde el usuario ve un feed de noticias
  externas (vía NewsAPI) con filtros por tema, búsqueda y orden.

  Estructura visual:
  - En desktop: 2 columnas — sidebar izquierdo (Hero + analíticas)
    y contenido derecho (filtros + grilla de noticias).
  - En mobile: una sola columna, con un strip morado compacto
    arriba (título + chips de tema + refresh) y debajo las
    noticias. El sidebar lateral se oculta para evitar scroll
    excesivo.

  Componentes que la conforman:
  - NewsHero: tarjeta morada con título, chips de tema, stats
  - NewsSidebar: panel "Estado del feed" + "Pulso editorial"
  - NewsTopSources: top 5 fuentes según el feed actual
  - NewsPublishingRhythm: sparkline de 7 días con tendencia
  - NewsEditorialTip: card naranja con tips rotativos
  - NewsFilters: buscador + selector de orden
  - NewsGrid: hero article + últimas destacadas + resto del feed

  Datos: provienen del composable useNewsFeed() que internamente
  llama a /api/news (un endpoint de Nuxt que consulta NewsAPI).
-->

<script setup>
import NewsFilters from '~/components/private/news/NewsFilters.vue'
import NewsGrid from '~/components/private/news/NewsGrid.vue'
import NewsHero from '~/components/private/news/NewsHero.vue'
import NewsSidebar from '~/components/private/news/NewsSidebar.vue'
import NewsTopSources from '~/components/private/news/NewsTopSources.vue'
import NewsPublishingRhythm from '~/components/private/news/NewsPublishingRhythm.vue'
import NewsEditorialTip from '~/components/private/news/NewsEditorialTip.vue'

// Esta página usa el layout "dashboard" (sidebar morado + TopHeader)
definePageMeta({ layout: 'dashboard' })

// ============================================================
// DATOS DEL FEED (vienen del composable useNewsFeed)
// ============================================================
// El composable encapsula la llamada a /api/news y expone:
//   - search, topic, sortBy: refs reactivas que el usuario
//     puede cambiar (input de búsqueda, chip de tema, dropdown).
//   - pending: true mientras está cargando (spinner)
//   - error: si la API falla
//   - refresh: función para volver a pedir los datos
//   - triggerFreshQuery: bumpea un contador interno para
//     forzar bypass de cache
//   - filteredArticles: las noticias YA filtradas por search
//   - totalResults, visibleCount, sourcesCount, withImageCount,
//     latestDate: estadísticas derivadas
const {
  search,
  topic,
  sortBy,
  pending,
  error,
  refresh,
  triggerFreshQuery,
  filteredArticles,
  totalResults,
  visibleCount,
  sourcesCount,
  withImageCount,
  latestDate,
} = useNewsFeed()

// Opciones del dropdown de ordenamiento
const sortOptions = [
  { label: 'Más recientes', value: 'publishedAt' },
  { label: 'Más populares', value: 'popularity' },
  { label: 'Más relevantes', value: 'relevancy' },
]

// Lista de temas para el strip mobile (versión corta de los topics)
const mobileTopics = [
  { value: '', label: 'Todas', dot: 'bg-slate-700' },
  { value: 'salud mental', label: 'Salud mental', dot: 'bg-[#522178]' },
  { value: 'bienestar emocional', label: 'Bienestar', dot: 'bg-[#00B140]' },
  { value: 'psicología comunitaria', label: 'Psicología', dot: 'bg-[#F2780C]' },
]

// ============================================================
// ESTADO DEL BOTÓN "ACTUALIZAR FEED"
// ============================================================
// isManualRefreshing: bloquea el botón mientras se está
//   refrescando para evitar doble click.
// refreshSuccess: true durante 1.8s tras un refresh exitoso →
//   muestra check verde + texto "Feed actualizado".
// lastRefreshedAt: timestamp del último refresh, se le pasa
//   al NewsHero para mostrar "Actualizado hace X".
const isManualRefreshing = ref(false)
const refreshSuccess = ref(false)
const lastRefreshedAt = ref(null)
let successTimer = null

// Cambia el tema (se conecta al composable que dispara nueva petición)
function setTopic(value) {
  topic.value = value
}

// Handler del botón Actualizar — coordina spinner, success y timestamp
async function handleRefresh() {
  if (isManualRefreshing.value) return // anti-doble-click
  isManualRefreshing.value = true
  refreshSuccess.value = false
  try {
    triggerFreshQuery()                  // bypass cache
    await refresh({ dedupe: 'cancel' })  // pide los datos
    lastRefreshedAt.value = Date.now()   // guarda timestamp
    refreshSuccess.value = true          // muestra check verde

    // Después de 1.8s, vuelve el botón al estado normal
    if (successTimer) clearTimeout(successTimer)
    successTimer = setTimeout(() => {
      refreshSuccess.value = false
    }, 1800)
  }
  finally {
    isManualRefreshing.value = false
  }
}

// Limpiar timer si la página se desmonta antes de que termine
onBeforeUnmount(() => {
  if (successTimer) clearTimeout(successTimer)
})
</script>

<template>
  <div class="min-h-screen bg-[#f4f0f8] py-4 lg:py-6">
    <div class="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8">
      <!--
        Grid responsive:
        - Mobile: 1 columna (todo apilado)
        - Desktop (lg): 250px (sidebar) + resto (contenido)
        - XL/2XL: sidebar más ancho (320/360px)
        items-start: las columnas se alinean por arriba.
      -->
      <div class="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)] gap-3 xl:gap-6 items-start">

        <!--
          ASIDE (columna izquierda) — OCULTO EN MOBILE.
          En desktop:
          - sticky top-[130px]: se queda fijo al hacer scroll
          - max-h-[calc(100vh-154px)]: si es más alto que la
            pantalla, scrollea internamente
          - sidebar-scroll: scrollbar custom morada delgada
        -->
        <aside class="hidden lg:block lg:order-1 lg:sticky lg:top-[130px] lg:max-h-[calc(100vh-154px)] lg:overflow-y-auto sidebar-scroll lg:pr-1">
          <div class="space-y-3">
            <NewsHero
              :total-results="totalResults"
              :visible-count="visibleCount"
              :sources-count="sourcesCount"
              :with-image-count="withImageCount"
              :current-topic="topic"
              :is-refreshing="pending || isManualRefreshing"
              :refresh-success="refreshSuccess"
              :last-refreshed-at="lastRefreshedAt"
              @refresh="handleRefresh"
              @set-topic="setTopic"
            />

            <NewsSidebar
              :topic="topic"
              :latest-date="latestDate"
              :visible-count="visibleCount"
            />

            <NewsTopSources :articles="filteredArticles" />

            <NewsPublishingRhythm :articles="filteredArticles" />

            <NewsEditorialTip />
          </div>
        </aside>

        <!-- COLUMNA DE CONTENIDO (derecha en desktop, todo en mobile) -->
        <div class="order-1 lg:order-2 space-y-3 lg:space-y-5 min-w-0">

          <!--
            STRIP COMPACTO MOBILE — solo se ve en pantallas < lg.
            Incluye: indicador "en vivo", título, contador, botón
            actualizar, y chips de tema con scroll horizontal.
            Reemplaza al NewsHero (que está oculto en mobile).
          -->
          <div class="lg:hidden relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#522178] to-[#3d1958] shadow-lg">
            <div class="h-1 flex">
              <div class="flex-1 bg-[#00B140]"></div>
              <div class="flex-1 bg-[#F2780C]"></div>
              <div class="flex-1 bg-[#7c3aed]"></div>
            </div>
            <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#F2780C]/15 blur-2xl pointer-events-none"></div>

            <div class="relative p-3.5">
              <!-- Fila superior: indicador + título + contador + botón -->
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="relative flex h-2.5 w-2.5 shrink-0">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B140] opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B140]"></span>
                  </span>
                  <h2 class="text-base font-black text-white leading-none">Noticias</h2>
                  <span class="text-[9px] text-white/45 font-bold uppercase tracking-widest truncate">
                    {{ visibleCount }} visibles
                  </span>
                </div>
                <button
                  class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white transition-all"
                  :class="refreshSuccess
                    ? 'bg-[#00B140] shadow-md shadow-[#00B140]/40'
                    : 'bg-[#00B140]/85 hover:bg-[#00B140] active:scale-95'"
                  :disabled="pending || isManualRefreshing"
                  @click="handleRefresh"
                >
                  <svg
                    class="w-3 h-3 transition-transform"
                    :class="(pending || isManualRefreshing) ? 'animate-spin' : ''"
                    fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
                  >
                    <path
                      v-if="refreshSuccess"
                      stroke-linecap="round" stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                    <path
                      v-else
                      stroke-linecap="round" stroke-linejoin="round"
                      d="M4 4v5h.582M20 20v-5h-.581M5.09 19A9 9 0 0020 12m-16 0a9 9 0 0114.91-7"
                    />
                  </svg>
                  <span class="hidden xs:inline">{{ refreshSuccess ? 'Listo' : 'Actualizar' }}</span>
                </button>
              </div>

              <!-- Chips de tema con scroll horizontal (mobile-topic-scroll oculta scrollbar) -->
              <div class="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-1 mobile-topic-scroll">
                <button
                  v-for="t in mobileTopics"
                  :key="t.value"
                  class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold whitespace-nowrap transition-all"
                  :class="topic === t.value
                    ? 'bg-white text-[#522178] border-white shadow-md'
                    : 'bg-white/[0.06] border-white/15 text-white/85 hover:bg-white/15 active:scale-95'"
                  @click="setTopic(t.value)"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="topic === t.value ? t.dot : 'bg-white/30'"></span>
                  {{ t.label }}
                </button>
              </div>
            </div>
          </div>

          <!--
            FILTROS (buscador + orden).
            En desktop son sticky en top-[130px] (justo bajo el TopHeader).
            z-20 para que queden sobre las tarjetas que pasan por debajo.
          -->
          <div class="lg:sticky lg:top-[130px] lg:z-20">
            <NewsFilters
              :search="search"
              :sort-by="sortBy"
              :sort-options="sortOptions"
              @update:search="search = $event"
              @update:sortBy="sortBy = $event"
            />
          </div>

          <!--
            GRID DE NOTICIAS:
            - Si pending → muestra spinner
            - Si error → muestra mensaje rojo + botón reintentar
            - Si no hay artículos → estado vacío
            - Si hay → hero article + últimas destacadas + resto
          -->
          <NewsGrid
            :pending="pending"
            :error="error"
            :articles="filteredArticles"
            :wide="true"
            @retry="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  ============================================================
  SCROLLBAR PERSONALIZADA DEL SIDEBAR
  ============================================================
  Si el contenido del sidebar (Hero + Sidebar + Top + Ritmo +
  Tip) es más alto que la pantalla, scrollea internamente con
  una barra morada delgada en lugar del scrollbar gris del SO.
*/
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(82, 33, 120, 0.35) transparent;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(82, 33, 120, 0.25);
  border-radius: 999px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(82, 33, 120, 0.45);
}

/*
  ============================================================
  SCROLLBAR OCULTA EN EL STRIP MOBILE DE TEMAS
  ============================================================
  Para que el strip se vea limpio sin barra horizontal visible.
*/
.mobile-topic-scroll {
  scrollbar-width: none;
}

.mobile-topic-scroll::-webkit-scrollbar {
  display: none;
}
</style>

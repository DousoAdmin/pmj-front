// ============================================================
// COMPOSABLE: useNewsFeed
// ============================================================
//
// ¿Qué es un composable?
// Es una función reutilizable que encapsula lógica reactiva
// de Vue (refs, computed, fetch, etc.). Por convención en
// Nuxt, empieza con "use" y vive en app/composables/.
// Cualquier componente puede llamarlo y obtener sus refs
// reactivas — todos compartirán los mismos datos.
//
// ¿Qué hace este composable?
// Maneja todo lo relacionado con el feed de noticias:
//   - Llama a /api/news (un endpoint server de Nuxt que
//     internamente consulta NewsAPI)
//   - Expone refs reactivas para search, topic, sortBy
//   - Filtra los resultados en cliente según el texto buscado
//   - Calcula stats derivadas (cuántas, cuántas fuentes, etc.)
//   - Permite hacer refresh forzado con bypass de cache
//
// Lo usa la página /private/menu-dashboard/noticias.vue
// ============================================================

import type { NewsApiResponse } from '~/types/news'

export function useNewsFeed() {
  // -----------------------------------------------
  // ESTADO REACTIVO (refs que cambian con el usuario)
  // -----------------------------------------------
  const search = ref('')                                  // texto del buscador
  const topic = ref('')                                   // tema seleccionado ('' = todas)
  const sortBy = ref<'publishedAt' | 'popularity' | 'relevancy'>('publishedAt') // criterio de orden
  const refreshTick = ref(0)                              // contador para forzar refetch

  // Si no hay tema seleccionado, usamos esta búsqueda por defecto
  const fallbackQuery = 'salud mental OR bienestar emocional OR psicología comunitaria'

  // ----------------------------------------------------------------------------
  // CONSTRUYE LA QUERY DE NEWSAPI
  // ----------------------------------------------------------------------------
  // Si el usuario eligió un tema → busca exactamente ese tema entre comillas.
  // Si no → usa la búsqueda de fallback (3 temas separados por OR).
  const apiQuery = computed(() => {
    const value = topic.value.trim()
    return value.length ? `"${value}"` : fallbackQuery
  })

  // ----------------------------------------------------------------------------
  // LLAMADA A LA API (con useFetch de Nuxt)
  // ----------------------------------------------------------------------------
  // useFetch llama a /api/news y mantiene `data` reactivo.
  // Cuando los valores dentro de "query" cambian, useFetch
  // detecta el cambio y vuelve a hacer la petición automáticamente.
  //
  // Parámetros enviados:
  //   q: la query construida arriba
  //   sortBy: criterio de orden elegido por el usuario
  //   language: 'es' (sólo noticias en español)
  //   pageSize: 18 (cuántas pedir)
  //   page: 1 (sin paginación todavía)
  //   searchIn: buscar en título y descripción
  //   t: refreshTick — cambiar este valor fuerza un refetch
  //      (útil para el botón "Actualizar feed")
  const { data, pending, error, refresh } = useFetch<NewsApiResponse>('/api/news', {
    query: computed(() => ({
      q: apiQuery.value,
      sortBy: sortBy.value,
      language: 'es',
      pageSize: 18,
      page: 1,
      searchIn: 'title,description',
      t: refreshTick.value,
    })),
    // Si data viene null o undefined, usar una estructura vacía como default
    default: () => ({ status: 'ok', totalResults: 0, articles: [] }),
  })

  // ----------------------------------------------------------------------------
  // ARTÍCULOS — versión cruda y versión filtrada
  // ----------------------------------------------------------------------------

  // Lista completa de artículos que devolvió la API
  const articles = computed(() => data.value?.articles || [])

  // Lista filtrada por el texto del buscador (filtro en cliente).
  // Si el usuario escribe "tenerife" verá solo artículos cuyo
  // título, fuente o descripción contengan "tenerife".
  const filteredArticles = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return articles.value // si no hay búsqueda, devolver todo
    return articles.value.filter((a) => {
      const title = (a.title || '').toLowerCase()
      const source = (a.source?.name || '').toLowerCase()
      const description = (a.description || '').toLowerCase()
      return title.includes(q) || source.includes(q) || description.includes(q)
    })
  })

  // ----------------------------------------------------------------------------
  // STATS DERIVADAS (computed = se recalculan automáticamente)
  // ----------------------------------------------------------------------------

  // Total de resultados que dice la API (puede ser miles)
  const totalResults = computed(() => data.value?.totalResults || 0)

  // Cuántos artículos quedan después del filtro de búsqueda
  const visibleCount = computed(() => filteredArticles.value.length)

  // Cuántas fuentes distintas hay (eldiario.es, abc.es, etc.)
  // Usamos Set para eliminar duplicados.
  const sourcesCount = computed(
    () => new Set(articles.value.map((a) => a.source?.name).filter(Boolean)).size,
  )

  // Cuántos artículos tienen imagen (urlToImage no null)
  const withImageCount = computed(() => articles.value.filter((a) => !!a.urlToImage).length)

  // Fecha de publicación del artículo más reciente, formateada en español
  const latestDate = computed(() => {
    const first = articles.value[0]?.publishedAt
    if (!first) return 'Sin fecha'
    return new Date(first).toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  })

  // ----------------------------------------------------------------------------
  // FORZAR REFRESH (bypass de cache)
  // ----------------------------------------------------------------------------
  // Al cambiar refreshTick, la query cambia (incluye "t" como
  // parámetro), useFetch detecta el cambio y vuelve a pedir.
  // Aunque NewsAPI internamente cachee, el cliente sí pide de
  // nuevo y reacciona si hay nuevos artículos.
  function triggerFreshQuery() {
    refreshTick.value += 1
  }

  // ----------------------------------------------------------------------------
  // EXPONER TODO PARA QUIEN USE EL COMPOSABLE
  // ----------------------------------------------------------------------------
  return {
    // estado reactivo (el componente puede mutar estos refs)
    search,
    topic,
    sortBy,
    // estado de carga y error
    pending,
    error,
    // acciones
    refresh,
    triggerFreshQuery,
    // resultados
    filteredArticles,
    // stats
    totalResults,
    visibleCount,
    sourcesCount,
    withImageCount,
    latestDate,
  }
}

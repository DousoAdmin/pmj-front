export default defineEventHandler(async (event) => {
  const env = (globalThis as any)?.process?.env || {}
  const apiKey = env.NUXT_NEWS_API_KEY || env.NEWS_API_KEY

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Falta configurar NUXT_NEWS_API_KEY (o NEWS_API_KEY) en el servidor',
    })
  }

  const query = getQuery(event)
  const q = String(query.q || 'salud mental').trim()
  const pageSize = Math.min(Number(query.pageSize || 12), 30)
  const page = Math.max(Number(query.page || 1), 1)
  const language = String(query.language || 'es')
  const sortBy = String(query.sortBy || 'publishedAt')
  const searchIn = String(query.searchIn || 'title,description')

  const data = await $fetch('https://newsapi.org/v2/everything', {
    query: {
      q,
      language,
      sortBy,
      pageSize,
      page,
      searchIn,
      apiKey,
    },
  })

  return data
})

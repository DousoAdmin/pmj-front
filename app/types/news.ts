// ============================================================
// TIPOS TYPESCRIPT: News
// ============================================================
//
// Estos types describen la estructura de los datos que devuelve
// NewsAPI (https://newsapi.org/). Los usamos para que TypeScript
// nos ayude con autocompletado y nos avise si accedemos a un
// campo que no existe.
//
// Lo usa: el composable useNewsFeed y los componentes que pintan
// noticias (NewsGrid, NewsHero, etc.).
// ============================================================

// Una "fuente" de noticias (el medio que publicó la nota).
// Ej: { id: 'el-pais', name: 'El País' }
export interface NewsSource {
  id: string | null   // identificador único (puede ser null para fuentes pequeñas)
  name: string        // nombre legible del medio
}

// Un artículo individual del feed
export interface NewsArticle {
  source: NewsSource          // de qué medio vino la nota
  author: string | null       // autor del artículo (a veces null)
  title: string               // titular
  description: string | null  // descripción/lead/bajada
  url: string                 // link a la nota original
  urlToImage: string | null   // URL de la imagen de portada (a veces null)
  publishedAt: string         // fecha en formato ISO 8601 (ej: "2026-05-12T09:47:00Z")
  content: string | null      // primeros caracteres del cuerpo (NewsAPI lo trunca)
}

// La respuesta completa que devuelve NewsAPI cuando todo va bien
export interface NewsApiResponse {
  status: 'ok' | 'error'      // 'ok' si la consulta tuvo éxito
  totalResults: number        // total de resultados que encontró (no solo los que devuelve)
  articles: NewsArticle[]     // arreglo con los artículos
}

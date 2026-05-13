<!--
  ============================================================
  COMPONENTE: NewsGrid
  ============================================================
  Es el componente "más gordo" — renderiza TODA la grilla de
  noticias en el panel principal de la página.

  Tiene 4 estados:

  1. LOADING (pending=true): spinner + "Cargando feed..."
  2. ERROR (error truthy): card rosada con mensaje + botón reintentar
  3. EMPTY (sin artículos): card neutra con "Sin resultados"
  4. CON DATOS: muestra
       a) HERO ARTICLE: tarjeta grande con la primera noticia
          (imagen, badges, título grande, descripción, autor,
          tiempo de lectura, botón "Leer nota")
       b) ÚLTIMAS DESTACADAS: lista lateral con las notas 2-5
          (thumbnail + número + título + tiempo + "Ver nota")
       c) RESTO DEL FEED: grilla compacta con las notas 6 en
          adelante (imagen pequeña + título + leer →)

  Helpers internos:
  - timeAgo: convierte un timestamp en "hace 5 min" / "hace 2h"
  - readingTime: estima minutos de lectura (220 palabras/min)
  - initials: extrae las iniciales del nombre del autor
  - isFallbackVisible/handleImageError: manejan imágenes rotas;
    si una imagen no carga, mostramos la "yaya" como fallback

  Props:
  - pending: si está cargando
  - error: si hubo error
  - articles: arreglo con TODOS los artículos a renderizar
  - wide: bandera reservada para futuras variantes

  Eventos:
  - 'retry': cuando se aprieta "Reintentar" tras un error
-->

<template>
  <div v-if="pending" class="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
    <div class="inline-flex flex-col items-center gap-3">
      <div class="relative">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#522178] to-[#3d1958] flex items-center justify-center shadow-xl shadow-[#522178]/30">
          <svg class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.09 19A9 9 0 0020 12m-16 0a9 9 0 0114.91-7" />
          </svg>
        </div>
        <span class="absolute -top-1 -right-1 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2780C] opacity-60"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-[#F2780C]"></span>
        </span>
      </div>
      <div>
        <p class="text-sm font-black text-slate-800">Cargando feed...</p>
        <p class="text-xs text-slate-500 mt-0.5">Sincronizando con la fuente</p>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="bg-gradient-to-br from-rose-50 to-white rounded-3xl border border-rose-200 shadow-sm p-10 text-center">
    <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-100 flex items-center justify-center">
      <svg class="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <p class="text-sm font-black text-rose-700">No se pudo cargar el feed</p>
    <p class="text-xs text-rose-500 mt-1 max-w-sm mx-auto">Revisa tu conexión o la API key del proveedor de noticias.</p>
    <button
      class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
      @click="$emit('retry')"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.09 19A9 9 0 0020 12m-16 0a9 9 0 0114.91-7" />
      </svg>
      Reintentar
    </button>
  </div>

  <div v-else-if="articles.length === 0" class="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
    <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center">
      <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <p class="text-sm font-black text-slate-700">Sin resultados</p>
    <p class="text-xs text-slate-500 mt-1">Ajusta los filtros para ver más noticias.</p>
  </div>

  <div v-else class="space-y-5">
    <div class="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-4">
      <article class="group relative bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#522178]/10 hover:-translate-y-0.5">
        <div class="relative overflow-hidden">
          <img
            v-if="!isFallbackVisible(heroArticle?.urlToImage)"
            :src="heroArticle?.urlToImage"
            :alt="heroArticle.title"
            class="w-full h-48 sm:h-56 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            @error="handleImageError(heroArticle?.urlToImage)"
          />
          <div
            v-else
            class="relative w-full h-48 sm:h-56 lg:h-80 bg-gradient-to-br from-[#522178]/15 via-[#f4f0f8] to-[#ece5f5] flex items-end justify-center overflow-hidden"
          >
            <div
              class="absolute inset-0 opacity-[0.10] pointer-events-none"
              style="background-image: radial-gradient(circle, rgba(82,33,120,0.6) 1px, transparent 1px); background-size: 20px 20px;"
            ></div>
            <span class="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[#522178] text-[10px] font-black uppercase tracking-widest shadow-sm">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Sin imagen
            </span>
            <img
              :src="fallbackImage"
              alt="Imagen no disponible"
              class="relative h-[105%] w-auto max-w-none object-contain object-bottom drop-shadow-lg"
            />
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

          <div class="absolute left-4 top-4 flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2780C] text-white text-[10px] font-black uppercase tracking-[0.18em] shadow-lg shadow-black/30">
              <span class="w-1 h-1 rounded-full bg-white"></span>
              Portada
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold uppercase tracking-wide shadow-lg shadow-black/20">
              <svg class="w-3 h-3 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1115.5 16h-10z" />
              </svg>
              {{ heroArticle?.source?.name || 'Fuente' }}
            </span>
          </div>

          <div class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <button class="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white/95 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-[#F2780C] shadow-lg shadow-black/20 transition-all hover:scale-105 text-[10px] font-black uppercase tracking-widest" aria-label="Guardar">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Guardar
            </button>
          </div>

          <div class="absolute right-4 bottom-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ timeAgo(heroArticle?.publishedAt) }}
          </div>
        </div>

        <div class="p-4 sm:p-5 lg:p-6">
          <h3 class="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-900 leading-[1.1] tracking-tight line-clamp-4 lg:line-clamp-3 group-hover:text-[#522178] transition-colors">
            {{ heroArticle?.title }}
          </h3>

          <p class="text-sm text-slate-600 mt-2.5 lg:mt-3 leading-relaxed line-clamp-3 lg:line-clamp-2">
            {{ heroArticle?.description || 'Sin descripción disponible.' }}
          </p>

          <div v-if="heroArticle?.author" class="mt-4 pt-3 lg:hidden border-t border-slate-100 flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-[#522178] to-[#3d1958] text-white flex items-center justify-center text-[10px] font-black shadow-md shrink-0">
              {{ initials(heroArticle.author) }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold text-slate-800 truncate">{{ heroArticle.author }}</p>
              <p class="text-[10px] text-slate-500">{{ formatDate(heroArticle?.publishedAt) }} · {{ readingTime(heroArticle) }} lectura</p>
            </div>
          </div>

          <div class="hidden lg:flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
            <div class="flex items-center gap-2 min-w-0 text-[11px] text-slate-500 flex-wrap">
              <span v-if="heroArticle?.author" class="inline-flex items-center gap-1.5 font-bold text-slate-700 truncate max-w-[12rem]">
                <span class="w-5 h-5 rounded-full bg-gradient-to-br from-[#522178] to-[#3d1958] text-white flex items-center justify-center text-[8px] font-black shadow-md">
                  {{ initials(heroArticle.author) }}
                </span>
                <span class="truncate">{{ heroArticle.author }}</span>
              </span>
              <span v-if="heroArticle?.author" class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span class="inline-flex items-center gap-1">
                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(heroArticle?.publishedAt) }}
              </span>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span class="inline-flex items-center gap-1">
                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ readingTime(heroArticle) }} lectura
              </span>
            </div>
            <a
              :href="heroArticle?.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#522178] to-[#3d1958] text-white text-[11px] font-black uppercase tracking-widest hover:from-[#5e2787] hover:to-[#4a1d6e] shadow-lg shadow-[#522178]/25 transition-all hover:scale-105 shrink-0"
            >
              Leer nota
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <a
            :href="heroArticle?.url"
            target="_blank"
            rel="noopener noreferrer"
            class="lg:hidden mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-[#522178] to-[#3d1958] text-white text-xs font-black uppercase tracking-widest hover:from-[#5e2787] hover:to-[#4a1d6e] shadow-lg shadow-[#522178]/25 transition-all active:scale-[0.98]"
          >
            Leer nota completa
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </article>

      <div class="bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div class="relative px-4 pt-3.5 pb-3 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#F2780C]/[0.06] via-transparent to-transparent">
          <h4 class="text-[10px] font-black uppercase tracking-[0.22em] text-slate-900 flex items-center gap-2">
            <span class="w-1 h-4 rounded-full bg-gradient-to-b from-[#F2780C] to-[#fbbf24]"></span>
            <span><span class="text-[#F2780C]">Últimas</span> destacadas</span>
          </h4>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F2780C]/10 text-[#F2780C] text-[9px] font-black uppercase tracking-widest">
            <span class="tabular-nums">{{ rightRailArticles.length }}</span>
            <span class="hidden sm:inline">notas</span>
          </span>
        </div>

        <div class="flex-1 p-2 lg:p-2.5 space-y-1">
          <article
            v-for="(article, i) in rightRailArticles"
            :key="article.url"
            class="group relative flex gap-2.5 lg:gap-3 rounded-2xl p-2 lg:p-2.5 hover:bg-slate-50 active:bg-slate-100 transition-all"
          >
            <span
              class="absolute left-0 top-3 bottom-3 w-1 rounded-r-full opacity-50 group-hover:opacity-100 group-hover:top-1.5 group-hover:bottom-1.5 transition-all"
              :class="railAccents[i % railAccents.length]"
            ></span>

            <div class="relative shrink-0 ml-1.5">
              <img
                v-if="article.urlToImage && !isFallbackVisible(article.urlToImage)"
                :src="article.urlToImage"
                :alt="article.title"
                class="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-[1.04]"
                @error="handleImageError(article.urlToImage)"
              />
              <div
                v-else
                class="relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl border border-[#522178]/15 bg-gradient-to-br from-[#522178]/15 via-[#f4f0f8] to-[#ece5f5] flex items-end justify-center overflow-hidden shadow-sm"
              >
                <img
                  :src="fallbackImage"
                  alt="Imagen no disponible"
                  class="relative h-[115%] w-auto max-w-none object-contain object-bottom"
                />
              </div>
              <span
                class="absolute -top-2 -left-2 w-7 h-7 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-[11px] font-black text-white"
                :class="railAccents[i % railAccents.length]"
              >
                {{ i + 2 }}
              </span>
            </div>

            <div class="min-w-0 flex-1 flex flex-col">
              <span
                class="self-start inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest max-w-full truncate"
                :class="railTones[i % railTones.length]"
              >
                <span class="w-1 h-1 rounded-full shrink-0" :class="railAccents[i % railAccents.length]"></span>
                <span class="truncate">{{ article.source?.name || 'Fuente' }}</span>
              </span>

              <h5 class="text-[12px] lg:text-[13px] font-black text-slate-900 mt-1.5 line-clamp-3 group-hover:text-[#522178] transition-colors leading-snug">
                {{ article.title }}
              </h5>

              <div class="mt-auto flex items-center justify-between gap-2 pt-2">
                <span class="text-[9px] text-slate-400 font-bold inline-flex items-center gap-1">
                  <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ timeAgo(article.publishedAt) }}
                </span>
                <a
                  :href="article.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105"
                  :class="railTones[i % railTones.length]"
                >
                  Ver nota
                  <svg class="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-if="compactArticles.length > 0">
      <div class="flex items-center justify-between mb-3 px-1">
        <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
          <span class="w-1 h-4 rounded-full bg-[#522178]"></span>
          Resto del feed
        </h4>
        <span class="text-[10px] text-slate-400 font-bold tabular-nums">
          {{ compactArticles.length }} {{ compactArticles.length === 1 ? 'artículo' : 'artículos' }}
        </span>
      </div>

      <div class="grid grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
        <article
          v-for="article in compactArticles"
          :key="article.url"
          class="group bg-white rounded-2xl lg:rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 hover:border-[#522178]/20 flex flex-col"
        >
          <div class="relative overflow-hidden">
            <img
              v-if="article.urlToImage && !isFallbackVisible(article.urlToImage)"
              :src="article.urlToImage"
              :alt="article.title"
              class="w-full h-24 sm:h-32 lg:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
              @error="handleImageError(article.urlToImage)"
            />
            <div
              v-else
              class="relative w-full h-24 sm:h-32 lg:h-40 bg-gradient-to-br from-[#522178]/15 via-[#f4f0f8] to-[#ece5f5] border-b border-[#522178]/10 flex items-end justify-center overflow-hidden"
            >
              <div
                class="absolute inset-0 opacity-[0.10] pointer-events-none"
                style="background-image: radial-gradient(circle, rgba(82,33,120,0.6) 1px, transparent 1px); background-size: 14px 14px;"
              ></div>
              <img
                :src="fallbackImage"
                alt="Imagen no disponible"
                class="relative h-[115%] w-auto max-w-none object-contain object-bottom drop-shadow-md"
              />
            </div>

            <div class="absolute inset-x-0 bottom-0 h-10 lg:h-16 bg-gradient-to-t from-black/55 to-transparent pointer-events-none"></div>

            <span class="absolute left-1.5 top-1.5 lg:left-3 lg:top-3 inline-flex items-center gap-1 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-700 text-[8px] lg:text-[9px] font-black uppercase tracking-wider lg:tracking-widest shadow-md max-w-[88%] truncate">
              <span class="w-1 h-1 rounded-full bg-[#F2780C] shrink-0"></span>
              <span class="truncate">{{ article.source?.name || 'Fuente' }}</span>
            </span>

            <button
              class="hidden lg:flex absolute right-3 top-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-sm text-slate-700 items-center justify-center shadow-md opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all hover:scale-110 hover:text-[#F2780C]"
              aria-label="Guardar"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            <span class="absolute right-1.5 bottom-1.5 lg:right-3 lg:bottom-3 inline-flex items-center gap-1 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-white text-[8px] lg:text-[9px] font-bold">
              <svg class="w-2 h-2 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ timeAgo(article.publishedAt) }}
            </span>
          </div>

          <div class="p-2.5 sm:p-3 lg:p-4 flex-1 flex flex-col">
            <h3 class="text-[12px] sm:text-[13px] lg:text-[14px] font-black text-slate-900 leading-tight line-clamp-3 lg:line-clamp-2 group-hover:text-[#522178] transition-colors">
              {{ article.title }}
            </h3>
            <p class="hidden sm:block text-[11px] lg:text-[12px] text-slate-500 mt-2 line-clamp-2 leading-relaxed flex-1">
              {{ article.description || 'Sin descripción disponible.' }}
            </p>

            <div class="mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
              <span class="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ readingTime(article) }} lectura
              </span>
              <a
                :href="article.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#522178] hover:text-[#3d1958] group/link ml-auto"
              >
                Leer
                <svg class="w-2.5 h-2.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  pending: { type: Boolean, default: false },
  error: { type: [Object, String, Boolean], default: null },
  articles: { type: Array, default: () => [] },
  wide: { type: Boolean, default: false },
})

defineEmits(['retry'])

const heroArticle = computed(() => props.articles[0] || null)
const rightRailArticles = computed(() => props.articles.slice(1, 5))
const compactArticles = computed(() => props.articles.slice(5))

const fallbackImage = '/images/yaya mitad cuerpo.png'
const brokenImages = ref({})

const railAccents = ['bg-[#522178]', 'bg-[#00B140]', 'bg-[#F2780C]', 'bg-indigo-500']

const railTones = [
  'bg-[#522178]/10 text-[#522178]',
  'bg-[#00B140]/10 text-[#00B140]',
  'bg-[#F2780C]/10 text-[#F2780C]',
  'bg-indigo-50 text-indigo-600',
]

function isFallbackVisible(imageUrl) {
  if (!imageUrl) return true
  return !!brokenImages.value[imageUrl]
}

function handleImageError(imageUrl) {
  if (!imageUrl) return
  brokenImages.value[imageUrl] = true
}

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Date(value).toLocaleString('es-CO', { dateStyle: 'medium' })
}

function timeAgo(value) {
  if (!value) return 'sin fecha'
  const diff = (Date.now() - new Date(value).getTime()) / 1000
  if (diff < 60) return 'ahora'
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  if (diff < 2592000) return `hace ${Math.floor(diff / 86400)} d`
  return new Date(value).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })
}

function readingTime(article) {
  const text = article?.content || article?.description || article?.title || ''
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return `${minutes} min`
}

function initials(author) {
  if (!author) return ''
  return author
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

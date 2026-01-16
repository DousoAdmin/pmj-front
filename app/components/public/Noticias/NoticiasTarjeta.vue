<template>
  <article
    class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl
           transform hover:-translate-y-2 transition-all duration-500
           animate-fade-up border border-gray-100"
    :style="{ animationDelay: `${(index + 1) * 100}ms` }"
    role="article"
  >
    <div class="relative h-48 md:h-56 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
      <div class="absolute inset-0 w-full h-full bg-gradient-to-br" :class="noticia.gradient"></div>

      <div class="absolute bottom-4 left-4 z-20">
        <span class="px-4 py-1.5 bg-[#F2780C] text-white text-xs font-bold rounded-full shadow-lg ring-2 ring-white/50">
          {{ noticia.tag }}
        </span>
      </div>
    </div>

    <div class="p-6 md:p-8">
      <h3 class="text-xl md:text-2xl font-black text-[#64278C] mb-3 group-hover:text-[#038C33] transition-colors duration-300 line-clamp-2">
        {{ noticia.title }}
      </h3>

      <p class="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
        {{ noticia.desc }}
      </p>

      <div class="flex items-center justify-between text-sm">
        <time class="flex items-center space-x-2 text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>{{ noticia.date }}</span>
        </time>

        <NuxtLink
          to="#"
          class="text-[#F2780C] font-bold hover:underline flex items-center space-x-1
                 group-hover:space-x-2 transition-all duration-300"
        >
          <span>Leer más</span>
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  noticia: { type: Object, required: true },
  index: { type: Number, required: true }
})
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}
</style>
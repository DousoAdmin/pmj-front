<template>
  <article
    class="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] 
           hover:shadow-[0_30px_60px_rgba(100,39,140,0.15)] 
           transform hover:-translate-y-3 transition-all duration-500
           animate-fade-up border border-gray-100 h-full flex flex-col"
    :style="{ animationDelay: `${(index + 1) * 100}ms` }"
    role="article"
  >
    <div class="relative h-56 md:h-64 overflow-hidden shrink-0">
      <div class="absolute inset-0 bg-[#64278C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      <div class="absolute inset-0 w-full h-full bg-linear-to-br transform group-hover:scale-110 transition-transform duration-700" 
           :class="noticia.gradient">
      </div>

      <div class="absolute top-6 left-6 z-20">
        <span class="px-4 py-1.5 bg-white text-[#038C33] text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
          {{ noticia.tag }}
        </span>
      </div>
      
      <div class="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent z-10"></div>
    </div>

    <div class="p-8 flex-1 flex flex-col">
      <time class="flex items-center space-x-2 text-[#038C33] font-bold text-xs mb-4 uppercase tracking-tighter">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <span>{{ noticia.date }}</span>
      </time>

      <h3 class="text-xl md:text-2xl font-black text-gray-900 mb-4 group-hover:text-[#038C33] transition-colors duration-300 leading-tight line-clamp-2">
        {{ noticia.title }}
      </h3>

      <p class="text-gray-500 mb-8 line-clamp-3 leading-relaxed text-sm md:text-base flex-1">
        {{ noticia.desc }}
      </p>

      <NuxtLink
        to="/public/noticias"
        class="inline-flex items-center justify-center w-full py-4 bg-gray-50 text-[#F2780C] font-black rounded-2xl
               hover:bg-[#522178] hover:text-white transition-all duration-300 group/btn shadow-sm"
      >
        <span class="mr-2 uppercase text-xs tracking-widest">Leer Noticia Completa</span>
        <svg class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </NuxtLink>
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
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

/* Line clamp nativo de Tailwind configurado para 2 y 3 líneas */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<template>
  <article
    class="group relative bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_35px_70px_rgba(3,140,51,0.15)] transform hover:-translate-y-3 transition-all duration-500 animate-fade-up border border-gray-100 h-full flex flex-col overflow-hidden"
    :style="{ animationDelay: `${(index + 1) * 100}ms` }"
    role="article"
  >
    <div
      class="absolute -right-4 -top-4 w-40 h-40 bg-[#038C33]/5 rounded-full group-hover:scale-[4] transition-transform duration-1000 pointer-events-none"
    ></div>

    <div class="absolute top-8 right-8 z-20">
      <span
        class="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-full bg-[#038C33]/10 text-[#038C33] border border-[#038C33]/10 backdrop-blur-sm"
      >
        {{ organizacion.type }}
      </span>
    </div>

    <div
      class="relative w-full h-52 mx-auto mb-4 shrink-0 flex items-center justify-center"
    >
      <div
        class="relative w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 z-10"
      >
        <NuxtImg
          v-if="organizacion.photo"
          :src="organizacion.photo"
          :alt="organizacion.name"
          class="max-w-[90%] max-h-[90%] object-contain"
        />

        <div
          v-else
          class="w-32 h-32 flex items-center justify-center rounded-2xl bg-gray-50 text-4xl font-black text-[#038C33]"
        >
          {{ organizacion.initials || "ORG" }}
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col relative z-10">
      <h3
        class="text-2xl font-black text-gray-900 mb-3 text-center group-hover:text-[#038C33] transition-colors duration-300 leading-tight"
      >
        {{ organizacion.name }}
      </h3>

      <p
        class="text-base text-gray-500 mb-8 text-center line-clamp-3 flex-1 leading-relaxed"
      >
        {{ organizacion.desc }}
      </p>

      <NuxtLink
        :to="organizacion.link"
        target="_blank"
        class="group/btn relative mt-auto py-4 px-6 rounded-2xl bg-gray-50 text-[#64278C] font-black overflow-hidden transition-all duration-300 hover:bg-[#64278C] hover:text-white flex items-center justify-center space-x-3 shadow-sm hover:shadow-lg"
      >
        <span class="relative z-10 uppercase text-xs tracking-widest"
          >Conocer más</span
        >
        <svg
          class="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Organizacion {
  name: string;
  initials: string;
  desc: string;
  type: string;
  link: string;
  photo?: string;
}

interface Props {
  organizacion: Organizacion;
  index: number;
}

defineProps<Props>();
</script>

<style scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.6s ease-out both;
}
</style>

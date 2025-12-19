<!-- components/layout/LayoutLogo.vue -->
<template>
  <NuxtLink to="/" class="flex items-center space-x-3 group">
    <div class="relative">
      <div class="absolute inset-0 w-16 h-16 bg-white/30 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-700"></div>
      <div class="relative w-20 h-20 bg-white rounded-full p-1 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        <div class="w-full h-full bg-gradient-to-br from-[#F2780C] to-[#64278C] rounded-full flex items-center justify-center">
          <span class="text-white font-black text-2xl drop-shadow-md">YAYA</span>
        </div>
      </div>
    </div>
    <div class="hidden sm:block">
      <h1 class="text-2xl md:text-3xl font-black text-white drop-shadow-lg tracking-tight">Plataforma de Juventudes</h1>
      <p class="text-lg md:text-xl font-bold text-[#F2780C] tracking-widest -mt-1">MOSQUERA</p>
    </div>
  </NuxtLink>
</template>
<template>
  <section class="relative py-24 bg-[#F2780C] overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 blur-[120px] translate-x-1/2 translate-y-1/2"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        
        <div class="lg:w-1/2 text-left">


          <h2 class="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight animate-reveal-up">
            Rendición de cuentas <br /> 
            <span class="inline-block px-4 py-1 bg-white text-[#038C33] rounded-2xl shadow-lg mt-2">
              Conoce nuestro 2025
            </span>
          </h2>
          
          <p class="text-xl text-white mb-10 max-w-xl leading-relaxed font-medium animate-reveal-up" style="animation-delay: 0.2s">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ratione veniam suscipit fugit odio inventore quas, molestias, tenetur voluptas cupiditate quis aut deserunt tempore. Atque culpa debitis accusamus praesentium maiores? 
            <span class="inline-block px-2 bg-white text-[#64278C] font-black rounded-md shadow-sm">proyectos reales</span>. 
            Conoce cómo estamos construyendo el futuro de Mosquera día a día.
          </p>

<div class="flex flex-wrap gap-4 animate-reveal-up" style="animation-delay: 0.4s">
  <a 
    href="/files/RendicióndeCuentas2025.pdf" 
    download="RendicióndeCuentas2025.pdf"
    class="px-8 py-4 bg-[#64278C] text-white font-black text-lg rounded-2xl 
           hover:bg-[#522178] transform hover:-translate-y-1 transition-all duration-300 
           shadow-xl flex items-center gap-2 no-underline inline-flex"
  >
    DESCARGAR INFORME PDF
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  </a>
</div>
        </div>

        <div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate-reveal-up" style="animation-delay: 0.5s">
          <div v-for="(item, index) in stats" :key="index" 
               class="group p-8 bg-white rounded-3xl shadow-2xl transform transition-all duration-300 hover:-translate-y-2 border-b-8 border-[#038C33]">
            <div class="text-[#038C33] font-black text-5xl mb-2 tracking-tighter">{{ item.value }}</div>
            <div class="text-[#64278C] font-black text-xs uppercase tracking-[0.1em] mb-3">{{ item.label }}</div>
            <div class="h-1 w-12 bg-[#F2780C] rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '000', label: 'logro 1' },
  { value: '000', label: 'Logro 2' },
  { value: '000', label: 'Logro 3' },
  { value: '000', label: 'Logro 4' }
]
</script>

<style scoped>
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-scale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-reveal-up {
  animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-reveal-scale {
  animation: reveal-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
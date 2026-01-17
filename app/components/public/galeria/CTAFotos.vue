<template>
  <section class="relative py-24 bg-[#038C33] overflow-hidden">
    
    <div class="absolute top-0 right-0 w-64 h-64 bg-[#F2780C] -translate-y-32 translate-x-32 rotate-45 opacity-20"></div>
    <div class="absolute bottom-0 left-0 w-32 h-32 bg-[#522178] translate-y-16 -translate-x-8 rounded-full opacity-30"></div>

    <div class="container relative z-10 mx-auto px-4">
      <div class="max-w-4xl mx-auto bg-white border-8 border-[#522178] p-8 md:p-16 rounded-3xl shadow-[16px_16px_0px_0px_rgba(82,33,120,1)]">
        
        <div class="text-center">
          <h2 class="text-5xl md:text-7xl font-black text-[#522178] mb-6 uppercase tracking-tighter leading-none">
            ¿Tienes <span class="text-[#F2780C]">Fotos</span>?
          </h2>
          
          <p class="text-xl md:text-2xl text-slate-600 font-bold mb-10 max-w-xl mx-auto leading-tight">
            Comparte tus momentos y forma parte de la <span class="bg-[#038C33] text-white px-2 py-0.5 rounded">historia juvenil</span> de Mosquera.
          </p>

          <button 
            class="group relative inline-flex items-center gap-4 px-12 py-5 bg-[#F2780C] text-white font-black text-xl uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-[#522178] hover:-translate-y-2 active:translate-y-0 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_12px_0px_0px_rgba(3,140,51,0.3)]"
          >
            <svg class="w-6 h-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Subir Foto
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optimizamos la legibilidad del título */
h2 {
  filter: drop-shadow(4px 4px 0px rgba(242, 120, 12, 0.1));
}

/* Efecto de entrada suave cuando el componente aparece en el viewport */
section {
  animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
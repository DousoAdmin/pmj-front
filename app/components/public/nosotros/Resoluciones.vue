<template>
  <section class="relative py-20 bg-white overflow-hidden border-b-4 border-[#F2780C]">
    <div class="absolute inset-0 opacity-[0.03] texture-grain pointer-events-none"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      
      <div class="mb-16 text-center animate-reveal-up">
        <span class="inline-block px-4 py-1.5 bg-gray-100 text-[#522178] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] rounded-full mb-6 shadow-sm">
          Repositorio de Documentos
        </span>
        <h2 class="text-5xl md:text-7xl font-black text-[#522178] leading-none tracking-tighter">
          Recursos <br />
          <span class="text-[#F2780C]">Oficiales</span>
        </h2>
        <div class="w-24 h-2 bg-[#F2780C] mx-auto mt-8 rounded-full opacity-20"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        
        <div class="group relative bg-[#522178] rounded-[2.5rem] p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between overflow-hidden border-4 border-transparent hover:border-[#F2780C]/20">

          <div class="flex flex-col gap-6 mb-10">
            <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:-rotate-6 transition-transform">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-black text-[#F2780C] uppercase tracking-widest block mb-2">Vigencia 2025</span>
              <h3 class="text-3xl font-black text-white leading-[1.1] tracking-tighter">
                Reglamento <br>
                <span class="inline-block px-3 py-1 bg-white text-[#522178] rounded-xl shadow-lg mt-2 transform -rotate-1 group-hover:rotate-0 transition-transform">
                  Interno
                </span>
              </h3>
              <p class="text-white/70 font-medium text-sm mt-6 leading-relaxed">Lineamientos y reglamento interno de la plataforma de juventudes.</p>
            </div>
          </div>
          <a target="_blank" href="/files/ReglamentoInternoPMJ.pdf" class="w-full py-4 bg-white text-[#522178] hover:bg-[#F2780C] hover:text-white font-black text-xs rounded-2xl transition-all text-center shadow-lg uppercase">Descargar PDF</a>
        </div>

        <div class="group relative bg-[#00A036] rounded-[2.5rem] p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between overflow-hidden border-4 border-transparent hover:border-white/20">
  
          <div class="flex flex-col gap-6 mb-10">
            <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:rotate-6 transition-transform">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-black text-white/60 uppercase tracking-widest block mb-2">Cronograma</span>
              <h3 class="text-3xl font-black text-white leading-[1.1] tracking-tighter">
                Agenda de <br>
                <span class="inline-block px-3 py-1 bg-white text-[#00A036] rounded-xl shadow-lg mt-2 transform rotate-1 group-hover:rotate-0 transition-transform">
                  Juventudes 2025
                </span>
              </h3>
              <p class="text-white/80 font-medium text-sm mt-6 leading-relaxed">Descarga las agendas y recursos de planificación para las juventudes. Aquí encontrarás las versiones publicadas.</p>
            </div>
          </div>
          <a target="_blank" href="/files/Agenda%20de%20Juventudes%202025.pdf" class="w-full py-4 bg-white text-[#00A036] hover:bg-[#522178] hover:text-white font-black text-xs rounded-2xl transition-all text-center shadow-lg uppercase">DESCARGAR PDF</a>
        </div>

        <div class="group relative bg-[#F2780C] rounded-[2.5rem] p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between overflow-hidden border-4 border-transparent hover:border-[#522178]/20">
          <div class="absolute top-0 right-0 bg-white text-[#F2780C] px-8 py-1 font-black text-[9px] transform rotate-45 translate-x-6 translate-y-3 shadow-sm">
            NUEVO
          </div>
          <div class="flex flex-col gap-6 mb-10">
            <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <span class="text-[10px] font-black text-white/60 uppercase tracking-widest block mb-2">Próxima</span>
              <h3 class="text-3xl font-black text-white leading-[1.1] tracking-tighter">
                Resolución <br>
                <span class="inline-block px-3 py-1 bg-white text-[#F2780C] rounded-xl shadow-lg mt-2 transform -rotate-1 group-hover:rotate-0 transition-transform">
                  Vigencia 2026-1
                </span>
              </h3>
              <p class="text-white/80 font-medium text-sm mt-6 leading-relaxed">Las organizaciones de nuestro primer semestre de 2026.</p>
            </div>
          </div>
          <a target="_blank" href="/files/RESOLUCION_PMJ_2026-1.pdf" class="w-full py-4 bg-white text-[#F2780C] hover:bg-[#522178] hover:text-white font-black text-xs rounded-2xl transition-all text-center shadow-lg uppercase">DESCARGAR PDF</a>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.texture-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-reveal-up {
  animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
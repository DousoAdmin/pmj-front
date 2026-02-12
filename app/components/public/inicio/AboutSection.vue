<template>
  <div class="about-wrapper">
    <section class="py-20 md:py-32 bg-[#F2780C] relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          
          <div class="w-full lg:w-3/5 text-white">
            <span class="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              Nuestra Identidad
            </span>
            <h1 class="text-5xl md:text-8xl font-black leading-none mb-6 tracking-tighter">
              Juventud que <br/> 
              <span class="text-[#522178]">Transforma.</span>
            </h1>
            <p class="text-xl md:text-2xl opacity-95 leading-relaxed max-w-2xl font-medium">
              Somos el espacio oficial para que los jóvenes de Mosquera participen, se capaciten y lideren el cambio social, cultural y deportivo de nuestro municipio.
            </p>
          </div>

          <div class="w-full lg:w-2/5">
            <div class="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-white p-2">
              <NuxtImg src="/images/pmj1.webp" alt="Jóvenes PMJ" class="w-full h-auto rounded-[2.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-[#522178] mb-4">¿Qué hacemos?</h2>
          <div class="w-24 h-2 bg-[#F2780C] mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-8 rounded-4xl bg-slate-50 border-b-4 border-[#038C33] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">⚽</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Deportivas</h4>
            <p class="text-slate-500 text-sm">Torneos, integración física y promoción de hábitos saludables.</p>
          </div>
          <div class="p-8 rounded-4xl bg-slate-50 border-b-4 border-[#F2780C] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🎨</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Culturales</h4>
            <p class="text-slate-500 text-sm">Festivales de arte, música y expresiones creativas juveniles.</p>
          </div>
          <div class="p-8 rounded-4xl bg-slate-50 border-b-4 border-[#00B140] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🌿</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Ambientales</h4>
            <p class="text-slate-500 text-sm">Jornadas de siembra, limpieza y conciencia ecológica territorial.</p>
          </div>
          <div class="p-8 rounded-4xl bg-slate-50 border-b-4 border-[#522178] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🤝</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Sociales</h4>
            <p class="text-slate-500 text-sm">Veeduría, participación política y empoderamiento comunitario.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-24 md:py-32 bg-[#00A036] overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
         style="background-image: radial-gradient(#522178 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="container mx-auto px-6 max-w-7xl relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        
        <div class="relative group animate-reveal-left">
          <div class="bg-slate-50 rounded-[4rem] p-8 md:p-14 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:bg-white">
            <div class="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-[#038C33]/10 border border-[#038C33]/20">
              <span class="text-[#038C33] text-xs font-black uppercase tracking-widest">Nuestro Propósito</span>
            </div>
            
            <h3 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              Nuestra <br />
              <span class="inline-block px-4 py-1 bg-[#038C33] text-white rounded-2xl rotate-[-1.5deg] shadow-lg mt-2">
                Misión
              </span>
            </h3>
            
            <p class="text-slate-600 leading-relaxed text-lg md:text-xl mb-10 font-medium">
              Promover el encuentro y la interlocución de las juventudes, fortaleciendo la participación activa para garantizar los derechos y el desarrollo territorial en Mosquera.
            </p>

            <div class="relative h-72 rounded-[3rem] overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
              <div class="absolute inset-0 bg-linear-to-t from-[#038C33]/40 to-transparent z-10"></div>
              <NuxtImg src="/images/pmjsofa.webp" alt="Misión PMJ" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div class="relative group animate-reveal-right">
          <div class="bg-[#522178] rounded-[4rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div class="relative z-10">
              <div class="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-white/10 border border-white/20">
                <span class="text-white text-xs font-black uppercase tracking-widest">Hacia el Futuro</span>
              </div>
              
              <h3 class="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Visión <br />
                <span class="inline-block px-4 py-1 bg-white text-[#522178] rounded-2xl rotate-[1.5deg] shadow-lg mt-2">
                  2027
                </span>
              </h3>
              
              <p class="text-white/90 leading-relaxed text-lg md:text-xl mb-10 font-medium">
                Ser el referente nacional en innovación y gestión juvenil, liderando proyectos de alto impacto que fortalezcan la inclusión y el liderazgo efectivo.
              </p>

              <div class="relative h-72 rounded-[3rem] overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                <div class="absolute inset-0 bg-linear-to-t from-[#F2780C]/40 to-transparent z-10"></div>
                <NuxtImg src="/images/vision.webp" alt="Visión PMJ" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
defineEmits(['open-modal'])
</script>

<style scoped>
  @keyframes reveal-left {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes reveal-right {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-reveal-left {
  animation: reveal-left 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-reveal-right {
  animation: reveal-right 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}
h1, h2, h3, h4 { letter-spacing: -0.02em; }
.about-wrapper { font-family: 'Inter', sans-serif; }
</style>
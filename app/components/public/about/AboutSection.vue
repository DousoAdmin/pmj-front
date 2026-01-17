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
              <img src="/images/pmjsofa.png" alt="Jóvenes PMJ" class="w-full h-auto rounded-[2.5rem]" />
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
          <div class="p-8 rounded-[2rem] bg-slate-50 border-b-4 border-[#038C33] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">⚽</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Deportivas</h4>
            <p class="text-slate-500 text-sm">Torneos, integración física y promoción de hábitos saludables.</p>
          </div>
          <div class="p-8 rounded-[2rem] bg-slate-50 border-b-4 border-[#F2780C] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🎨</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Culturales</h4>
            <p class="text-slate-500 text-sm">Festivales de arte, música y expresiones creativas juveniles.</p>
          </div>
          <div class="p-8 rounded-[2rem] bg-slate-50 border-b-4 border-[#00B140] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🌿</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Ambientales</h4>
            <p class="text-slate-500 text-sm">Jornadas de siembra, limpieza y conciencia ecológica territorial.</p>
          </div>
          <div class="p-8 rounded-[2rem] bg-slate-50 border-b-4 border-[#522178] hover:shadow-xl transition-all">
            <span class="text-4xl mb-4 block">🤝</span>
            <h4 class="text-xl font-bold text-slate-800 mb-2">Sociales</h4>
            <p class="text-slate-500 text-sm">Veeduría, participación política y empoderamiento comunitario.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-stretch">
          
          <div class="bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col border border-slate-100">
            <div class="p-10 md:p-12 flex-1">
              <h3 class="text-3xl font-black text-[#038C33] mb-6">Misión</h3>
              <p class="text-slate-600 leading-relaxed text-lg">
                Promover el encuentro y la interlocución de las juventudes, fortaleciendo la participación activa para garantizar los derechos y el desarrollo territorial en Mosquera.
              </p>
            </div>
            <div class="h-64 overflow-hidden">
              <img src="/images/pmj1.png" alt="Misión PMJ" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="bg-[#522178] rounded-[3rem] overflow-hidden shadow-xl flex flex-col text-white">
            <div class="p-10 md:p-12 flex-1">
              <h3 class="text-3xl font-black text-[#00B140] mb-6">Visión 2027</h3>
              <p class="opacity-90 leading-relaxed text-lg">
                Ser el referente nacional en innovación y gestión juvenil, liderando proyectos de alto impacto que fortalezcan la inclusión y el liderazgo efectivo.
              </p>
            </div>
            <div class="h-64 overflow-hidden">
              <img src="/images/pmj3.png" alt="Visión PMJ" class="w-full h-full object-cover" />
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
h1, h2, h3, h4 { letter-spacing: -0.02em; }
.about-wrapper { font-family: 'Inter', sans-serif; }
</style>
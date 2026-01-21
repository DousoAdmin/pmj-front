<template>
  <section class="py-20 md:py-32 bg-[#522178] relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-[#038C33]/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      
      <div class="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
        <div class="max-w-3xl text-left">
          <h2 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter animate-fade-in-up">
            Nuestros <br/>
            <span class="text-[#F2780C]">Representantes</span>
          </h2>
          <div class="flex items-center gap-4 animate-fade-in-up delay-200">
            <div class="h-10 w-1.5 bg-[#038C33]"></div>
            <p class="text-xl md:text-2xl text-white/80 font-bold uppercase tracking-widest">
              Mesa Directiva 2025 — 2026
            </p>
          </div>
        </div>
        
        <div class="hidden lg:block pb-2 animate-fade-in-up delay-300">
          <p class="text-sm font-black text-white/40 uppercase tracking-[0.3em] text-right">
            Liderazgo Juvenil <br/>
            Mosquera, Cundinamarca
          </p>
        </div>
      </div>

      <div class="space-y-16">
        
        <div class="flex flex-wrap justify-center gap-8 lg:gap-12">
          <MesaDirectivaCard 
            v-for="(member, index) in team.slice(0, 2)" 
            :key="'top-' + index"
            :member="member"
            :index="index"
            class="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(35%-2rem)] animate-card-entry"
            :style="{ animationDelay: (index * 200) + 'ms' }"
          />
        </div>

        <div class="flex items-center justify-center gap-4 opacity-30">
          <div class="h-px bg-white w-20"></div>
          <div class="w-2 h-2 rotate-45 bg-[#F2780C]"></div>
          <div class="h-px bg-white w-20"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          <MesaDirectivaCard 
            v-for="(member, index) in team.slice(2)" 
            :key="'rest-' + index"
            :member="member"
            :index="index + 2"
            class="animate-card-entry"
            :style="{ animationDelay: ((index + 2) * 150) + 'ms' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const team = ref([
  {
    name: 'Johana Chavarro',
    role: 'Presidenta',
    committee: 'Mesa Directiva',
    initials: 'JC',
    org: 'De Vuelta a la Vida',
    photo: 'Joha.webp',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Juan Esteban Parra',
    role: 'Vicepresidente',
    committee: 'Mesa Directiva',
    initials: 'JE',
    org: 'Los Meseros',
    photo: 'juanes.webp',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'David Cantor',
    role: 'Delegado Departamental y Provincial',
    committee: 'Representación',
    initials: 'DC',
    org: 'Hijos del Zipa',
    photo: 'David.webp',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Nikhol Puerto',
    role: 'Delegada Provincial',
    committee: 'Representación',
    initials: 'NP',
    org: 'Malas Hierbas',
    photo: 'Nikhol.webp',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'Kevin Parra',
    role: 'Comité de Comunicaciones',
    committee: 'Liderazgo',
    initials: 'KP',
    org: 'Comunidad M&F',
    photo: 'kevin.svg',
    gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]'
  },
  {
    name: 'Cristian Grajales',
    role: 'Comité de Ética',
    committee: 'Liderazgo',
    initials: 'CG',
    org: 'Juventud Agrícola Urbana JAU',
    photo: 'Cristian.webp',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  }
])
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardEntry {
  from { opacity: 0; transform: scale(0.95) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-card-entry {
  opacity: 0;
  animation: cardEntry 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

h2 { line-height: 0.85; }

.animate-fade-in-up, .animate-card-entry {
  opacity: 0;
}
</style>
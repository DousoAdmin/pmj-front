<template>
  <section class="py-20 md:py-32 bg-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-[#522178]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-[#038C33]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      
      

      <div class="space-y-12 mb-32 animate-fade-in-up delay-400">
        
        <div class="bg-slate-50 border-l-8 border-[#038C33] p-8 md:p-12 rounded-r-[3rem] shadow-sm">
          <h3 class="text-3xl font-black text-[#038C33] uppercase mb-6 tracking-tighter">¿Qué es la Plataforma Municipal de Juventudes?</h3>
          <div class="grid md:grid-cols-2 gap-8 text-slate-600">
            <p class="leading-relaxed text-lg font-medium">
              La Plataforma es el **escenario máximo de participación, concertación y vigilancia** de la juventud en Mosquera. Es un espacio autónomo mandatado por la Ley 1622 de 2013, donde convergen organizaciones, colectivos y jóvenes independientes.
            </p>
            <p class="leading-relaxed text-lg">
              Funcionamos como el puente directo entre la base juvenil y la institucionalidad, transformando las necesidades de los jóvenes en propuestas técnicas que el gobierno municipal debe atender.
            </p>
          </div>
        </div>

        <div class="bg-slate-50 border-l-8 border-[#F2780C] p-8 md:p-12 rounded-r-[3rem] shadow-sm">
          <h3 class="text-3xl font-black text-[#F2780C] uppercase mb-8 tracking-tighter">Nuestra labor por el territorio</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div class="space-y-3">
              <div class="text-4xl font-black text-[#F2780C]/20">01</div>
              <h4 class="text-[#522178] font-bold text-xl uppercase">Veeduría Ciudadana</h4>
              <p class="text-slate-500 text-sm">Vigilamos la inversión de recursos públicos en programas que impacten el desarrollo juvenil real.</p>
            </div>
            <div class="space-y-3">
              <div class="text-4xl font-black text-[#F2780C]/20">02</div>
              <h4 class="text-[#522178] font-bold text-xl uppercase">Agenda Pública</h4>
              <p class="text-slate-500 text-sm">Priorizamos temas como salud mental, empleo joven, cultura y protección ambiental.</p>
            </div>
            <div class="space-y-3">
              <div class="text-4xl font-black text-[#F2780C]/20">03</div>
              <h4 class="text-[#522178] font-bold text-xl uppercase">Concertación</h4>
              <p class="text-slate-500 text-sm">Llevamos las propuestas de los jóvenes ante el Consejo Municipal de Juventudes y la Administración.</p>
            </div>
          </div>
        </div>

        <div class="bg-[#522178] text-white p-8 md:p-12 rounded-[3rem] shadow-xl">
          <h3 class="text-3xl font-black text-[#F2780C] uppercase mb-8 tracking-tighter">¿Cómo te beneficia participar?</h3>
          <ul class="grid md:grid-cols-2 gap-8">
            <li class="flex gap-4 items-start">
              <div class="w-8 h-8 rounded-full bg-[#038C33] shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <p><strong class="text-white">Gestión de Espacios:</strong> Abrimos puertas para tus proyectos culturales o deportivos.</p>
            </li>
            <li class="flex gap-4 items-start">
              <div class="w-8 h-8 rounded-full bg-[#038C33] shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <p><strong class="text-white">Formación y Becas:</strong> Acceso preferencial a talleres de liderazgo y diplomados.</p>
            </li>
            <li class="flex gap-4 items-start">
              <div class="w-8 h-8 rounded-full bg-[#038C33] shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <p><strong class="text-white">Red de Contactos:</strong> Conectamos tu parche con otros colectivos del municipio.</p>
            </li>
            <li class="flex gap-4 items-start">
              <div class="w-8 h-8 rounded-full bg-[#038C33] shrink-0 flex items-center justify-center text-white font-bold">✓</div>
              <p><strong class="text-white">Voz Institucional:</strong> Garantizamos que tus sugerencias lleguen a los secretarios de despacho.</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="teamData.length > 0" class="pt-12">
        <p class="text-center text-slate-400 font-black uppercase tracking-[0.4em] mb-12">Equipo Directivo</p>
        
        <div class="flex flex-wrap justify-center gap-12 mb-16">
          <MesaDirectivaCard 
            v-for="(member, index) in topMembers" 
            :key="'top-' + index"
            :member="member"
            :index="index"
            class="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(35%-2rem)] animate-card-entry"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <MesaDirectivaCard 
            v-for="(member, index) in restOfMembers" 
            :key="'rest-' + index"
            :member="member"
            :index="index + 2"
            class="animate-card-entry"
            :style="{ animationDelay: (index * 100) + 'ms' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  team: { type: Array, default: () => [] }
})

const teamData = computed(() => props.team || [])
const topMembers = computed(() => teamData.value.slice(0, 2))
const restOfMembers = computed(() => teamData.value.slice(2))
</script>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cardEntry { from { opacity: 0; transform: scale(0.95) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
.animate-card-entry { animation: cardEntry 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
h2 { line-height: 0.85; }
</style>
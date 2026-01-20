<template>
  <section class="relative py-24 md:py-32 bg-[#522178] overflow-hidden">
    
<div 
  class="absolute inset-0 opacity-[0.2] animate-subtle-zoom" 
  style="background-image: 
    radial-gradient(circle, #ffffff 1px, transparent 1px), 
    radial-gradient(circle, #ffffff 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;"
></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <div class="flex flex-col items-center mb-20 animate-fade-in">
        <div class="inline-flex items-center px-8 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div class="flex -space-x-2 mr-4">
             <span class="w-3 h-3 rounded-full bg-[#038C33] shadow-[0_0_10px_#038C33]"></span>
             <span class="w-3 h-3 rounded-full bg-[#F2780C] shadow-[0_0_10px_#F2780C]"></span>
          </div>
          <p class="text-sm md:text-base text-white/90 font-medium tracking-wide">
            Explora las <span class="font-black text-[#038C33] text-xl">{{ organizaciones.length }}</span> organizaciones juveniles
          </p>
        </div>
        <div class="w-px h-16 bg-linear-to-b from-white/20 to-transparent mt-6"></div>
      </div>

      <div 
        v-if="organizaciones && organizaciones.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
      >
        <TarjetaOrganizacion 
          v-for="(org, index) in organizaciones" 
          :key="org.name" 
          :organizacion="org"
          :index="index"
        />
      </div>

      <div v-else class="py-20 text-center">
        <NoResultadosOrganizaciones class="animate-bounce-subtle" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Definimos la interfaz para evitar el error de tipo 'any'
interface Organizacion {
  name: string
  initials: string
  desc: string
  type: string
  gradient: string
  link: string
}

interface Props {
  organizaciones: Organizacion[]
}

// Al asignar defineProps a una constante, TypeScript reconoce mejor las propiedades en el template
const props = defineProps<Props>()
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-bounce-subtle {
  animation: bounce-subtle 3s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
</style>
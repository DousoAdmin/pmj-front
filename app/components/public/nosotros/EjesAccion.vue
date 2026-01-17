<template>
  <section class="py-20 md:py-32 bg-[#038C33] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-[#522178]/20 rounded-full -translate-x-1/4 translate-y-1/4"></div>

    <div class="container mx-auto px-4 relative z-10">
      
      <div class="text-center mb-16 md:mb-24">
        <h2 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter animate-fade-in-up">
          Ejes de <span class="text-[#522178]">Acción</span>
        </h2>
        
        <div class="flex items-center justify-center gap-4 mb-8">
          <div class="h-1.5 w-16 bg-[#F2780C] rounded-full"></div>
          <div class="h-1.5 w-4 bg-white rounded-full"></div>
          <div class="h-1.5 w-16 bg-[#F2780C] rounded-full"></div>
        </div>

        <p class="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto font-bold leading-tight animate-fade-in-up delay-200">
          Explora nuestros pilares de trabajo diseñados para potenciar el talento juvenil de Mosquera. 
          Desde el liderazgo político hasta la expresión artística.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <EjeCard 
          v-for="(eje, index) in ejes" 
          :key="index"
          :eje="eje"
          class="animate-card-entry"
          :style="{ animationDelay: (index * 100) + 'ms' }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Hemos simplificado la estructura de datos eliminando los gradientes
const ejes = ref([
  {
    titulo: 'EJE SOCIAL',
    descripcion: 'Impulsa la <strong>participación juvenil</strong> y promueve el <strong>desarrollo comunitario</strong>.',
    colorEje: '#522178', // Morado
    icono: 'social'
  },
  {
    titulo: 'EJE POLÍTICO',
    descripcion: 'Promueve la <strong>participación activa</strong> en la toma de <strong>decisiones</strong>.',
    colorEje: '#F2780C', // Naranja
    icono: 'politico'
  },
  {
    titulo: 'EJE AMBIENTAL',
    descripcion: 'Promueve la <strong>conciencia ecológica</strong> y la protección de nuestro entorno.',
    colorEje: '#522178',
    icono: 'ambiental'
  },
  {
    titulo: 'EJE CULTURAL',
    descripcion: 'Fomenta la <strong>identidad</strong>, la expresión artística y las <strong>tradiciones</strong>.',
    colorEje: '#F2780C',
    icono: 'cultural'
  },
  {
    titulo: 'EJE DEPORTIVO',
    descripcion: 'Fomenta la <strong>práctica deportiva</strong> y la integración juvenil a través del bienestar.',
    colorEje: '#522178',
    icono: 'deportivo'
  },
  {
    titulo: 'EJE EMPRENDEDOR',
    descripcion: 'Apoya la creación de empresas y fomenta <strong>habilidades innovadoras</strong>.',
    colorEje: '#F2780C',
    icono: 'emprendedor'
  },
  {
    titulo: 'EJE EDUCACIONAL',
    descripcion: 'Promueve el <strong>acceso a la educación</strong> y la equidad en oportunidades.',
    colorEje: '#522178',
    icono: 'educacional'
  }
])
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardEntry {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.animate-card-entry {
  animation: cardEntry 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  opacity: 0;
}

.delay-200 { animation-delay: 0.2s; }

h2 {
  line-height: 0.9;
}
</style>
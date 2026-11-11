<template>
  <section class="py-12 md:py-20 bg-[#038C33] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#522178]/20 rounded-full -translate-x-1/4 translate-y-1/4"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-6xl">
      
      <!-- Encabezado compacto -->
      <div class="text-center mb-10 md:mb-14">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter animate-fade-in-up">
          Ejes de <span class="text-[#522178]">Acción</span>
        </h2>
        
        <div class="flex items-center justify-center gap-3 mb-5">
          <div class="h-1 w-12 bg-[#F2780C] rounded-full"></div>
          <div class="h-1 w-3 bg-white rounded-full"></div>
          <div class="h-1 w-12 bg-[#F2780C] rounded-full"></div>
        </div>

        <p class="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-medium leading-snug animate-fade-in-up delay-200">
          Explora nuestros pilares de trabajo diseñados para potenciar el talento juvenil de Mosquera. 
          Desde el liderazgo político hasta la expresión artística.
        </p>
      </div>

      <!-- Grid optimizado y simétrico -->
      <div class="flex flex-wrap justify-center gap-4 md:gap-6">
        <EjeCard 
          v-for="(eje, index) in ejes" 
          :key="index"
          :eje="eje"
          class="animate-card-entry w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.25rem)] max-w-xs h-full"
          :style="{ animationDelay: (index * 100) + 'ms' }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const ejes = ref([
  {
    titulo: 'EJE SOCIAL',
    descripcion: 'Impulsa la <strong>participación juvenil</strong> y promueve el <strong>desarrollo comunitario</strong>.',
    colorEje: '#522178',
    // Icono de personas / comunidad
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
  },
  {
    titulo: 'EJE POLÍTICO',
    descripcion: 'Promueve la <strong>participación activa</strong> en la toma de <strong>decisiones</strong>.',
    colorEje: '#F2780C',
    // Icono de balanza / justicia / participación cívica o estrado
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>`
  },
  {
    titulo: 'EJE AMBIENTAL',
    descripcion: 'Promueve la <strong>conciencia ecológica</strong> y la protección de nuestro entorno.',
    colorEje: '#522178',
    // Icono de hoja / naturaleza
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>`
  },
  {
    titulo: 'EJE CULTURAL',
    descripcion: 'Fomenta la <strong>identidad</strong>, la expresión artística y las <strong>tradiciones</strong>.',
    colorEje: '#F2780C',
    // Icono de paleta de pintor / arte
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 73.143a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path></svg>`
  },
  {
    titulo: 'EJE DEPORTIVO',
    descripcion: 'Fomenta la <strong>práctica deportiva</strong> y la integración juvenil a través del bienestar.',
    colorEje: '#522178',
    // Icono de trofeo / deporte
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`
  },
  {
    titulo: 'EJE EMPRENDEDOR',
    descripcion: 'Apoya la creación de empresas y fomenta <strong>habilidades innovadoras</strong>.',
    colorEje: '#F2780C',
    // Icono de bombillo / innovación / negocios
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`
  },
  {
    titulo: 'EJE EDUCACIONAL',
    descripcion: 'Promueve el <strong>acceso a la educación</strong> y la equidad en oportunidades.',
    colorEje: '#522178',
    // Icono de birrete / libro / educación
    svgIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0.01-.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-5.5-2.158 12.083 12.083 0 01-.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path></svg>`
  }
])
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardEntry {
  from { opacity: 0; transform: scale(0.95) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.animate-card-entry {
  animation: cardEntry 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  opacity: 0;
}

.delay-200 { animation-delay: 0.2s; }

h2 {
  line-height: 0.95;
}
</style>
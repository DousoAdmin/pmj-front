<!-- components/nosotros/EjesAccion.vue -->
<template>
  <section class="py-20 md:py-32 bg-gradient-to-b from-[#f8fff8] to-white">
    <div class="container mx-auto px-4">
      <!-- Título principal -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-black 
                   bg-gradient-to-r from-[#64278C] via-[#00B140] to-[#F2780C] 
                   bg-clip-text text-transparent mb-6 animate-gradient-x">
          Descubre Nuestros Ejes de Acción
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-5xl mx-auto font-medium animate-fade-up delay-200">
          Explora una variedad de servicios diseñados especialmente para jóvenes en la Plataforma de Juventudes de Mosquera. 
          Desde orientación profesional hasta actividades recreativas, nuestros ejes están pensados para apoyarte en todas las etapas de tu vida.
        </p>
      </div>

      <!-- Grid de ejes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <EjeCard 
          v-for="(eje, index) in ejes" 
          :key="index"
          :eje="eje"
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
    descripcion: 'Impulsa la <strong>participación juvenil</strong>, fomenta el <strong>liderazgo</strong> y promueve el <strong>desarrollo comunitario</strong> en el territorio de Mosquera.',
    colorTitulo: '#64278C',
    gradiente: 'from-[#64278C] to-[#00B140]',
    icono: 'social'
  },
  {
    titulo: 'EJE POLÍTICO',
    descripcion: 'Promueve la <strong>participación activa</strong> en la construcción y toma de <strong>decisiones juveniles</strong>.',
    colorTitulo: '#F2780C',
    gradiente: 'from-[#F2780C] to-[#64278C]',
    icono: 'politico'
  },
  {
    titulo: 'EJE AMBIENTAL',
    descripcion: 'Promueve la <strong>conciencia ecológica</strong>, el cuidado del entorno y la <strong>participación activa</strong> en la protección ambiental.',
    colorTitulo: '#00B140',
    gradiente: 'from-[#00B140] to-[#038C33]',
    icono: 'ambiental'
  },
  {
    titulo: 'EJE CULTURAL',
    descripcion: 'Fomenta la <strong>identidad cultural</strong>, la expresión artística y la preservación de <strong>tradiciones locales</strong>.',
    colorTitulo: '#F2780C',
    gradiente: 'from-[#F2780C] to-[#64278C]',
    icono: 'cultural'
  },
  {
    titulo: 'EJE DEPORTIVO',
    descripcion: 'Fomenta la <strong>práctica deportiva</strong>, promueve el bienestar y fortalece la <strong>integración juvenil</strong> en Mosquera.',
    colorTitulo: '#64278C',
    gradiente: 'from-[#64278C] to-[#00B140]',
    icono: 'deportivo'
  },
  {
    titulo: 'EJE EMPRENDEDOR',
    descripcion: 'Impulsa la <strong>innovación</strong>, apoya la creación de empresas y fomenta el desarrollo de <strong>habilidades emprendedoras</strong>.',
    colorTitulo: '#F2780C',
    gradiente: 'from-[#F2780C] to-[#64278C]',
    icono: 'emprendedor'
  },
  {
    titulo: 'EJE EDUCACIONAL',
    descripcion: 'Promueve el <strong>acceso a la educación</strong>, el desarrollo de habilidades y la <strong>equidad en oportunidades</strong> para jóvenes.',
    colorTitulo: '#00B140',
    gradiente: 'from-[#00B140] to-[#038C33]',
    icono: 'educacional'
  }
])
</script>
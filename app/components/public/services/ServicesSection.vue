<!-- components/ServicesSection.vue -->
<!--
  COMPONENTE: Servicios Oficiales - Plataforma Municipal de Juventudes Mosquera
  PROPÓSITO: Presentar las 4 oportunidades juveniles 2025
  CARACTERÍSTICAS:
  - Diseño institucional con gradientes oficiales (#64278C, #038C33, #F2780C)
  - 4 tarjetas con iconos sólidos (accesibles y escalables)
  - Animaciones escalonadas con delay dinámico
  - Totalmente responsive
  - Código comentado para equipos
-->

<template>
  <!-- =============================================== -->
  <!-- SECCIÓN DE SERVICIOS - FONDO INSTITUCIONAL MORADO -->
  <!-- =============================================== -->
  <section 
    class="py-20 md:py-32 bg-gradient-to-b from-[#efd9ff] via-[#e8c7ff] to-[#e6c4ff]"
    aria-labelledby="services-title"
  >
    <div class="container mx-auto px-4">
      
      <!-- =============================================== -->
      <!-- TÍTULO PRINCIPAL CON ANIMACIÓN -->
      <!-- =============================================== -->
      <div class="text-center mb-20">
        <h2 
          id="services-title"
          class="text-4xl md:text-6xl font-black bg-clip-text text-transparent 
                 bg-gradient-to-r from-[#64278C] to-[#038C33] mb-6 animate-fade-up"
        >
          ¿En qué Podemos Ayudarte?
        </h2>
        <p 
          class="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed 
                 animate-fade-up delay-200 font-medium"
        >
          Te conectamos con <strong class="text-[#038C33] font-bold">oportunidades reales</strong> 
          para construir tu futuro en Mosquera.
        </p>
      </div>

      <!-- =============================================== -->
      <!-- GRID DE SERVICIOS - 4 PILARES JUVENILES 2025 -->
      <!-- =============================================== -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          :gradient="service.gradient"
          :delay="`${(index + 1) * 150}ms`"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>


<script setup>
import { UserGroupIcon, AcademicCapIcon, LightBulbIcon, CalendarIcon } from '@heroicons/vue/24/solid'

// ===============================================
// 4 SERVICIOS OFICIALES 2025 - PLAN DE DESARROLLO
// ===============================================
const services = [
  {
    title: "Participación Juvenil",
    description: "Incide en políticas públicas, mesas temáticas, consejos municipales y toma de decisiones reales que afectan tu vida.",
    icon: UserGroupIcon,
    gradient: "from-[#038C33] to-[#64278C]",
    ariaLabel: "Participación juvenil en decisiones públicas"
  },
  {
    title: "Becas & Empleo",
    description: "Accede a Mosquera Pila, ferias laborales, incentivos económicos y apoyo para crear tu propia organización juvenil.",
    icon: AcademicCapIcon,
    gradient: "from-[#F2780C] to-[#038C33]",
    ariaLabel: "Oportunidades de becas y empleo juvenil"
  },
  {
    title: "Emprendimiento",
    description: "Fondo de Incentivos 2025: hasta 25 millones para proyectos sociales, culturales y ambientales liderados por jóvenes.",
    icon: LightBulbIcon,
    gradient: "from-[#64278C] to-[#F2780C]",
    ariaLabel: "Apoyo al emprendimiento juvenil"
  },
  {
    title: "Eventos & Cultura",
    description: "Casa de la Juventud, talleres gratuitos, Yaya Fest, SOFA, ferias del libro y más de 50 actividades anuales.",
    icon: CalendarIcon,
    gradient: "from-[#038C33] to-[#64278C]",
    ariaLabel: "Eventos culturales y recreativos para jóvenes"
  }
]
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES PERSONALIZADAS PARA SERVICIOS */
/* =============================================== */
@keyframes fade-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
}

.delay-200 { animation-delay: 0.2s; }
</style>
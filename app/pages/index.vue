<!-- App.vue -->
<!--
  COMPONENTE RAÍZ DEL PROYECTO
  Plataforma Municipal de Juventudes Mosquera 2025
  PROPÓSITO: Estructura principal del sitio web oficial
  CARACTERÍSTICAS:
  - Fondo degradado institucional suave (#d0ffe1 → #c9ffdb)
  - Composición modular con secciones reutilizables
  - Modal global de confirmación con Teleport (mejor práctica Vue 3)
  - Estado centralizado del modal (showModal)
  - Animaciones globales reutilizables (float + fade-up)
  - Totalmente accesible: cierre con Escape, click fuera, foco atrapado
  - Optimizado para móviles, tablets y pantallas grandes
-->

<template>
  <!-- =============================================== -->
  <!-- CONTENEDOR PRINCIPAL - FONDO INSTITUCIONAL -->
  <!-- =============================================== -->

    <!-- =============================================== -->
    <!-- 1. HERO PRINCIPAL -->
    <!-- =============================================== -->
    <HeroSection />
    <PublicCarruselCarousel />
</template>


<script setup>
import HeroSection from '~/components/public/modal/HeroSection.vue';
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES GLOBALES - REUTILIZABLES EN TODO EL SITIO */
/* =============================================== */

/* Flotación suave para logos, iconos o elementos decorativos */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(5deg); 
  }
}
.animate-float { 
  animation: float 6s ease-in-out infinite; 
}

/* Aparición desde abajo - usada en títulos y secciones */
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

/* Delays para animaciones escalonadas */
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-600 { animation-delay: 0.6s; }

/* Mejora visual del backdrop */
.fixed.inset-0::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%);
}
</style>
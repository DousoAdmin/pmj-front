<script setup>
import { ref } from "vue"; 
import './header.css'

// aquí manejo el estado: si el menú está abierto o cerrado
const isOpen = ref(false);
</script>

<template>
  <!-- HEADER PRINCIPAL -->
  <header class="header-main">
    <div class="header-container">
      
      <!-- Botón hamburguesa (las 3 rayas de siempre) -->
      <!-- cuando le doy click, pongo isOpen en true y aparece el menú -->
      <div class="header-burger">
        <button 
          class="text-green-600 focus:outline-none"
          @click="isOpen = true"
        >
          <!-- Este es el ícono del menú hamburguesa -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Logo centrado en todo el header -->
      <!-- lo ubiqué con absolute para que siempre quede fijo en el centro -->
      <div class="header-logo">
        <img 
          src="/logo.png" 
          alt="Plataforma Juventud Mosquera" 
          class="header-logo-img"
        />
      </div>

      <!-- Redes sociales a la derecha -->
      <!-- cada icono tiene su circulito verde con hover más oscuro -->
      <div class="header-social">
        <a href="#" class="header-social-icon">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="header-social-icon">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="#" class="header-social-icon">
          <i class="fab fa-youtube"></i>
        </a>
        <a href="mailto:correo@ejemplo.com" class="header-social-icon">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="#" class="header-social-icon">
          <i class="fab fa-tiktok"></i>
        </a>
        <a href="#" class="header-social-icon">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  </header>

  <!-- aquí está el panel que aparece desde la izquierda -->
  <!-- uso <transition> para que entre y salga con animación -->
  <transition name="slide-smooth">
    <aside
      v-if="isOpen"
      class="sidebar"
    >
      <div class="sidebar-panel">
        
        <!-- Botón cerrar (la X arriba a la derecha) -->
        <button class="sidebar-close" @click="isOpen = false">✕</button>
        
        <!-- Menú lateral -->
        <!-- cada link tiene hover -->
        <nav class="sidebar-menu">
          <a href="#" class="sidebar-link">Inicio</a>
          <a href="#" class="sidebar-link">Nosotros</a>
          <a href="#" class="sidebar-link">Inscripciones</a>
          <a href="#" class="sidebar-link">Organizaciones</a>
          <a href="#" class="sidebar-link">Galería</a>
        </nav>
      </div>
    </aside>
  </transition>

  <!-- Fondo oscuro -->
  <transition name="fade">
    <div v-if="isOpen" class="sidebar-backdrop" @click="isOpen = false"></div>
  </transition>
</template>

<!-- Importo los estilos desde header.css -->
<style src="./header.css" scoped></style>

<!--
GUÍA DE LO QUE HICE EN ESTE PROYECTO (por mí, con ayuda de IA y videos):

- Organicé el proyecto Nuxt 3 creando la carpeta 'components/header' y separando el Header y sus estilos en archivos distintos para mantener todo modular y limpio.
- En 'Header.vue' armé el header con:
  - Botón hamburguesa a la izquierda (3 líneas verdes) que abre el menú lateral.
  - Logo grande y centrado, usando la imagen que subí como 'logo.png' en la carpeta 'public'.
  - Íconos de redes sociales a la derecha, en círculos verdes y con animación hover.
- El menú lateral (sidebar):
  - Aparece desde la izquierda con animación suave (transiciones CSS personalizadas).
  - Fondo naranja con transparencia sutil (rgba(243,143,19,0.95)).
  - Texto del menú más pequeño y estilizado.
  - Botón de cerrar en la esquina superior derecha.
  - Fondo oscuro suave al abrir el menú.
- Instalé Font Awesome para los íconos sociales:
  npm install @fortawesome/fontawesome-free
  y lo agregué en nuxt.config.ts para que los estilos estén globales.
- Ajusté márgenes, tamaños y centré el logo para que todo se viera profesional y responsivo.
- Todos los estilos del header y sidebar están en 'header.css' para fácil mantenimiento.

Me ayudé con videos de YouTube y con IA para resolver dudas y mejorar el diseño.

DUDAS O PENDIENTES:
- A veces, cuando aparece el menú lateral, el fondo se pone muy negro. Toca revisar y ajustar la opacidad del fondo oscuro si es necesario.
- Todo lo demás quedó funcionando y bien organizado.
-->

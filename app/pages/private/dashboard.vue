<!--
  ============================================================
  PÁGINA: Dashboard (inicio)
  Ruta: /private/dashboard
  ============================================================
  Es la página principal a la que llega el usuario al ingresar
  al área privada. Solo monta el componente DashboardHome,
  que tiene toda la lógica visual.

  Usa el layout "dashboard" → significa que se renderiza dentro
  del sidebar lateral + TopHeader.
-->

<script setup>
definePageMeta({ layout: 'dashboard' })
import DashboardHome from '~/components/private/dashboard/DashboardHome.vue'
</script>

<template>
  <DashboardHome />
</template>

<style scoped>
</style>

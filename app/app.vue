
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header con navegación -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Mi Proyecto Nuxt 4</h1>
      <nav class="space-x-4">
        <NuxtLink to="/" class="hover:underline">Inicio</NuxtLink>
        <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
      </nav>
    </header>

    <!-- Contenido dinámico -->
    <main class="flex-1 p-6">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 text-center p-4 text-gray-600">
      © 2025 - Mi Proyecto Nuxt 4
    </footer>
  </div>
</template>
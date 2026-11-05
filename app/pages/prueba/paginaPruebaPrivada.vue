<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { user } = useAuth()
const currentUser = computed(() => user.value ?? {})
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-black mb-4">Página Privada de Prueba</h1>
    <p class="text-gray-700 mb-8">
      Bienvenido,
      <span class="font-bold">{{ currentUser.username ?? 'usuario' }}</span>
    </p>

    <div class="bg-white rounded-3xl shadow-lg p-6 max-w-2xl">
      <h2 class="text-xl font-semibold mb-3">Datos de sesión</h2>
      <div class="grid gap-3 text-sm text-slate-700">
        <div>
          <span class="font-semibold">ID:</span>
          <span>{{ currentUser.id ?? '-' }}</span>
        </div>
        <div>
          <span class="font-semibold">Usuario:</span>
          <span>{{ currentUser.username ?? '-' }}</span>
        </div>
      </div>
      <pre class="mt-5 overflow-x-auto text-xs text-slate-500 bg-slate-50 rounded-xl p-4">{{ currentUser }}</pre>
    </div>

    <NuxtLink
      to="/private/dashboard"
      class="inline-block mt-6 px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
    >
      Ir al Dashboard
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'external' })
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const { login } = useAuth()

const submitLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    await login(username.value, password.value)
    await navigateTo('/private/dashboard')
  } catch (error: any) {
    errorMessage.value = 'Usuario o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Iniciar sesión</h1>

    <form @submit.prevent="submitLogin">
      <input
        v-model="username"
        type="text"
        placeholder="Usuario"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>

      <p v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>
<script setup lang="ts">
interface Disability {
  id: number
  nombre: string
  descripcion: string
  estado: boolean
}
definePageMeta({ layout: 'external' })
const api = useApi()

const disabilities = ref<Disability[]>([])
const loading = ref(false)
const error = ref('')

const getDisabilities = async () => {
  try {
    loading.value = true
    error.value = ''
    disabilities.value = await api.publicGet<Disability[]>(
      '/disabilitys/',
      {
        query: {
          include_inactive: true
        }
      }
    )
  } catch (err: any) {
    console.error(err)

    error.value =
      err?.data?.detail ||
      err?.message ||
      'Error al consultar discapacidades'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDisabilities()
})
</script>

<template>
  <section>
    <h1>Discapacidades</h1>

    <p v-if="loading">Cargando...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <ul v-else>
      <li
        v-for="item in disabilities"
        :key="item.id"
      >
        <strong>{{ item.nombre }}</strong>
        <br>
        <span>{{ item.descripcion }}</span>
        <br>
        <small>
          Estado: {{ item.estado ? 'Activo' : 'Inactivo' }}
        </small>
      </li>
    </ul>
  </section>
</template>
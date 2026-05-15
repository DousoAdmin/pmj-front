<script setup lang="ts">
interface Disability {
  DSBT_PY: number
  DSBT_name: string
  DSBT_description: string
  DSBT_state: boolean
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
    disabilities.value = await api.get<Disability[]>(
  '/disabilitys/',
  {
    include_inactive: false
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
        :key="item.DSBT_PY"
      >
        <strong>{{ item.DSBT_name }}</strong>
        <br>
        <span>{{ item.DSBT_description }}</span>
        <br>
        <small>
          Estado: {{ item.DSBT_state ? 'Activo' : 'Inactivo' }}
        </small>
      </li>
    </ul>
  </section>
</template>
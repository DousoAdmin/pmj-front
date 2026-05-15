

<script setup lang="ts">
const api = useApi()


const usuarios = ref([])

onMounted(async () => {
  usuarios.value = await api.get('/usuarios')
})
</script>
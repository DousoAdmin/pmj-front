<template>
  <main>
    <LazyNoticiasHero />
    <LazyNoticiasFiltros v-model="filtro" :filters="filters" />
    <LazyNoticiasGrid :noticias="noticiasFiltradas" />
    <LazyNoticiasCTA @enviar="onEnviar" />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const filtro = ref('todas')

const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'comunicados', label: 'Comunicados' }
]

// TODO: reemplazar por tu data real / API
const noticias = ref([
  { title: 'Noticia 1', category: 'eventos' },
  { title: 'Noticia 2', category: 'comunicados' }
])

const noticiasFiltradas = computed(() => {
  if (filtro.value === 'todas') return noticias.value
  return noticias.value.filter(n => n.category === filtro.value)
})

function onEnviar() {}
</script>
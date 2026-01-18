<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NoticiasTarjeta
          v-for="(noticia, index) in noticias"
          :key="index"
          :noticia="noticia"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  noticias: { type: Array, required: true }
})
</script>
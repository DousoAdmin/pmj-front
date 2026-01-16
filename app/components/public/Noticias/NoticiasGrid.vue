<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TarjetaNoticia
          v-for="(noticia, index) in noticias"
          :key="index"
          :noticia="noticia"
          :index="index"
        />

        <div v-if="noticias.length === 0" class="col-span-full text-center py-24">
          <div class="max-w-md mx-auto">
            <p class="text-2xl text-gray-500 font-medium mb-3">
              No hay noticias en esta categoría aún.
            </p>
            <p class="text-gray-400">
              ¡Vuelve pronto! Estamos trabajando en nuevo contenido para ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  noticias: { type: Array, required: true }
})
</script>
<template>
  <div>
    <section>
      <HeroSection />
      <Carousel />
      <LazyAboutSection />
      <LazyContactFormSection />
    </section>
    <Footer @open-registration="showModal = true" />
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        <button @click="showModal = false" class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-xl">&times;</button>
        <FormOrganizacion @close="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '~/components/public/footer/Footer.vue'
import FormOrganizacion from '~/components/public/form-organizacion/FormOrganizacion.vue'

const showModal = ref(false)
</script>

<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/public/header/header.vue'
import Footer from '~/components/public/footer/Footer.vue'
</script>
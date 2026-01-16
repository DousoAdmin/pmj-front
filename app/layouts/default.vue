
<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>

</template>

<script setup>
import Header from '@/components/public/header/Header.vue'
import Footer from '@/components/public/footer/Footer.vue'

</script>

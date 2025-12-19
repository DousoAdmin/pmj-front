
<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>

</template>

<script setup>
import Header from '@/components/public/header/LayoutHeader.vue'
import Footer from '@/components/public/footer/LayoutFooter.vue'

</script>

<template>
  <div class="relative min-h-0 md:min-h-dvh flex flex-col md:items-center md:justify-center overflow-hidden bg-[#eadef5] pt-28 pb-12 md:pt-32 md:pb-20">
    <FormOrganizacion />
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

import FormOrganizacion from '~/components/public/form-organizacion/FormOrganizacion.vue'
</script>

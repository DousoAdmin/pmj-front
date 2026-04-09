<template>
  <div>
    <Header />
    <slot />
    <Footer v-if="!$route.meta.hideFooter" />
  </div>
</template>

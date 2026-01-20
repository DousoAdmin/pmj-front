<script setup>
// Redirige automáticamente a /public/
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/public/')
    },
  ],
});
</script>
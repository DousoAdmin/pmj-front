<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/public/')
    },
  ],
});
</script>
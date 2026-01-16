<template>
  <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-black mb-6 animate-fade-up">
        ¿Tienes una Noticia?
      </h2>

      <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-up delay-200 opacity-90 leading-relaxed">
        Comparte eventos, logros o convocatorias con toda la comunidad juvenil de Mosquera.
      </p>

      <button
        type="button"
        class="px-10 py-4 bg-[#F2780C] text-white font-black text-lg rounded-full
               hover:bg-orange-600 transform hover:scale-105 transition-all duration-300
               shadow-2xl animate-fade-up delay-400 hover:shadow-orange-500/50
               active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
        @click="emit('enviar')"
      >
        Enviar Noticia
      </button>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['enviar'])
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
</style>
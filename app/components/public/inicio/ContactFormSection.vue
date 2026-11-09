<template>
  <section 
    class="py-24 md:py-40 bg-[#522178] text-white relative overflow-hidden"
    aria-labelledby="contact-title" 
    id="formulario"
  >
    <!-- Elementos decorativos de fondo -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-2xl"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-[#F2780C]/10 rounded-full blur-2xl"></div>

    <!-- SE CAMBIÓ AQUÍ: Añadimos más padding lateral (px-6 sm:px-10 lg:px-16) para que no quede pegado -->
    <div class="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
        
        <!-- Columna de Texto -->
        <div class="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
          <h2 id="contact-title" class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight lg:leading-none text-white">
            ¡Sé parte <br class="hidden sm:inline" />
            <span class="text-[#F2780C]">del cambio!</span>
          </h2>
          
          <p class="text-xl md:text-2xl opacity-90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Si te apasiona trabajar con y para las juventudes, únete como voluntario a la Plataforma de Juventudes de Mosquera y aporta a proyectos
            <span class="font-bold border-b-2 border-[#F2780C] pb-0.5">ambientales, deportivos y culturales y más</span>.
          </p>
          
          <div class="space-y-4 pt-2 hidden md:block text-left max-w-sm mx-auto lg:mx-0">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-[#F2780C] flex items-center justify-center text-white font-bold shrink-0">✓</div>
              <span class="font-bold text-xl">¡Conviértete en un líder!</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-[#F2780C] flex items-center justify-center text-white font-bold shrink-0">✓</div>
              <span class="font-bold text-xl">¡Desarrolla tus habilidades!</span>
            </div>
          </div>
        </div>

        <!-- Columna del Botón (Tarjeta contenedora) -->
        <div class="w-full lg:w-2/5 flex justify-center">
          <div class="w-full max-w-md bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col items-center text-center space-y-6">
            
            <div class="space-y-2">
              <h3 class="text-2xl font-black text-white">Inscripciones Abiertas</h3>
              <p class="text-sm opacity-80">Haz clic en el botón para completar tu registro en el formulario oficial.</p>
            </div>

            <button
              type="button"
              class="w-full py-5 px-8 bg-[#F2780C] text-white font-black text-xl rounded-2xl shadow-xl hover:bg-[#d66a0a] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
              @click="redirectToDocs"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">INSCRIBIRME</span>
              <span v-else>PROCESANDO...</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)

const redirectToDocs = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScPTBA-8nPWmXdHAQUBMa6rHdRl1-ivLDr2nvARnxbBAnfLhQ/viewform', '_blank', 'noopener,noreferrer')
}
</script>
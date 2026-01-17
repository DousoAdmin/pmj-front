<template>
  <div class="min-h-screen bg-gradient-to-br from-[#d0ffe1] to-[#c9ffdb]">


    <HeroSection @open-modal="openRegistrationModal" />


    <Carousel />
    

    <AboutSection @open-modal="openRegistrationModal" />

    <ContactFormSection 
      :show-modal="showModal" 
      @close-modal="closeRegistrationModal" 
    />

    <teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 
               transition-opacity duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click="closeOnBackdrop"
        @keydown.esc="closeRegistrationModal"
      >
        <!-- Contenedor del modal (evita cierre al hacer click dentro) -->
        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 
                 transform transition-all duration-300 scale-100 
                 animate-fade-up"
          @click.stop
        >
          <!-- Título -->
          <h3 
            id="modal-title"
            class="text-3xl font-black text-[#64278C] mb-6 text-center 
                   bg-gradient-to-r from-[#64278C] to-[#038C33] bg-clip-text text-transparent"
          >
            ¡Gracias por Inscribirte!
          </h3>

          <!-- Mensaje -->
          <p class="text-lg text-gray-700 text-center mb-8 leading-relaxed">
            Tu solicitud ha sido recibida con éxito.  
            <strong>Te contactaremos en menos de 48 horas</strong> 
            para confirmar tu participación en la Plataforma de Juventudes Mosquera 2025.
          </p>

          <!-- Botón cerrar -->
          <button
            @click="closeRegistrationModal"
            class="w-full bg-gradient-to-r from-[#64278C] to-[#038C33] 
                   text-white font-black text-lg py-4 rounded-full 
                   shadow-xl hover:shadow-[#038C33]/50 
                   transform hover:scale-105 active:scale-95 
                   transition-all duration-300 focus:outline-none 
                   focus:ring-4 focus:ring-[#038C33]/50"
            autofocus
          >
            Cerrar y Volver
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from '~/components/public/modal/HeroSection.vue'
import Carousel from '~/components/public/carrusel/Carousel.vue'  
import AboutSection from '~/components/public/about/AboutSection.vue'
import ContactFormSection from '~/components/public/contactForm/ContactFormSection.vue'

// ===============================================
// ESTADO GLOBAL DEL MODAL DE INSCRIPCIÓN
// ===============================================
const showModal = ref(false)

/**
 * Abre el modal de confirmación
 * Usado por HeroSection y AboutSection
 */
const openRegistrationModal = () => {
  showModal.value = true
  document.body.style.overflow = 'hidden' // Bloquea scroll
}

/**
 * Cierra el modal de forma segura
 * Restaura scroll y enfoca el botón que lo abrió (accesibilidad)
 */
const closeRegistrationModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

/**
 * Cierra al hacer click en el backdrop (fuera del modal)
 */
const closeOnBackdrop = (e) => {
  if (e.target === e.currentTarget) {
    closeRegistrationModal()
  }
}

/**
 * Cierre con tecla Escape (mejor accesibilidad)
 */
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeRegistrationModal()
    }
  })
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES GLOBALES - REUTILIZABLES EN TODO EL SITIO */
/* =============================================== */

/* Flotación suave para logos, iconos o elementos decorativos */
@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(5deg); 
  }
}
.animate-float { 
  animation: float 6s ease-in-out infinite; 
}

/* Aparición desde abajo - usada en títulos y secciones */
@keyframes fade-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
.animate-fade-up { 
  animation: fade-up 0.8s ease-out forwards; 
}

/* Delays para animaciones escalonadas */
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-600 { animation-delay: 0.6s; }

/* Mejora visual del backdrop */
.fixed.inset-0::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%);
}
</style>
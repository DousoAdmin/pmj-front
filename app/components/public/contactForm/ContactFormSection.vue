<!-- components/ContactFormSection.vue -->
<!--
  COMPONENTE: FORMULARIO DE INSCRIPCIÓN Y CONTACTO
  Plataforma Municipal de Juventudes Mosquera
  PROPÓSITO: Captura de datos juveniles para inscripción oficial + contacto directo
  CARACTERÍSTICAS:
  - Diseño con gradiente (#5b3176 → #64278C → #038C33)
  - Validación nativa HTML5
  - Iconos SVG con transiciones al foco
  - Integración perfecta con modal global de confirmación
  - Datos reales: rango de edad 14-28 (Ley 1622 de 2013)
  - Totalmente responsive
-->

<template>
  <!-- =============================================== -->
  <!-- SECCIÓN DE CONTACTO - FONDO INSTITUCIONAL MORADO-VERDE -->
  <!-- =============================================== -->
  <section 
    class="py-20 md:py-32 bg-gradient-to-br from-[#5b3176] via-[#64278C] to-[#038C33] 
           text-white relative overflow-hidden"
    aria-labelledby="contact-title"
  >

    <div class="container mx-auto px-4 relative z-10">
      
      <!-- =============================================== -->
      <!-- TÍTULO PRINCIPAL OFICIAL -->
      <!-- =============================================== -->
      <div class="text-center mb-20">
        <h2 
          id="contact-title"
          class="text-4xl md:text-6xl lg:text-7xl font-black 
                 bg-gradient-to-r from-white via-[#F2780C] to-white 
                 bg-clip-text text-transparent mb-6 animate-fade-up 
                 tracking-tight drop-shadow-2xl leading-tight"
        >
          ¡Únete Hoy!
        </h2>
        <p 
          class="text-xl md:text-2xl font-medium max-w-3xl mx-auto 
                 animate-fade-up opacity-90 leading-relaxed"
          style="animation-delay: 0.2s"
        >
          Inscríbete en la <strong class="text-[#F2780C] font-bold">Plataforma de Juventudes</strong> 
          o contáctanos para <strong class="text-[#F2780C] font-bold">oportunidades reales</strong> 
          en Mosquera.
        </p>
      </div>

      <!-- =============================================== -->
      <!-- FORMULARIO OFICIAL DE INSCRIPCIÓN -->
      <!-- =============================================== -->
      <form 
        @submit.prevent="submitForm" 
        class="max-w-3xl mx-auto animate-fade-up"
        style="animation-delay: 0.4s"
        novalidate
      >
        <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 
                    shadow-2xl border border-white/20">
          
          <!-- FILA 1: Nombre + Email -->
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <!-- Nombre completo -->
            <div class="relative group">
              <label for="nombre" class="sr-only">Nombre completo</label>
              <input
                id="nombre"
                v-model="form.nombre"
                type="text"
                placeholder="Nombre Completo"
                required
                autocomplete="name"
                class="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md 
                       text-white placeholder-white/60 border border-white/30 
                       focus:border-[#F2780C] focus:outline-none focus:ring-4 
                       focus:ring-[#F2780C]/30 transition-all duration-300 
                       pr-12 text-base peer"
                :aria-invalid="!form.nombre && submitted ? true : false"
              />
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 
                          text-white/50 peer-focus:text-[#F2780C] transition-colors 
                          pointer-events-none" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>

            <!-- Correo electrónico -->
            <div class="relative group">
              <label for="email" class="sr-only">Correo electrónico</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Correo Electrónico"
                required
                autocomplete="email"
                class="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md 
                       text-white placeholder-white/60 border border-white/30 
                       focus:border-[#F2780C] focus:outline-none focus:ring-4 
                       focus:ring-[#F2780C]/30 transition-all duration-300 
                       pr-12 text-base peer"
              />
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 
                          text-white/50 peer-focus:text-[#F2780C] transition-colors 
                          pointer-events-none" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>

          <!-- Edad (14-28 según Ley 1622) -->
          <div class="relative group mb-6">
            <label for="edad" class="sr-only">Edad (14-28 años)</label>
            <input
              id="edad"
              v-model.number="form.edad"
              type="number"
              placeholder="Edad (14-28)"
              min="14"
              max="28"
              required
              autocomplete="off"
              class="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md 
                     text-white placeholder-white/60 border border-white/30 
                     focus:border-[#F2780C] focus:outline-none focus:ring-4 
                     focus:ring-[#F2780C]/30 transition-all duration-300 
                     pr-12 text-base peer"
            />
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 
                        text-white/50 peer-focus:text-[#F2780C] transition-colors 
                        pointer-events-none" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>

          <!-- Área de interés -->
          <div class="relative group mb-6">
            <label for="interes" class="sr-only">Área de interés</label>
            <select
              id="interes"
              v-model="form.interes"
              required
              class="w-full px-6 py-4 rounded-2xl bg-[#F2780C] backdrop-blur-md 
                     text-white border border-white/30 
                     focus:border-white focus:outline-none focus:ring-4 
                     focus:ring-white/30 transition-all duration-300 
                     appearance-none pr-12 text-base cursor-pointer peer"
            >
              <option value="" disabled selected>¿Qué te interesa?</option>
              <option value="participacion">Participación Ciudadana</option>
              <option value="becas">Becas y Empleo</option>
              <option value="emprendimiento">Emprendimiento Juvenil</option>
              <option value="eventos">Eventos y Cultura</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 
                        text-white pointer-events-none" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                    d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Mensaje opcional -->
          <div class="mb-8">
            <label for="mensaje" class="sr-only">Mensaje adicional</label>
            <textarea
              id="mensaje"
              v-model="form.mensaje"
              placeholder="Cuéntanos más sobre ti o tu idea (opcional)"
              rows="4"
              class="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md 
                     text-white placeholder-white/60 border border-white/30 
                     focus:border-[#F2780C] focus:outline-none focus:ring-4 
                     focus:ring-[#F2780C]/30 transition-all duration-300 
                     resize-none text-base"
            ></textarea>
          </div>

          <!-- BOTÓN DE ENVÍO -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full group relative px-8 py-6 bg-gradient-to-r 
                   from-[#F2780C] to-[#f25a0c] text-white font-black text-xl 
                   rounded-2xl shadow-2xl hover:shadow-[#F2780C]/50 
                   transform hover:scale-105 active:scale-95 
                   transition-all duration-300 overflow-hidden 
                   disabled:opacity-70 disabled:cursor-not-allowed 
                   disabled:transform-none focus:outline-none focus:ring-4 
                   focus:ring-[#F2780C]/50"
            :aria-label="isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud de inscripción'"
          >
            <span class="relative z-10 flex items-center justify-center">
              <span v-if="!isSubmitting">Enviar Solicitud Oficial</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
              <svg class="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            <!-- Efecto de brillo al hover -->
            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 
                        translate-x-full group-hover:translate-x-0 
                        transition-transform duration-700"></div>
          </button>
        </div>

        <!-- MENSAJE DE RESPUESTA -->
        <div v-if="message" class="mt-10 text-center">
          <p 
            class="text-xl md:text-2xl font-black animate-fade-up 
                   leading-relaxed px-6 py-4 rounded-2xl 
                   bg-white/10 backdrop-blur-md border border-white/20"
            :class="success ? 'text-[#F2780C]' : 'text-red-300'"
            role="alert"
          >
            {{ message }}
          </p>
        </div>
      </form>
    </div>
  </section>
</template>


<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['open-modal'])

const form = ref({
  nombre: '',
  email: '',
  edad: '',
  interes: '',
  mensaje: ''
})

const message = ref('')
const success = ref(false)
const isSubmitting = ref(false)
const submitted = ref(false)

// ===============================================
// ENVÍO DEL FORMULARIO
// ===============================================
const submitForm = async () => {
  if (isSubmitting.value) return
  submitted.value = true
  isSubmitting.value = true

  try {
    // Aquí se conectá con la API 
    // await api.post('/inscripciones', form.value)
    
    // Simulación de envío exitoso
    await new Promise(resolve => setTimeout(resolve, 1800))

    message.value = '¡Inscripción recibida con éxito! Te contactaremos en menos de 48 horas para activar tu perfil oficial.'
    success.value = true

    // ABRIR MODAL DE CONFIRMACIÓN GLOBAL
    emit('open-modal')

    // Limpiar formulario
    form.value = { nombre: '', email: '', edad: '', interes: '', mensaje: '' }
    submitted.value = false

  } catch (error) {
    message.value = 'Error al enviar. Por favor intenta de nuevo o contáctanos al WhatsApp oficial.'
    success.value = false
  } finally {
    isSubmitting.value = false
    
    // Auto-limpiar mensaje
    setTimeout(() => {
      message.value = ''
    }, 8000)
  }
}

// ===============================================
// LIMPIAR MENSAJE AL MODIFICAR EL FORMULARIO
// ===============================================
watch(form, () => {
  if (message.value && submitted.value) {
    message.value = ''
  }
}, { deep: true })
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES Y ESTILOS */
/* =============================================== */

/* Partículas flotantes */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(5deg); }
}
.animate-float { animation: float 12s ease-in-out infinite; }

/* Fade up */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }

/* Select personalizado */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Estilos para partículas */
.absolute.w-96.h-96 {
  animation-delay: calc(var(--i, 0) * 0.5s);
}

/* Mejor foco visible */
.peer:focus ~ svg {
  transform: translateY(-50%) scale(1.1);
}
</style>
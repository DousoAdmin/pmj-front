<template>
  <div class="form-wrapper bg-gray-50 min-h-screen py-8 px-4">
    <div class="container mx-auto max-w-4xl">
      <!-- Cabecera -->
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-black text-[#522178] mb-3">
          Inscripción de Organización
        </h1>
        <div class="w-32 h-2 bg-[#F2780C] mx-auto mb-6"></div>
        <p class="text-gray-600 text-lg">
          Complete los siguientes pasos para registrar su organización
        </p>
      </div>

      <!-- Stepper de pasos -->
      <div class="mb-10">
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center space-x-2 md:space-x-6">
            <!-- Paso 1 -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black transition-all',
                step >= 1 ? 'bg-[#522178] text-white border-2 border-[#522178]' : 'bg-white text-gray-400 border-2 border-gray-300',
                step === 1 ? 'ring-4 ring-[#522178]/20' : ''
              ]">
                1
              </div>
              <span :class="[
                'mt-2 text-xs font-bold hidden md:block',
                step >= 1 ? 'text-[#522178]' : 'text-gray-500'
              ]">
                Información
              </span>
            </div>

            <!-- Línea -->
            <div :class="[
              'w-12 h-1 md:w-20',
              step >= 2 ? 'bg-[#522178]' : 'bg-gray-300'
            ]"></div>

            <!-- Paso 2 -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black transition-all',
                step >= 2 ? 'bg-[#522178] text-white border-2 border-[#522178]' : 'bg-white text-gray-400 border-2 border-gray-300',
                step === 2 ? 'ring-4 ring-[#522178]/20' : ''
              ]">
                2
              </div>
              <span :class="[
                'mt-2 text-xs font-bold hidden md:block',
                step >= 2 ? 'text-[#522178]' : 'text-gray-500'
              ]">
                Documentos
              </span>
            </div>

            <!-- Línea -->
            <div :class="[
              'w-12 h-1 md:w-20',
              step >= 3 ? 'bg-[#522178]' : 'bg-gray-300'
            ]"></div>

            <!-- Paso 3 -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black transition-all',
                step >= 3 ? 'bg-[#522178] text-white border-2 border-[#522178]' : 'bg-white text-gray-400 border-2 border-gray-300',
                step === 3 ? 'ring-4 ring-[#522178]/20' : ''
              ]">
                3
              </div>
              <span :class="[
                'mt-2 text-xs font-bold hidden md:block',
                step >= 3 ? 'text-[#522178]' : 'text-gray-500'
              ]">
                Caracterización
              </span>
            </div>

            <!-- Línea -->
            <div :class="[
              'w-12 h-1 md:w-20',
              step >= 4 ? 'bg-[#522178]' : 'bg-gray-300'
            ]"></div>

            <!-- Paso 4 -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black transition-all',
                step >= 4 ? 'bg-[#522178] text-white border-2 border-[#522178]' : 'bg-white text-gray-400 border-2 border-gray-300',
                step === 4 ? 'ring-4 ring-[#522178]/20' : ''
              ]">
                4
              </div>
              <span :class="[
                'mt-2 text-xs font-bold hidden md:block',
                step >= 4 ? 'text-[#522178]' : 'text-gray-500'
              ]">
                Contacto
              </span>
            </div>

            <!-- Línea -->
            <div :class="[
              'w-12 h-1 md:w-20',
              step >= 5 ? 'bg-[#522178]' : 'bg-gray-300'
            ]"></div>

            <!-- Paso 5 -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black transition-all',
                step >= 5 ? 'bg-[#522178] text-white border-2 border-[#522178]' : 'bg-white text-gray-400 border-2 border-gray-300',
                step === 5 ? 'ring-4 ring-[#522178]/20' : ''
              ]">
                5
              </div>
              <span :class="[
                'mt-2 text-xs font-bold hidden md:block',
                step >= 5 ? 'text-[#522178]' : 'text-gray-500'
              ]">
                Responsable
              </span>
            </div>
          </div>
        </div>

        <!-- Indicador móvil del paso actual -->
        <div class="text-center md:hidden">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-white border-2 border-[#522178]">
            <div class="w-8 h-8 rounded-full bg-[#522178] flex items-center justify-center text-white font-black mr-3">
              {{ step }}
            </div>
            <span class="text-sm font-bold text-[#522178]">
              {{ getStepName(step) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Contenedor del formulario -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 md:p-8">
        <!-- Indicador de progreso -->
        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span class="font-bold">Progreso</span>
            <span class="font-bold">{{ Math.round((step / 6) * 100) }}%</span>
          </div>
          <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-[#522178] rounded-full transition-all duration-300"
              :style="{ width: `${(step / 5) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Componente del paso actual -->
        <div class="form-step-container">
          <!-- Paso 1: Información Básica -->
          <InformacionBasica
            v-if="step === 1"
            v-model="form.informacionBasica"
            @next="handleNext"
          />

          <!-- Paso 2: Documentos -->
          <Documentos
            v-else-if="step === 2"
            v-model="form.documentos"
            :tipo-conformacion="form.informacionBasica.tipoConformacion"
            @next="handleNext"
            @prev="handlePrev"
          />

          <!-- Paso 3: Caracterización -->
          <Caracterizacion
            v-else-if="step === 3"
            v-model="form.caracterizacion"
            @next="handleNext"
            @prev="handlePrev"
          />

          <!-- Paso 4: Contacto de la organización -->
          <ContactoOrganizacion
            v-else-if="step === 4"
            v-model="form.contacto"
            @next="handleNext"
            @prev="handlePrev"
          />

          <!-- Paso 5: Datos del responsable -->
          <DatosResponsable
            v-else-if="step === 5"
            v-model="form.responsable"
            @submit="handleSubmit"
            @prev="handlePrev"
          />

          <!-- Paso 6: Mensaje de éxito -->
          <div 
            v-else-if="step === 6" 
            class="text-center py-12 px-4"
          >
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#038C33]/10 border-2 border-[#038C33] mb-6">
              <svg class="w-10 h-10 text-[#038C33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-black text-[#038C33] mb-4">¡Inscripción Exitosa!</h2>
            <p class="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Su organización ha sido registrada exitosamente. Recibirá un correo de confirmación en los próximos días.
            </p>
            <div class="space-y-4">
              <button
                @click="resetForm"
                class="px-8 py-3 bg-[#F2780C] text-white rounded-lg hover:bg-[#F2780C]/90 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              >
                Registrar otra organización
              </button>
              <div>
                <a href="#" class="text-[#522178] hover:text-[#522178]/80 font-bold">
                  Descargar comprobante
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación inferior -->
        <div v-if="step < 6 && step > 1" class="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button
            @click="handlePrev"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-[#522178] transition-all duration-300 font-bold flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Anterior
          </button>
          <div class="text-sm text-gray-500 font-bold">
            Paso {{ step }} de 5
          </div>
        </div>
      </div>

      <!-- Indicador de ayuda -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center text-gray-500 text-sm">
          <svg class="w-5 h-5 mr-2 text-[#F2780C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ¿Necesitas ayuda? <a href="#" class="text-[#522178] hover:text-[#522178]/80 ml-1 font-bold">Contáctanos</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Importa los subcomponentes de cada paso del formulario
import InformacionBasica from './sections/InformacionBasica.vue'
import Documentos from './sections/Documentos.vue'
import Caracterizacion from './sections/Caracterizacion.vue'
import ContactoOrganizacion from './sections/ContactoOrganizacion.vue'
import DatosResponsable from './sections/DatosResponsable.vue'

const step = ref(1)

const form = ref({
  informacionBasica: {
    tipoExperiencia: [],
  },
  documentos: {},
  caracterizacion: {
    jovenes: [],
    jovenesOtros: '',
    actividades: '',
    tematicas: [],
    tematicasOtros: ''
  },
  contacto: {
    telefono: '',
    email: '',
    web: '',
    facebook: '',
    instagram: '',
    otrosEnlaces: ''
  },
  responsable: {
    nombre: '',
    tipoDocumento: '',
    tipoDocumentoOtro: '',
    numeroDocumento: '',
    profesion: '',
    cargo: '',
    edad: '',
    sexo: '',
    telefono: '',
    email: '',
    direccion: '',
    barrio: ''
  }
})

// Función para obtener el nombre del paso (para móviles)
function getStepName(stepNumber) {
  const steps = {
    1: 'Información Básica',
    2: 'Documentos',
    3: 'Caracterización',
    4: 'Contacto',
    5: 'Responsable'
  }
  return steps[stepNumber] || ''
}

// Manejo de navegación
function handleNext() {
  if (step.value < 6) {
    step.value++
  }
}

function handlePrev() {
  if (step.value > 1) {
    step.value--
  }
}

async function handleSubmit() {
  try {
    // Mostrar estado de carga
    // await $fetch('/api/inscripcion', {
    //   method: 'POST',
    //   body: form.value,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    
    // Simular carga
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    step.value = 6
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    // Aquí puedes mostrar un mensaje de error al usuario
  }
}

function resetForm() {
  step.value = 1
  form.value = {
    informacionBasica: {
      tipoExperiencia: [],
    },
    documentos: {},
    caracterizacion: {
      jovenes: [],
      jovenesOtros: '',
      actividades: '',
      tematicas: [],
      tematicasOtros: ''
    },
    contacto: {
      telefono: '',
      email: '',
      web: '',
      facebook: '',
      instagram: '',
      otrosEnlaces: ''
    },
    responsable: {
      nombre: '',
      tipoDocumento: '',
      tipoDocumentoOtro: '',
      numeroDocumento: '',
      profesion: '',
      cargo: '',
      edad: '',
      sexo: '',
      telefono: '',
      email: '',
      direccion: '',
      barrio: ''
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4 {
  letter-spacing: -0.02em;
}

.form-step-container {
  transition: opacity 0.3s ease;
}

/* Efectos de hover básicos */
button {
  transition: all 0.3s ease;
}

/* Estilos para el contenedor de stepper en móviles */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
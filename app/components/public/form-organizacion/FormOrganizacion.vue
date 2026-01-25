<template>
  <!--
    FormOrganizacion.vue
    Formulario de inscripción de organizaciones dividido en pasos (wizard).
    Cada paso es un subcomponente que recopila una parte de la información.
  -->
  <div>
    <!-- Paso 1: Información Básica -->
    <InformacionBasica
      v-if="step === 1"
      v-model="form.informacionBasica"
      @next="step++"
    />
    <!-- Paso 2: Documentos -->
    <Documentos
      v-if="step === 2"
      v-model="form.documentos"
      :tipo-conformacion="form.informacionBasica.tipoConformacion"
      @next="step++"
      @prev="step--"
    />
    <!-- Paso 3: Caracterización -->
    <Caracterizacion
      v-if="step === 3"
      v-model="form.caracterizacion"
      @next="step++"
      @prev="step--"
    />
    <!-- Paso 4: Contacto de la organización -->
    <ContactoOrganizacion
      v-if="step === 4"
      v-model="form.contacto"
      @next="step++"
      @prev="step--"
    />
    <!-- Paso 5: Datos del responsable -->
    <DatosResponsable
      v-if="step === 5"
      v-model="form.responsable"
      @submit="handleSubmit"
      @prev="step--"
    />
    <!-- Paso 6: Mensaje de éxito -->
    <div v-if="step === 6" class="text-center py-12">
      <h2 class="text-2xl font-bold text-[#038C33]">¡Inscripción enviada!</h2>
      <p>Gracias por inscribir tu organización.</p>
    </div>
  </div>
</template>

<script setup>
// Importa la función ref para variables reactivas
import { ref } from 'vue'

// Importa los subcomponentes de cada paso del formulario
import InformacionBasica from './sections/InformacionBasica.vue'
import Documentos from './sections/Documentos.vue'
import Caracterizacion from './sections/Caracterizacion.vue'
import ContactoOrganizacion from './sections/ContactoOrganizacion.vue'
import DatosResponsable from './sections/DatosResponsable.vue'

// step controla el paso actual del formulario (1 a 6)
const step = ref(1)

// form almacena los datos de cada sección del formulario
const form = ref({
  informacionBasica: {
    tipoExperiencia: [], // Ejemplo de campo inicial
  },
  documentos: {},
  caracterizacion: {},
  contacto: {},
  responsable: {}
})

/**
 * handleSubmit
 * Se ejecuta al finalizar el formulario (último paso).
 * Aquí se puede enviar la información al backend.
 */
function handleSubmit() {
  // TODO: Enviar los datos al backend
  // await $fetch('/api/inscripcion', { method: 'POST', body: form.value })
  step.value = 6 // Muestra el mensaje de éxito
}
</script>
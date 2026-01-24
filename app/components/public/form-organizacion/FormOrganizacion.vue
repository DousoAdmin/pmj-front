<template>
  <div>
    <InformacionBasica
      v-if="step === 1"
      v-model="form.informacionBasica"
      @next="step++"
    />
    <Documentos
    v-if="step === 2"
    v-model="form.documentos"
    :tipo-conformacion="form.informacionBasica.tipoConformacion"
    @next="step++"
    @prev="step--"
    />
    <Caracterizacion
      v-if="step === 3"
      v-model="form.caracterizacion"
      @next="step++"
      @prev="step--"
    />
    <ContactoOrganizacion
      v-if="step === 4"
      v-model="form.contacto"
      @next="step++"
      @prev="step--"
    />
    <DatosResponsable
      v-if="step === 5"
      v-model="form.responsable"
      @submit="handleSubmit"
      @prev="step--"
    />
    <div v-if="step === 6" class="text-center py-12">
      <h2 class="text-2xl font-bold text-[#038C33]">¡Inscripción enviada!</h2>
      <p>Gracias por inscribir tu organización.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InformacionBasica from './sections/InformacionBasica.vue'
import Documentos from './sections/Documentos.vue'
import Caracterizacion from './sections/Caracterizacion.vue'
import ContactoOrganizacion from './sections/ContactoOrganizacion.vue'
import DatosResponsable from './sections/DatosResponsable.vue'

const step = ref(1)
const form = ref({
  informacionBasica: {},
  documentos: {},
  caracterizacion: {},
  contacto: {},
  responsable: {}
})

function handleSubmit() {
  // ACÁ enviar los datos al backend
  // await $fetch('/api/inscripcion', { method: 'POST', body: form.value })
  step.value = 6
}
</script>
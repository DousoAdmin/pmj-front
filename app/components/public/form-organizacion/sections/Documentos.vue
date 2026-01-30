<!--
  Componente: Documentos.vue
  Descripción:
  Este componente es una sección de formulario para subir documentos requeridos por la organización.
  Permite cargar archivos como acta de constitución, propuesta de trabajo, base de datos y logo.
  Props:
    - modelValue: objeto reactivo que contiene los datos del formulario.
    - tipoConformacion: tipo de conformación de la organización (ej. 'Informal').
  Emits:
    - update:modelValue: actualiza el valor del formulario en el componente padre.
    - next: avanza al siguiente paso del formulario.
    - prev: regresa al paso anterior del formulario.
  Uso:
    Se utiliza dentro de un formulario mayor y se comunica con el padre mediante v-model y eventos.
    Utiliza el componente FileUploader para la carga de archivos.
-->
<template>
  <form @submit.prevent="nextStep">
    <div class="mb-4" v-if="tipoConformacion === 'Informal'">
      <label class="block font-medium mb-1">Documento de Constitución como acta de constitución *</label>
      <FileUploader
        v-model="localValue.constitucion"
        accept=".pdf,.doc,.docx"
        :max-size="10"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Propuesta de trabajo de la organización (anual) *</label>
      <FileUploader
        v-model="localValue.propuesta"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        :max-size="10"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Base de datos *</label>
      <FileUploader
        v-model="localValue.baseDatos"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        :max-size="10"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Logo (hasta 5 archivos)</label>
      <FileUploader
        v-model="localValue.logo"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        :max-size="10"
        :multiple="true"
        :max-files="5"
      />
    </div>
    <div class="flex justify-between">
      <button type="button" @click="emit('prev')" class="bg-gray-300 px-6 py-2 rounded">Atrás</button>
      <button type="submit" class="bg-[#038C33] text-white px-6 py-2 rounded">Siguiente</button>
    </div>
  </form>
</template>

<!--
  Script:
  - Utiliza la API Composition de Vue 3.
  - Computed localValue para manejar el v-model bidireccional.
  - nextStep emite el evento 'next' para avanzar en el formulario.
  - Importa el componente FileUploader para la carga de archivos.
-->
<script setup>

// Importa la función computed de Vue y el componente FileUploader
import { computed } from 'vue'
import FileUploader from '../shared/FileUploader.vue'

// Define las propiedades recibidas por el componente
const props = defineProps({
  modelValue: { type: Object, required: true },
  tipoConformacion: { type: String, default: '' } 
})

// Define los eventos que puede emitir el componente
const emit = defineEmits(['update:modelValue', 'next', 'prev'])

// Computed para manejar el v-model bidireccional
const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Función para avanzar al siguiente paso del formulario
function nextStep() {
  emit('next')
}
</script>
<!--
  Componente: InformacionBasica.vue
  Descripción:
  Este componente es una sección de formulario para capturar la información básica del proceso o práctica organizativa.
  Permite ingresar nombre, tipo de conformación, documento de constitución (si es informal), fecha de conformación, número de miembros, objetivo, dirección de la sede y tipo de experiencia.
  Props:
    - modelValue: objeto reactivo que contiene los datos del formulario.
  Emits:
    - update:modelValue: actualiza el valor del formulario en el componente padre.
    - next: avanza al siguiente paso del formulario.
  Uso:
    Se utiliza dentro de un formulario mayor y se comunica con el padre mediante v-model y eventos.
    Utiliza el componente FileUploader para la carga de archivos.
-->
<template>
  <form @submit.prevent="nextStep">
    <div class="mb-4">
      <label class="block font-medium mb-1">Nombre del proceso o práctica organizativa *</label>
      <input v-model="localValue.nombre" type="text" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Tipo de conformación *</label>
      <select v-model="localValue.tipoConformacion" class="w-full border rounded px-3 py-2" required>
        <option value="" disabled>Seleccione una opción</option>
        <option value="Formalmente Constituida">Formalmente Constituida</option>
        <option value="No formalmente Constituida">No formalmente Constituida</option>
        <option value="Informal">Informal</option>
      </select>
       </div>
    <!-- Mostrar solo si es Informal -->
    <div class="mb-4" v-if="localValue.tipoConformacion === 'Informal'">
      <label class="block font-medium mb-1">Documento de Constitución como acta de constitución *</label>
      <FileUploader
        v-model="localValue.constitucion"
        accept=".pdf,.doc,.docx"
        :max-size="10"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Fecha de conformación *</label>
      <input v-model="localValue.fechaConformacion" type="date" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">N° de Miembros *</label>
      <input v-model="localValue.numeroMiembros" type="number" min="1" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Objetivo principal *</label>
      <textarea v-model="localValue.objetivo" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Dirección de la sede *</label>
      <input v-model="localValue.direccionSede" type="text" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Tipo de experiencia</label>
      <div>
        <label class="inline-flex items-center mr-4">
          <input type="checkbox" value="Entidades privadas o públicas" v-model="localValue.tipoExperiencia" />
          <span class="ml-2">Entidades privadas o públicas</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="checkbox" value="Social comunitaria" v-model="localValue.tipoExperiencia" />
          <span class="ml-2">Social comunitaria</span>
        </label>
        <label class="inline-flex items-center mr-4">
          <input type="checkbox" value="Instituciones educativas o universidades" v-model="localValue.tipoExperiencia" />
          <span class="ml-2">Instituciones educativas o universidades</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Otros" v-model="localValue.tipoExperiencia" />
          <span class="ml-2">Otros</span>
        </label>
      </div>
    </div>
    <div class="flex justify-end">
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
// Importa el componente FileUploader para la carga de archivos
import FileUploader from '../shared/FileUploader.vue'

// Define las propiedades recibidas por el componente
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

// Define los eventos que puede emitir el componente
const emit = defineEmits(['update:modelValue', 'next'])

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
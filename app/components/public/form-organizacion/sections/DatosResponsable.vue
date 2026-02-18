<!--
  Componente: DatosResponsable.vue
  Descripción:
  Este componente es una sección de formulario para capturar los datos de contacto del responsable del proceso o práctica organizativa.
  Permite ingresar nombre, tipo y número de documento, profesión, cargo, edad, sexo, teléfono, correo, dirección y barrio.
  Props:
    - modelValue: objeto reactivo que contiene los datos del formulario.
  Emits:
    - update:modelValue: actualiza el valor del formulario en el componente padre.
    - submit: envía los datos del formulario.
    - prev: regresa al paso anterior del formulario.
  Uso:
    Se utiliza dentro de un formulario mayor y se comunica con el padre mediante v-model y eventos.
-->
<template>
  <form @submit.prevent="nextStep">
    <h3 class="text-lg font-bold mb-4">Datos de contacto del responsable del proceso o práctica organizativa</h3>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Nombre completo *</label>
      <input v-model="localValue.nombre" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Tipo de documento *</label>
      <select v-model="localValue.tipoDocumento" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required>
        <option value="" disabled>Seleccione una opción</option>
        <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
        <option value="Tarjeta de identidad">Tarjeta de identidad</option>
        <option value="Otros">Otros</option>
      </select>
      <input
        v-if="localValue.tipoDocumento === 'Otros'"
        v-model="localValue.tipoDocumentoOtro"
        type="text"
        class="w-full border rounded px-3 py-2 mt-2 text-gray-600 font-normal focus:text-gray-800"
        placeholder="Especifique el tipo de documento"
      />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Número de documento *</label>
      <input v-model="localValue.numeroDocumento" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Profesión u oficio *</label>
      <input v-model="localValue.profesion" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Cargo que ocupa *</label>
      <input v-model="localValue.cargo" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Edad *</label>
      <input v-model="localValue.edad" type="number" min="14" max="28" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Sexo *</label>
      <select v-model="localValue.sexo" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required>
        <option value="" disabled>Seleccione una opción</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Teléfono de contacto *</label>
      <input v-model="localValue.telefono" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Correo electrónico *</label>
      <input v-model="localValue.email" type="email" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Dirección de residencia (Mosquera) *</label>
      <input v-model="localValue.direccion" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="mb-4">
      <label class="block font-normal text-gray-600 mb-1">Barrio/Conjunto (Mosquera) *</label>
      <input v-model="localValue.barrio" type="text" class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800" required />
    </div>
    <div class="flex justify-between">
      <button type="button" @click="emit('prev')" class="bg-gray-300 px-6 py-2 rounded">Atrás</button>
      <button type="submit" class="bg-[#64278C] text-white px-6 py-2 rounded">Enviar</button>
    </div>
  </form>
</template>

<!--
  Script:
  - Utiliza la API Composition de Vue 3.
  - Computed localValue para manejar el v-model bidireccional.
  - nextStep emite el evento 'submit' para enviar los datos del formulario.
-->
<script setup>

// Importa la función computed de Vue para crear una propiedad reactiva localValue
import { computed } from 'vue'

// Define las propiedades recibidas por el componente
const props = defineProps({
  modelValue: { type: Object, required: true }
})

// Define los eventos que puede emitir el componente
const emit = defineEmits(['update:modelValue', 'submit', 'prev'])

// Computed para manejar el v-model bidireccional
const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Función para enviar los datos del formulario
function nextStep() {
  emit('submit')
}
</script>
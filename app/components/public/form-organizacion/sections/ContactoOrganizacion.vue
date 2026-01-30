<!--
  Componente: ContactoOrganizacion.vue
  Descripción:
  Este componente es una sección de formulario para capturar los datos de contacto de la organización.
  Permite ingresar teléfono, correo electrónico, página web y enlaces de redes sociales.
  Props:
    - modelValue: objeto reactivo que contiene los datos del formulario.
  Emits:
    - update:modelValue: actualiza el valor del formulario en el componente padre.
    - next: avanza al siguiente paso del formulario.
    - prev: regresa al paso anterior del formulario.
  Uso:
    Se utiliza dentro de un formulario mayor y se comunica con el padre mediante v-model y eventos.
-->
<template>
  <form @submit.prevent="nextStep">
    <div class="mb-4">
      <label class="block font-medium mb-1">Teléfono de contacto *</label>
      <input v-model="localValue.telefono" type="text" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Correo electrónico *</label>
      <input v-model="localValue.email" type="email" class="w-full border rounded px-3 py-2" required />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Página web</label>
      <input v-model="localValue.web" type="text" class="w-full border rounded px-3 py-2" />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Facebook</label>
      <input v-model="localValue.facebook" type="text" class="w-full border rounded px-3 py-2" />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Instagram</label>
      <input v-model="localValue.instagram" type="text" class="w-full border rounded px-3 py-2" />
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1">Otros enlaces de redes sociales</label>
      <input v-model="localValue.otrosEnlaces" type="text" class="w-full border rounded px-3 py-2" />
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
-->
<script setup>

// Importa la función computed de Vue para crear una propiedad reactiva localValue
import { computed } from 'vue'

// Define las propiedades recibidas por el componente
const props = defineProps({
  modelValue: { type: Object, required: true }
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
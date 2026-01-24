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

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue', 'next', 'prev'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function nextStep() {
  emit('next')
}
</script>
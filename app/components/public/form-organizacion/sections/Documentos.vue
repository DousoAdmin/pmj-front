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

<script setup>
import { computed } from 'vue'
import FileUploader from '../shared/FileUploader.vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  tipoConformacion: { type: String, default: '' } 
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
<template>
  <div>
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F2780C]/10 file:text-[#F2780C] hover:file:bg-[#F2780C]/20"
    />
    <div v-if="files && files.length" class="mt-2 space-y-1">
      <div v-for="(file, idx) in files" :key="idx" class="flex items-center text-xs">
        <span>{{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)</span>
        <button type="button" @click="removeFile(idx)" class="ml-2 text-red-500 hover:underline">Quitar</button>
      </div>
    </div>
    <div v-if="error" class="text-red-600 text-xs mt-1">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [File, Array], default: null },
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  maxFiles: { type: Number, default: 1 },
  maxSize: { type: Number, default: 10 } // MB
})
const emit = defineEmits(['update:modelValue'])

const files = ref([])
const error = ref('')

// Inicializa los archivos si modelValue cambia externamente
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      files.value = Array.isArray(val) ? val : [val]
    } else {
      files.value = []
    }
  },
  { immediate: true }
)

function onFileChange(e) {
  error.value = ''
  let selected = Array.from(e.target.files)
  // Validar cantidad máxima de archivos
  if (props.multiple && selected.length + files.value.length > props.maxFiles) {
    error.value = `Máximo ${props.maxFiles} archivos permitidos.`
    e.target.value = ''
    return
  }
  // Validar tamaño y tipo
  for (const file of selected) {
    if (file.size > props.maxSize * 1024 * 1024) {
      error.value = `El archivo "${file.name}" supera el tamaño máximo de ${props.maxSize} MB.`
      e.target.value = ''
      return
    }
    if (props.accept && !props.accept.split(',').some(type => file.name.toLowerCase().endsWith(type.trim().replace('.', '')))) {
      error.value = `El archivo "${file.name}" no es de un tipo permitido.`
      e.target.value = ''
      return
    }
  }
  // Agregar archivos
  if (props.multiple) {
    files.value = [...files.value, ...selected].slice(0, props.maxFiles)
    emit('update:modelValue', files.value)
  } else {
    files.value = [selected[0]]
    emit('update:modelValue', selected[0])
  }
  e.target.value = ''
}

function removeFile(idx) {
  files.value.splice(idx, 1)
  if (props.multiple) {
    emit('update:modelValue', files.value)
  } else {
    emit('update:modelValue', null)
  }
}
</script>
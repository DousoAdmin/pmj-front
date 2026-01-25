<!--
  Componente: FileUploader.vue
  Descripción:
  Este componente permite la carga de archivos en formularios, mostrando los archivos seleccionados y permitiendo quitarlos.
  Props:
    - modelValue: archivo o arreglo de archivos seleccionado(s).
    - accept: tipos de archivo permitidos (ejemplo: .pdf,.doc).
    - multiple: permite seleccionar varios archivos.
    - maxFiles: cantidad máxima de archivos permitidos.
    - maxSize: tamaño máximo por archivo (MB).
  Emits:
    - update:modelValue: actualiza el valor de los archivos seleccionados en el componente padre.
  Uso:
    Se utiliza en formularios para subir documentos, imágenes, etc. Valida tipo, cantidad y tamaño de archivos.
-->
<template>
  <div>
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F2780C]/10 file:text-[#F2780C] hover:file:bg-[#F2780C]/20"
    />
    <span v-if="!files.length" class="ml-2 text-gray-500">No se eligió ningún archivo</span>
    <div v-if="files && files.length" class="mt-2 space-y-1">
      <div v-for="(file, idx) in files" :key="idx" class="flex items-center text-xs">
        <span>{{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)</span>
        <button type="button" @click="removeFile(idx)" class="ml-2 text-red-500 hover:underline">Quitar</button>
      </div>
    </div>
    <div v-if="error" class="text-red-600 text-xs mt-1">{{ error }}</div>
  </div>
</template>

<!--
  Script:
  - Utiliza la API Composition de Vue 3.
  - Maneja archivos seleccionados y errores de validación.
  - watch para sincronizar archivos si modelValue cambia externamente.
  - onFileChange valida tipo, cantidad y tamaño antes de actualizar los archivos.
  - removeFile permite quitar archivos seleccionados.
-->
<script setup>

// Importa las funciones ref y watch de Vue para manejo reactivo
import { ref, watch } from 'vue'

// Define las propiedades recibidas por el componente
const props = defineProps({
  modelValue: { type: [File, Array], default: null },
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  maxFiles: { type: Number, default: 1 },
  maxSize: { type: Number, default: 10 } // MB
})

// Define los eventos que puede emitir el componente
const emit = defineEmits(['update:modelValue'])

// files almacena los archivos seleccionados
const files = ref([])
// error almacena el mensaje de error de validación
const error = ref('')

// Sincroniza los archivos si modelValue cambia externamente
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

// Maneja el cambio de archivos seleccionados y valida tipo, cantidad y tamaño
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
  // Agregar archivos seleccionados
  if (props.multiple) {
    files.value = [...files.value, ...selected].slice(0, props.maxFiles)
    emit('update:modelValue', files.value)
  } else {
    files.value = [selected[0]]
    emit('update:modelValue', selected[0])
  }
  e.target.value = ''
}

// Permite quitar archivos seleccionados
function removeFile(idx) {
  files.value.splice(idx, 1)
  if (props.multiple) {
    emit('update:modelValue', files.value)
  } else {
    emit('update:modelValue', null)
  }
}
</script>
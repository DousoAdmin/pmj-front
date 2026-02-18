<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
      class="hidden"
    />
    <button
      type="button"
      @click="$refs.fileInput.click()"
      class="px-4 py-2 rounded text-sm font-semibold bg-[#F2780C]/10 text-[#F2780C] hover:bg-[#F2780C]/20"
    >
      Elegir archivo{{ multiple ? 's' : '' }}
    </button>
    
    <!-- Mensaje de error -->
    <div v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </div>
    
    <!-- Mensaje cuando no hay archivos -->
    <span v-if="files.length === 0 && !error" class="ml-2 text-gray-500">No se eligió ningún archivo</span>
    
    <!-- Lista de archivos seleccionados -->
    <div v-if="files.length > 0" class="mt-2 space-y-1">
      <div v-for="(file, idx) in files" :key="idx">
        <div class="flex items-center text-xs">
          <span>{{ file.name }} ({{ (file.size / 1024 / 1024).toFixed(2) }} MB)</span>
          <button 
            type="button" 
            @click="removeFile(idx)" 
            class="ml-2 text-red-500 hover:underline"
          >
            Quitar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  const input = e.target
  const selected = Array.from(input.files)
  
  if (selected.length === 0) return
  
  // Validar cantidad máxima de archivos
  if (props.multiple && selected.length + files.value.length > props.maxFiles) {
    error.value = `Máximo ${props.maxFiles} archivos permitidos.`
    input.value = ''
    return
  }
  
  // Validar tamaño y tipo para cada archivo
  for (const file of selected) {
    // Validar tamaño
    if (file.size > props.maxSize * 1024 * 1024) {
      error.value = `El archivo "${file.name}" supera el tamaño máximo de ${props.maxSize} MB.`
      input.value = ''
      return
    }
    
    // Validar tipo de archivo si accept está definido
    if (props.accept) {
      const acceptTypes = props.accept.split(',').map(type => 
        type.trim().toLowerCase().replace('*', '')
      )
      
      const fileExtension = '.' + file.name.toLowerCase().split('.').pop()
      const fileType = file.type.toLowerCase()
      
      const isAccepted = acceptTypes.some(type => {
        return file.name.toLowerCase().endsWith(type.replace('.', '')) ||
               type.includes(fileExtension) ||
               (type.startsWith('.') && fileExtension === type) ||
               fileType === type ||
               (type.includes('/') && fileType.startsWith(type.split('/')[0] + '/'))
      })
      
      if (!isAccepted) {
        error.value = `El archivo "${file.name}" no es de un tipo permitido (${props.accept}).`
        input.value = ''
        return
      }
    }
  }
  
  // Agregar archivos seleccionados
  if (props.multiple) {
    files.value = [...files.value, ...selected].slice(0, props.maxFiles)
    emit('update:modelValue', files.value.length === 1 ? files.value[0] : files.value)
  } else {
    files.value = [selected[0]]
    emit('update:modelValue', selected[0])
  }
  
  // Limpiar el input para permitir seleccionar el mismo archivo de nuevo
  input.value = ''
}

// Permite quitar archivos seleccionados
function removeFile(idx) {
  files.value.splice(idx, 1)
  
  if (props.multiple) {
    emit('update:modelValue', files.value.length === 0 ? null : 
         (files.value.length === 1 ? files.value[0] : files.value))
  } else {
    emit('update:modelValue', null)
  }
  
  // Limpiar el input si no hay archivos
  if (files.value.length === 0) {
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ''
    }
  }
}
</script>
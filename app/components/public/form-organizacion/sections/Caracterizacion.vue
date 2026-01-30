<!--
  Componente: Caracterizacion.vue
  Descripción:
  Este componente es una sección de formulario para caracterizar a los jóvenes que pertenecen a un proceso o práctica organizativa.
  Permite seleccionar características de los jóvenes, actividades desarrolladas y temáticas relacionadas.
  Props:
    - modelValue: objeto reactivo que contiene los datos del formulario.
  Emits:
    - update:modelValue: actualiza el valor del formulario en el componente padre.
    - next: avanza al siguiente paso del formulario.
    - prev: regresa al paso anterior del formulario.
  Uso:
    Este componente se utiliza dentro de un formulario mayor y se comunica con el padre mediante v-model y eventos.
-->
<template>
  <form @submit.prevent="nextStep">
    <div class="mb-4">
      <label class="block font-medium mb-1">
        Marque las siguientes casillas según corresponda a los Jóvenes (14 - 28 años) que pertenecen al proceso o práctica organizativa: *
      </label>
      <div class="flex flex-wrap gap-4">
        <label class="inline-flex items-center">
          <input type="checkbox" value="Jóvenes con Discapacidad" v-model="localValue.jovenes" />
          <span class="ml-2">Jóvenes con Discapacidad</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Jóvenes víctimas del conflicto" v-model="localValue.jovenes" />
          <span class="ml-2">Jóvenes víctimas del conflicto</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Jóvenes Afrocolombianos" v-model="localValue.jovenes" />
          <span class="ml-2">Jóvenes Afrocolombianos</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Jóvenes LGBTI" v-model="localValue.jovenes" />
          <span class="ml-2">Jóvenes LGBTI</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Jóvenes indígenas" v-model="localValue.jovenes" />
          <span class="ml-2">Jóvenes indígenas</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Ninguno" v-model="localValue.jovenes" />
          <span class="ml-2">Ninguno</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Otros" v-model="localValue.jovenes" />
          <span class="ml-2">Otros:</span>
          <input
            v-if="localValue.jovenes.includes('Otros')"
            v-model="localValue.jovenesOtros"
            type="text"
            class="ml-2 border rounded px-2 py-1"
            placeholder="Especifique"
          />
        </label>
      </div>
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-1">Actividades que desarrollan *</label>
      <textarea v-model="localValue.actividades" class="w-full border rounded px-3 py-2" required />
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-1">
        Marque las temáticas descritas a continuación que se adapten a las actividades que desarrollan: *
      </label>
      <div class="flex flex-wrap gap-4">
        <label class="inline-flex items-center">
          <input type="checkbox" value="Ambiental" v-model="localValue.tematicas" />
          <span class="ml-2">Ambiental</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Artístico/Cultural" v-model="localValue.tematicas" />
          <span class="ml-2">Artístico/Cultural</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Audiovisual" v-model="localValue.tematicas" />
          <span class="ml-2">Audiovisual</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Educación" v-model="localValue.tematicas" />
          <span class="ml-2">Educación</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Tecnología" v-model="localValue.tematicas" />
          <span class="ml-2">Tecnología</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Formulación de proyectos" v-model="localValue.tematicas" />
          <span class="ml-2">Formulación de proyectos</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Social" v-model="localValue.tematicas" />
          <span class="ml-2">Social</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Religioso" v-model="localValue.tematicas" />
          <span class="ml-2">Religioso</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Político" v-model="localValue.tematicas" />
          <span class="ml-2">Político</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Deportivo" v-model="localValue.tematicas" />
          <span class="ml-2">Deportivo</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Investigación" v-model="localValue.tematicas" />
          <span class="ml-2">Investigación</span>
        </label>
        <label class="inline-flex items-center">
          <input type="checkbox" value="Otros" v-model="localValue.tematicas" />
          <span class="ml-2">Otros:</span>
          <input
            v-if="localValue.tematicas.includes('Otros')"
            v-model="localValue.tematicasOtros"
            type="text"
            class="ml-2 border rounded px-2 py-1"
            placeholder="Especifique"
          />
        </label>
      </div>
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
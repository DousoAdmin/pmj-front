<template>
  <div class="mb-4">
    <label v-if="label" class="block font-normal text-gray-600 mb-1">{{ label }}<span v-if="required" class="text-red-500">*</span></label>
    <template v-if="type === 'textarea'">
      <textarea
        v-model="inputValue"
        :placeholder="placeholder"
        :required="required"
        class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800"
        :rows="rows"
      />
    </template>
    <template v-else-if="type === 'select'">
      <select
        v-model="inputValue"
        :required="required"
        class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800"
      >
        <option value="" disabled>Seleccione una opción</option>
        <option v-for="option in options" :key="option.value || option" :value="option.value || option">
          {{ option.label || option }}
        </option>
      </select>
    </template>
    <template v-else>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="w-full border rounded px-3 py-2 text-gray-600 font-normal focus:text-gray-800"
        :min="min"
        :max="max"
      />
    </template>
    <div v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' }, // text, number, email, select, textarea, etc.
  placeholder: String,
  required: Boolean,
  options: { type: Array, default: () => [] }, // Para selects
  rows: { type: Number, default: 3 }, // Para textarea
  min: [Number, String],
  max: [Number, String],
  error: String
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>
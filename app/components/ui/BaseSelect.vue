<template>
  <div class="relative" ref="root">
    <button
      type="button"
      class="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-semibold
             bg-white text-slate-700 border-slate-200
             hover:border-[#522178]/40 focus:outline-none focus:ring-2 focus:ring-[#522178]/20 focus:border-[#522178]/60
             transition-colors cursor-pointer"
      @click="toggle"
    >
      <span class="truncate">
        {{ selectedOption?.label ?? placeholder }}
      </span>
      <span class="shrink-0 text-slate-400" :class="{ 'rotate-180': open }">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>

    <transition name="fade-scale">
      <ul
        v-if="open"
        class="absolute z-20 mt-1 w-full min-w-[180px] max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg text-sm py-1"
      >
        <li
          v-for="opt in options"
          :key="opt.value"
          class="px-3.5 py-2.5 cursor-pointer flex items-center justify-between gap-2 hover:bg-[#f4f0f8] text-slate-700"
          :class="opt.value === modelValue ? 'bg-[#522178]/5 font-semibold text-[#522178]' : ''"
          @click="select(opt.value)"
        >
          <span>{{ opt.label }}</span>
          <span v-if="opt.value === modelValue" class="shrink-0 text-[#00B140]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Selecciona una opción',
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const root = ref(null)

const selectedOption = computed(() =>
  props.options.find(opt => opt.value === props.modelValue),
)

function toggle() {
  open.value = !open.value
}

function select(value) {
  emit('update:modelValue', value)
  open.value = false
}

function handleClickOutside(event) {
  if (!root.value) return
  if (!root.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.12s ease-out, transform 0.12s ease-out;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>


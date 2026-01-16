<!-- components/galeria/FiltrosGaleria.vue -->
<template>
  <section class="py-8 bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-3">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="$emit('filter-change', filter.value)"
          class="px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 
                 hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#038C33]/30"
          :class="activeFilter === filter.value 
            ? 'bg-[#038C33] text-white shadow-lg ring-4 ring-[#038C33]/20' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          :aria-pressed="activeFilter === filter.value"
          role="tab"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  filters: {
    type: Array,
    required: true
  },
  activeFilter: {
    type: String,
    required: true
  }
})

defineEmits(['filter-change'])
</script>
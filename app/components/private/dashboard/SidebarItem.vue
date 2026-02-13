<template>
  <li>
    <NuxtLink 
      :to="to" 
      :class="[
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
        'text-white hover:text-white',
        itemClass
      ]"
    >
      <div v-if="iconColor" :class="['w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 flex-shrink-0', iconColor]">
        <span class="w-5 h-5 text-white flex items-center justify-center">
          <slot name="icon" />
        </span>
      </div>
      <span v-else class="w-5 h-5 flex items-center justify-center text-gray-400 group-hover:text-[#00B140] transition-colors duration-200">
        <slot name="icon" />
      </span>
      <span class="font-semibold text-sm">{{ label }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
  itemClass: { type: String, default: '' },
  iconColor: { type: String, default: '' },
})
</script>

<style scoped>
/* Active state styling */
a.router-link-active {
  background: linear-gradient(90deg, rgba(0, 177, 64, 0.15), rgba(0, 177, 64, 0.05));
  color: #00B140;
  font-weight: 900;
}

a.router-link-active .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Hover effects */
a:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

a.router-link-active:hover {
  background: linear-gradient(90deg, rgba(0, 177, 64, 0.25), rgba(0, 177, 64, 0.1));
}
</style>


<template>
  <Transition name="fade">
    <div
      v-if="visible"
      :class="[
        'flex items-center justify-center',
        fullscreen ? 'fixed inset-0 z-50 bg-black/35 backdrop-blur-sm' : 'w-full py-4'
      ]"
    >
      <div class="flex flex-col items-center justify-center rounded-2xl bg-white/95 px-6 py-5 shadow-2xl ring-1 ring-black/5">
        <div class="relative h-14 w-14">
          <div class="absolute inset-0 rounded-full border-4 border-[#522178]/15"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F2780C] animate-spin"></div>
          <div
            class="absolute inset-2 rounded-full border-4 border-transparent border-r-[#00A036] animate-spin"
            style="animation-direction: reverse; animation-duration: 1.2s"
          ></div>
        </div>

        <p class="mt-4 text-sm font-black uppercase tracking-[0.2em] text-[#522178]">
          {{ title }}
        </p>

        <p v-if="message" class="mt-1 text-center text-sm text-gray-600">
          {{ message }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible?: boolean
  title?: string
  message?: string
  fullscreen?: boolean
}>()

const visible = computed(() => props.visible ?? false)
const title = computed(() => props.title ?? 'Cargando')
const message = computed(() => props.message ?? 'Por favor espera un momento')
const fullscreen = computed(() => props.fullscreen ?? true)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

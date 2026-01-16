<!-- components/galeria/Lightbox.vue (versión minimalista elegante) -->
<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      @click="emit('close')" 
      class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="'lightbox-title-' + currentIndex"
      @keydown.esc="emit('close')"
    >
      <div class="relative w-full max-w-3xl" @click.stop>
        <!-- Contenedor principal blanco y elegante -->
        <div class="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          
          <!-- Imagen con gradiente -->
          <div class="relative">
            <div class="aspect-video bg-gradient-to-br" 
                 :class="currentPhoto?.gradient || 'from-[#64278C] to-[#038C33]'"></div>
            
            <!-- Botón cerrar superpuesto -->
            <button 
              @click.stop="emit('close')"
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm 
                     rounded-full flex items-center justify-center transition-all duration-200
                     hover:bg-white hover:scale-105 shadow-lg"
              aria-label="Cerrar visor"
            >
              <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Información elegante -->
          <div class="p-8">
            <!-- Título con énfasis -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-3 h-8 bg-gradient-to-b from-[#64278C] to-[#F2780C] rounded-full"></div>
                <h3 :id="'lightbox-title-' + currentIndex" 
                    class="text-2xl font-bold text-gray-900 tracking-tight">
                  {{ currentPhoto?.title || 'Momento Especial' }}
                </h3>
              </div>
              
              <!-- Metadatos en badge elegante -->
              <div class="flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-sm font-medium text-gray-700">{{ currentPhoto?.date || 'Sin fecha' }}</span>
                </span>
                
                <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#038C33]/10 rounded-full">
                  <svg class="w-4 h-4 text-[#038C33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  <span class="text-sm font-medium text-[#038C33]">{{ currentPhoto?.category || 'General' }}</span>
                </span>
                
                <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F2780C]/10 rounded-full">
                  <span class="text-sm font-bold text-[#F2780C]">
                    {{ currentIndex + 1 }}/{{ totalPhotos }}
                  </span>
                </span>
              </div>
            </div>
            
            <!-- Controles de navegación elegantes -->
            <div v-if="totalPhotos > 1" class="flex items-center justify-center gap-4 pt-6 border-t border-gray-100">
              <button 
                @click.stop="emit('prev')"
                class="flex-1 max-w-[200px] py-3 bg-gradient-to-r from-gray-50 to-white 
                       hover:from-gray-100 rounded-xl flex items-center justify-center gap-3 
                       transition-all duration-200 border border-gray-200 hover:border-gray-300 
                       hover:shadow-sm group"
                aria-label="Foto anterior"
              >
                <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 19l-7-7 7-7"/>
                </svg>
                <span class="font-medium text-gray-700 group-hover:text-gray-900">Anterior</span>
              </button>
              
              <div class="flex items-center gap-2">
                <div v-for="i in Math.min(5, totalPhotos)" :key="i" 
                     class="w-2 h-2 rounded-full transition-all duration-200"
                     :class="currentIndex + 1 === i ? 'bg-[#64278C] w-4' : 'bg-gray-300'"></div>
              </div>
              
              <button 
                @click.stop="emit('next')"
                class="flex-1 max-w-[200px] py-3 bg-gradient-to-r from-gray-50 to-white 
                       hover:from-gray-100 rounded-xl flex items-center justify-center gap-3 
                       transition-all duration-200 border border-gray-200 hover:border-gray-300 
                       hover:shadow-sm group"
                aria-label="Foto siguiente"
              >
                <span class="font-medium text-gray-700 group-hover:text-gray-900">Siguiente</span>
                <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Mismo script que arriba
interface Photo {
  title?: string
  date?: string
  category?: string
  gradient?: string
  image?: string
  type?: string
}

interface Props {
  isOpen: boolean
  currentPhoto: Photo | null
  currentIndex: number
  totalPhotos: number
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  currentPhoto: () => ({}),
  currentIndex: 0,
  totalPhotos: 0
})

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()
</script>
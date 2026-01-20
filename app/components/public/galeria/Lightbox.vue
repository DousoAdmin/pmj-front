<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-[#522178]/95 z-100 flex items-center justify-center p-4 backdrop-blur-sm"
        role="dialog"
        @click="$emit('close')"
      >
        <Transition name="zoom" appear>
          <div class="relative w-full max-w-4xl" @click.stop v-if="isOpen">
            
            <div class="bg-white rounded-xl overflow-hidden shadow-[20px_20px_0px_rgba(0,0,0,0.3)] border-4 border-white">
              <div class="flex flex-col md:flex-row">
                
                <div class="relative w-full md:w-2/3 bg-slate-100 aspect-square md:aspect-auto overflow-hidden">
                  <Transition name="slide-fade" mode="out-in">
                    <div :key="currentIndex" class="w-full h-full">
                      <div 
                        v-if="!currentPhoto?.image"
                        class="w-full h-full"
                        :style="{ backgroundColor: currentPhoto?.bgColor || '#038C33' }"
                      ></div>
                      <img 
                        v-else
                        :src="currentPhoto.image" 
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </Transition>

                  <button 
                    @click="$emit('close')"
                    class="absolute top-4 left-4 w-12 h-12 bg-[#F2780C] text-white flex items-center justify-center rounded-lg hover:rotate-90 transition-all duration-300 shadow-lg z-30"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div class="w-full md:w-1/3 p-8 flex flex-col justify-between bg-white">
                  <Transition name="slide-up" mode="out-in">
                    <div :key="currentIndex">
                      <span class="inline-block px-3 py-1 bg-[#038C33] text-white text-[10px] font-black uppercase tracking-widest rounded mb-4">
                        {{ currentPhoto?.category || 'General' }}
                      </span>

                      <h3 class="text-3xl font-black text-[#522178] uppercase tracking-tighter leading-none mb-4">
                        {{ currentPhoto?.title || 'Momento Plataforma' }}
                      </h3>

                      <div class="flex items-center gap-2 mb-8 text-slate-400 font-bold text-sm">
                        <div class="w-2 h-2 rounded-full bg-[#F2780C]"></div>
                        {{ currentPhoto?.date || '2025' }}
                      </div>
                    </div>
                  </Transition>

                  <div class="space-y-6">
                    <div class="flex items-center justify-between gap-2">
                      <button 
                        @click="$emit('prev')"
                        class="flex-1 py-4 border-4 border-[#522178] text-[#522178] font-black uppercase text-xs rounded-xl hover:bg-[#522178] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
                        Ant.
                      </button>
                      <button 
                        @click="$emit('next')"
                        class="flex-1 py-4 border-4 border-[#522178] text-[#522178] font-black uppercase text-xs rounded-xl hover:bg-[#522178] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        Sig.
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                    
                    <div class="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-[#F2780C] transition-all duration-500 ease-out"
                        :style="{ width: `${((currentIndex + 1) / (totalPhotos || 1)) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Photo {
  title?: string
  date?: string
  category?: string
  image?: string
  bgColor?: string
}

// Al usar defineProps, las variables quedan disponibles en el template
defineProps<{
  isOpen: boolean
  currentPhoto: Photo | null
  currentIndex: number
  totalPhotos: number
}>()

// Definimos los eventos
defineEmits<{
  (e: 'close'): void
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<style scoped>
/* Las animaciones se mantienen igual que en el paso anterior */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.zoom-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.zoom-leave-active { transition: all 0.3s ease-in; }
.zoom-enter-from { opacity: 0; transform: scale(0.8) translateY(20px); }
.zoom-leave-to { opacity: 0; transform: scale(0.9); }

.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.4s ease-in; }
.slide-fade-enter-from { opacity: 0; transform: translateX(20px); }
.slide-fade-leave-to { opacity: 0; transform: translateX(-20px); }

.slide-up-enter-active { transition: all 0.5s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>
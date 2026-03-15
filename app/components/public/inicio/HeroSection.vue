<template>
  <section 
    class="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#522178] py-20 md:py-32"
    role="banner"
    aria-labelledby="hero-title"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2240%22 viewBox=%220 0 80 40%22%3E%3Cpath d=%22M0 40 L40 0 L80 40%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221.5%22/%3E%3C/svg%3E'); background-size: 80px 40px;"></div>
      <div class="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-linear-to-br from-[#F2780C]/20 to-white/5 blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-linear-to-tr from-white/5 to-[#00A036]/20 blur-3xl"></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        <div class="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
          <div class="inline-block animate-fade-up">
            <span class="inline-block text-[#F2780C] text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 border-b-2 border-[#F2780C] pb-1">
              Plataforma Municipal
            </span>
            <h1 id="hero-title" class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              Juventudes <br /> de
              <span class="text-transparent bg-[#F2780C] bg-clip-text">Mosquera</span>
            </h1>
          </div>

          <div class="max-w-2xl mx-auto lg:mx-0 animate-fade-up" :style="{ animationDelay: '0.2s' }">
            <p class="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium">
              Conectamos 
              <span class="inline-block px-3 py-0.5 bg-white text-[#522178] rounded-full font-bold shadow-lg transform -rotate-1">organizaciones</span>, 
              fortalecemos el 
              <span class="text-[#00ae3a] font-black">liderazgo joven</span> 
              y transformamos ideas en 
              <span class="inline-block px-3 py-0.5 bg-[#F2780C] text-white rounded-md font-bold shadow-md transform rotate-1">acciones reales</span> 
              que impulsan a Mosquera.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-12 animate-fade-up" :style="{ animationDelay: '0.3s' }">
            <NuxtLink to="/public/nosotros" class="w-full sm:w-auto px-10 py-4 bg-[#00A036] hover:bg-[#00ae3a] text-white font-bold text-lg rounded-2xl shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              ¡Conócenos!
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </NuxtLink>

            <button @click="scrollToForm" class="w-full sm:w-auto px-10 py-4 bg-white text-[#522178] hover:bg-gray-100 font-bold text-lg rounded-2xl shadow-xl transition-all hover:-translate-y-1">
              Unirse Ahora
            </button>
          </div>

          <div class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-up" :style="{ animationDelay: '0.4s' }">
            <div v-for="(stat, i) in stats" :key="i" class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center lg:items-start">
              <span class="text-3xl font-black text-white" :class="{'text-[#F2780C]': i === 1}">{{ stat.value }}</span>
              <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-2/5 flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0">
          <div class="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-110 lg:h-110 group">
            <div class="absolute inset-0 bg-linear-to-tr from-[#F2780C]/20 to-[#038C33]/10 rounded-full blur-[80px] animate-pulse-glow"></div>
            
            <Transition name="pop">
              <div v-if="currentMessage" class="absolute -top-12 md:-top-16 left-0 right-0 flex justify-center z-30 pointer-events-none">
                <div class="bg-white text-[#522178] px-4 py-1.5 md:px-6 md:py-2 rounded-2xl font-black text-[10px] md:text-xs shadow-2xl uppercase italic border-2 border-[#F2780C]">
                  {{ currentMessage }}
                </div>
              </div>
            </Transition>

            <NuxtImg 
              src="/images/favicon.webp" 
              alt="Logo" 
              class="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-float-slow transition-transform duration-500 hover:scale-105" 
            />

            <div class="hidden lg:block absolute top-0 right-0 w-4 h-4 bg-[#F2780C] rounded-full animate-orbit"></div>
            <div class="hidden lg:block absolute bottom-10 left-0 w-3 h-3 bg-[#00A036] rounded-full animate-orbit-slow"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const currentMessage = ref('')
const stats = [
  { value: '500+', label: 'Jóvenes' },
  { value: '33+', label: 'Organizaciones' },
  { value: '50+', label: 'Líderes' }
]
const motivations = ["¡El futuro es tuyo!", "¡Haz que tu voz cuente!", "¡Mosquera cree en ti!"]

const updateMotivation = () => {
  currentMessage.value = motivations[Math.floor(Math.random() * motivations.length)]
}

const scrollToForm = () => {
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.texture-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

@keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-up { opacity: 0; animation: fade-up 0.8s ease-out forwards; }

.pop-enter-active { animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
.pop-leave-active { transition: opacity 0.2s ease-in; opacity: 0; }

@keyframes pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes pulse-glow { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.3); opacity: 0.4; } }
@keyframes orbit { from { transform: rotate(0deg) translateX(110px); } to { transform: rotate(360deg) translateX(110px); } }
@keyframes orbit-slow { from { transform: rotate(360deg) translateX(130px); } to { transform: rotate(0deg) translateX(130px); } }

.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 6s ease-in-out infinite; }
.animate-orbit { animation: orbit 15s linear infinite; }
.animate-orbit-slow { animation: orbit-slow 20s linear infinite; }
</style>
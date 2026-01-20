<template>
  <div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#522178] pt-32 pb-20 px-6">
    
    <div class="absolute inset-0 pointer-events-none">
      <div 
        class="absolute inset-0 opacity-[0.05]" 
        style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 45px 45px;"
      ></div>
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full animate-pulse-slow"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/10 rounded-full animate-pulse-slow" style="animation-delay: 2s"></div>

      <div class="absolute -top-24 -left-24 w-[600px] h-[600px] bg-[#038C33]/20 rounded-full blur-[130px]"></div>
      <div class="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-[#F2780C]/20 rounded-full blur-[130px]"></div>
    </div>

    <div class="relative z-10 w-full flex justify-center items-center">
      <Transition name="fade-slide" mode="out-in">
        <div :key="isLogin ? 'login' : 'register'" class="w-full flex justify-center">
          <LoginCard v-if="isLogin" @switch="isLogin = false" />
          <RegisterCard v-else @switch="isLogin = true" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
// Definimos el estado para alternar entre componentes
const isLogin = ref(true)

// Configuración opcional de página (Layout, Meta, etc.)
definePageMeta({
  layout: 'default' // Asegúrate de que tu layout tenga el <Header />
})
</script>

<style scoped>
/* Animación de los círculos de fondo */
@keyframes pulse-slow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
}
.animate-pulse-slow {
  animation: pulse-slow 12s ease-in-out infinite;
}

/* Transición suave entre Login y Registro */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
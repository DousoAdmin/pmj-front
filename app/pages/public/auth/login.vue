<template>
  <div class="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 bg-[#522178] relative overflow-hidden login-texture">
    <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
      
      <div class="flex flex-col items-center lg:items-start space-y-12 animate-fade-in-down">
        <div class="space-y-6 text-center lg:text-left">
          <div class="inline-block bg-[#F2780C] text-white px-5 py-2 rounded-sm shadow-lg transform -rotate-1">
            <h3 class="font-black tracking-[0.4em] uppercase text-xs italic">Tu espacio, tu voz</h3>
          </div>
          
          <h2 class="text-white text-6xl sm:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            BIENVENIDO <br/> 
            <span class="text-[#F2780C] bg-white px-4 inline-block transform -skew-x-6 mt-2">DE NUEVO</span>
          </h2>
          
          <p class="text-white/80 font-bold text-lg max-w-md leading-relaxed border-l-4 border-[#00A036] pl-6">
            Continúa construyendo el futuro de <span class="text-white underline decoration-[#F2780C]">Mosquera</span>. Tu liderazgo es la clave.
          </p>
        </div>

        <div 
          class="w-64 h-64 lg:w-96 lg:h-96 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_45px_50px_rgba(0,0,0,0.5)] relative animate-float"
          :class="{
            'scale-110 -rotate-6 translate-x-8': llamaState === 'curious',
            'scale-125 -translate-y-8': llamaState === 'happy'
          }"
        >
          <img src="/images/favicon.webp" alt="Mascota Llama" class="w-full h-full object-contain" />
          
          <Transition name="pop">
            <div v-if="currentMessage" class="absolute -top-10 -right-4 lg:right-auto lg:-top-16 lg:left-0 bg-white text-[#522178] px-6 py-3 rounded-2xl rounded-bl-none font-black text-xs shadow-2xl uppercase italic whitespace-nowrap z-20 border-2 border-[#F2780C]">
              {{ currentMessage }}
              <div class="absolute -bottom-2 left-4 w-4 h-4 bg-white border-r-2 border-b-2 border-[#F2780C] rotate-45"></div>
            </div>
          </Transition>
        </div>
      </div>

      <div class="flex justify-center lg:justify-end animate-fade-in-right">
        <div class="max-w-md w-full bg-white rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.4)] p-10 py-16 lg:py-20 border-t-[15px] border-[#F2780C]">
          <h4 class="text-center font-black text-[#522178] text-2xl mb-10 tracking-tighter uppercase italic">Ingreso Líder</h4>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="group space-y-1">
              <label class="text-[11px] font-black text-gray-400 ml-5 uppercase tracking-widest group-focus-within:text-[#F2780C] transition-colors">Identificación</label>
              <input 
                v-model="form.email"
                @input="handleTyping('email')"
                @focus="setLlamaStatus('curious', 'SIEMPRE ME DA RISA TU CORREO XD')" 
                @blur="setLlamaStatus('idle')"
                type="email" 
                class="w-full px-8 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-[#F2780C]/10 font-bold text-gray-700 transition-all border-2 border-transparent focus:border-gray-200" 
                placeholder="CORREO" 
              />
            </div>

            <div class="group space-y-1">
              <label class="text-[11px] font-black text-gray-400 ml-5 uppercase tracking-widest group-focus-within:text-[#F2780C] transition-colors">Clave Privada</label>
              <input 
                v-model="form.password"
                @input="handleTyping('password')"
                @focus="setLlamaStatus('curious', 'No miraré, ¡lo prometo!🥰')" 
                @blur="setLlamaStatus('idle')"
                type="password" 
                class="w-full px-8 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-[#F2780C]/10 font-bold text-gray-700 transition-all border-2 border-transparent focus:border-gray-200" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              @mouseenter="setLlamaStatus('happy', '¡A CHAMBEAR MANIT@! 🚀')" 
              @mouseleave="setLlamaStatus('idle')"
              type="submit" 
              class="w-full py-6 bg-[#522178] hover:bg-[#00A036] text-white font-black rounded-2xl shadow-xl transition-all tracking-[0.4em] uppercase active:scale-95 mt-4"
            >
              ENTRAR
            </button>
          </form>
          
          <div class="mt-12 text-center border-t border-gray-100 pt-8">
            <NuxtLink to="/public/auth/register" class="text-gray-400 font-black text-[11px] tracking-widest hover:text-[#F2780C]">
              ¿NUEVO AQUÍ? <span class="text-[#522178] underline decoration-[#F2780C] decoration-2">REGÍSTRATE</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const llamaState = ref('idle')
const currentMessage = ref('')

// Datos del formulario
const form = reactive({
  email: '',
  password: ''
})

const setLlamaStatus = (state, message = '') => {
  llamaState.value = state
  currentMessage.value = message
}

// Reacción al escribir
const handleTyping = (field) => {
  llamaState.value = 'curious'
  
  const messages = {
    email: 'apurale que la juventud te espera 🙄',
    password: 'Se nota que confías en la humanidad. 😉'
  }

  if (form[field].length > 0) {
    currentMessage.value = messages[field]
  }
}

const handleLogin = () => {
  console.log("Login intent:", form)
}
</script>

<style scoped>
.login-texture {
  background-color: #522178;
  background-image: repeating-linear-gradient(45deg, #4c1e6e 25%, transparent 25%, transparent 50%, #4c1e6e 50%, #4c1e6e 75%, transparent 75%, transparent);
  background-size: 80px 80px;
}

.animate-float { animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }

.pop-enter-active { animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { animation: pop-in 0.2s reverse ease-in; }
@keyframes pop-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-right { animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
</style>
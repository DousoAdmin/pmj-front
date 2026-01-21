<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-10 bg-[#00A036] relative overflow-hidden register-texture">
    <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
      
      <div class="flex justify-center lg:justify-start order-2 lg:order-1 animate-fade-in-left w-full">
        <div class="max-w-xl w-full bg-white rounded-[30px] sm:rounded-[50px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 py-10 sm:p-10 sm:py-12 border-b-[10px] sm:border-b-20 border-[#522178]">
          <h4 class="text-center font-black text-[#00A036] text-xl sm:text-2xl mb-6 sm:mb-8 tracking-tighter uppercase italic">
            Nuevo Registro
          </h4>

          <form @submit.prevent="handleRegister" class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            <div class="sm:col-span-2 space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Nombre Completo</label>
              <input v-model="form.name" @input="handleTyping('name')" @focus="setLlamaStatus('curious', 'Prometemos no juzgar 🤐')" @blur="setLlamaStatus('idle')"
                type="text" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs focus:ring-4 focus:ring-[#F2780C]/20 transition-all border-2 border-transparent focus:border-gray-100" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Usuario</label>
              <input v-model="form.user" @input="handleTyping('user')" @focus="setLlamaStatus('curious', 'Piensa en tu yo del futuro. 😎')" @blur="setLlamaStatus('idle')"
                type="text" placeholder="Usuario" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Teléfono</label>
              <input v-model="form.phone" @input="handleTyping('phone')" @focus="setLlamaStatus('curious', 'Prometemos no llamarte a las 3 a.m.')" @blur="setLlamaStatus('idle')"
                type="tel" placeholder="300 000 0000" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
            </div>

            <div class="sm:col-span-1 space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Correo</label>
              <input v-model="form.email" @input="handleTyping('email')" @focus="setLlamaStatus('curious', 'pon el correo pero ¡Tratame serio! 📧')" @blur="setLlamaStatus('idle')"
                type="email" placeholder="CORREO@EJEMPLO.COM" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
            </div>

            <div class="sm:col-span-1 space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Nacimiento</label>
              <input v-model="form.birthdate" @input="handleTyping('birthdate')" @focus="setLlamaStatus('curious', '¿Ya tienes edad para estar aquí? 👶')" @blur="setLlamaStatus('idle')"
                type="date" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs text-gray-500" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Contraseña</label>
              <input v-model="form.password" @input="handleTyping('password')" @focus="setLlamaStatus('curious', 'No pongas ‘123456’. Te veo.')" @blur="setLlamaStatus('idle')"
                type="password" placeholder="••••••••" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs border-2 border-transparent focus:border-gray-100" />
            </div>

            <div class="space-y-1">
              <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Repetir</label>
              <input v-model="form.confirmPassword" @input="handleTyping('confirmPassword')" @focus="setLlamaStatus('curious', 'A ver esa memoria... 🧠')" @blur="setLlamaStatus('idle')"
                type="password" placeholder="••••••••" class="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs border-2 border-transparent focus:border-gray-100" />
            </div>

            <button @mouseenter="setLlamaStatus('happy', '¡DALE CLIC YA! 🔥')" @mouseleave="setLlamaStatus('idle')"
              type="submit" class="sm:col-span-2 py-4 sm:py-5 bg-[#F2780C] hover:bg-[#522178] text-white font-black rounded-xl sm:rounded-2xl shadow-xl transition-all tracking-[0.2em] sm:tracking-[0.4em] mt-2 uppercase active:scale-95">
              CREAR CUENTA
            </button>
          </form>

          <div class="mt-6 sm:mt-8 text-center border-t border-gray-100 pt-6">
            <NuxtLink to="/public/auth/login" class="text-gray-400 font-black text-[9px] sm:text-[10px] tracking-widest hover:text-[#522178]">
              ¿YA TIENES CUENTA? <span class="text-[#00A036] underline decoration-[#522178] decoration-2">ENTRA AQUÍ</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center lg:items-end space-y-8 sm:space-y-12 order-1 lg:order-2 animate-fade-in-down text-center lg:text-right">
        <div class="space-y-4 sm:space-y-6">
          <div class="space-y-1 sm:space-y-2">
            <h2 class="text-[#522178] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase italic">
              ESCRIBE LA
            </h2>
            <div class="bg-white px-4 py-2 sm:px-6 sm:py-3 inline-block transform sm:skew-x-12 shadow-2xl">
              <h2 class="text-[#522178] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase sm:-skew-x-12">
                HISTORIA.
              </h2>
            </div>
          </div>
        </div>
        
        <div class="hidden lg:block border-r-8 border-[#F2780C] pr-6 py-2">
          <p class="text-white font-black text-xl uppercase italic tracking-tighter whitespace-nowrap">
            Únete a la red <span class="text-[#522178] bg-white px-2">más grande</span> de jóvenes en Mosquera.
          </p>
          <p class="text-white/90 font-bold text-sm uppercase tracking-wider mt-1">
            Tu llave maestra para transformar el municipio.
          </p>
        </div>

        <div 
          class="w-44 h-44 sm:w-64 sm:h-64 lg:w-[450px] lg:h-[450px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_25px_30px_rgba(0,0,0,0.4)] relative animate-float-slow"
          :class="{
            'scale-110 lg:-translate-x-12 rotate-6 translate-x-4': llamaState === 'curious',
            'scale-120 -translate-y-4 lg:-translate-y-12': llamaState === 'happy',
          }"
        >
          <NuxtImg src="/images/favicon.webp" alt="Logo Llama" class="w-full h-full object-contain" />

          <Transition name="pop">
            <div v-if="currentMessage" class="absolute -top-10 right-0 lg:right-auto lg:left-0 bg-white text-[#522178] px-4 py-2 sm:px-6 sm:py-3 rounded-2xl rounded-bl-none font-black text-[9px] sm:text-[11px] shadow-2xl uppercase italic whitespace-nowrap z-20 border-2 border-[#F2780C]">
              {{ currentMessage }}
              <div class="absolute -bottom-2 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-white border-r-2 border-b-2 border-[#F2780C] rotate-45"></div>
            </div>
          </Transition>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const llamaState = ref("idle");
const currentMessage = ref("");

const form = reactive({
  name: "",
  user: "",
  phone: "",
  email: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
});

const setLlamaStatus = (state, message = "") => {
  llamaState.value = state;
  currentMessage.value = message;
};

const handleTyping = (field) => {
  llamaState.value = "curious";

  const messages = {
    name: "¡Tus papás sí que fueron creativos… demasiado! 🤣",
    user: "Ese user parece contraseña mal escrita. XD",
    phone: "¿A quién vas a estafar con ese número? 📱",
    email: "Espero que no sea el de tus páginas cochinas... 🤐",
    birthdate: "¿En serio naciste ese día? Mejor no digo nada... 👴",
    password: "Eso no es una clave, es una sugerencia 😑",
  };

  if (field === "confirmPassword") {
    currentMessage.value =
      form.confirmPassword !== form.password
        ? "¡Concéntrate. Solo esta vez!"
        : "Vaya, al menos sabes repetir cosas. 👍";
  } else if (form[field].length > 0) {
    currentMessage.value = messages[field];
  }
};

const handleRegister = () => {
  if (form.password !== form.confirmPassword) {
    setLlamaStatus("curious", "¡Arregla esas claves primero! 🙄");
    return;
  }
  console.log("Formulario enviado", form);
};
</script>

<style scoped>
.register-texture {
  background-color: #00a036;
  background-image:
    radial-gradient(#008a2e 20%, transparent 20%),
    radial-gradient(#008a2e 20%, transparent 20%);
  background-size: 40px 40px;
  background-position:
    0 0,
    20px 20px;
}
.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}
@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(-3deg);
  }
}
.pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-leave-active {
  animation: pop-in 0.2s reverse ease-in;
}
@keyframes pop-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-left {
  animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Ajuste para el input de fecha */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}
</style>

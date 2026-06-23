<template>
  <!-- Espaciado superior para evitar el Navbar -->
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-12 md:pt-40 lg:pt-20 pb-2 bg-[#00A036] relative overflow-hidden register-texture">
    
    <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10 mt-10">
      
      <!-- CONTENEDOR DEL FORMULARIO -->
      <div class="flex justify-center lg:justify-start order-2 lg:order-1 animate-fade-in-left w-full">
        <div class="max-w-xl w-full bg-white rounded-[30px] sm:rounded-[50px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] border-b-10 sm:border-b-20 border-[#522178] overflow-hidden flex flex-col">
          
          <!-- Header Fijo -->
          <div class="pt-8 sm:pt-10 px-6 sm:px-10 text-center">
            <h4 class="font-black text-[#00A036] text-xl sm:text-2xl mb-4 tracking-tighter uppercase italic">
              Nuevo Registro
            </h4>
          </div>

          <!-- Formulario con Scroll Interno -->
          <form @submit.prevent="handleRegister" class="p-6 sm:p-10 pt-2 overflow-y-auto max-h-[60vh] lg:max-h-[65vh] custom-scrollbar">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              
              <!-- NOMBRE COMPLETO -->
              <div class="sm:col-span-2 space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Nombre Completo</label>
                <input v-model="form.name" @input="handleTyping('name')" @focus="setLlamaStatus('curious', 'Prometemos no juzgar 🤐')" @blur="setLlamaStatus('idle')"
                  type="text" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs border-2 border-transparent focus:border-gray-100 transition-all" />
              </div>

              <!-- TIPO DE DOCUMENTO -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Tipo de Documento</label>
                <select v-model="form.documentType" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs appearance-none border-2 border-transparent focus:border-gray-100">
                  <option value="" disabled>Seleccione...</option>
<option :value="1">Cédula de Ciudadanía</option>
<option :value="2">Tarjeta de Identidad</option>
<option :value="3">Cédula de Extranjería</option>
                </select>
              </div>

              <!-- NÚMERO DOCUMENTO -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Número Documento</label>
                <input v-model="form.documentNumber" type="text" placeholder="12345678" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
              </div>

              <!-- FECHA DE NACIMIENTO -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Nacimiento</label>
                <input v-model="form.birthdate" type="date" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs text-gray-500" />
              </div>

              <!-- CORREO ELECTRÓNICO -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Correo</label>
                <input v-model="form.email" @input="handleTyping('email')" type="email" placeholder="CORREO@EJEMPLO.COM" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
              </div>

              <!-- TELÉFONO/CELULAR -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Teléfono</label>
                <input v-model="form.phone" type="tel" placeholder="300 000 0000" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
              </div>

              <!-- DIRECCIÓN -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Dirección</label>
                <input v-model="form.address" type="text" placeholder="Calle 123..." class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs" />
              </div>

              <!-- ETNIA -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Etnia</label>
                <select v-model="form.ethnicity" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs appearance-none">
                  <option :value="1">No aplica</option>
<option :value="2">Indígena</option>
<option :value="3">Afrocolombiano</option>
<option :value="4">Mestizo</option>
                </select>
              </div>

              <!-- DISCAPACIDAD -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Discapacidad</label>
                <select v-model="form.disability" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs appearance-none">
                  <option :value="1">Ninguna</option>
<option :value="2">Física</option>
<option :value="3">Auditiva</option>
<option :value="4">Visual</option>
                </select>
              </div>

              <!-- GÉNERO -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Género</label>
                <select v-model="form.gender" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs appearance-none">
                  <option :value="1">Seleccione...</option>
                  <option :value="2">Masculino</option>
                  <option :value="3">Femenino</option>
                  <option :value="4">Otro</option>
                </select>
              </div>

              <!-- IDENTIDAD SEXUAL -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Id. Sexual</label>
                <select v-model="form.sexualIdentity" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs appearance-none">
                  <option :value="1">Seleccione...</option>
                  <option :value="2">Heterosexual</option>
                  <option :value="3">Homosexual</option>
                  <option :value="4">Bisexual</option>
                </select>
              </div>

              <!-- CONTRASEÑA -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Contraseña</label>
                <input v-model="form.password" @input="handleTyping('password')" @focus="setLlamaStatus('curious', '¡Pon una difícil! 🔒')" @blur="setLlamaStatus('idle')"
                  type="password" placeholder="••••••••" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs border-2 border-transparent focus:border-gray-100 transition-all" />
              </div>

              <!-- CONFIRMAR CONTRASEÑA -->
              <div class="space-y-1">
                <label class="text-[9px] sm:text-[10px] font-black text-gray-400 ml-4 uppercase tracking-widest">Confirmar Clave</label>
                <input v-model="form.confirmPassword" @input="handleTyping('confirmPassword')" @focus="setLlamaStatus('curious', '¡Que coincidan! 🧐')" @blur="setLlamaStatus('idle')"
                  type="password" placeholder="••••••••" class="w-full px-5 py-3.5 bg-gray-50 rounded-xl sm:rounded-2xl outline-none font-bold text-xs border-2 border-transparent focus:border-gray-100 transition-all" />
              </div>

              <!-- CHECKBOX POLÍTICAS -->
              <div class="sm:col-span-2 flex items-start space-x-3 py-2 px-2">
                <input v-model="form.acceptTerms" type="checkbox" id="terms" class="mt-1 w-4 h-4 text-[#00A036] border-gray-300 rounded focus:ring-[#00A036] cursor-pointer" />
                <label for="terms" class="text-[10px] font-bold text-gray-500 leading-tight uppercase cursor-pointer">
                  Acepto las <span class="text-[#522178] underline">Políticas de Privacidad</span> y los <span class="text-[#522178] underline">Términos y Condiciones</span>
                </label>
              </div>

              <button @mouseenter="setLlamaStatus('happy', '¡DALE CLIC YA! 🔥')" @mouseleave="setLlamaStatus('idle')"
                type="submit" class="sm:col-span-2 py-4 sm:py-5 bg-[#F2780C] hover:bg-[#522178] text-white font-black rounded-xl sm:rounded-2xl shadow-xl transition-all tracking-[0.2em] sm:tracking-[0.4em] mt-2 uppercase active:scale-95 sticky bottom-0">
                CREAR CUENTA
              </button>
            </div>
          </form>

          <!-- Footer del Formulario -->
          <div class="p-6 text-center border-t border-gray-100 bg-gray-50/50">
            <NuxtLink to="/private/auth/login" class="text-gray-400 font-black text-[9px] sm:text-[10px] tracking-widest hover:text-[#522178]">
              ¿YA TIENES CUENTA? <span class="text-[#00A036] underline decoration-[#522178] decoration-2">ENTRA AQUÍ</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- LADO DERECHO (LOGO Y TEXTO) -->
      <div class="flex flex-col items-center lg:items-end space-y-4 order-1 lg:order-2 animate-fade-in-down text-center lg:text-right">
        <div class="space-y-2 sm:space-y-4">
          <h2 class="text-[#522178] text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none uppercase italic">
            ESCRIBE LA
          </h2>
          <div class="bg-white px-4 py-2 sm:px-6 sm:py-3 inline-block transform sm:skew-x-12 shadow-2xl">
            <h2 class="text-[#522178] text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none uppercase sm:-skew-x-12">
              HISTORIA
            </h2>
          </div>
        </div>
        
        <div class="hidden lg:block border-r-8 border-[#F2780C] pr-6 py-2 max-w-2xl">
          <p class="text-white font-black text-2xl uppercase italic tracking-tighter">
            Si tu organización ya es parte de la <span class="text-[#522178] bg-white px-2">plataforma de juventudes</span> de Mosquera.
          </p>
        </div>

        <!-- LOGO LLAMA ANIMADO -->
        <div 
          class="w-40 h-40 sm:w-56 sm:h-56 lg:w-96 lg:h-96 transition-all duration-700 ease-out drop-shadow-2xl relative animate-float-slow"
          :class="{'scale-110 -rotate-6': llamaState === 'curious', 'scale-125 -translate-y-4': llamaState === 'happy'}"
        >
          <NuxtImg src="/images/favicon.webp" alt="Logo Llama" class="w-full h-full object-contain" />
          <Transition name="pop">
            <div v-if="currentMessage" class="absolute -top-5 right-0 lg:right-auto lg:-left-20 bg-white text-[#522178] px-4 py-2 rounded-2xl font-black text-[10px] sm:text-xs shadow-2xl uppercase italic whitespace-nowrap z-20 border-2 border-[#F2780C]">
              {{ currentMessage }}
              <div class="absolute -bottom-2 left-4 w-3 h-3 bg-white border-r-2 border-b-2 border-[#F2780C] rotate-45"></div>
            </div>
          </Transition>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.register-texture {
  background-color: #00a036;
  background-image: radial-gradient(#008a2e 20%, transparent 20%), radial-gradient(#008a2e 20%, transparent 20%);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}

/* Scrollbar con tus colores */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #522178; border-radius: 10px; }

/* Animaciones originales */
.animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(-3deg); }
}
.pop-enter-active { animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes pop-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-left { animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>

<script setup>
definePageMeta({ hideFooter: true });
import { ref, reactive } from "vue";
const api = useApi();

const llamaState = ref("idle");
const currentMessage = ref("");

const form = reactive({
  name: "", documentNumber: "", documentType: "", birthdate: "",
  email: "", phone: "", address: "", ethnicity: "",
  disability: "ninguna", gender: "", sexualIdentity: "",
  password: "", confirmPassword: "", acceptTerms: false
});

const setLlamaStatus = (state, message = "") => {
  llamaState.value = state;
  currentMessage.value = message;
};

const handleTyping = (field) => {
  llamaState.value = "curious";
  const messages = {
    name: "¡Qué nombre tan imponente! 🔥",
    email: "No nos mandes spam, porfa. 📧",
    password: "¡Cuidado que alguien mira! 🔒",
    confirmPassword: "¿Coinciden o me estás timando? 🤨"
  };
  if (messages[field] && form[field].length > 0) {
    currentMessage.value = messages[field];
  }
};

const handleRegister = async () => {
  if (!form.acceptTerms) {
    setLlamaStatus('curious', '¡Acepta los términos primero! 📜');
    return;
  }
  if (form.password !== form.confirmPassword) {
    setLlamaStatus('curious', 'Las claves no coinciden... 🙄');
    return;
  }

  const payload = {
    FULL_NAME: form.name,
    IDENTIFICATION: form.documentNumber,
    TYPE_DOCUMENT: Number(form.documentType),
    BIRTHDAY: form.birthdate,
    EMAIL: form.email,
    PHONE: form.phone,
    LOCATION: form.address,
    ETNIA: Number(form.ethnicity),
    DISCAPACIDAD: Number(form.disability),
    GENERO: Number(form.gender),
    IDENTIDAD_SEXUAL: Number(form.sexualIdentity)
  };

  try {
    const response = await api.post('/users/Create_User', payload);
    console.log('Usuario creado:', response);
    setLlamaStatus('happy', 'Usuario creado correctamente 🎉');
    // Aquí podrías redirigir o limpiar el formulario
  } catch (error) {
    console.error('Error al crear usuario:', error);
    setLlamaStatus('curious', 'No se pudo crear el usuario. Revisa la consola.');
  }
};
</script>
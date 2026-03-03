<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f7f0fb] py-12">
    <div class="w-full max-w-lg p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#f0e8f8]">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#522178] to-[#6a3aa6] text-white shadow-lg">
          <!-- Inline SVG so it can inherit color (currentColor) -->
          <svg class="w-10 h-10 text-white" viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g>
              <path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z" />
              <path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z" />
            </g>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-extrabold text-[#522178]">Crear cuenta</h1>
        </div>
      </div>

      <form @submit.prevent="doRegister" class="space-y-4" v-if="!success">
        <div>
          <label class="text-xs font-bold text-gray-600 mb-1 block">Nombre completo</label>
          <input v-model="name" type="text" placeholder="Nombre completo o nombre de la organización"
            class="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#522178] focus:ring-2 focus:ring-[#522178]/10" />
        </div>

        <div>
          <label class="text-xs font-bold text-gray-600 mb-1 block">Correo electrónico</label>
          <input v-model="email" type="email" placeholder="correo@ejemplo.com"
            class="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#522178] focus:ring-2 focus:ring-[#522178]/10" />
        </div>

        <div>
          <label class="text-xs font-bold text-gray-600 mb-1 block">Contraseña</label>
          <input v-model="password" type="password" placeholder="********"
            class="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#522178] focus:ring-2 focus:ring-[#522178]/10" />
        </div>
                <div class="mt-2">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="isOrg" class="form-checkbox w-4 h-4 text-[#522178] mr-3" />
            <span class="text-sm text-gray-700">¿Eres parte de una organización?</span>
          </label>

          <div v-if="isOrg" class="mt-3 space-y-2">
            <input v-model="orgName" type="text" placeholder="Nombre de la organización (opcional)"
              class="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/10" />
            <p class="text-xs text-[#522178]">Si indicas que perteneces a una organización, tu cuenta será marcada para aprobación. El equipo validará la veracidad antes de habilitar el acceso completo.</p>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <input id="terms" type="checkbox" class="w-4 h-4 text-[#00B140] rounded" />
            <label for="terms">Acepto términos y política de privacidad</label>
          </div>
        </div>



        <button type="submit" class="w-full py-3 bg-[#522178] text-white font-extrabold rounded-xl shadow transform active:scale-[0.995]">
          Crear cuenta
        </button>

        <div class="text-center text-sm text-gray-600">
          Si quieres registrarte como una organización
          <NuxtLink to="/public/formulario" class="text-[#522178] font-bold underline ml-1">oprime aquí</NuxtLink>.
        </div>

        <div class="text-center text-sm mt-3">
          ¿Ya tienes cuenta?
          <NuxtLink to="/private/auth/login" class="text-[#522178] font-bold ml-1">Iniciar sesión</NuxtLink>
        </div>
      </form>

      <div v-else class="text-center py-8">
        <div class="mx-auto w-20 h-20 rounded-full bg-[#E6F9EE] flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-[#038C33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-extrabold text-[#038C33]">Registro exitoso</h3>
        <p class="text-sm text-gray-600 mt-2 mb-4">Ya puedes iniciar sesion </p>
        <NuxtLink to="/private/formulario" class="inline-block px-6 py-3 bg-[#00B140] text-white rounded-xl font-bold">Ir a Iniciar Sesion</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCookie } from '#imports'
const name = ref('')
const email = ref('')
const password = ref('')
const isOrg = ref(false)
const orgName = ref('')
const success = ref(false)

async function doRegister() {
  const cookie = useCookie('auth_token')
  cookie.value = 'demo-token'
  success.value = true
}
</script>

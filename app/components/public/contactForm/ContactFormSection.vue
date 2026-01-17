<template>
  <section 
    class="py-20 md:py-32 bg-[#522178] text-white relative overflow-hidden"
    aria-labelledby="contact-title"
  >
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F2780C]/10 rounded-full"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row gap-16 items-center">
        
        <div class="w-full lg:w-2/5 space-y-8 text-center lg:text-left">
          <h2 id="contact-title" class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
            ¡Es tu <br/>
            <span class="text-[#F2780C]">momento!</span>
          </h2>
          <p class="text-xl opacity-90 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
            Únete a la red juvenil más grande de Mosquera. Participa en proyectos 
            <span class="font-bold border-b-2 border-[#F2780C]">ambientales, deportivos y culturales</span>.
          </p>
          
          <div class="space-y-4 pt-4 hidden md:block text-left max-w-xs mx-auto lg:mx-0">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#F2780C] flex items-center justify-center text-white font-bold">✓</div>
              <span class="font-bold">Certificación oficial</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#F2780C] flex items-center justify-center text-white font-bold">✓</div>
              <span class="font-bold">Acceso a becas y talleres</span>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-3/5">
          <form 
            @submit.prevent="submitForm" 
            class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-b-8 border-[#038C33]"
            novalidate
          >
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest ml-2 text-slate-400">Nombre Completo</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  class="w-full px-6 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-[#F2780C] focus:bg-white outline-none transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest ml-2 text-slate-400">Correo Electrónico</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="tu@email.com"
                  class="w-full px-6 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-[#F2780C] focus:bg-white outline-none transition-all text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest ml-2 text-slate-400">Edad (14-28 años)</label>
                <input
                  v-model.number="form.edad"
                  type="number"
                  min="14"
                  max="28"
                  placeholder="Tu edad"
                  class="w-full px-6 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-[#F2780C] focus:bg-white outline-none transition-all text-slate-800"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-black uppercase tracking-widest ml-2 text-slate-400">Línea de Interés</label>
                <div class="relative">
                  <select
                    v-model="form.interes"
                    class="w-full px-6 py-4 rounded-2xl bg-[#F2780C] border-none text-white font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-[#F2780C]/20 transition-all outline-none"
                  >
                    <option value="" disabled>Selecciona un área</option>
                    <option value="deportes">Deportes y Recreación</option>
                    <option value="cultura">Cultura y Artes</option>
                    <option value="ambiente">Medio Ambiente</option>
                    <option value="liderazgo">Liderazgo y Social</option>
                  </select>
                  <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <div class="space-y-2 mb-8">
              <label class="text-xs font-black uppercase tracking-widest ml-2 text-slate-400">¿Tienes alguna idea o proyecto?</label>
              <textarea
                v-model="form.mensaje"
                rows="3"
                placeholder="Cuéntanos brevemente..."
                class="w-full px-6 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-[#F2780C] focus:bg-white outline-none transition-all resize-none text-slate-800"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-6 bg-[#F2780C] text-white font-black text-xl rounded-2xl shadow-lg hover:bg-[#d66a0a] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <span v-if="!isSubmitting">ENVIAR SOLICITUD</span>
              <span v-else>PROCESANDO...</span>
            </button>

            <p v-if="message" class="mt-6 text-center font-bold text-[#522178]" role="alert">
              {{ message }}
            </p>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['open-modal'])

const form = ref({ nombre: '', email: '', edad: '', interes: '', mensaje: '' })
const message = ref('')
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  message.value = '¡Recibido! Pronto nos contactaremos.'
  emit('open-modal')
  form.value = { nombre: '', email: '', edad: '', interes: '', mensaje: '' }
  isSubmitting.value = false
}
</script>
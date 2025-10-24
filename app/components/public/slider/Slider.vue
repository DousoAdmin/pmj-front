<template>
  <section class="slider w-full bg-gray-100">
    <div class="slider-inner relative overflow-hidden">
      <div class="slides flex transition-transform duration-700" :style="`transform: translateX(-${current * 100}%);`">
        <div v-for="(s, i) in slides" :key="i" :class="['slide', 'min-w-full', s.type === 'split' ? 'slide--split' : 'slide--full']">
          
          <template v-if="s.type === 'full'">
            <img :src="s.image" :alt="s.title" class="slide-image" loading="lazy" />
            <div class="slide-overlay"></div>
            <div class="slide-content center-content text-center">
              <h2 class="slide-title">{{ s.title }}</h2>
              <h3 class="slide-subtitle">{{ s.subtitle }}</h3>
              <div class="slide-body">
                <p v-for="(p, idx) in s.body" :key="idx" class="slide-paragraph" v-html="p"></p>
              </div>
              <div class="slide-cta" v-if="s.cta">
                <a :href="s.cta.url" class="btn-cta">{{ s.cta.label }}</a>
              </div>
            </div>
          </template>
            
          <template v-else-if="s.type === 'split'">
            <div class="split-inner">
              <div class="split-left">
                <div class="split-card">
                  <h2 class="split-title" :style="{color: s.titleColor || '#7E3FF2'}">{{ s.title }}</h2>
                  <p class="split-lead" v-html="s.lead"></p>
                  <div class="split-body">
                    <p v-for="(p, idx) in s.body" :key="idx" v-html="p"></p>
                  </div>
                  <div class="slide-cta mt-4">
                    <a :href="s.cta.url" class="btn-cta">{{ s.cta.label }}</a>
                  </div>
                </div>
              </div>
              <div class="split-right">
                <img :src="s.image" :alt="s.title" class="split-image" loading="lazy" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <button aria-label="Anterior" class="arrow left top-1/2 -translate-y-1/2 absolute z-20 p-2" @click="prev">
        ‹
      </button>
      <button aria-label="Siguiente" class="arrow right top-1/2 -translate-y-1/2 absolute z-20 p-2" @click="next">
        ›
      </button>

      <div class="dots absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2 z-20">
        <button v-for="(s, i) in slides" :key="i" class="w-3 h-3 rounded-full" :class="current===i ? 'bg-white' : 'bg-white/60'" @click="goTo(i)"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import '@/assets/css/slider/slider.css'
const slides = ref([
  {
    type: 'full',
    image: "/assets/imagenes/header/logo.png",
    title: 'Únete como Voluntario',
    subtitle: '¡Sé parte del cambio!',
    body: [
      'Si tienes pasión por trabajar con y para las juventudes, te invitamos a unirte como voluntario en la Plataforma de Juventudes de Mosquera.',
      'Tu tiempo, habilidades y compromiso pueden marcar la diferencia en nuestras iniciativas y proyectos.'
    ],
    cta: { label: 'INSCRÍBETE AQUÍ', url: '#' }
  },
  {
    type: 'split',
    image: "/assets/imagenes/header/Slider.jpg",
    title: 'Inscripciones de Organizaciones',
    titleColor: '#7E3FF2',
    lead: '<strong>¡Haz parte de la Plataforma de Juventudes de Mosquera!</strong>',
    body: [
      'El periodo de inscripción para organizaciones juveniles estará abierto del <strong>14 de julio al 14 de agosto</strong>.',
      'Este es el momento perfecto para unir tu organización a una red que trabaja por el desarrollo, la participación y el fortalecimiento de las juventudes en Mosquera.'
    ],
    cta: { label: 'INSCRÍBETE AQUÍ', url: '#' }
  }
])

const current = ref(0)
const autoplay = ref(true)
const intervalMs = 30000
let timer = null

function handleKey(e) {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

function next() {
  current.value = (current.value + 1) % slides.value.length
}
function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}
function goTo(i) {
  current.value = i
}

function startAutoplay() {
  stopAutoplay()
  if (autoplay.value) {
    timer = setInterval(() => next(), intervalMs)
  }
}
function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.slide img {
  display: block;
}
.slide-caption {
  backdrop-filter: blur(4px);
}
.arrow {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
.dots button {
  border: none;
}
</style>

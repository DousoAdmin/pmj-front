<!-- components/AboutSection.vue -->
<!--
  =============================================================================
  COMPONENTE: SOBRE NOSOTROS - Plataforma Municipal de Juventudes Mosquera
  =============================================================================

  PROPÓSITO DEL COMPONENTE:
  → Presentar de forma institucional quiénes somos, qué hacemos y hacia dónde vamos
  → Incluir carrusel automático de mensajes clave con navegación manual
  → Explicar misión, visión 2027 y objetivos estratégicos
  → Mostrar imágenes oficiales reales de actividades juveniles
  → Invitar a la inscripción con botón conectado al modal principal

  CARACTERÍSTICAS TÉCNICAS:
  → Carrusel automático cada 4 segundos con pausa al hover implícita
  → Totalmente responsive
  =============================================================================
-->

<template>
  <!-- =============================================== -->
  <!-- SECCIÓN 1: CARRUSEL + DESCRIPCIÓN PRINCIPAL -->
  <!-- =============================================== -->
  <section class="relative py-16 md:py-24 bg-gradient-to-br from-[#d2ffe2] to-[#F2780C]/5">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        <!-- =============================================== -->
        <!-- CARRUSEL AUTOMÁTICO DE MENSAJES CLAVE -->
        <!-- =============================================== -->
        <div class="relative rounded-3xl overflow-hidden shadow-2xl group">
          <div class="relative h-80 md:h-96 lg:h-[28rem] overflow-hidden">
            <!-- Cada slide con transición de opacidad -->
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="absolute inset-0 transition-opacity duration-1000"
              :class="{
                'opacity-100 z-10': currentSlide === index,
                'opacity-0 z-0': currentSlide !== index,
              }"
            >
              <!-- Fondo con gradiente + contenido -->
              <div
                class="h-full bg-gradient-to-br flex items-center justify-center p-8 relative"
                :class="slide.gradient"
              >
                <div class="text-center text-white z-20">
                  <h3 class="text-2xl md:text-3xl font-black mb-3">
                    {{ slide.title }}
                  </h3>
                  <p class="text-sm md:text-base opacity-90">
                    {{ slide.subtitle }}
                  </p>
                </div>
                <!-- Overlay oscuro inferior para legibilidad -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>

          <!-- =============================================== -->
          <!-- FLECHAS DE NAVEGACIÓN (aparecen al hover) -->
          <!-- =============================================== -->
          <button
            @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100"
            aria-label="Slide anterior"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100"
            aria-label="Slide siguiente"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- =============================================== -->
          <!-- INDICADORES (puntos) -->
          <!-- =============================================== -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full transition-all duration-300 bg-white/60"
              :class="{ 'bg-[#F2780C] w-8': currentSlide === index }"
              :aria-label="'Ir al slide ' + (index + 1)"
            ></button>
          </div>
        </div>

        <!-- =============================================== -->
        <!-- DESCRIPCIÓN DE LA PLATAFORMA -->
        <!-- =============================================== -->
        <div class="space-y-6">
          <!-- Logo YAYA + título -->
          <div class="flex items-center space-x-3">
            <div class="w-16 h-16 bg-gradient-to-br from-[#F2780C] to-[#64278C] rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white font-black text-2xl">YAYA</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-[#038C33]">
              Plataforma Municipal de Juventudes
            </h2>
          </div>
          
          <!-- Párrafo principal -->
          <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
            Somos el <strong class="text-[#038C33]">espacio oficial</strong> para que los jóvenes de Mosquera participen, se capaciten, accedan a oportunidades y construyan juntos un mejor municipio.
          </p>
          
          <!-- Lista de beneficios -->
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Participación en consejos y decisiones del municipio</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>¡Actividades culturales, deportivas, artísticas, ambientales, entre muchas otras!</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-[#F2780C]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Eventos formativos y psicosociales</span>
            </li>
          </ul>
          
          <!-- Botón Conoce más -->
          <NuxtLink
            to="/nosotros"
            class="inline-block px-8 py-3 bg-[#038C33] text-white font-bold rounded-full hover:bg-[#036C2A] transition shadow-lg"
          >
            Conoce más
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- =============================================== -->
  <!-- SECCIÓN 2: ¿QUIÉNES SOMOS? + IDENTIDAD INSTITUCIONAL -->
  <!-- =============================================== -->
  <section class="py-20 md:py-32 bg-gradient-to-b from-[#fff7e3] via-[#fff6dc] to-[#efd9ff] overflow-hidden">
    <div class="container mx-auto px-4">
      
      <!-- Título principal -->
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-6xl font-black bg-clip-text text-[#F2780C] mb-6 animate-fade-up">
          ¿Quiénes Somos?
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed animate-fade-up" style="animation-delay: 0.2s">
          Somos la <strong class="text-[#038C33]">Plataforma Municipal de Juventudes de Mosquera</strong>, un espacio oficial creado para empoderar a los jóvenes de <strong>14 a 28 años</strong> en la construcción de un municipio más justo, participativo y lleno de oportunidades.
        </p>
      </div>

      <!-- Logo + explicación detallada -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
        <!-- Imagen del logo oficial -->
        <div class="animate-fade-up" style="animation-delay: 0.3s">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl group bg-white">
            <img src="/images/logo_pmj.png" alt="Logo oficial PMJ Mosquera" class="w-full h-auto object-contain" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p class="text-white font-bold text-lg">Jóvenes liderando el cambio</p>
            </div>
          </div>
        </div>

        <!-- Preguntas clave -->
        <div class="space-y-8 animate-fade-up" style="animation-delay: 0.4s">
          <div>
            <h3 class="text-2xl md:text-3xl font-black text-[#64278C] mb-4 flex items-center">
              <span class="w-10 h-10 bg-[#64278C] text-white rounded-full flex items-center justify-center mr-3 text-lg">1</span>
              ¿Qué es la Plataforma?
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Somos un <strong>subsistema participativo</strong> creado y regulado por la <strong>Ley 1622 de 2013</strong>. Funcionamos como puente entre los jóvenes y las instituciones.
            </p>
          </div>
          <div>
            <h3 class="text-2xl md:text-3xl font-black text-[#038C33] mb-4 flex items-center">
              <span class="w-10 h-10 bg-[#038C33] text-white rounded-full flex items-center justify-center mr-3 text-lg">2</span>
              ¿A quién representamos?
            </h3>
            <p class="text-gray-600 leading-relaxed">
              A <strong>todos los jóvenes de Mosquera entre 14 y 28 años</strong>, sin importar estrato, ocupación o procedencia.
            </p>
          </div>
          <div>
            <h3 class="text-2xl md:text-3xl font-black text-[#F2780C] mb-4 flex items-center">
              <span class="w-10 h-10 bg-[#F2780C] text-white rounded-full flex items-center justify-center mr-3 text-lg">3</span>
              ¿Cómo funcionamos?
            </h3>
            <p class="text-gray-600 leading-relaxed">
              A través de <strong>mesas temáticas, asambleas, eventos y proyectos</strong>. Con Mesa Directiva elegida democráticamente cada año.
            </p>
          </div>
          <div class="pt-6">
            <NuxtLink
              to="/nosotros"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Conoce más sobre nosotros
              <svg class="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- =============================================== -->
      <!-- MISIÓN / VISIÓN 2027 / OBJETIVOS -->
      <!-- =============================================== -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-[#64278C] via-[#00B140] to-[#F2780C] bg-clip-text text-transparent mb-6 animate-gradient-x">
          Nuestra Identidad
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-medium animate-fade-up" style="animation-delay: 0.2s">
          Conoce lo que nos mueve, hacia dónde vamos y cómo lo lograremos juntos.
        </p>
      </div>

      <!-- Grid de tarjetas identidad -->
      <div class="grid md:grid-cols-3 gap-8">
        
        <!-- TARJETA MISIÓN -->
        <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 animate-fade-up overflow-hidden flex flex-col" style="animation-delay: 0.4s">
          <div class="absolute inset-0 bg-gradient-to-br from-[#64278C]/0 to-[#00B140]/0 group-hover:from-[#64278C]/10 group-hover:to-[#00B140]/10 transition-all duration-700"></div>
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#64278C] to-[#00B140]"></div>
          <div class="relative z-10 p-8 flex-1">
            <div class="w-16 h-16 bg-gradient-to-br from-[#64278C] to-[#00B140] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg class="w-9 h-9 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl md:text-3xl font-black text-[#64278C] mb-5">Misión</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base space-y-3">
              <span class="block font-bold text-[#64278C]">La Plataforma de Juventudes de Mosquera</span> tiene como misión
              <span class="text-[#00B140] font-semibold">promover el encuentro, la articulación, coordinación e interlocución</span> de las juventudes y
              <span class="text-[#64278C] font-semibold">fortalecer la participación</span> de las y los jóvenes del municipio.
            </p>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base mt-4">
              Desde el <span class="font-bold text-[#00B140]">sentido de pertenencia</span>, velarán por la
              <span class="font-bold text-[#64278C]">inclusión e integralidad</span> de las dinámicas juveniles, garantizando
              <span class="font-bold text-[#00B140]">derechos y deberes</span> en pro del
              <span class="font-bold text-[#64278C]">desarrollo territorial</span>.
            </p>
          </div>
          <div class="relative mt-auto overflow-hidden">
            <div class="relative w-full h-64 md:h-72">
              <img src="/images/pmjsofa.png" alt="Jóvenes trabajando juntos en Mosquera" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute bottom-4 left-4 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                Jóvenes liderando el cambio
              </div>
            </div>
          </div>
        </div>

        <!-- TARJETA VISIÓN 2027 -->
        <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 animate-fade-up overflow-hidden flex flex-col" style="animation-delay: 0.5s">
          <div class="absolute inset-0 bg-gradient-to-br from-[#00B140]/0 to-[#F2780C]/0 group-hover:from-[#00B140]/10 group-hover:to-[#F2780C]/10 transition-all duration-700"></div>
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00B140] to-[#F2780C]"></div>
          <div class="relative z-10 p-8 flex-1">
            <div class="w-16 h-16 bg-gradient-to-br from-[#00B140] to-[#F2780C] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
              <svg class="w-9 h-9 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl md:text-3xl font-black text-[#00B140] mb-5">Visión 2027</h3>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base space-y-3">
              A <span class="font-bold text-[#F2780C]">2027</span>, la
              <span class="font-bold text-[#00B140]">Plataforma de Juventudes de Mosquera</span> será
              <span class="text-[#F2780C] font-bold">líder nacional</span> en
              <span class="font-semibold text-[#00B140]">gestión y participación efectiva</span> de las y los jóvenes.
            </p>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base mt-4">
              Seremos un <span class="font-bold text-[#F2780C]">referente en innovación juvenil</span>, con
              <span class="font-bold text-[#00B140]">proyectos de alto impacto</span> que fortalezcan
              <span class="font-bold text-[#F2780C]">inclusión y liderazgo</span>.
            </p>
          </div>
          <div class="relative mt-auto overflow-hidden">
            <div class="relative w-full h-64 md:h-72">
              <img src="/images/pmj1.png" alt="Jóvenes líderes del futuro" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <svg class="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Líderes del futuro
              </div>
            </div>
          </div>
        </div>

        <!-- TARJETA OBJETIVOS -->
        <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 animate-fade-up overflow-hidden flex flex-col" style="animation-delay: 0.6s">
          <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#64278C]/0 group-hover:from-[#F2780C]/10 group-hover:to-[#64278C]/10 transition-all duration-700"></div>
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2780C] to-[#64278C]"></div>
          <div class="relative z-10 p-8 flex-1">
            <div class="w-16 h-16 bg-gradient-to-br from-[#F2780C] to-[#64278C] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg class="w-9 h-9 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-2xl md:text-3xl font-black text-[#F2780C] mb-5">Nuestros Objetivos</h3>
            <ol class="text-gray-700 space-y-3 text-sm md:text-base list-none pl-1">
              <li class="flex items-start"><span class="w-7 h-7 bg-[#F2780C] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">1</span><div><strong class="text-[#F2780C]">Participación juvenil</strong> activa</div></li>
              <li class="flex items-start"><span class="w-7 h-7 bg-[#F2780C] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">2</span><div><strong class="text-[#F2780C]">Articulación</strong> de iniciativas</div></li>
              <li class="flex items-start"><span class="w-7 h-7 bg-[#F2780C] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">3</span><div><strong class="text-[#F2780C]">Formación</strong> continua</div></li>
              <li class="flex items-start"><span class="w-7 h-7 bg-[#F2780C] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">4</span><div><strong class="text-[#F2780C]">Veeduría social</strong></div></li>
              <li class="flex items-start"><span class="w-7 h-7 bg-[#F2780C] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">5</span><div><strong class="text-[#F2780C]">Inclusión</strong> total</div></li>
            </ol>
          </div>
          <div class="relative mt-auto overflow-hidden">
            <div class="relative w-full h-64 md:h-72">
              <img src="/images/pmj3.png" alt="Jóvenes en acción por Mosquera" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#F2780C]/80 via-[#F2780C]/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="text-white text-center transform scale-90 group-hover:scale-100 transition-transform duration-500">
                  <svg class="w-20 h-20 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <p class="text-2xl font-black">¡Lo estamos logrando!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Llamado a la acción final -->
      <div class="text-center mt-20 animate-fade-up" style="animation-delay: 0.8s">
        <p class="text-lg text-gray-600 mb-6">
          <strong>¡Tú eres parte de este cambio!</strong> Inscríbete hoy.
        </p>
        <button
          @click="$emit('open-modal')"
          class="px-10 py-4 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-[#038C33]/50 transform hover:scale-105 transition-all duration-300"
        >
          Inscribirme Ahora
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// =============================================================================
// LÓGICA DEL CARRUSEL AUTOMÁTICO
// =============================================================================
import { ref, onMounted, onUnmounted } from 'vue'

// Estado del slide actual
const currentSlide = ref(0)

// Slides con mensajes
const slides = [
  { title: "Participación Juvenil", subtitle: "Jóvenes liderando el cambio en Mosquera", gradient: "from-[#038C33] to-[#038C33]/80" },
  { title: "Oportunidades", subtitle: "Becas, empleo y emprendimiento", gradient: "from-[#F2780C] to-[#64278C]" },
  { title: "Cultura y Eventos", subtitle: "Vive la energía juvenil", gradient: "from-[#64278C] to-[#038C33]" },
]

// Variables para el intervalo
let interval = null

// Navegación manual
const nextSlide = () => (currentSlide.value = (currentSlide.value + 1) % slides.length)
const prevSlide = () => (currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length)

// Inicia autoplay al montar componente
onMounted(() => {
  interval = setInterval(nextSlide, 4000)
})

// Limpia intervalo al desmontar (evita memory leaks)
onUnmounted(() => clearInterval(interval))

// Emite evento para abrir modal de inscripción
defineEmits(['open-modal'])
</script>

<style scoped>
/* ============================================================================= */
/* ANIMACIÓN: GRADIENTE ANIMADO HORIZONTAL */
/* ============================================================================= */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}
</style>
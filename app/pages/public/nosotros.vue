<!-- pages/nosotros.vue -->
<!--
  PÁGINA: Nosotros - Plataforma Municipal de Juventudes Mosquera
  PROPÓSITO: Presentar la Mesa Directiva 2025, ejes de acción, historia y logros oficiales
  CARACTERÍSTICAS ÉPICAS:
  - Hero full-screen con partículas flotantes y gradiente institucional
  - Mesa Directiva con fotos reales + fallback de iniciales
  - 7 Ejes de Acción con iconos SVG y animaciones individuales
  - CTA final con enlace al inicio
  - Responsive y optimizado para móviles
-->

<template>
  <!-- =============================================== -->
  <!-- CONTENEDOR PRINCIPAL CON FONDO SUAVE -->
  <!-- =============================================== -->
  <div class="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">

    <!-- =============================================== -->
    <!-- 1. HERO - MESA DIRECTIVA 2025 -->
    <!-- =============================================== -->
    <section class="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden 
                    bg-gradient-to-br from-[#64278C] via-[#ba071f] to-[#F2780C]">
    

      <!-- Contenido hero -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Conoce a Tu
          <span class="block text-[#3dda28] drop-shadow-2xl animate-fade-up delay-200">
            Mesa Directiva 2025
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto font-light animate-fade-up delay-400 leading-relaxed">
          Jóvenes líderes electos por ti, para representarte en Mosquera.
        </p>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 2. INTRODUCCIÓN INSTITUCIONAL -->
    <!-- =============================================== -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-6xl font-black text-[#64278C] mb-8 animate-fade-up">
          ¿Quiénes Somos?
        </h2>
        <p class="text-lg md:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed animate-fade-up delay-200">
          Somos la <strong class="text-[#F2780C] font-bold">Plataforma Municipal de Juventudes de Mosquera</strong>, 
          regulada por la <strong class="text-[#038C33] font-bold">Ley 1622 de 2013</strong>. 
          Un espacio de <strong class="text-[#038C33] font-bold">participación, deliberación y acción</strong> 
          para jóvenes de <strong class="text-[#F2780C] font-bold">14 a 28 años</strong> 
          que quieren liderar el cambio en su municipio.
        </p>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 3. MESA DIRECTIVA 2025 - MIEMBROS OFICIALES -->
    <!-- =============================================== -->
    <section class="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <!-- Título con gradiente animado -->
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#64278C] via-[#038C33] to-[#F2780C] 
                     bg-clip-text text-transparent mb-6 animate-gradient-x">
            Mesa Directiva 2025
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto animate-fade-up delay-200">
            Nuestros representantes que trabajan incansablemente por la comunidad juvenil.
          </p>
        </div>

        <!-- Grid de miembros -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <article 
            v-for="(member, index) in team" 
            :key="index"
            class="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
                   transform hover:-translate-y-3 transition-all duration-500 
                   animate-fade-up border border-gray-100"
            :style="{ animationDelay: `${(index + 1) * 150}ms` }"
            role="figure"
            :aria-label="`Miembro de la Mesa Directiva: ${member.name}`"
          >
            <!-- Fondo hover con gradiente -->
            <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 
                        transition-opacity duration-500" :class="member.gradient"></div>

            <!-- Foto o iniciales -->
            <figure class="relative z-10 w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden 
                            shadow-2xl ring-4 ring-white 
                            group-hover:ring-[#F2780C]/60 transition-all duration-500">
              <img 
                v-if="member.photo"
                :src="`/images/Mesa_directiva_2025/${member.photo}`"
                :alt="`Foto oficial de ${member.name}, ${member.role}`"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div 
                v-else 
                class="w-full h-full flex items-center justify-center text-3xl font-black text-white"
                :class="member.gradient"
              >
                {{ member.initials }}
              </div>
            </figure>

            <!-- Información del miembro -->
            <figcaption class="relative z-10 text-center">
              <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-2 
                         group-hover:text-[#038C33] transition-colors duration-300">
                {{ member.name }}
              </h3>
              <p class="text-sm md:text-base font-bold text-[#F2780C] mb-1">
                {{ member.role }}
              </p>
              <p class="text-xs md:text-sm text-gray-600">{{ member.committee }}</p>
              <p class="text-xs md:text-sm text-gray-600">Org. {{ member.org }}</p>
            </figcaption>

            <!-- Efecto brillo al hover -->
            <div class="absolute inset-0 rounded-3xl bg-white opacity-0 
                        group-hover:opacity-100 blur-xl scale-0 group-hover:scale-150 
                        transition-all duration-700 -z-10"></div>
          </article>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 4. EJES DE ACCIÓN - 7 PILARES INSTITUCIONALES -->
    <!-- =============================================== -->
    <section class="py-20 md:py-32 bg-gradient-to-b from-[#f8fff8] to-white">
      <div class="container mx-auto px-4">
        <!-- Título principal -->
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-black 
                     bg-gradient-to-r from-[#64278C] via-[#00B140] to-[#F2780C] 
                     bg-clip-text text-transparent mb-6 animate-gradient-x">
            Descubre Nuestros Ejes de Acción
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-5xl mx-auto font-medium animate-fade-up delay-200">
            Explora una variedad de servicios diseñados especialmente para jóvenes en la Plataforma de Juventudes de Mosquera. 
            Desde orientación profesional hasta actividades recreativas, nuestros ejes están pensados para apoyarte en todas las etapas de tu vida.
          </p>
        </div>

        <!-- Grid de ejes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <!-- EJE SOCIAL -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#64278C]/0 to-[#00B140]/0 
                        group-hover:from-[#64278C]/10 group-hover:to-[#00B140]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#64278C] to-[#00B140]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#64278C] to-[#00B140] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#64278C] mb-4">EJE SOCIAL</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Impulsa la <strong>participación juvenil</strong>, fomenta el <strong>liderazgo</strong> 
                y promueve el <strong>desarrollo comunitario</strong> en el territorio de Mosquera.
              </p>
            </div>
          </div>

          <!-- EJE POLÍTICO -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#64278C]/0 
                        group-hover:from-[#F2780C]/10 group-hover:to-[#64278C]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2780C] to-[#64278C]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#F2780C] to-[#64278C] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3-16h6"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#F2780C] mb-4">EJE POLÍTICO</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Promueve la <strong>participación activa</strong> en la construcción y toma de 
                <strong>decisiones juveniles</strong>.
              </p>
            </div>
          </div>

          <!-- EJE AMBIENTAL -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#00B140]/0 to-[#038C33]/0 
                        group-hover:from-[#00B140]/10 group-hover:to-[#038C33]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00B140] to-[#038C33]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#00B140] to-[#038C33] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 013-1.74"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M20.488 18.5a9 9 0 11-18.978-.001A9 9 0 0120.488 18.5z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#00B140] mb-4">EJE AMBIENTAL</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Promueve la <strong>conciencia ecológica</strong>, el cuidado del entorno 
                y la <strong>participación activa</strong> en la protección ambiental.
              </p>
            </div>
          </div>

          <!-- EJE CULTURAL -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#64278C]/0 
                        group-hover:from-[#F2780C]/10 group-hover:to-[#64278C]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2780C] to-[#64278C]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#F2780C] to-[#64278C] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 01-2-2"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#F2780C] mb-4">EJE CULTURAL</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Fomenta la <strong>identidad cultural</strong>, la expresión artística 
                y la preservación de <strong>tradiciones locales</strong>.
              </p>
            </div>
          </div>

          <!-- EJE DEPORTIVO -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#64278C]/0 to-[#00B140]/0 
                        group-hover:from-[#64278C]/10 group-hover:to-[#00B140]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#64278C] to-[#00B140]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#64278C] to-[#00B140] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M8.5 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM15.5 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM4 12a8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#64278C] mb-4">EJE DEPORTIVO</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Fomenta la <strong>práctica deportiva</strong>, promueve el bienestar 
                y fortalece la <strong>integración juvenil</strong> en Mosquera.
              </p>
            </div>
          </div>

          <!-- EJE EMPRENDEDOR -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#64278C]/0 
                        group-hover:from-[#F2780C]/10 group-hover:to-[#64278C]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F2780C] to-[#64278C]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#F2780C] to-[#64278C] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#F2780C] mb-4">EJE EMPRENDEDOR</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Impulsa la <strong>innovación</strong>, apoya la creación de empresas 
                y fomenta el desarrollo de <strong>habilidades emprendedoras</strong>.
              </p>
            </div>
          </div>

          <!-- EJE EDUCACIONAL -->
          <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl 
                      transform hover:-translate-y-4 transition-all duration-500 
                      overflow-hidden border border-gray-100">
            <div class="absolute inset-0 bg-gradient-to-br from-[#00B140]/0 to-[#038C33]/0 
                        group-hover:from-[#00B140]/10 group-hover:to-[#038C33]/10 
                        transition-all duration-700"></div>
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00B140] to-[#038C33]"></div>
            
            <div class="p-8 text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#00B140] to-[#038C33] 
                          rounded-3xl flex items-center justify-center shadow-2xl 
                          group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <svg class="w-20 h-20 text-white drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253M12 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332-.477-4.5-1.253"/>
                </svg>
              </div>
              <h3 class="text-2xl font-black text-[#00B140] mb-4">EJE EDUCACIONAL</h3>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                Promueve el <strong>acceso a la educación</strong>, el desarrollo de habilidades 
                y la <strong>equidad en oportunidades</strong> para jóvenes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 5. NUESTRA HISTORIA Y LOGROS 2025 -->
    <!-- =============================================== -->
    <section class="py-20 bg-gradient-to-r from-[#64278C] to-[#038C33] text-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Historia -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black mb-8 animate-fade-up">
              Nuestra Historia
            </h2>
            <div class="space-y-6 text-lg leading-relaxed">
              <p class="animate-fade-up delay-200">
                Desde <strong>2013</strong>, con la <strong>Ley 1622</strong>, 
                se reconoce el derecho de los jóvenes a participar activamente.
              </p>
              <p class="animate-fade-up delay-400">
                En <strong>2025</strong>, se elige la <strong>nueva Mesa Directiva</strong> 
                liderada por <strong>Johana Chavarro</strong> como Presidenta reelecta.
              </p>
            </div>
          </div>

          <!-- Logros clave -->
          <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-fade-up delay-500">
            <h3 class="text-2xl font-bold mb-6">Logros Clave 2025</h3>
            <ul class="space-y-4 text-lg">
              <li class="flex items-center space-x-3">
                <svg class="w-7 h-7 text-[#F2780C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>+1.200 seguidores</strong> en Instagram</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="w-7 h-7 text-[#F2780C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>25 millones de pesos</strong> en incentivo económico</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg class="w-7 h-7 text-[#F2780C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>35 Organizaciones Juveniles</strong> activas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <!-- =============================================== -->
    <!-- 6. CTA FINAL - VOLVER AL INICIO -->
    <!-- =============================================== -->
    <section class="py-20 bg-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-black text-[#64278C] mb-6 animate-fade-up">
          ¿Quieres Ser Parte?
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-up delay-200">
          Inscríbe tu <strong class="text-[#F2780C]">Organización Social</strong> 
          y participa en las decisiones de Mosquera.
        </p>
        <NuxtLink 
          to="/" 
          class="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#64278C] to-[#038C33] 
                 text-white font-black text-lg rounded-full shadow-2xl 
                 hover:shadow-[#038C33]/50 transform hover:scale-105 
                 transition-all duration-300 animate-fade-up delay-400 
                 focus:outline-none focus:ring-4 focus:ring-[#038C33]/50"
        >
          Volver al Inicio
          <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" 
                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref } from 'vue'

/* =============================================== */
/* 1. MESA DIRECTIVA 2025 - MIEMBROS OFICIALES */
/* =============================================== */
const team = [
  {
    name: 'Johana Chavarro',
    role: 'Presidenta',
    committee: 'Mesa Directiva',
    initials: 'JC',
    org: 'De Vuelta a la Vida',
    photo: 'Joha.jpeg',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Juan Esteban Parra',
    role: 'Vicepresidente',
    committee: 'Mesa Directiva',
    initials: 'JE',
    org: 'Los Meseros',
    photo: 'juanes.jpg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'David Cantor',
    role: 'Delegado Departamental y Provincial',
    committee: 'Representación',
    initials: 'DC',
    org: 'Hijos del Zipa',
    photo: 'David.jpg',
    gradient: 'bg-gradient-to-br from-[#64278C] to-[#038C33]'
  },
  {
    name: 'Nikhol Puerto',
    role: 'Delegada Provincial',
    committee: 'Representación',
    initials: 'NP',
    org: 'Malas Hierbas',
    photo: 'Nikhol.jpeg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  },
  {
    name: 'Kevin Parra',
    role: 'Comité de Comunicaciones',
    committee: 'Liderazgo',
    initials: 'KP',
    org: 'Comunidad M&F',
    photo: 'kevin.svg',
    gradient: 'bg-gradient-to-br from-[#F2780C] to-[#64278C]'
  },
  {
    name: 'Cristian Grajales',
    role: 'Comité de Ética',
    committee: 'Liderazgo',
    initials: 'CG',
    org: 'Juventud Agrícola Urbana JAU',
    photo: 'Cristian.jpeg',
    gradient: 'bg-gradient-to-br from-[#038C33] to-[#F2780C]'
  }
]

/* =============================================== */
/* 2. POSICIONES DINÁMICAS DE PARTÍCULAS EN HERO */
/* =============================================== */
const particleStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%', delay: '0s' },
    { top: '20%', right: '15%', delay: '1s' },
    { bottom: '15%', left: '20%', delay: '0.5s' },
    { bottom: '25%', right: '10%', delay: '1.5s' },
    { top: '50%', left: '5%', delay: '2s' },
    { top: '40%', right: '5%', delay: '2.5s' }
  ]
  const p = positions[index - 1] || {}
  return {
    top: p.top || 'auto',
    left: p.left || 'auto',
    right: p.right || 'auto',
    bottom: p.bottom || 'auto',
    animationDelay: p.delay || '0s'
  }
}
</script>


<style scoped>
/* =============================================== */
/* ANIMACIONES INSTITUCIONALES 2025 */
/* =============================================== */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(5deg); }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-float { 
  animation: float 6s ease-in-out infinite; 
}

.animate-fade-up { 
  animation: fade-up 0.8s ease-out forwards; 
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
</style>
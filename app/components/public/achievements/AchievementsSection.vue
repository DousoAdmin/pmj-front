<!-- components/AchievementsSection.vue -->
<!--
  =============================================================================
  COMPONENTE: LOGROS - Plataforma Municipal de Juventudes Mosquera
  =============================================================================

  DESCRIPCIÓN:
  → Sección estática que muestra los 4 principales logros juveniles del año 2025
  → Diseño institucional con colores oficiales: #64278C, #038C33, #F2780C
  → Totalmente responsive

  NOTAS TÉCNICAS:
  → Usa clases Tailwind CSS puras → compatible con Nuxt 3 + Tailwind 4
  → Cumple con identidad visual oficial de la PMJ
  =============================================================================
-->

<template>
  <!-- =============================================== -->
  <!-- SECCIÓN PRINCIPAL - FONDO INSTITUCIONAL -->
  <!-- =============================================== -->
  <section class="py-20 md:py-32 bg-gradient-to-b from-[#e6c4ff] via-[#f3e2ff] to-[#e8d9ff] relative overflow-hidden">

    <!-- =============================================== -->
    <!-- CONTENEDOR PRINCIPAL -->
    <!-- =============================================== -->
    <div class="container mx-auto px-4 relative z-10">
      
      <!-- =============================================== -->
      <!-- TÍTULO Y SUBTÍTULO -->
      <!-- =============================================== -->
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-[#64278C] mb-6 animate-fade-up tracking-tight">
          Lo que Hemos Logrado
        </h2>
        <p class="text-lg md:text-xl text-[#64278C]/80 font-medium max-w-4xl mx-auto animate-fade-up" style="animation-delay: 0.2s">
          Resultados reales para la juventud mosqueruna en <strong class="text-[#F2780C]">2025</strong>.
        </p>
      </div>

      <!-- =============================================== -->
      <!-- GRID DE LOGROS - 4 TARJETAS PRINCIPALES -->
      <!-- =============================================== -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- =============================================== -->
        <!-- LOGRO 1: JÓVENES INSCRITOS -->
        <!-- =============================================== -->
        <div class="group relative animate-fade-up" style="animation-delay: 0.1s">
          <div class="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-white/50">
            <!-- Fondo gradiente sutil al hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#038C33]/0 group-hover:from-[#F2780C]/10 group-hover:to-[#038C33]/10 transition-all duration-700 rounded-3xl"></div>
            <!-- Barra superior decorativa -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F2780C] to-[#038C33]"></div>

            <div class="relative z-10 text-center">
              <!-- Círculo con número destacado -->
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F2780C] to-[#038C33] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <span class="text-3xl font-black text-white drop-shadow-lg">+1.200</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-3 group-hover:text-[#F2780C] transition-colors duration-300">
                Jóvenes Inscritos
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                En programas como <strong>Mosquera Pila</strong>.
              </p>
            </div>

            <!-- Efecto de brillo deslizante al hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div class="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        <!-- =============================================== -->
        <!-- LOGRO 2: EVENTOS REALIZADOS -->
        <!-- =============================================== -->
        <div class="group relative animate-fade-up" style="animation-delay: 0.2s">
          <div class="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-white/50">
            <div class="absolute inset-0 bg-gradient-to-br from-[#038C33]/0 to-[#64278C]/0 group-hover:from-[#038C33]/10 group-hover:to-[#64278C]/10 transition-all duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#038C33] to-[#64278C]"></div>

            <div class="relative z-10 text-center">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#038C33] to-[#64278C] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <span class="text-3xl font-black text-white drop-shadow-lg">48</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-3 group-hover:text-[#038C33] transition-colors duration-300">
                Eventos Realizados
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Mesas participativas y talleres en <strong>CDI La Cumbre</strong>.
              </p>
            </div>

            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div class="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        <!-- =============================================== -->
        <!-- LOGRO 3: NUEVA DIRECTIVA -->
        <!-- =============================================== -->
        <div class="group relative animate-fade-up" style="animation-delay: 0.3s">
          <div class="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-white/50">
            <div class="absolute inset-0 bg-gradient-to-br from-[#64278C]/0 to-[#F2780C]/0 group-hover:from-[#64278C]/10 group-hover:to-[#F2780C]/10 transition-all duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#64278C] to-[#F2780C]"></div>

            <div class="relative z-10 text-center">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#64278C] to-[#F2780C] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 p-3">
                <span class="text-lg font-black text-white drop-shadow-lg text-center leading-tight">Nueva Mesa Directiva</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-3 group-hover:text-[#64278C] transition-colors duration-300">
                Directiva 2025
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                <strong>Johana Chavarro</strong> (Presidenta) y equipo.
              </p>
            </div>

            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div class="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        <!-- =============================================== -->
        <!-- LOGRO 4: CONVOCATORIAS ABIERTAS -->
        <!-- =============================================== -->
        <div class="group relative animate-fade-up" style="animation-delay: 0.4s">
          <div class="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 overflow-hidden border border-white/50">
            <div class="absolute inset-0 bg-gradient-to-br from-[#F2780C]/0 to-[#038C33]/0 group-hover:from-[#F2780C]/10 group-hover:to-[#038C33]/10 transition-all duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F2780C] to-[#038C33]"></div>

            <div class="relative z-10 text-center">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F2780C] to-[#038C33] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <svg class="w-12 h-12 text-white drop-shadow-lg animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[#64278C] mb-3 group-hover:text-[#F2780C] transition-colors duration-300">
                Convocatorias Abiertas
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                <strong>Plan de Incentivos</strong>, Mosquera Pila y <strong>Organizaciones</strong>.
              </p>
            </div>

            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div class="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// =============================================================================
// NO SE REQUIERE LÓGICA ADICIONAL
// =============================================================================
</script>

<style scoped>
/* ============================================================================= */
/* ANIMACIÓN OFICIAL: PULSO SUAVE PARA FONDO DECORATIVO */
/* ============================================================================= */
@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse {
  animation: pulse 8s ease-in-out infinite;
}
</style>
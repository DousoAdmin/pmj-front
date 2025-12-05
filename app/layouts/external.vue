<template>  
  <div class="login-layout">
    <div class="login-hero">
      <h1 class="login-title">SUSI</h1>
      <h2 class="login-subtitle">Sistema Unificado de Servicios de la Información</h2>
      <div class="login-illustration">
        <img 
          src="" 
          alt="Ilustración de sistema de ayuda" 
        />
      </div>
    </div>
    <NuxtPage class="login-content" />
  </div>
</template>

<style scoped>
.login-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.login-hero {
  background-color: var(--color-gray-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xl);
}

.login-title {
  font-size: var(--font-bigger);
  font-family: var(--font-main);
  font-weight: 900;
  letter-spacing: 5px;
  color: var(--color-primary);
  margin: 0;
}

.login-subtitle {
  font-size: var(--font-xl);
  font-family: var(--font-main);
  font-weight: 400;
  color: var(--color-gray-400);
  text-align: center;
  max-width: 45%;
  margin: 0;
  line-height: 1.4;
}

.login-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--space-lg);
}

.login-illustration img {
  width: 65%;
  margin: 0 auto;
  height: auto;
}

.login-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
}

@media (max-width: 1024px) {
  .login-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  
  .login-hero {
    padding: var(--space-lg);
    gap: var(--space-sm);
  }
  
  .login-subtitle {
    max-width: 80%;
    font-size: var(--font-lg);
  }
  
  .login-illustration {
    margin-top: var(--space-md);
  }
  
  .login-illustration img {
    width: 50%;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .login-hero {
    padding: var(--space-md);
  }
  
  .login-subtitle {
    max-width: 90%;
    font-size: var(--font-base);
  }
  
  .login-title {
    font-size: var(--font-xxl);
  }
  
  .login-content {
    padding: var(--space-md);
  }
}
</style>
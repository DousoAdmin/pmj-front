import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>('access_token')
  const { authAlert } = useAuth()

  if (!token.value) {
    authAlert.value = {
      title: 'Sesión requerida',
      message: 'Inicia sesión para acceder al dashboard.',
      type: 'info'
    }

    return navigateTo('/private/auth/login')
  }
})

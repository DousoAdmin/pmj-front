export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token').value
  if (!token) {
    const redirectTo = to.fullPath || to.path
    return navigateTo(`/private/auth/login?redirect=${encodeURIComponent(redirectTo)}`)
  }
})

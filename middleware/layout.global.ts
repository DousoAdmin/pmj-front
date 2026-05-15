export default defineNuxtRouteMiddleware((to) => {
  const path = to.path || ''

  if (path === '/private/perfil') {
    return navigateTo('/private/menu-dashboard/perfil', { redirectCode: 301 })
  }

  if (path === '/private/mis-organizaciones') {
    return navigateTo('/private/menu-dashboard/mis-organizaciones', { redirectCode: 301 })
  }

  if (path.startsWith('/private/mis-organizaciones/')) {
    const targetPath = path.replace('/private/mis-organizaciones/', '/private/menu-dashboard/mis-organizaciones/')
    return navigateTo(targetPath, { redirectCode: 301 })
  }

  if (
    path === '/private/dashboard' ||
    path.startsWith('/private/menu-dashboard/')
  ) {
    setPageLayout('dashboard')
    return
  }

  if (path.startsWith('/private/auth/')) {
    setPageLayout('external')
    return
  }

  setPageLayout('default')
})

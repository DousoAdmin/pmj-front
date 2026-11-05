export const useApi = () => {
  const config = useRuntimeConfig()

  // Cookie donde se guarda el JWT autorizado.
  const token = useCookie<string | null>("access_token")

  const request = async <T>(
    endpoint: string,
    options: Record<string, any> = {}
  ): Promise<T> => {
    const { skipAuth = false, ...fetchOptions } = options

    const headers: HeadersInit = {
      ...(fetchOptions.headers || {})
    }

    // Agrega Bearer si el request no es público y hay token disponible.
    if (!skipAuth && token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }

    try {
      return await $fetch<T>(endpoint, {
        baseURL: config.public.apiBase,
        ...fetchOptions,
        headers
      })
    }
    catch (error: any) {
      // Aquí se puede manejar redirección en caso de 401 si se desea.
      throw error
    }
  }

  return {
    // Métodos estándar con autenticación si existe token.
    get: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, {
        method: "GET",
        query
      }),

    post: <T>(endpoint: string, body?: any) =>
      request<T>(endpoint, {
        method: "POST",
        body
      }),

    put: <T>(endpoint: string, body?: any) =>
      request<T>(endpoint, {
        method: "PUT",
        body
      }),

    delete: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, {
        method: "DELETE",
        query
      }),

    // Métodos públicos que no envían autorización.
    publicGet: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, {
        method: "GET",
        query,
        skipAuth: true
      }),

    publicPost: <T>(
      endpoint: string,
      body?: any,
      options: Record<string, any> = {}
    ) =>
      request<T>(endpoint, {
        method: "POST",
        body,
        skipAuth: true,
        ...options
      }),

    publicPut: <T>(
      endpoint: string,
      body?: any,
      options: Record<string, any> = {}
    ) =>
      request<T>(endpoint, {
        method: "PUT",
        body,
        skipAuth: true,
        ...options
      }),

    publicDelete: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, {
        method: "DELETE",
        query,
        skipAuth: true
      })
  }
}
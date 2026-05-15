export const useApi = () => {
  const config = useRuntimeConfig()

  const request = async <T>(
    endpoint: string,
    options: Record<string, any> = {}
  ): Promise<T> => {
    return await $fetch<T>(endpoint, {
      baseURL: config.public.apiBase,
      ...options
    })
  }

  return {
    get: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, { method: 'GET', query }),

    post: <T>(endpoint: string, body?: Record<string, any>) =>
      request<T>(endpoint, { method: 'POST', body }),

    put: <T>(endpoint: string, body?: Record<string, any>) =>
      request<T>(endpoint, { method: 'PUT', body }),

    delete: <T>(endpoint: string, query?: Record<string, any>) =>
      request<T>(endpoint, { method: 'DELETE', query })
  }
}
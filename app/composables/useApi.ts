export function useApi() {
  const { public: { apiBase } } = useRuntimeConfig()

  function get<T>(path: string, opts?: Parameters<typeof $fetch>[1]) {
    return $fetch<T>(path, { baseURL: apiBase, method: 'GET', ...opts })
  }

  function post<T>(path: string, body: unknown, opts?: Parameters<typeof $fetch>[1]) {
    return $fetch<T>(path, { baseURL: apiBase, method: 'POST', body, ...opts })
  }

  function put<T>(path: string, body: unknown, opts?: Parameters<typeof $fetch>[1]) {
    return $fetch<T>(path, { baseURL: apiBase, method: 'PUT', body, ...opts })
  }

  function patch<T>(path: string, body?: unknown, opts?: Parameters<typeof $fetch>[1]) {
    return $fetch<T>(path, { baseURL: apiBase, method: 'PATCH', body, ...opts })
  }

  function del<T>(path: string, opts?: Parameters<typeof $fetch>[1]) {
    return $fetch<T>(path, { baseURL: apiBase, method: 'DELETE', ...opts })
  }

  return { get, post, put, patch, del }
}

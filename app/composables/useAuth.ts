export const useAuth = () => {

    const api = useApi()

    // Guardamos token y usuario en cookies para mantener sesión en el cliente.
    const token = useCookie<string | null>("access_token", { maxAge: 60 * 60 * 24 * 7 })
    const userCookie = useCookie<any>("user", { maxAge: 60 * 60 * 24 * 7 })
    const userState = useState<any>("auth-user", () => null)
    const authAlert = useState<{ title: string; message: string; type: 'info' | 'success' | 'error' } | null>('auth-alert', () => null)
    const isLoading = useState<boolean>('auth-loading', () => false)
    const loadingMessage = useState<string>('auth-loading-message', () => 'Procesando')

    const user = computed({
        get: () => userCookie.value ?? userState.value,
        set: (value) => {
            userCookie.value = value
            userState.value = value
        }
    })

    const login = async (
        username: string,
        password: string
    ) => {
        const body = new URLSearchParams()
        body.append('username', username)
        body.append('password', password)

        const response = await api.publicPost<any>(
            "/auth/login",
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        // Extrae el token y el usuario de la respuesta.
        const accessToken = response?.access_token ?? response?.data?.access_token ?? response?.token
        const rawUser = response?.user ?? response?.data?.user ?? response?.data ?? response
        const respUser = rawUser && typeof rawUser === 'object' && rawUser !== null
            ? {
                id: rawUser.id ?? rawUser.user_id ?? rawUser.id_user ?? null,
                username: rawUser.username ?? rawUser.user_name ?? rawUser.email ?? rawUser.name ?? null,
            }
            : { username: String(rawUser ?? '') }

        if (!accessToken) {
            throw new Error('No access token in login response')
        }

        token.value = accessToken
        user.value = respUser

        return response
    }

    const setLoading = (value: boolean, message = 'Procesando') => {
        isLoading.value = value
        loadingMessage.value = message
    }

    const logout = async () => {
        setLoading(true, 'Cerrando sesión')

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            token.value = null
            user.value = null
            authAlert.value = {
                title: 'Sesión cerrada',
                message: 'Tu sesión ha finalizado. Inicia sesión nuevamente para continuar.',
                type: 'info'
            }
            await navigateTo('/private/auth/login')
        } finally {
            setLoading(false)
        }
    }

    return {
        token,
        user,
        login,
        logout,
        authAlert,
        isLoading,
        loadingMessage,
        setLoading
    }

}
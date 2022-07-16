import { useAuthStore } from '@/stores/auth'

export const Auth = ( next) => {
    const authStore = useAuthStore()
    if (authStore.isAuth) return true
    next({ name: 'login' })
}

export const Guest = (next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuth) return true
    next({name: 'home'})
}

export const Verified = (next) => {
    const authStore = useAuthStore()
    if (authStore.isVerified) return true
    next({name: 'verifyEmail'})
}

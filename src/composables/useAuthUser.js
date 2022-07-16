import { useAuthStore } from '../stores/auth'
import { computed } from 'vue'

export default function (){
    const authStore = useAuthStore()
    return computed(() => authStore.user)
}
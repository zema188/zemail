import { defineStore } from "pinia";
import Cookies from 'js-cookie';

export const useUser = defineStore('user', () => {
    const user = ref({})
    const router = useRouter()

    async function logOut() {

        const { data } = await useFetch('/api/auth/logOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if(data.value) {
            Cookies.remove('sessionToken')
            router.push('/login')
        }
    }

    return { user, logOut}
})
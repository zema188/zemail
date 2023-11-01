import { defineStore } from "pinia";
import Cookies from 'js-cookie';

export const useUser = defineStore('user', () => {
    const user = ref({})
    const router = useRouter()

    async function logOut() {
        try {
            const { data } = await useFetch('/api/auth/logOut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            if(data.value) {
                Cookies.remove('sessionToken')
                clearUserInfo()
                router.push('/login')
            }

        } catch(err) {
            console.error(err)
        }
    }

    async function getUserInfo() {
        try {
            const { data } = await useFetch('/api/user/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(data.value) {
                if(data.value.user) {
                    user.value = {...data.value.user}
                }
            }
        } catch(err) {
            console.error(err)
        }

    }

    function clearUserInfo() {
        user.value = {}
    }

    return { user, logOut, getUserInfo}
})
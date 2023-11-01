import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware( async (to, from) => {
    const token = useCookie('sessionToken')
    if (!token.value) {
        if (to.name === "signup" || to.name === "login") {
            return
        }
        return navigateTo('/login')
    } else {
        try {
            const { data } = await useFetch('/api/auth/verificationSessionToken', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
            
            if(data.value.token) {
                if(data.value.token === "valid token") {
                    if (to.name === "signup" || to.name === "login") {
                        return navigateTo('/')
                    } else {
                        return
                    }
                }

                if(data.value.token === "invalid token") {
                    console.log('test')
                    Cookies.remove('sessionToken')
                    return navigateTo('/login')
                }
            }
        } catch(err) {
            console.error(err)
        }

    }
})

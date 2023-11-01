<template>
    <div>
        <h1>главная страница</h1>
        <v-btn
            variant="tonal"
            @click="logOut()"
        >
            Выйти
        </v-btn>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
})

import { useUser } from '~/stores/user'
const userStore = useUser()
const router = useRouter()


const logOut = async() => {
    try {
        userStore.logOut()
    } catch(error) {
        console.error(error)
    }
}
</script>

<style lang="scss">

</style>
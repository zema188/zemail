<template>
    <div>
        <h1>главная страница</h1>
        <v-btn
            variant="tonal"
            @click="signOut()"
        >
            Выйти
        </v-btn>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
})

const client = useSupabaseClient()
const router = useRouter()
const signOut = async() => {
    try {
    const { error } = await client.auth.signOut()
    if(error) throw error
    router.push('/login')
    } catch(error) {
        console.error(error)
    }
}
</script>

<style lang="scss">

</style>
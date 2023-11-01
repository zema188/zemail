<script setup>
import { useUser } from '~/stores/user'
const userStore = useUser()

const logOut = async() => {
    try {
        const response = await userStore.logOut()
    } catch(error) {
        console.error(error)
    }
}
userStore.getUserInfo()

</script>

<template>
    <header class="header-w">
        <div class="header container">
            <p>
                {{ userStore.user.name }}
            </p>
            <v-btn
                variant="tonal"
                @click="logOut()"
            >
                Выйти
            </v-btn>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header-w {
    border-bottom: 1px solid #000;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px;
}
</style>
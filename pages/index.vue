<script setup>
definePageMeta({
    middleware: ["auth"],
})

import { useUser } from '~/stores/user'
const userStore = useUser()

</script>

<template>
    <div>
        <nuxt-layout name="default">
            <h1>главная страница</h1>
            <nuxt-link to="/me">me</nuxt-link>
            <nuxt-link to="/login">login</nuxt-link>
        </nuxt-layout>
    </div>
</template>

<style lang="scss">

</style>
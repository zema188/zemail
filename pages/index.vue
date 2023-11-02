<script setup>
definePageMeta({
    middleware: ["auth"],
})
</script>

<template>
    <div>
        <nuxt-layout name="default">
            <h1>главная страница</h1>
            <nuxt-link to="/me">me</nuxt-link>
        </nuxt-layout>
    </div>
</template>

<style lang="scss">

</style>
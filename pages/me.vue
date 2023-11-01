<script setup>
definePageMeta({
    middleware: ["auth"],
})

</script>

<template>
    <div>
        <nuxt-layout name="default">
            <h1>моя страница</h1>
            <nuxt-link to="/">index</nuxt-link>
        </nuxt-layout>
    </div>
</template>

<style lang="scss">

</style>
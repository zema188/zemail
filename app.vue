<template>
  <div>
    <NuxtPage></NuxtPage>
    <alerts-list/>
  </div>
</template>

<script setup>
import { useUser } from '~/stores/user'
const userStore = useUser()

import AlertsList from './components/AlertsList.vue';


</script>


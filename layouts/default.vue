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
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            :prepend-avatar="userStore.user.avatar"
            :title="userStore.user.name"
            :subtitle="userStore.user.login"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account" title="Профиль" value="Профиль" :to="'/me'"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Главная" value="Главная" :to="'/'"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Выйти" value="Выйти" @click="logOut"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <main class="container">
          <slot/>
        </main>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>
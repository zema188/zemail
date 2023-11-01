<template>
  <div class="auth-form-w">
    <v-form v-model="valid" :class="['auth-form']">
      <div class="auth-form__title">
        Регистрация
      </div>
      <v-text-field
        v-model="login"
        :rules="nameRules"
        label="Логин"
        required
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Имя"
        required
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        required
      ></v-text-field>
      <div class="auth-form__footer">
        <v-btn
            variant="tonal"
            @click="signUp()"
        >
            Зарегистрироваться
        </v-btn>
        <NuxtLink to="/login" class="auth-form__link">
            Авторизоваться
        </NuxtLink>
      </div>
    </v-form>
  </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
})
import { useAlerts } from '~/stores/alerts'
const alertsStore = useAlerts() 
const router = useRouter()
let valid = ref(false)
let login = ref('zemail')
let name = ref('Артем')
let nameRules = [
    value => {
      if (value) return true

      return 'Логин обязательно'
    },
]
let password = ref('123')
let passwordRules = [
    value => {
      if (value) return true

      return 'Пароль обязателен'
    },
    value => {
      if (value.length >= 5) return true

      return 'Пароль должен быть больше 5 символов'
    },
]
const signUp = async () => {
    try {
      const { data } = await useFetch('/api/auth/sigUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            login: login.value,
            password: password.value,
            name: name.value,
          }
        ),
      })
      if(data.value.error) {
        const error = data.value.error
        alertsStore.addAlert(error, 'error')
        throw error
      } 
      if(data.value.user) {
        router.push('/')
        alertsStore.addAlert('Регистрация прошла успешно!', 'success')
      } 
    } catch(error) {
        console.error(error)
    }

}
const user = useSupabaseUser()
onMounted(() => {
    if(user.value) {
        navigateTo('/')
    }
})
    
</script>

<style lang="scss">

</style>
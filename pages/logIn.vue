<template>
  <div class="auth-form-w">
    <v-form :class="['auth-form']">
      <div class="auth-form__title">
        Авторизация
      </div>
      <v-text-field
        v-model="login"
        :rules="loginRules"
        label="Логин"
        required
        class="mb-2"
        @keydown.enter="signIn()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        required
        type="password"
        @keydown.enter="signIn()"
      ></v-text-field>
      <div class="auth-form__footer">
        <v-btn
          variant="tonal"
          @click="signIn()"
          :disabled="toggleDisabledSaveBtn"
        >
            Войти
        </v-btn>
        <NuxtLink to="/signup" class="auth-form__link">
            Зарегистрироваться
        </NuxtLink>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { useAlerts } from '~/stores/alerts'

definePageMeta({
  middleware: ["auth"],
})

const alertsStore = useAlerts() 
const router = useRouter()

let login = ref('zemail')
let loginRules = [
    value => {
    if (value) return true
      return 'Логин обязателен'
    }

]

let password = ref('123')
let passwordRules = [
    value => {
    if (value) return true

    return 'Пароль обязателен'
    }
]

const signIn = async () => {
  if(!(login.value && password.value)) return
  try {
      const { data } = await useFetch('/api/auth/sigIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            login: login.value,
            password: password.value,
          }
        ),
      })
      if(data.value.error) {
        const error = data.value.error
        alertsStore.addAlert(error, 'error')
        throw error
      } 
      if(data.value.user) {
        if(Cookies.get('sessionToken')) {
          router.push('/')
          alertsStore.addAlert('Вы успешно вошли!', 'success')
        }
      } 
    } catch(error) {
        console.error(error)
    }
}

const toggleDisabledSaveBtn = computed(() => {
  return !(login.value && password.value)
})
</script>

<style lang="scss">

</style>
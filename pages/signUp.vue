<template>
  <div class="auth-form-w">
    <v-form :class="['auth-form']">
      <div class="auth-form__title">
        Регистрация
      </div>
      <v-text-field
        v-model="login"
        :rules="loginRules"
        label="Логин"
        required
        class="mb-2"
        @keydown.enter="signUp()"
      ></v-text-field>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Имя"
        required
        class="mb-2"
        @keydown.enter="signUp()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        required
        type="password"
        @keydown.enter="signUp()"
      ></v-text-field>
      <div class="auth-form__footer">
        <v-btn
            variant="tonal"
            @click="signUp()"
            :disabled="toggleDisabledSaveBtn"
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
import { useAlerts } from '~/stores/alerts'

definePageMeta({
    middleware: ["auth"],
})

const alertsStore = useAlerts() 
const router = useRouter()

let login = ref('zemail')
let name = ref('Артем')

let loginRules = [
    value => {
    if (value) return true
      return 'Логин обязателен'
    }
]

let nameRules = [
    value => {
    if (value) return true
      return 'Имя обязателено'
    }
]

let password = ref('123')
let passwordRules = [
    value => {
    if (value) return true
      return 'Пароль обязателен'
    }
]

const signUp = async () => {
  if(!(login.value && password.value && name.value)) return
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

const toggleDisabledSaveBtn = computed(() => {
  return !(login.value && password.value && name.value)
})
  
</script>

<style lang="scss">

</style>
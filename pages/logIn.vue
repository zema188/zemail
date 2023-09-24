<template>
  <div class="auth-form-w">
    <v-form v-model="valid" :class="['auth-form']">
      <div class="auth-form__title">
        Авторизация
      </div>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
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
        <v-alert v-show="errorMessage" :text="errorMessage" type="error"></v-alert>
        <v-btn
          variant="tonal"
          @click="signIn()"
        >
            Войти
        </v-btn>
        <NuxtLink to="/signUp" class="auth-form__link">
            Зарегистрироваться
        </NuxtLink>
      </div>
    </v-form>
  </div>
</template>

<script setup>
let valid = ref(false)
let errorMessage = ref('')
let email = ref('artem.zimin02@gmail.com')
let emailRules = [
    value => {
    if (value) return true

    return 'Почта обязательна'
    },

    value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'Введите действительную почту'
    },
]

let password = ref('123123')
let passwordRules = [
    value => {
    if (value) return true

    return 'Пароль обязателен'
    }
]
const client = useSupabaseClient()
const router = useRouter()
const signIn = async () => {
    try {
      console.log(valid.value)
      if(!valid.value) return
        const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if(error) {
      errorMessage.value = 'Неправильный логин или пароль'
      throw error
    }
    router.push('/')
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
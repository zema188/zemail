<template>
  <div class="auth-form-w">
    <v-form v-model="valid" :class="['auth-form']">
      <div class="auth-form__title">
        Регистрация
      </div>
      <v-text-field
        v-model="firstname"
        :rules="nameRules"
        label="Имя"
        required
        class="mb-2"
      ></v-text-field>
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
            @click="signUpWithEmail()"
        >
            Зарегистрироваться
        </v-btn>
        <NuxtLink to="/logIn" class="auth-form__link">
            Авторизоваться
        </NuxtLink>
      </div>
    </v-form>
  </div>
</template>

<script setup>
    let valid = ref(false)
    let errorMessage = ref('')
    let firstname = ref('Артем')
    let nameRules = [
        value => {
        if (value) return true

        return 'Имя обязательно'
        },
    ]
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

        },
        value => {
        if (value.length >= 5) return true

        return 'Пароль должен быть больше 5 символов'
        },
    ]
    const client = useSupabaseClient()
    const signUpWithEmail = async () => {
        try {
            if(!valid.value) return
            const { data, error } = await client.auth.signUp({
              email: email.value,
              password: password.value,
            })
            errorMessage.value = ''
            if(error) {
              errorMessage.value = 'Почта уже используется'
              throw error
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
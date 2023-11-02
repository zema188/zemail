<script setup>
import { useUser } from '~/stores/user'
import { useAlerts } from '~/stores/alerts'
import saveIcon from '/assets/images/icons/save-icon.svg'
import deleteIcon from '/assets/images/icons/delete-icon.svg'
const userStore = useUser()
const alertsStore = useAlerts() 

definePageMeta({
    middleware: ["auth"],
})


let loadingSave = ref(true)
let fileAvatar = ref(null)
let showDeleteAvatarBtn = ref(false)
let showSaveAvatarBtn = ref(false)

const changeAvatar = (event) => {
    try {
        fileAvatar.value = event.target.files[0]
        const srcIgame = URL.createObjectURL(event.target.files[0])
        userStore.user.avatar = srcIgame
        showSaveAvatarBtn.value = true
    } catch (err) {
        console.log(err)
    }

}

const saveNewAvatar = async () => {
    console.log(({file: fileAvatar.value}))
    try {
        const formData = new FormData();
        formData.append('file', fileAvatar.value);
        const { data } = await useFetch('/api/saveFile', {
            method: 'POST',
            body: formData
        })

        if(data.value) {
            if (data.value.fileId) {
                showSaveAvatarBtn.value = false
                const imageId = data.value.fileId
                userStore.user.avatar = `uploads/${imageId}`

                const response = await userStore.putUser({avatar: imageId})
                if(response) {
                    alertsStore.addAlert('Фото изменено', 'success')
                }
            }
            if (data.value.error) {
                alertsStore.addAlert(data.value.error, 'error')
                throw new Error
            }
        }

    } catch(err) {
        showSaveAvatarBtn.value = false
        console.log(err)
    }
}

const putUser = async () => {
    loadingSave.value = false
    const data = await userStore.putUser()
    if(data === 'Данные изменены') {

    } else {

    }
    loadingSave.value = true
}

</script>

<template>
    <div>
        <nuxt-layout name="default">
            <h1 class="me__title w-25 a-center">Профиль</h1>
            <div class="me">
                <div class="me__avatar-w">
                    <label class="me__avatar">
                        <input type="file"
                            @change="((event) => changeAvatar(event))"
                        >
                        <v-avatar :image="userStore.user.avatar" size="150"></v-avatar>
                    </label>
                    <img class="save-icon" :src="saveIcon" v-if="showSaveAvatarBtn" @click="saveNewAvatar()">
                    <img class="delete-icon" :src="deleteIcon" v-if="showDeleteAvatarBtn">
                </div>
                <v-text-field
                    v-model="userStore.user.name"
                    :rules="nameRules"
                    label="Имя"
                    required
                    class="mb-2 w-25"
                    @input="loadingSave = false"
                ></v-text-field>
                <v-btn
                    :disabled="loadingSave"
                    @click="putUser()"
                    class="w-25"
                >
                    Сохранить
                    <template v-slot:loader>
                        <v-progress-linear indeterminate></v-progress-linear>
                    </template>
                </v-btn>
            </div>
        </nuxt-layout>
    </div>
</template>

<style lang="scss">
.me {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__title {
        text-align: center;
    }
    &__avatar-w {
        width: 25%;
        display: flex;
        justify-content: center;
        position: relative;
        & .save-icon {
            width: 40px;
            position: absolute;
            right: 50px;
            cursor: pointer;
            bottom: 0;
        }
        & .delete-icon {
            width: 30px;
            position: absolute;
            right: 56px;
            top: 0;
            cursor: pointer;
        }
    }
    &__avatar {
        width: fit-content;
        cursor: pointer;
        & input {
            display: none;
        }

    }
}
</style>
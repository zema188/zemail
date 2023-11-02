<script setup>
import { useUser } from '~/stores/user'
import { useAlerts } from '~/stores/alerts'
import saveIcon from '/assets/images/icons/save-icon.svg'
import deleteIcon from '/assets/images/icons/delete-icon.svg'
import closeIcon from '/assets/images/icons/close-icon.svg'

const userStore = useUser()
const alertsStore = useAlerts() 

definePageMeta({
    middleware: ["auth"],
})


let loadingSave = ref(true)
let fileAvatar = ref(null)
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
                    fileAvatar.value = null
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

const deleteAvatar = async () => {
    try {
        const { data } = await useFetch('/api/deleteFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    filePath: userStore.user.avatar
                }
            ),
        })

        if (data.value.sucsess) {
            const response = await userStore.putUser({avatar: 'default'})
            if(response) {
                alertsStore.addAlert('Фото удаленно', 'success')
                userStore.user.avatar = "uploads/avatar-default.svg"
            }
        }
    } catch(err) {
        console.error(err)
    }
}

const putUser = async () => {
    if(loadingSave.value) return
    loadingSave.value = false
    try {
        const data = await userStore.putUser()
        console.log('test', data)
        if(data === true) {
            alertsStore.addAlert('Данные изменены', 'success')
        } else {
            throw new Error
        }
    } catch(err) {
        alertsStore.addAlert('Произошла ошибка, повторите попыпку!', 'error')
        console.error(err)
    }

    loadingSave.value = true
}

const closeAvatar = () => {
    userStore.user.avatar = `uploads/avatar-default.svg`
    fileAvatar.value = null
    showSaveAvatarBtn.value = false

}

const deleteBtnIsShow = computed(() => {
    return (userStore.user.avatar !== 'uploads/avatar-default.svg' && !fileAvatar.value)
})

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
                    <img class="delete-icon" :src="deleteIcon" v-if="deleteBtnIsShow" @click="deleteAvatar">
                    <img class="close-icon" :src="closeIcon" v-if="fileAvatar" @click="closeAvatar">
                </div>
                <v-text-field
                    v-model="userStore.user.name"
                    :rules="nameRules"
                    label="Имя"
                    required
                    class="mb-2 w-25"
                    @input="loadingSave = false"
                    @keydown.enter="putUser()"
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
        &:hover {
            & .delete-icon {
                display: block;
            }
        }
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
            display: none;
        }
        & .close-icon {
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
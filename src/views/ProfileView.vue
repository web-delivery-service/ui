<template>
    <section>
            <h2 class="profile-title">Данные пользователя</h2>
            <v-form fast-fail class="profile-form" @submit.prevent="updateProfile">
                <div v-if="user">Роль: <span style="font-weight: bold;">{{ user.role }}</span></div>
                <v-text-field v-model="profileData.email" label="Email"></v-text-field>
                <v-text-field v-model="profileData.name" label="Имя"></v-text-field>
                <v-text-field v-model="profileData.address" label="Адрес"></v-text-field>

                <v-btn :disabled="!isUpdated" color="green" type="submit">Сохранить</v-btn>
            </v-form>

            <div class="profile-logout">
                <v-btn @click="logout" color="red" variant="outlined">Выйти</v-btn>
            </div>
    </section>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { ref, reactive, watch, onMounted } from 'vue';

    import { useUserStore } from '../store/modules/user';
    import type { IProfile } from '../interfaces/ProfileInterface';
    import router from '../router';

    const isUpdated = ref(false);

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const profileData = reactive({
        email: null,
        name: null,
        address: null
    })

    watch(profileData, () => {
        isUpdated.value = true;
    })

    onMounted(async () => {
        await userStore.getCurrentUser().then(() => {
            profileData.email = user.value.email;
            profileData.name = user.value.name;
            profileData.address = user.value.address;
        }); 
        isUpdated.value = false;
    })

    const updateProfile = async () => {
        await userStore.updateProfile(profileData).then(() => {
            isUpdated.value = false;
        });
    }

    const logout = async () => {
        await userStore.logoutUser().then(() => {
            router.push({ name: 'Catalog' });
        });
    }

</script>

<style scoped>

    .profile-title {
        text-align: center;
        margin: 30px;
    }

    .profile-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 400px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 20px;
    }

    .profile-logout {
        text-align: center;
        margin-top: 30px;
    }

</style>
<template>
    <div class="admin-login-form-wrapper">
        <v-sheet class="mx-auto" width="300">
            <v-form v-model="form" fast-fail @submit.prevent="loginUser">
                <v-text-field
                    v-model="loginUserForm.email"
                    :rules="fieldRules"
                    label="Email"
                ></v-text-field>

                <v-text-field
                    v-model="loginUserForm.password"
                    :rules="fieldRules"
                    label="Password"
                    type="password"
                ></v-text-field>

                <v-btn color="yellow" class="mt-2" type="submit" block>Войти</v-btn>
                <v-btn color="black" variant="text" class="mt-2" :to="{ name: 'Register' }" block>Создать аккаунт</v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { fieldRules } from '../../utils/rules';
    import { useUserStore } from '../../store/modules/user';
    import type { ILoginUser } from '../../interfaces/AuthInterface';

    import router from '../../router';

    const userStore = useUserStore();
    const loginUserForm = ref<ILoginUser>({ email: '', password: '' });

    const form = ref(false);

    const loginUser = async () => {
        await userStore.loginUser(loginUserForm.value).then(() => {
            router.push({ name: 'Home' });
        })
    }

</script>

<style scoped>

</style>
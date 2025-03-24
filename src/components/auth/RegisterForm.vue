<template>
    <div class="admin-login-form-wrapper">
        <v-sheet class="mx-auto" width="300">
            <v-form v-model="form" fast-fail @submit.prevent="registerUser">
                <v-text-field
                    v-model="registerUserForm.email"
                    :rules="fieldRules"
                    label="Email"
                ></v-text-field>

                <v-text-field
                    v-model="registerUserForm.password"
                    :rules="fieldRules"
                    label="Password"
                    type="password"
                ></v-text-field>

                <v-btn color="yellow" class="mt-2" type="submit" block>Зарегестрироваться</v-btn>
                <v-btn color="black" variant="text" class="mt-2" :to="{ name: 'Login' }" block>Уже есть аккаунт</v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { fieldRules } from '../../utils/rules';
    import { useUserStore } from '../../store/modules/user';
    import type { IRegisterUser } from '../../interfaces/AuthInterface';

    import router from '../../router';

    const userStore = useUserStore();
    const registerUserForm = ref<IRegisterUser>({ email: '', password: '' });

    const form = ref(false);

    const registerUser = async () => {
        await userStore.registerUser(registerUserForm.value).then(() => {
            router.push({ name: 'Home' });
        });
    }

</script>

<style scoped>

</style>
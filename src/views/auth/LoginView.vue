<template>
    <div class="admin-login-wrapper">
        <div class="admin-login-content">
            <div class="admin-login-title">
                <h1>Войти в систему</h1>
            </div>
            <div class="admin-login-block">
                <LoginForm></LoginForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import LoginForm from '../../components/auth/LoginForm.vue';
</script>

<style scoped>
    .admin-login-content {
        display: flex;
        height: 100vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .back-btn {
        position: fixed;
        top: 20px;
        left: 20px;
    }
</style>
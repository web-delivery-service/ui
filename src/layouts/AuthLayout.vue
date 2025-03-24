<template>
    <Header></Header>
    
    <v-main style="height: 100vh">
        <router-view></router-view>
    </v-main>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    import Header from '../components/auth/Header.vue';
    import router from '../router';
    
    onMounted(() => {
        router.push({ name: 'Login' });
    })
</script>

<style scoped>

</style>
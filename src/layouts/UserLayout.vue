<template>
    <Header></Header>
    
    <section class="content-wrapper">
        <v-main class="main-wrapper" style="height: 100%; padding-top: 72px;">
            <router-view></router-view>
        </v-main>
    </section>
    
</template>

<script setup lang="ts">

    import { onMounted } from 'vue';
    import { useUserStore } from '../store/modules/user';
    import { useCartStore } from '../store/modules/cart';

    import router from '../router';

    import Header from '../components/Header.vue';

    const userStore = useUserStore();
    const cartStore = useCartStore();

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            cartStore.getCart();
            if (router.currentRoute.value.name === 'Login' || router.currentRoute.value.name === 'Register' || router.currentRoute.value.name === 'Home') {
                router.push({ name: 'Catalog' });
            }
        });
    })
    
</script>

<style scoped>

    .content-wrapper {
        padding: 0 100px;
    }

    .main-wrapper {
        min-height: 100vh;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }

</style>
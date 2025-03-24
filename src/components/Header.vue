<template>
    <header class="header" style="background-color: white;">
        <div>
            <img src="../../../public/logo.png" width="44" alt="logo">
        </div>
        <div>
            <h1 style="opacity: 0.9;">DELIVERY SERVICE</h1>
        </div>

        <div class="header-actions-auth" v-if="user">
            <div>
                <v-btn icon="mdi-cart" variant="text" @click="openCart"></v-btn>
            </div>
            <div>
                <v-btn icon="mdi-account" variant="text" :to="{ name: 'Profile' }"></v-btn>
            </div>
        </div>
        <div class="header-actions-guest" v-else>
            <div>
                <v-btn icon="mdi-login" variant="text" :to="{ name: 'Login' }"></v-btn>
            </div>
        </div>

        <CartDrawer :drawer="drawer"></CartDrawer>
    </header>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useUserStore } from '../store/modules/user';
    import CartDrawer from './cart/CartDrawer.vue';


    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const drawer = ref(false);

    const openCart = () => {
        drawer.value = !drawer.value;
    }
    
</script>

<style scoped>

    .header {
        position: fixed;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        width: 100%;
        padding: 10px 20px;
        font-family: 'Courier New', Courier, monospace;
        display: flex;
        gap: 20px;
    }

    .header-actions-auth, .header-actions-guest {
        margin-left: auto;
        display: flex;
        gap: 10px;
    }

</style>
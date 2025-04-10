<template>
    <header class="header" style="background-color: white; z-index: 100;">
        <div @click="goHome">
            <img style="cursor: pointer;" src="/logo.png" width="44" alt="logo">
        </div>
        <div style="display: flex; gap: 20px;">
            <h1 style="opacity: 0.9;">DELIVERY SERVICE</h1>
            <v-btn class="header-catalog-btn" size="large" variant="outlined" color="green" :to="{ name: 'Catalog' }">Каталог</v-btn>
        </div>

        <div class="header-actions-auth" v-if="user">
            <div style="position: relative;">
                <v-btn icon="mdi-truck-delivery" variant="text" :to="{ name: 'UserOrders' }"></v-btn>
                <span v-show="orders.length > 0" class="order-quantity">{{ orders.length }}</span>
            </div>
            <div style="position: relative;">
                <v-btn icon="mdi-cart" variant="text" :to="{ name: 'Cart' }"></v-btn>
                <span v-show="cartQuantity > 0" class="cart-quantity">{{ cartQuantity }}</span>
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
    </header>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    
    import { storeToRefs } from 'pinia';

    import { useUserStore } from '../store/modules/user';
    import { useCartStore } from '../store/modules/cart';
    import { useOrderStore } from '../store/modules/order';

    import router from '../router';


    const userStore = useUserStore();
    const cartStore = useCartStore();
    const orderStore = useOrderStore();

    const { user } = storeToRefs(userStore);
    const { cartQuantity } = storeToRefs(cartStore);
    const { orders } = storeToRefs(orderStore);

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            cartStore.getCart().then(() => {
                orderStore.getOrdersByUserId();
            });
        });
    })

    const goHome = () => {
        router.push({ name: 'Catalog' });
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

    .header-catalog-btn {
        margin-top: 3px;
        font-weight: bold;
        font-size: 20px;
    }

    .cart-quantity {
        display: inline-block;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 2px 7px;
        font-size: 12px;
        position: absolute;
        top: 0px;
        left: 30px;
        font-weight: bold;
    }

    .order-quantity {
        display: inline-block;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 2px 7px;
        font-size: 12px;
        position: absolute;
        top: 0px;
        left: 30px;
        font-weight: bold;
    }

</style>
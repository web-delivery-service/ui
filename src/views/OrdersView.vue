<template>
    <section>
        <h1 class="order-title">Заказы</h1>
        <div class="order-list" v-auto-animate v-if="orders.length > 0">
            <OrderCard v-for="order in orders" :key="order.id" :order="order"></OrderCard>
        </div>
        <div v-else class="order-empty">
            <h1>Заказы отсутствуют</h1>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    import { useOrderStore } from '../store/modules/order';
    import { useUserStore } from '../store/modules/user';
    import { useAdminStore } from '../store/modules/admin';
    import { storeToRefs } from 'pinia';

    import OrderCard from '../components/orders/OrderCard.vue';

    const orderStore = useOrderStore();
    const userStore = useUserStore();
    const adminStore = useAdminStore();

    const { user } = storeToRefs(userStore);
    const { orders } = storeToRefs(orderStore);

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            orderStore.getOrdersByUserId(user.value.id).then(() => {
                adminStore.getProducts();
            })
        })
    })

</script>

<style scoped>

    .order-title {
        text-align: center;
        margin: 30px;
        font-size: 30px;
    }

    .order-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
        font-size: 20px;
        opacity: 0.6;
    }

</style>
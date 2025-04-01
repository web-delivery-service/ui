<template>
    <section>
        <h1 class="order-title">Заказы</h1>
        <div class="order-list">
            <OrderCard v-for="order in orders" :key="order.id" :order="order"></OrderCard>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    import { useOrderStore } from '../store/modules/order';
    import { useUserStore } from '../store/modules/user';
    import { storeToRefs } from 'pinia';

    import OrderCard from '../components/orders/OrderCard.vue';

    const orderStore = useOrderStore();
    const userStore = useUserStore();

    const { user } = storeToRefs(userStore);
    const { orders } = storeToRefs(orderStore);

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            orderStore.getOrdersByUserId(user.value.id);
        })
    })

</script>

<style scoped>

    .order-title {
        text-align: center;
        margin: 30px;
        font-size: 30px;
    }

</style>
<template>
    <div class="admin-layout-wrapper">
        <div class="admin-layout-navbar">
            <NavBar></NavBar>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive } from 'vue';
    import { storeToRefs } from 'pinia';

    import router from '../router';
    import NavBar from '../components/admin/NavBar.vue';
    import { UserRoleEnum } from '../interfaces/enums/UserRoleEnum';
    import { useUserStore } from '../store/modules/user';
    import { useAdminStore } from '../store/modules/admin';

    import type { IStatsFilter } from '../interfaces/StatsInterface';

    const userStore = useUserStore();
    const adminStore = useAdminStore();

    const { orders } = storeToRefs(adminStore);

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            if (userStore.user?.role !== UserRoleEnum.ADMIN) {
                router.push({ name: 'Home' });
            }
            adminStore.getOrders().then(async () => {
                for (const order of orders.value) {
                    await adminStore.getOrderItemsByOrderId(order.id);
                }
            });

            const filter = reactive<IStatsFilter>({
                startDate: null,
                endDate: null,
            })

            adminStore.getCategories();
            adminStore.getProducts();
            adminStore.getStats(filter);
        });
    })
    
</script>

<style scoped>

</style>
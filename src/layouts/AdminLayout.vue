<template>
    <div class="admin-layout-wrapper">
        <div class="admin-layout-navbar">
            <NavBar></NavBar>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    import router from '../router';
    import NavBar from '../components/admin/NavBar.vue';
    import { UserRoleEnum } from '../interfaces/enums/UserRoleEnum';
    import { useUserStore } from '../store/modules/user';
    import { useAdminStore } from '../store/modules/admin';

    const userStore = useUserStore();
    const adminStore = useAdminStore();

    onMounted(async() => {
        await userStore.getCurrentUser().then(() => {
            if (userStore.user?.role !== UserRoleEnum.ADMIN) {
                router.push({ name: 'Home' });
            }
            adminStore.getOrders();
            adminStore.getCategories();
            adminStore.getProducts();
            adminStore.getStats();
        });
    })
    
</script>

<style scoped>

</style>
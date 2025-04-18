<template>
    <section class="admin-stats-wrapper">
        <div class="admin-stats-content">
            <div class="admin-stats-info">
                <h2><span style="opacity: 0.5;">Кол-во категорий:</span> {{ stats?.categoryQuantity }}</h2>
                <h2><span style="opacity: 0.5;">Кол-во товаров:</span> {{ stats?.productQuantity }}</h2>
                <hr>
                <h2><span style="opacity: 0.5;">Кол-во заказов:</span> {{ stats?.orderQuantity }}</h2>
                <h2><span style="opacity: 0.5;">Общая сумма заказов:</span> {{ stats?.totalCost }} руб.</h2>
                <hr>
                <h2 v-for="(quantity, category) in stats?.categoriesStats">
                    <span style="opacity: 0.5;">{{ category }}:</span> {{ quantity }}
                </h2>
            </div>
            <div class="filter-form">
                <v-form fast-fail @submit.prevent="getStats">
                    <v-text-field v-model="filter.startDate" label="Начало периода" type="date" clearable></v-text-field>
                    <v-text-field v-model="filter.endDate" label="Конец периода" type="date" clearable></v-text-field>

                    <v-btn color="green" type="submit" block>Получить</v-btn>
                    <v-btn style="margin-top: 10px;" color="red" block variant="outlined" @click="resetStats">Сбросить</v-btn>
                </v-form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { storeToRefs } from 'pinia';

    import type { IStatsFilter } from '../../interfaces/StatsInterface';

    import { useAdminStore } from '../../store/modules/admin';

    const filter = reactive<IStatsFilter>({
        startDate: null,
        endDate: null,
    })

    const adminStore = useAdminStore();
    const { stats, categories } = storeToRefs(adminStore);

    const getStats = async() => {
        await adminStore.getStats(filter);
    }

    const resetStats = async() => {
        filter.startDate = null;
        filter.endDate = null;
        await adminStore.getStats(filter);
    }


</script>

<style scoped>

    .admin-stats-wrapper {
        padding: 20px;
    }

    .admin-stats-content {
        display: flex;
        gap: 20px;
        justify-content: space-between;
    }

    .filter-form {
        width: 400px;
    }

    .admin-stats-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }


</style>
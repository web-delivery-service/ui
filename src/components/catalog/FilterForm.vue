<template>
    <section>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            class="filter-form"
        >
            <div :class="getFilterButtonClass">
                <v-btn :icon="getFilterButtonIcon" :color="getFilterButtonColor" @click.stop="drawer = !drawer"></v-btn>
            </div>

            <div class="filter-title">
                <h2>Фильтры</h2>
            </div>

            <v-form fast-fail @submit.prevent="applyFilter">
                <v-text-field 
                    variant="outlined"
                    label="Название"
                    v-model="filterData.title"
                ></v-text-field>

                <v-select
                    :items="categories"
                    item-title="title"
                    item-value="id"
                    label="Категория"
                    variant="outlined"
                    v-model="filterData.categoryId"
                ></v-select>

                <div class="cost-filter">
                    <div>
                        <h4>Цена</h4>
                    </div>

                    <v-text-field 
                        variant="outlined"
                        label="От"
                        v-model="filterData.minCost"
                    ></v-text-field>

                    <v-text-field 
                        variant="outlined"
                        label="До"
                        v-model="filterData.maxCost"
                    ></v-text-field>
                </div>

                <v-btn color="yellow" class="mt-2" type="submit" block>Применить</v-btn>
                <v-btn color="black" variant="text" class="mt-2" block @click="resetFilter">Сбросить</v-btn>
            </v-form>
        </v-navigation-drawer>
    </section>
</template>

<script setup lang="ts">

    import { ref, onMounted, computed } from 'vue';
    import { storeToRefs } from 'pinia';

    import type { ICatalogFilter } from '../../interfaces/CatalogFilterInterface';
    import { useBaseStore } from '../../store/modules/base';

    const baseStore = useBaseStore();
    const { categories, filter } = storeToRefs(baseStore);

    const drawer = ref(false);
    const filterData = ref<ICatalogFilter>({
        title: filter.value.title,
        categoryId: filter.value.categoryId,
        minCost: filter.value.minCost,
        maxCost: filter.value.maxCost,
    })

    const applyFilter = async () => {
        await baseStore.updateFilter(filterData.value);
    }

    const resetFilter = async () => {
        filterData.value = {
            title: null,
            categoryId: null,
            minCost: null,
            maxCost: null
        }
        baseStore.updateFilter(filterData.value);
    }

    const getFilterButtonColor = computed(() => {
        if (filter.value.categoryId || filter.value.title || filter.value.minCost || filter.value.maxCost) {
            return 'yellow';
        } else {
            return 'black';
        }
    })

    const getFilterButtonClass = computed(() => {
        if (drawer.value) {
            return 'filter-open-btn filter-open-btn-active';
        } else {
            return 'filter-open-btn';
        }
    })

    const getFilterButtonIcon = computed(() => {
        if (drawer.value) {
            return 'mdi-close';
        } else {
            return 'mdi-filter';
        }
    })

    onMounted(async () => {
        await baseStore.getCategories().then(() => {
            baseStore.loadFilter();
            filterData.value = filter.value;
        });
    })

</script>

<style scoped>
    .cost-filter {
        display: flex;
        gap: 10px;
    }

    .filter-form {
        padding: 10px;
    }

    .filter-open-btn {
        transition: all 0.3s ease-in-out;
        position: fixed;
        top: 90px;
        left: 270px;
    }

    .filter-open-btn-active {
        top: 10px;
        left: 270px;
    }

    .filter-title {
        text-align: center;
        margin-bottom: 20px;
    }

</style>
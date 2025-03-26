<template>
    <section>
        <div>
            <h1>Каталог</h1>
        </div>
        <div class="filter-form">
            <FilterForm :drawer="drawer"></FilterForm>
        </div>
        <div class="product-list">
            <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useBaseStore } from '../store/modules/base';

    import FilterForm from '../components/catalog/FilterForm.vue';
    import ProductCard from '../components/catalog/ProductCard.vue';
    
    const baseStore = useBaseStore();
    const { products } = storeToRefs(baseStore);

    const drawer = ref(false);

</script>

<style scoped>

    .product-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

</style>
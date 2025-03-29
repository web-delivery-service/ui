<template>
    <section>
        <div class="catalog-title">
            <h1>Каталог</h1>
        </div>
        <div class="filter-form">
            <FilterForm :drawer="drawer"></FilterForm>
        </div>
        <div class="product-list" v-auto-animate>
            <ProductCard v-for="product in products" :key="product.id" :product="product" v-show="product.quantity > 0"></ProductCard>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useBaseStore } from '../store/modules/base';
    import { useCartStore } from '../store/modules/cart';

    import FilterForm from '../components/catalog/FilterForm.vue';
    import ProductCard from '../components/catalog/ProductCard.vue';

    const baseStore = useBaseStore();
    const cartStore = useCartStore();
    const { products } = storeToRefs(baseStore);

    const drawer = ref(false);

    onMounted(async() => {
        await cartStore.getCart();
    })

</script>

<style scoped>

    .product-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-template-rows: auto;
        gap: 20px;
        padding: 0 20px;
    }

    .catalog-title {
        text-align: center;
        margin: 30px;
        font-size: 24px;
    }

</style>
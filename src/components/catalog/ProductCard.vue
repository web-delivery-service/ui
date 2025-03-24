<template>
    <section class="product-card">
        <div class="product-card-title">
            <h3>{{ product.title }}</h3>
        </div>
        <div class="product-card-image">

        </div>
        <div class="product-card-info">
            <div class="product-card-info">
                <p>{{ product.info }}</p>
            </div>
            <div class="product-card-cost">
                <p>{{ product.cost }} руб.</p>
            </div>
            <div class="product-card-quantity">
                <p>{{ product.quantity }} шт.</p>
            </div>
        </div>
        <div class="product-card-actions">
            <div class="product-card-actions-to-cart">
                В корзину
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import type { IProduct } from '../../interfaces/ProductInterface';

    defineProps<{
        product: IProduct
    }>();

</script>

<style scoped>

    .product-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid #ccc;
        padding: 20px;
        width: 30%;
    }

</style>
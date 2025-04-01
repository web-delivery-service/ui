<template>
    <section class="order-card">
        {{ order }}
    </section>
</template>

<script setup lang="ts">
    import type { IOrder } from '../../interfaces/OrderInterface';
    
    const props = defineProps<{
        order: IOrder
    }>()

</script>

<style scoped>

    .order-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
    }

</style>
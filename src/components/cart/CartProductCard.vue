<template>
    <section class="cart-product-card">
        <div class="cart-product-content">
            <div class="cart-product-info">
                <h2>{{ product.title }}</h2>
                <div>{{ product.cost }} руб.</div>
                <div style="opacity: 0.5;"><span :class="getAvailableQuantityClass">Доступно: {{ availableQuantity }} шт</span></div>
            </div>
            <div class="cart-product-card-actions">
                <div class="cart-product-card-actions-quantity">
                    <v-btn size="small" icon="mdi-plus" variant="text" @click="increaseProductQuantity"></v-btn>
                    <div>{{ cardItem.quantity }}</div>
                    <v-btn size="small" icon="mdi-minus" variant="text" @click.stop="decreaseProductQuantity"></v-btn>
                </div>
                <div class="cart-product-card-actions-remove">
                    <v-btn @click="deleteFromCart" color="red" variant="text" icon="mdi-delete"></v-btn>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';

    import type { IProduct } from '../../interfaces/ProductInterface';
    import type { ICartItem } from '../../interfaces/CartItemInterface';

    import { useCartStore } from '../../store/modules/cart';

    const cartStore = useCartStore();

    const props = defineProps<{
        product: IProduct
        cardItem: ICartItem
    }>();

    const emit = defineEmits(['deleteFromCart']);

    const availableQuantity = computed(() => props.product.quantity - props.cardItem.quantity);

    const getAvailableQuantityClass = computed(() => {
        if (availableQuantity.value > 0) {
            return 'available-quantity';
        } else {
            return 'not-available-quantity';
        }
    })

    const deleteFromCart = async () => {
        await cartStore.deleteFromCart(props.product.id);
        emit('deleteFromCart');
    }

    const increaseProductQuantity = async () => {
        await cartStore.increaseProductQuantity(props.product.id, props.cardItem.quantity + 1);
    }

    const decreaseProductQuantity = async () => {
        await cartStore.decreaseProductQuantity(props.product.id, props.cardItem.quantity - 1);
    }

</script>

<style scoped>
    .cart-product-card {
        position: relative;
        border: 1px solid #ccc;
        padding: 10px;
        width: 90%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
    
    .cart-product-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    .cart-product-info {
        flex: 1;
    }
    
    .cart-product-card-actions {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 10px;
        margin-top: auto;
    }
    
    .cart-product-card-actions-quantity {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #dadada;
        padding: 5px;
        border-radius: 5px;
    }
    
    .cart-product-card-actions-remove {
        /* Дополнительные стили для кнопки удаления */
    }

    .not-available-quantity {
        color: red;
    }
</style>

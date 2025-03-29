<template>
    <section class="product-card">
        <div class="product-card-content">
            <div class="product-card-title">
                <h3>{{ product.title }}</h3>
            </div>
            <div class="product-card-image">
                <!-- Изображение товара -->
            </div>
            <div class="product-card-info">
                <div class="product-card-info">
                    <p>{{ product.info }}</p>
                </div>
                <div class="product-card-cost">
                    <p>{{ product.cost }} руб.</p>
                </div>
                <div class="product-card-quantity">
                    <p>Осталось: <span style="font-weight: 900;">{{ product.quantity }} шт</span></p>
                </div>
            </div>
        </div>
        <div class="product-card-actions">
            <div :class="productCardActionsToCart" @click="cartManipulate">
                {{ addToCartTitle }}
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';

    import { storeToRefs } from 'pinia';

    import type { IProduct } from '../../interfaces/ProductInterface';
    import { useUserStore } from '../../store/modules/user';
    import { useCartStore } from '../../store/modules/cart';

    import router from '../../router';

    const props = defineProps<{
        product: IProduct
    }>();

    const userStore = useUserStore();
    const cartStore = useCartStore();

    const { cartItems } = storeToRefs(cartStore);

    const isAddedToCart = ref(false);
    const addToCartTitle = ref('В корзину');

    const productCardActionsToCart = computed(() => {
        if (isAddedToCart.value) {
            return 'product-card-actions-to-cart-added';
        } else {
            return 'product-card-actions-to-cart';
        }        
    })

    const cartManipulate = async () => {
        if (!userStore.user) {
            router.push({ name: 'Login' });
            return;
        }

        isAddedToCart.value = !isAddedToCart.value;

        if (isAddedToCart.value) {
            await cartStore.addToCart(props.product.id).then(() => {
                addToCartTitle.value = 'Добавлено';
            });
        } else {
            await cartStore.deleteFromCart(props.product.id).then(() => {
                addToCartTitle.value = 'В корзину';
            });
        }
    }

    watch(cartItems, () => {
        isAddedToCart.value = cartItems.value.some(item => item.productId === props.product.id);
        if (isAddedToCart.value) {
            addToCartTitle.value = 'Добавлено';
        }
    })

    onMounted(() => {
        isAddedToCart.value = cartItems.value.some(item => item.productId === props.product.id);
        if (isAddedToCart.value) {
            addToCartTitle.value = 'Добавлено';
        }
    })

</script>

<style scoped>
    .product-card {
        display: flex;
        flex-direction: column;
        min-height: 200px;
        border: 1px solid #ccc;
        padding: 20px;
        width: 100%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }

    .product-card-content {
        flex: 1;
    }

    .product-card-actions {
        margin-top: auto;
    }

    .product-card-actions-to-cart {
        text-align: center;
        border: 1px solid #ccc;
        padding: 10px;
        cursor: pointer;
        background-color: rgb(255, 217, 0);
        width: 100%;
    }

    .product-card-actions-to-cart-added {
        text-align: center;
        border: 1px solid #ccc;
        padding: 10px;
        cursor: pointer;
        background-color: rgb(251, 247, 226);
        width: 100%;
    }
</style>
<template>
    <section class="cart-wrapper">
        <div>
            <h1 class="cart-title">Корзина</h1>
            <div class="cart-product-list" style="display: flex;">
                <div class="cart-product-list-content" v-auto-animate style="max-height: 80vh;" v-if="cartProducts.length > 0">
                    <CartProductCard 
                        v-for="product in cartProducts" 
                        :key="product.id" 
                        :product="product" 
                        :cardItem="cartItems.find(item => item.productId === product.id)"
                    ></CartProductCard>
                </div>
                <div v-else class="cart-product-list-empty">
                    <p>Корзина пуста</p>
                </div>
                <div class="cart-product-list-total" style="max-height: 100%;">
                    <v-form v-if="user" class="cart-user-info" fast-fail @submit.prevent="createOrder">
                        <div class="cart-user-info-item">
                            <p>Имя: <span style="font-weight: bold;">{{ user.name }}</span> <span class="error" v-if="!user.name">Необходимо заполнить</span></p>
                        </div>
                        <div class="cart-user-info-item">
                            <p>Адрес: <span style="font-weight: bold;">{{ user.address }}</span> <span class="error" v-if="!user.address">Необходимо заполнить</span></p>
                        </div>
                        <div>
                            <v-text-field readonly variant="outlined" v-model="orderCreate.cost" label="Итого (руб)"></v-text-field>
                        </div>

                        <v-btn :disabled="!isFormValid" color="yellow" type="submit">Оформить заказ</v-btn>
                    </v-form>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, reactive, watch } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useCartStore } from '../store/modules/cart';
    import { useBaseStore } from '../store/modules/base';
    import { useUserStore } from '../store/modules/user';
    import { useOrderStore } from '../store/modules/order';

    import CartProductCard from '../components/cart/CartProductCard.vue';
    
    import type { IOrderCreate } from '../interfaces/OrderInterface';
    import { OrderStatusEnum } from '../interfaces/enums/OrderStatusEnum';
    import router from '../router';

    const cartStore = useCartStore();
    const baseStore = useBaseStore();
    const userStore = useUserStore();
    const orderStore = useOrderStore();

    const { cartItems } = storeToRefs(cartStore);
    const { products } = storeToRefs(baseStore);
    const { user } = storeToRefs(userStore);

    const totalCost = computed(() => {
        let cost = 0;
        const cartProducts = products.value.filter(product => cartItems.value.find(cartItem => cartItem.productId === product.id));
        
        cartProducts.forEach(product => {
            cost += product.cost * (cartItems.value.find(item => item.productId === product.id)?.quantity || 0);
        })
        return cost;
    });

    const isFormValid = computed(() => {
        return user.value.name && user.value.address && cartItems.value.length > 0;
    })

    const orderCreate = reactive<IOrderCreate>({
        userId: null,
        status: OrderStatusEnum.PROCESS,
        cost: 0
    })

    const cartProducts = computed(() => {
        return products.value.filter(product => cartItems.value.find(cartItem => cartItem.productId === product.id));
    })

    const createOrder = async () => {
        await orderStore.createOrder(orderCreate).then(() => {
            cartStore.clearCart();
            router.push({ name: 'UserOrders' });
        });
    }

    onMounted(async () => {
        await userStore.getCurrentUser().then(() => {
            baseStore.getProducts().then(() => {
                cartStore.getCart().then(() => {
                    orderCreate.userId = user.value.id;
                    orderCreate.cost = totalCost.value;
                })
            });
        });
    })

    watch(totalCost, () => {
        orderCreate.cost = totalCost.value;
    })

</script>

<style scoped>

    .cart-wrapper {
        padding: 30px;
        max-height: 100vh;
    }

    .cart-title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 30px;
    }

    .card-product-list {
        gap: 20px;
    }

    .cart-product-list-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        opacity: 0.6;
        width: 50%;
    }

    .cart-product-list-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 80%;
        overflow-y: scroll;
    }
    
    .cart-product-list-total {
        flex: 1;        
        border: 1px solid #ccc;
        padding: 20px;
        height: 270px;
    }

    .error {
        color: red;
        opacity: 0.5;
    }

    .cart-user-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

</style>
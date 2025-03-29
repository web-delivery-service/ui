<template>
    <section class="cart-wrapper">
        <div>
            <h1 class="cart-title">Корзина</h1>
            <div class="cart-product-list" style="display: flex;">
                <div class="cart-product-list-content" v-auto-animate>
                    <CartProductCard 
                        v-for="product in cartProducts" 
                        :key="product.id" 
                        :product="product" 
                        :cardItem="cartItems.find(item => item.productId === product.id)"
                    ></CartProductCard>
                </div>
                <div class="cart-product-list-total">
                    <v-form v-if="user" class="cart-user-info">
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

    import CartProductCard from '../components/cart/CartProductCard.vue';
    
    import type { IOrderCreate } from '../interfaces/OrderInterface';
    import { OrderStatusEnum } from '../interfaces/enums/OrderStatusEnum';

    const cartStore = useCartStore();
    const baseStore = useBaseStore();
    const userStore = useUserStore();

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
    }

    .cart-title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 30px;
    }

    .card-product-list {
        gap: 20px;
    }

    .cart-product-list-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px
    }
    
    .cart-product-list-total {
        flex: 1;        
        border: 1px solid #ccc;
        padding: 20px;
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
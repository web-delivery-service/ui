import { defineStore } from 'pinia';

import type { CartState } from '../types';
import { cartApi } from '../../api/cart';

import type { ICartItem, ICartItemDelete, ICartItemUpdate } from '../../interfaces/CartItemInterface';

import { useUserStore } from './user';

const defaultState: CartState = {
    cart: null,
    cartItems: [],
    cartQuantity: 0
};

export const useCartStore = defineStore('cart-store', {
    state: (): CartState => defaultState,
    actions: {
        // -------------------------------- CART --------------------------------

        async getCart() {
            try {
                const accessToken = useUserStore().accessToken
                await cartApi.getCart(accessToken).then((response) => {
                    this.cart = response.data;
                    this.getItemsByCartId(this.cart.id);
                });
            } catch (error) {
                console.error(error);
            }
        },
        async getItemsByCartId(cartId: number) {
            try {
                const accessToken = useUserStore().accessToken
                const response = await cartApi.getItemsByCartId(cartId, accessToken);
                this.cartItems = response.data;
                this.cartQuantity = this.cartItems.length;
            } catch (error) {
                console.error(error);
            }
        },
        async addToCart(productId: number) {
            try {
                const accessToken = useUserStore().accessToken
                const cartItem: ICartItem = {
                    cartId: this.cart?.id,
                    productId: productId,
                    quantity: 1
                }

                await cartApi.addToCart(cartItem, accessToken).then(() => {
                    this.getCart();
                });
            } catch (error) {
                console.error(error);
            }
        },
        async deleteFromCart(productId: number) {
            try {
                const accessToken = useUserStore().accessToken
                const cartItem: ICartItemDelete = {
                    cartId: this.cart?.id,
                    productId: productId
                }
                cartApi.deleteFromCart(cartItem, accessToken).then(() => {
                    this.getCart();
                });
            } catch (error) {
                console.error(error);
            }
        },
        async increaseProductQuantity(productId: number, quantity: number) {
            try {
                const accessToken = useUserStore().accessToken
                const cartItem: ICartItemUpdate = {
                    cartId: this.cart?.id,
                    productId: productId,
                    quantity: quantity
                }
                await cartApi.increaseQuantity(cartItem, accessToken).then(() => {
                    this.getCart();
                })
            } catch (error) {
                console.error(error);
            }
        },
        async decreaseProductQuantity(productId: number, quantity: number) {
            try {
                const accessToken = useUserStore().accessToken
                const cartItem: ICartItemUpdate = {
                    cartId: this.cart?.id,
                    productId: productId,
                    quantity: quantity
                }
                await cartApi.decreaseQuantity(cartItem, accessToken).then(() => {
                    this.getCart();
                })
            } catch (error) {
                console.error(error);
            }
        },

        clearCart() {
            this.cart = null;
            this.cartItems = [];
            this.cartQuantity = 0;
        }
    }
});
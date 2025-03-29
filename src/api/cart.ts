import axios from 'axios';

import type { ICart } from '../interfaces/CartInterface';
import type { ICartItem, ICartItemDelete, ICartItemUpdate } from '../interfaces/CartItemInterface';

import { apiUrl } from '../lib/axios';

export const cartApi = {
    async getCart(accessToken: string | null) {
        return await axios.get<ICart>(`${apiUrl}/carts`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async addToCart(item: ICartItem, accessToken: string | null) {
        return await axios.post(`${apiUrl}/cart-products`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async deleteFromCart(item: ICartItemDelete, accessToken: string | null) {
        return await axios.delete(`${apiUrl}/cart-products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: item
        });
    },

    async getItemsByCartId(cartId: number, accessToken: string | null) {
        return await axios.get<ICartItem>(`${apiUrl}/cart-products/${cartId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async increaseQuantity(item: ICartItemUpdate, accessToken: string | null) {
        return await axios.patch(`${apiUrl}/cart-products/increase`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async decreaseQuantity(item: ICartItemUpdate, accessToken: string | null) {
        return await axios.patch(`${apiUrl}/cart-products/decrease`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
};
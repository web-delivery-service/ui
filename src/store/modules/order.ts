import { defineStore } from 'pinia';

import type { OrderState } from '../types';
import { orderApi } from '../../api/order';

import { useUserStore } from './user';

import type { IOrderCreate } from '../../interfaces/OrderInterface';


const defaultState: OrderState = {
    orderItems: [],
    orderQuantity: 0,
    orders: []
};

export const useOrderStore = defineStore('order-store', {
    state: (): OrderState => defaultState,
    actions: {
        async getOrdersByUserId() {
            try {
                const response = await orderApi.getOrdersByUserId(useUserStore().accessToken);
                this.orders = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async createOrder(order: IOrderCreate) {
            try {
                await orderApi.createOrder(order, useUserStore().accessToken);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
});
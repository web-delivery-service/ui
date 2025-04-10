import axios from 'axios';

import type { IOrder, IOrderCreate } from '../interfaces/OrderInterface';
import type { IOrderItem } from '../interfaces/OrderItemInterface';

import { OrderStatusEnum } from '../interfaces/enums/OrderStatusEnum';

import { apiUrl } from '../lib/axios';

export const orderApi = {
    async createOrder(order: IOrderCreate, accessToken: string | null) {
        return await axios.post<IOrder>(`${apiUrl}/orders`, order, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async getOrdersByUserId(accessToken: string | null) {
        return await axios.get<IOrder[]>(`${apiUrl}/users/orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async getAllOrders(accessToken: string | null) {
        return await axios.get<IOrder[]>(`${apiUrl}/orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async getItemsByOrderId(orderId: number, accessToken: string | null) {
        return await axios.get<IOrderItem[]>(`${apiUrl}/order-products/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async updateStatus(orderId: number, status: OrderStatusEnum, accessToken: string | null) {
        return await axios.patch(`${apiUrl}/orders/${orderId}/status`, { status }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async deleteOrder(orderId: number, accessToken: string | null) {
        return await axios.delete(`${apiUrl}/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
};
import axios from 'axios';

import type { ICategory, ICategoryCreate, ICategoryUpdate } from '../interfaces/CategoryInterface';
import { apiUrl } from '../lib/axios';

export const categoryApi = {
    async getCategories() {
        return await axios.get<ICategory[]>(`${apiUrl}/categories`);
    },

    async createCategory(item: ICategoryCreate, accessToken: string | null) {
        return await axios.post<ICategory>(`${apiUrl}/categories`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async updateCategory(item: ICategoryUpdate, itemId: number, accessToken: string | null) {
        return await axios.patch<ICategory>(`${apiUrl}/categories/${itemId}`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async deleteCategory(itemId: number, accessToken: string | null) {
        await axios.delete(`${apiUrl}/categories/${itemId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },
};
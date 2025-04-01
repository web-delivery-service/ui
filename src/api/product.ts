import axios from 'axios';

import type { IProduct, IProductCreate, IProductUpdate } from '../interfaces/ProductInterface';
import type { ICatalogFilter } from '../interfaces/CatalogFilterInterface';

import { apiUrl } from '../lib/axios';

export const productApi = {
    async getProducts(filter: ICatalogFilter) {
        return await axios.get<IProduct[]>(`${apiUrl}/products`, {
            params: {
                title: filter.title,
                categoryId: filter.categoryId,
                minCost: filter.minCost,
                maxCost: filter.maxCost
            }
        });
    },

    async getAllProducts() {
        return await axios.get<IProduct[]>(`${apiUrl}/products`);
    },

    async createProduct(item: IProductCreate, accessToken: string | null) {
        return await axios.post<IProduct>(`${apiUrl}/products`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async updateProduct(item: IProductUpdate, itemId: number, accessToken: string | null) {
        return await axios.patch<IProduct>(`${apiUrl}/products/${itemId}`, item, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async deleteProduct(itemId: number, accessToken: string | null) {
        await axios.delete(`${apiUrl}/products/${itemId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async uploadProductImage(file: File, itemId: number, accessToken: string | null) {
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await axios.post(
            `${apiUrl}/products/${itemId}/image`, 
            formData,
            {
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
                }
            }
            );
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    async deleteProductImage(itemId: number, accessToken: string | null) {
        await axios.delete(`${apiUrl}/products/${itemId}/image`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
};
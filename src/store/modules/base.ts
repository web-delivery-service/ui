import { defineStore } from 'pinia';

import type { AdminState } from '../types';
import { categoryApi } from '../../api/category';
import { productApi } from '../../api/product';

import type { ICategory } from '../../interfaces/CategoryInterface';
import type { IProduct } from '../../interfaces/ProductInterface'
const defaultState: AdminState = {
    categories: [],
    products: []
};

export const useBaseStore = defineStore('base-store', {
    state: (): AdminState => defaultState,
    actions: {

        // -------------------------------- CATEGORIES --------------------------------

        async getCategories() {
            try {
                const response = await categoryApi.getCategories();
                this.categories = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        getCategoryByTitle(title: string): ICategory | undefined {
            return this.categories.find(category => category.title === title);
        },

        getCategoryById(id: number): ICategory | undefined {
            return this.categories.find(category => category.id === id);
        },

        // -------------------------------- PRODUCTS --------------------------------

        async getProducts() {
            try {
                const response = await productApi.getProducts();
                this.products = response.data.map((product: IProduct) => {
                    return {
                        id: product.id,
                        title: product.title,
                        quantity: product.quantity,
                        cost: product.cost,
                        info: product.info,
                        categoryId: this.getCategoryById(product.categoryId)?.title,
                    }
                })
            } catch (error) {
                console.error(error);
            }
        },
        // -------------------------------- ORDERS --------------------------------
    }
})
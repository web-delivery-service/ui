import { defineStore } from 'pinia';

import type { BaseState } from '../types';
import { categoryApi } from '../../api/category';
import { productApi } from '../../api/product';
import { cartApi } from '../../api/cart';

import type { ICategory } from '../../interfaces/CategoryInterface';
import type { IProduct } from '../../interfaces/ProductInterface'
import type { ICatalogFilter } from '../../interfaces/CatalogFilterInterface';

import { useUserStore } from './user';

const defaultState: BaseState = {
    categories: [],
    products: [],
    filter: {
        title: null,
        categoryId: null,
        minCost: null,
        maxCost: null
    },
    cart: null,
    cartQuantity: 0
};

export const useBaseStore = defineStore('base-store', {
    state: (): BaseState => defaultState,
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
                const response = await productApi.getProducts(this.filter);
                this.products = response.data.map((product: IProduct) => {
                    return {
                        id: product.id,
                        title: product.title,
                        quantity: product.quantity,
                        cost: product.cost,
                        info: product.info,
                        imageId: product.imageId,
                        categoryId: this.getCategoryById(product.categoryId)?.title,
                    }
                })
            } catch (error) {
                console.error(error);
            }
        },
        // -------------------------------- ORDERS --------------------------------

        // -------------------------------- FILTER --------------------------------

        async updateFilter(filter: ICatalogFilter) {
            localStorage.setItem('filter', JSON.stringify(filter));
            this.loadFilter();
        },
        async loadFilter() {
            const filter = JSON.parse(localStorage.getItem('filter') || '{}');

            if (filter === '{}') {
                this.filter = defaultState.filter;
            } else {
                this.filter = filter;
            }

            await this.getProducts();
        }
    }
})
import { defineStore } from 'pinia';

import type { AdminState } from '../types';
import { categoryApi } from '../../api/category';
import { productApi } from '../../api/product';
import { orderApi } from '../../api/order';

import { useUserStore } from './user';

import type { ICategoryCreate, ICategory, ICategoryUpdate } from '../../interfaces/CategoryInterface';
import type { IProductCreate, IProduct, IProductUpdate } from '../../interfaces/ProductInterface';


const defaultState: AdminState = {
    categories: [],
    products: [],
    orders: [],
    orderItems: []
};

export const useAdminStore = defineStore('admin-store', {
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
        async createCategory(item: ICategoryCreate) {
            try {
                const accessToken = useUserStore().accessToken
                await categoryApi.createCategory(item, accessToken).then((response) => {
                    this.getCategories()
                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateCategory(item: ICategoryUpdate, itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await categoryApi.updateCategory(item, itemId, accessToken).then((response) => {
                    this.getCategories()
                })
            } catch (error) {
                console.error(error);
            }
        },
        async deleteCategory(itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await categoryApi.deleteCategory(itemId, accessToken).then(() => {
                    this.getCategories()
                })
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
                const response = await productApi.getAllProducts();
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
        async createProduct(item: IProductCreate) {
            try {
                const accessToken = useUserStore().accessToken
                await productApi.createProduct(item, accessToken).then((response) => {
                    this.getProducts()
                    return response.data.id
                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateProduct(item: IProductUpdate, itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await productApi.updateProduct(item, itemId, accessToken).then((response) => {
                    this.getProducts()
                });
            } catch (error) {
                console.error(error);
            }
        },
        async deleteProduct(itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await productApi.deleteProduct(itemId, accessToken).then(() => {
                    this.getProducts()
                });
            } catch (error) {
                console.error(error);
            }
        },
        async uploadProductImage(file: File, itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await productApi.uploadProductImage(file, itemId, accessToken).then(() => {
                    this.getProducts()
                });
            } catch (error) {
                console.error(error);
            }
        },
        async deleteProductImage(itemId: number) {
            try {
                const accessToken = useUserStore().accessToken
                await productApi.deleteProductImage(itemId, accessToken).then(() => {
                    this.getProducts()
                });
            } catch (error) {
                console.error(error);
            }
        },


        // -------------------------------- ORDERS --------------------------------

        async getOrders() {
            try {
                const response = await orderApi.getAllOrders(useUserStore().accessToken);
                this.orders = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getOrderItemsByOrderId(orderId: number) {
            try {
                const response = await orderApi.getItemsByOrderId(orderId, useUserStore().accessToken);
                this.orderItems = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    }
})
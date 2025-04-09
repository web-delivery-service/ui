import { defineStore } from 'pinia';

import type { UserState } from '../types';
import { authApi } from '../../api/auth';
import { userApi } from '../../api/user';
import router from '../../router';

import type { IUser } from '../../interfaces/UserInterface';
import type { IProfile } from '../../interfaces/ProfileInterface';
import type { IRegisterUser, ILoginUser, JWT } from '../../interfaces/AuthInterface';
import { UserRoleEnum } from '../../interfaces/enums/UserRoleEnum';

import { useCartStore } from './cart';


const defaultState: UserState = {
    isAdmin: false,
    accessToken: null,
    user: null
};

export const useUserStore = defineStore('user-store', {
    state: (): UserState => defaultState,
    actions: {
        async loginUser(credentials: ILoginUser) {
            try {
                await authApi.loginUser(credentials).then((response) => {
                    this.accessToken = response.data.accessToken;
                    this.getCurrentUser();
                })
            } catch (error) {
                throw error;
            }
        },
        async registerUser(credentials: IRegisterUser){
            try {
                await authApi.registerUser(credentials).then(() => {
                    this.loginUser(credentials);
                });
            } catch (error) {
                throw error;
            }
        },
        async getCurrentUser() {
            if (!this.accessToken) {
                await this.refreshToken();
            }
            try {
                await authApi.me(this.accessToken).then((response) => {
                    this.user = response.data;
                    if (this.user == UserRoleEnum.ADMIN) {
                        this.isAdmin = true;
                    } else {
                        this.isAdmin = false;
                    }
                });
            } catch (error) {
                await this.refreshToken()
            }
        },
        async logoutUser() {
            try {
                await authApi.logoutUser(this.accessToken);
                this.clearUserData();
            } catch (error) {
                throw error;
            }
        },
        async refreshToken() {
            try {
                await authApi.refreshToken().then((response) => {
                    this.accessToken = response.data.accessToken;
                    this.getCurrentUser();
                });
            } catch (error) {
                this.logoutUser();
                router.push({ name: 'Catalog' });
            }
        },
        clearUserData() {
            this.accessToken = null;
            this.isAdmin = false;
            this.user = null;
            useCartStore().clearCart();
        },

        // ------------------ CRUD ------------------

        async updateProfile(data: IProfile) {
            try {
                await userApi.updateProfile(data, this.accessToken).then(() => {
                    this.getCurrentUser();
                })
            } catch (error) {
                throw error;
            }
        }
    }
})
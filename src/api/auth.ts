import axios from 'axios';

import type { ILoginUser, IRegisterUser, JWT } from '../interfaces/AuthInterface';
import type { IUser } from '../interfaces/UserInterface';

import { apiUrl } from '../lib/axios';

export const authApi = {
    async loginUser(credentials: ILoginUser) {
        return await axios.post<JWT>(`${apiUrl}/auth/login`, credentials);
    },

    async registerUser(credentials: IRegisterUser) {
        return await axios.post<IUser>(`${apiUrl}/auth/register`, credentials);
    },

    async refreshToken() {
        return await axios.post<JWT>(`${apiUrl}/auth/refresh`);
    },

    async logoutUser(accessToken: string | null) {
        return await axios.post(`${apiUrl}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },

    async me(accessToken: string | null) {
        return await axios.get<IUser>(`${apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },
};
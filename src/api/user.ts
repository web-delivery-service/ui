import axios from 'axios';

import type { IProfile } from '../interfaces/ProfileInterface';

import { apiUrl } from '../lib/axios';

export const userApi = {
    async updateProfile(data: IProfile, accessToken: string | null) {
        return await axios.patch<IProfile>(`${apiUrl}/users`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },
};
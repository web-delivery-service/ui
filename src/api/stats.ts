import axios from 'axios';

import type { IStats, IStatsFilter } from '../interfaces/StatsInterface';

import { apiUrl } from '../lib/axios';

export const statsApi = {
    async getStats(filter: IStatsFilter, accessToken: string | null) {
        return await axios.get<IStats>(`${apiUrl}/stats`, {
            params: filter,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    },
};
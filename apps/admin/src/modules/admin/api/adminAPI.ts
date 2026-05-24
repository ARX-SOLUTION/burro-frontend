import axiosInstance from '@/services';

import type { AdminOverviewResponse, AdminXpRankingResponse } from '../types/api';

export const adminAPI = {
  getOverview: async (): Promise<AdminOverviewResponse> => {
    const response = await axiosInstance.get('/admin/reports/overview');
    return response.data;
  },

  getXpRanking: async (
    period: 'daily' | 'weekly' | 'monthly' | 'all',
  ): Promise<AdminXpRankingResponse> => {
    const response = await axiosInstance.get('/admin/reports/xp-ranking', {
      params: { period },
    });
    return response.data;
  },
};

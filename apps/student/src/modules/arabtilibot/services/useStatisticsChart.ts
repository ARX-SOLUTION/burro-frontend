import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';
import type { StatisticsChartPeriod } from '../types/api';

export const useStatisticsChart = (period: StatisticsChartPeriod = '7d') => {
  return useQuery({
    queryKey: burroQueryKeys.statisticsChart(period),
    queryFn: () => burroAPI.getStatisticsChart(period),
  });
};

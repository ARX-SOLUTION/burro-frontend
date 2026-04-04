import { useQuery } from '@tanstack/react-query';

import { {{camelPlural}}API } from '../api/{{camelPlural}}API';
import { {{camelSingular}}QueryKeys } from '../constants';

export const use{{PascalSingular}} = (id: string | undefined) => {
  return useQuery({
    queryKey: {{camelSingular}}QueryKeys.detail(id || ''),
    queryFn: () => {{camelPlural}}API.get{{PascalSingular}}ById(id!),
    enabled: !!id,
  });
};

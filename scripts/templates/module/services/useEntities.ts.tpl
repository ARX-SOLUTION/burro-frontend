import { useQuery } from '@tanstack/react-query';

import type { Get{{PascalPlural}}Params } from '../api/{{camelPlural}}API';
import { {{camelPlural}}API } from '../api/{{camelPlural}}API';
import { {{camelSingular}}QueryKeys } from '../constants';

export const use{{PascalPlural}} = (params: Get{{PascalPlural}}Params = {}) => {
  return useQuery({
    queryKey: {{camelSingular}}QueryKeys.list(params),
    queryFn: () => {{camelPlural}}API.get{{PascalPlural}}(params),
  });
};

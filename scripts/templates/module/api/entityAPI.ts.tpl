import { createCrudAPI, type ListParams } from '@/modules/common';
import axiosInstance from '@/services';

import type { Create{{PascalSingular}}Request, Update{{PascalSingular}}Request, {{PascalSingular}} } from '../types';

export interface Get{{PascalPlural}}Params extends ListParams {
  search?: string;
}

const crudAPI = createCrudAPI<{{PascalSingular}}, Create{{PascalSingular}}Request, Update{{PascalSingular}}Request, Get{{PascalPlural}}Params>({
  axios: axiosInstance,
  endpoint: '/{{plural}}',
});

export const {{camelPlural}}API = {
  get{{PascalPlural}}: crudAPI.getAll,
  get{{PascalSingular}}ById: crudAPI.getById,
  create{{PascalSingular}}: crudAPI.create,
  update{{PascalSingular}}: crudAPI.update,
  delete{{PascalSingular}}: crudAPI.delete,
};

import type { AxiosInstance } from 'axios';

import type { PaginatedResponse } from '../types';

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: unknown;
}

export interface CrudAPIOptions {
  axios: AxiosInstance;
  endpoint: string;
  defaultPagination?: {
    page: number;
    limit: number;
  };
}

export interface CrudAPI<
  TEntity,
  TCreateDTO = Partial<TEntity>,
  TUpdateDTO = Partial<TEntity>,
  TListParams extends ListParams = ListParams,
> {
  getAll: (params?: TListParams) => Promise<PaginatedResponse<TEntity>>;
  getById: (id: string) => Promise<TEntity>;
  create: (data: TCreateDTO) => Promise<TEntity>;
  update: (id: string, data: TUpdateDTO) => Promise<TEntity>;
  delete: (id: string) => Promise<void>;
}

export const createCrudAPI = <
  TEntity,
  TCreateDTO = Partial<TEntity>,
  TUpdateDTO = Partial<TEntity>,
  TListParams extends ListParams = ListParams,
>(
  options: CrudAPIOptions,
): CrudAPI<TEntity, TCreateDTO, TUpdateDTO, TListParams> => {
  const { axios, endpoint, defaultPagination = { page: 1, limit: 10 } } = options;

  return {
    getAll: async (params?: TListParams): Promise<PaginatedResponse<TEntity>> => {
      const { page, limit, ...rest } = params || {};

      const filteredParams = Object.entries(rest).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );

      const response = await axios.get(endpoint, {
        params: {
          page: page ?? defaultPagination.page,
          limit: limit ?? defaultPagination.limit,
          ...filteredParams,
        },
      });
      return response.data;
    },

    getById: async (id: string): Promise<TEntity> => {
      const response = await axios.get(`${endpoint}/${id}`);
      return response.data;
    },

    create: async (data: TCreateDTO): Promise<TEntity> => {
      const response = await axios.post(endpoint, data);
      return response.data;
    },

    update: async (id: string, data: TUpdateDTO): Promise<TEntity> => {
      const response = await axios.patch(`${endpoint}/${id}`, data);
      return response.data;
    },

    delete: async (id: string): Promise<void> => {
      await axios.delete(`${endpoint}/${id}`);
    },
  };
};

import { QueryGenerator } from '@burro/shared/utils/QueryGenerator';

export const createQueryKeys = <TParams extends Record<string, unknown> = ListParams>(
  entity: string,
): QueryGenerator<TParams> => {
  return new QueryGenerator<TParams>(entity);
};

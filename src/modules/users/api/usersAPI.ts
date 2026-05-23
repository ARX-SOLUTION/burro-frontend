import { createCrudAPI, type ListParams } from '@/modules/common';

import axiosInstance from '@/services';

import type { AdminUpdateUserRequest, UpdateUserRequest, User } from '../types';

export interface GetUsersParams extends ListParams {
  search?: string;
  role?: string;
}

const crudAPI = createCrudAPI<User, AdminUpdateUserRequest, AdminUpdateUserRequest, GetUsersParams>(
  {
    axios: axiosInstance,
    endpoint: '/users',
  },
);

export const usersAPI = {
  getUsers: crudAPI.getAll,
  getUserById: crudAPI.getById,
  createUser: crudAPI.create,
  adminUpdateUser: (id: string, data: AdminUpdateUserRequest) => crudAPI.update(id, data),
  deleteUser: crudAPI.delete,

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },

  updateMe: async (data: UpdateUserRequest): Promise<User> => {
    const response = await axiosInstance.patch('/users/me', data);
    return response.data;
  },
};

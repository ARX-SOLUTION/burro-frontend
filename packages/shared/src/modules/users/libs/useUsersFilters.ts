import { useCallback } from 'react';

import type { Role } from '@burro/shared/modules/auth';
import { type BaseTableFilters, useTableFilters } from '@burro/shared/modules/common';

export interface UsersFilters extends BaseTableFilters {
  search: string;
  role: Role | '';
}

const DEFAULT_FILTERS: UsersFilters = {
  page: 1,
  limit: 10,
  search: '',
  role: '',
};

export const useUsersFilters = () => {
  const { filters, setFilter, setPage, resetFilters, hasActiveFilters } =
    useTableFilters<UsersFilters>({
      defaults: DEFAULT_FILTERS,
      resetPageOn: ['search', 'role'],
    });

  const setSearch = useCallback((search: string) => setFilter('search', search), [setFilter]);

  const setRole = useCallback((role: Role | '') => setFilter('role', role), [setFilter]);

  return {
    filters,
    setFilter,
    setPage,
    setSearch,
    setRole,
    resetFilters,
    hasActiveFilters,
  };
};

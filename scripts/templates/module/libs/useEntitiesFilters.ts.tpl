import { useCallback } from 'react';

import { type BaseTableFilters, useTableFilters } from '@/modules/common';

export interface {{PascalPlural}}Filters extends BaseTableFilters {
  search: string;
}

const DEFAULT_FILTERS: {{PascalPlural}}Filters = {
  page: 1,
  limit: 10,
  search: '',
};

export const use{{PascalPlural}}Filters = () => {
  const { filters, setFilter, setPage, resetFilters, hasActiveFilters } =
    useTableFilters<{{PascalPlural}}Filters>({
      defaults: DEFAULT_FILTERS,
      resetPageOn: ['search'],
    });

  const setSearch = useCallback(
    (search: string) => setFilter('search', search),
    [setFilter],
  );

  return {
    filters,
    setFilter,
    setPage,
    setSearch,
    resetFilters,
    hasActiveFilters,
  };
};

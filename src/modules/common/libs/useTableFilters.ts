import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface BaseTableFilters {
  page: number;
  limit: number;
}

export type FilterParser<T> = {
  [K in keyof T]: (value: string | null, defaultValue: T[K]) => T[K];
};

export interface UseTableFiltersOptions<T extends BaseTableFilters> {
  defaults: T;
  resetPageOn?: (keyof T)[];
  parsers?: Partial<FilterParser<T>>;
}

const defaultParsers = {
  string: (value: string | null, defaultValue: string) => value || defaultValue,
  number: (value: string | null, defaultValue: number) => Number(value) || defaultValue,
  boolean: (value: string | null, defaultValue: boolean) =>
    value !== null ? value === 'true' : defaultValue,
};

export const useTableFilters = <T extends BaseTableFilters>(options: UseTableFiltersOptions<T>) => {
  const { defaults, resetPageOn = [], parsers } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<T>(() => {
    const result = {} as T;

    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const rawValue = searchParams.get(key as string);
      const defaultValue = defaults[key];
      const parser = parsers?.[key];

      if (parser) {
        result[key] = parser(rawValue, defaultValue);
      } else if (typeof defaultValue === 'number') {
        result[key] = defaultParsers.number(rawValue, defaultValue as number) as T[keyof T];
      } else if (typeof defaultValue === 'boolean') {
        result[key] = defaultParsers.boolean(rawValue, defaultValue as boolean) as T[keyof T];
      } else {
        result[key] = defaultParsers.string(rawValue, defaultValue as string) as T[keyof T];
      }
    }

    return result;
  }, [searchParams, defaults, parsers]);

  const setFilters = useCallback(
    (newFilters: Partial<T>) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(newFilters).forEach(([key, value]) => {
          const defaultValue = defaults[key as keyof T];

          const shouldRemove =
            value === '' ||
            value === null ||
            value === undefined ||
            value === defaultValue ||
            (key === 'page' && value === 1) ||
            (key === 'limit' && value === defaults.limit);

          if (shouldRemove) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });

        return params;
      });
    },
    [setSearchParams, defaults],
  );

  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      const updates = { [key]: value } as unknown as Partial<T>;

      if (resetPageOn.includes(key) && key !== 'page') {
        updates.page = 1 as T['page'];
      }

      setFilters(updates);
    },
    [setFilters, resetPageOn],
  );

  const setPage = useCallback(
    (page: number) => {
      setFilters({ page } as Partial<T>);
    },
    [setFilters],
  );

  const setLimit = useCallback(
    (limit: number) => {
      setFilters({ limit, page: 1 } as Partial<T>);
    },
    [setFilters],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return Object.keys(defaults).some((key) => {
      const k = key as keyof T;
      if (k === 'page' || k === 'limit') return false;
      return filters[k] !== defaults[k];
    });
  }, [filters, defaults]);

  return {
    filters,
    setFilters,
    setFilter,
    setPage,
    setLimit,
    resetFilters,
    hasActiveFilters,
  };
};

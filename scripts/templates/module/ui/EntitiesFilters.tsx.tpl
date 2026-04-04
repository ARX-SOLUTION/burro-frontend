import { useEffect, useRef, useState } from 'react';
import { SearchMd, XClose } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

import type { {{PascalPlural}}Filters as {{PascalPlural}}FiltersType } from '../libs';

interface {{PascalPlural}}FiltersProps {
  filters: {{PascalPlural}}FiltersType;
  onSearchChange: (search: string) => void;
}

export const {{PascalPlural}}Filters = ({ filters, onSearchChange }: {{PascalPlural}}FiltersProps) => {
  const [searchValue, setSearchValue] = useState(() => filters.search);
  const userHasTyped = useRef(false);

  const debouncedSearch = useDebouncedCallback(onSearchChange, 300);

  const handleSearchChange = (value: string) => {
    userHasTyped.current = true;
    setSearchValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!userHasTyped.current) {
      setSearchValue(filters.search);
    }
  }, [filters.search]);

  const handleClear = () => {
    userHasTyped.current = false;
    setSearchValue('');
    onSearchChange('');
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-full sm:w-64">
        <Input
          size="sm"
          icon={SearchMd}
          placeholder="Search {{plural}}..."
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search {{plural}}"
        />
      </div>

      {filters.search && (
        <Button color="tertiary" size="sm" onClick={handleClear} iconLeading={XClose}>
          Clear
        </Button>
      )}
    </div>
  );
};

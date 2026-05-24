import { useEffect, useRef, useState } from 'react';
import { SearchMd, XClose } from '@untitledui/icons';

import { Role, ROLE_LABELS } from '@burro/shared/modules/auth';

import { Button } from '@burro/shared/components/base/buttons/button';
import { Input } from '@burro/shared/components/base/input/input';
import { Select } from '@burro/shared/components/base/select/select';
import { useDebouncedCallback } from '@burro/shared/hooks/use-debounced-callback';

import type { UsersFilters as UsersFiltersType } from '../libs';

interface UsersFiltersProps {
  filters: UsersFiltersType;
  onSearchChange: (search: string) => void;
  onRoleChange: (role: Role | '') => void;
}

const ROLE_OPTIONS = [
  { id: '', label: 'All Roles' },
  { id: Role.Admin, label: ROLE_LABELS[Role.Admin] },
  { id: Role.Parent, label: ROLE_LABELS[Role.Parent] },
  { id: Role.Student, label: ROLE_LABELS[Role.Student] },
];

export const UsersFilters = ({ filters, onSearchChange, onRoleChange }: UsersFiltersProps) => {
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
    onRoleChange('');
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-full sm:w-64">
        <Input
          size="sm"
          icon={SearchMd}
          placeholder="Search users..."
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search users"
        />
      </div>

      <div className="w-full sm:w-40">
        <Select
          size="sm"
          placeholder="All Roles"
          items={ROLE_OPTIONS}
          value={filters.role || ''}
          onChange={(key) => onRoleChange(key as Role | '')}
          aria-label="Filter by role"
        >
          {(item) => <Select.Item id={item.id} label={item.label} />}
        </Select>
      </div>

      {(filters.search || filters.role) && (
        <Button color="tertiary" size="sm" onClick={handleClear} iconLeading={XClose}>
          Clear filters
        </Button>
      )}
    </div>
  );
};

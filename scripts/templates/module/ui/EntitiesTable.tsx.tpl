import { useMemo } from 'react';
import { Edit01, Trash01, Folder } from '@untitledui/icons';

import { type ColumnDef, DataTable } from '@/components/application/data-table/data-table';
import { Dropdown } from '@/components/base/dropdown/dropdown';

import { use{{PascalPlural}}Filters } from '../libs';
import { use{{PascalPlural}} } from '../services';
import type { {{PascalSingular}} } from '../types';
import { {{PascalPlural}}Filters } from './{{PascalPlural}}Filters';

interface {{PascalPlural}}TableProps {
  onEdit: ({{camelSingular}}: {{PascalSingular}}) => void;
  onDelete: ({{camelSingular}}: {{PascalSingular}}) => void;
}

export const {{PascalPlural}}Table = ({ onEdit, onDelete }: {{PascalPlural}}TableProps) => {
  const { filters, setPage, setSearch, hasActiveFilters } = use{{PascalPlural}}Filters();

  const { data, isLoading } = use{{PascalPlural}}({
    page: filters.page,
    limit: filters.limit,
    search: filters.search || undefined,
  });

  const {{camelPlural}} = data?.data ?? [];
  const meta = data?.meta;

  const columns: ColumnDef<{{PascalSingular}}>[] = useMemo(
    () => [
      {
        id: 'title',
        header: 'Title',
        isRowHeader: true,
        cell: ({{camelSingular}}) => (
          <span className="font-medium text-primary">{{{camelSingular}}.title}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({{camelSingular}}) => (
          <{{PascalSingular}}RowActions
            onEdit={() => onEdit({{camelSingular}})}
            onDelete={() => onDelete({{camelSingular}})}
          />
        ),
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <DataTable
      data={{{camelPlural}}}
      columns={columns}
      isLoading={isLoading}
      meta={meta}
      page={filters.page}
      onPageChange={setPage}
      title="{{PascalPlural}}"
      badge={meta?.total}
      hasActiveFilters={hasActiveFilters}
      emptyState={{
        icon: Folder,
        title: 'No {{plural}} found',
        description: 'There are no {{plural}} to display.',
        filteredDescription: 'No {{plural}} match your search criteria. Try adjusting your filters.',
      }}
      headerContent={<{{PascalPlural}}Filters filters={filters} onSearchChange={setSearch} />}
      ariaLabel="{{PascalPlural}} table"
    />
  );
};

interface {{PascalSingular}}RowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const {{PascalSingular}}RowActions = ({ onEdit, onDelete }: {{PascalSingular}}RowActionsProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.DotsButton />

      <Dropdown.Popover className="w-min">
        <Dropdown.Menu>
          <Dropdown.Item icon={Edit01} onAction={onEdit}>
            <span className="pr-4">Edit</span>
          </Dropdown.Item>

          <Dropdown.Item icon={Trash01} onAction={onDelete}>
            <span className="pr-4">Delete</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

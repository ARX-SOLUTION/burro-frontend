import type { FC, ReactNode } from 'react';
import { TableBody as AriaTableBody } from 'react-aria-components';
import { SearchLg } from '@untitledui/icons';

import type { PaginationMeta } from '@/modules/common';

import { EmptyState } from '../empty-state/empty-state';
import { LoadingIndicator } from '../loading-indicator/loading-indicator';
import { PaginationCardDefault } from '../pagination/pagination';
import { Table, TableCard } from '../table/table';

export interface ColumnDef<T> {
  id: string;
  header: string;
  headerTooltip?: string;
  isRowHeader?: boolean;
  cell: (item: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  meta?: PaginationMeta;
  page?: number;
  onPageChange?: (page: number) => void;
  title?: string;
  description?: string;
  badge?: ReactNode;
  headerContent?: ReactNode;
  emptyState?: {
    icon?: ReactNode | FC<{ className?: string | undefined }>;
    title?: string;
    description?: string;
    filteredDescription?: string;
  };
  hasActiveFilters?: boolean;
  ariaLabel?: string;
}

export const DataTable = <T extends { id: string }>({
  data,
  columns,
  isLoading = false,
  meta,
  page = 1,
  onPageChange,
  title,
  description,
  badge,
  headerContent,
  emptyState,
  hasActiveFilters = false,
  ariaLabel,
}: DataTableProps<T>) => {
  const showPagination = meta && meta.totalPages > 1 && onPageChange;

  return (
    <TableCard.Root>
      {(title || headerContent) && (
        <TableCard.Header
          title={title || ''}
          badge={badge}
          description={description}
          contentTrailing={headerContent && <div className="">{headerContent}</div>}
        />
      )}

      <Table aria-label={ariaLabel || title || 'Data table'}>
        <Table.Header>
          {columns.map((column) => (
            <Table.Head
              key={column.id}
              label={column.header}
              tooltip={column.headerTooltip}
              isRowHeader={column.isRowHeader}
              className={column.className}
            />
          ))}
        </Table.Header>

        <AriaTableBody
          items={isLoading ? [] : data}
          renderEmptyState={() =>
            isLoading ? (
              <DataTableLoading />
            ) : (
              <DataTableEmpty
                icon={emptyState?.icon}
                title={emptyState?.title}
                description={
                  hasActiveFilters ? emptyState?.filteredDescription : emptyState?.description
                }
                hasFilters={hasActiveFilters}
              />
            )
          }
        >
          {(item) => (
            <Table.Row key={item.id}>
              {columns.map((column) => (
                <Table.Cell key={column.id} className={column.className}>
                  {column.cell(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          )}
        </AriaTableBody>
      </Table>

      {showPagination && (
        <PaginationCardDefault page={page} total={meta.totalPages} onPageChange={onPageChange} />
      )}
    </TableCard.Root>
  );
};

const DataTableLoading = () => (
  <div className="flex items-center justify-center py-16">
    <LoadingIndicator size="md" label="Loading..." />
  </div>
);

interface DataTableEmptyProps {
  icon?: ReactNode | FC<{ className?: string | undefined }>;
  title?: string;
  description?: string;
  hasFilters?: boolean;
}

const DataTableEmpty = ({
  icon: Icon = SearchLg,
  title = 'No results found',
  description,
  hasFilters = false,
}: DataTableEmptyProps) => (
  <div className="flex items-center justify-center py-10">
    <EmptyState size="sm">
      <EmptyState.Header pattern="none">
        <EmptyState.FeaturedIcon color="gray" icon={Icon} />
      </EmptyState.Header>
      <EmptyState.Content>
        <EmptyState.Title>{title}</EmptyState.Title>
        <EmptyState.Description>
          {description ||
            (hasFilters
              ? 'No items match your search criteria. Try adjusting your filters.'
              : 'There are no items to display.')}
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState>
  </div>
);

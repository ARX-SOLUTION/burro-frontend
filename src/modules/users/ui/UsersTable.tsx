import { useMemo } from 'react';
import { Edit01, Trash01, Users01 } from '@untitledui/icons';
import { format } from 'date-fns';

import { Role, ROLE_BADGE_COLORS, ROLE_LABELS, useRole } from '@/modules/auth';

import { type ColumnDef, DataTable } from '@/components/application/data-table/data-table';
import { AvatarLabelGroup } from '@/components/base/avatar/avatar-label-group';
import { Badge } from '@/components/base/badges/badges';
import { Dropdown } from '@/components/base/dropdown/dropdown';

import { useUsersFilters } from '../libs';
import { useUsers } from '../services';
import type { User } from '../types';
import { UsersFilters } from './UsersFilters';

interface UsersTableProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UsersTable = ({ onEdit, onDelete }: UsersTableProps) => {
  const { filters, setPage, setSearch, setRole, hasActiveFilters } = useUsersFilters();
  const { isAtLeast } = useRole();

  const { data, isLoading } = useUsers({
    page: filters.page,
    limit: filters.limit,
    search: filters.search || undefined,
    role: filters.role || undefined,
  });

  const users = data?.data ?? [];
  const meta = data?.meta;
  const canChangeRole = isAtLeast(Role.Superadmin);

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        id: 'user',
        header: 'User',
        isRowHeader: true,
        cell: (user) => <AvatarLabelGroup size="md" title={user.fullName} subtitle={user.email} />,
      },
      {
        id: 'role',
        header: 'Role',
        cell: (user) => (
          <Badge color={ROLE_BADGE_COLORS[user.role]} size="sm">
            {ROLE_LABELS[user.role]}
          </Badge>
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: (user) => (
          <Badge color={user.emailVerified ? 'success' : 'warning'} size="sm">
            {user.emailVerified ? 'Verified' : 'Pending'}
          </Badge>
        ),
      },
      {
        id: 'createdAt',
        header: 'Created',
        cell: (user) => format(new Date(user.createdAt), 'MMM d, yyyy'),
      },
      {
        id: 'actions',
        header: '',
        cell: (user) => (
          <UserRowActions
            user={user}
            canChangeRole={canChangeRole}
            onEdit={() => onEdit(user)}
            onDelete={() => onDelete(user)}
          />
        ),
      },
    ],
    [canChangeRole, onEdit, onDelete],
  );

  return (
    <DataTable
      data={users}
      columns={columns}
      isLoading={isLoading}
      meta={meta}
      page={filters.page}
      onPageChange={setPage}
      title="Users"
      badge={meta?.total}
      description="See all users and apply filters to find specific users"
      hasActiveFilters={hasActiveFilters}
      emptyState={{
        icon: Users01,
        title: 'No users found',
        description: 'There are no users to display.',
        filteredDescription: 'No users match your search criteria. Try adjusting your filters.',
      }}
      headerContent={
        <UsersFilters filters={filters} onSearchChange={setSearch} onRoleChange={setRole} />
      }
      ariaLabel="Users table"
    />
  );
};

interface UserRowActionsProps {
  user: User;
  canChangeRole: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const UserRowActions = ({ user, canChangeRole, onEdit, onDelete }: UserRowActionsProps) => {
  const isSuperadmin = user.role === Role.Superadmin;

  return (
    <Dropdown.Root>
      <Dropdown.DotsButton />

      <Dropdown.Popover className="w-min">
        <Dropdown.Menu>
          <Dropdown.Item icon={Edit01} onAction={onEdit}>
            <span className="pr-4">Edit</span>
          </Dropdown.Item>

          {(canChangeRole || !isSuperadmin) && (
            <Dropdown.Item icon={Trash01} onAction={onDelete}>
              <span className="pr-4">Delete</span>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
};

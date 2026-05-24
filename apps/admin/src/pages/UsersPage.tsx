import { useState } from 'react';

import { DeleteUserDialog } from '@burro/shared/modules/users/ui/DeleteUserDialog';
import { EditUserModal } from '@burro/shared/modules/users/ui/EditUserModal';
import { UsersTable } from '@burro/shared/modules/users/ui/UsersTable';
import type { User } from '@burro/shared/modules/users/types';

import { QueryErrorBoundary } from '@burro/shared/components/application/error-boundary/query-error-boundary';
import { Breadcrumb } from '@burro/shared/components/base/breadcrumb/breadcrumb';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';
import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

export const UsersPage = () => {
  usePageMetadata({ title: 'Users' });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  return (
    <PageWrapper>
      <PageHeader className="justify-between">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Users' }]} />
      </PageHeader>

      <PageContent>
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5 lg:gap-1">
            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Users List</h1>
            <p className="text-md text-balance text-tertiary">Manage users and their roles</p>
          </div>
        </div>

        <QueryErrorBoundary>
          <UsersTable
            onEdit={(user) => setEditingUser(user)}
            onDelete={(user) => setDeletingUser(user)}
          />
        </QueryErrorBoundary>

        <EditUserModal
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
        />

        <DeleteUserDialog
          user={deletingUser}
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
        />
      </PageContent>
    </PageWrapper>
  );
};

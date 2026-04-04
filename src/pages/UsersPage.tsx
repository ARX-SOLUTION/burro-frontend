import { useState } from 'react';
import { Plus } from '@untitledui/icons';

import type { User } from '@/modules/users';
import { CreateUserModal, DeleteUserDialog, EditUserModal, UsersTable } from '@/modules/users';

import { QueryErrorBoundary } from '@/components/application/error-boundary/query-error-boundary';
import { Breadcrumb } from '@/components/base/breadcrumb/breadcrumb';
import { Button } from '@/components/base/buttons/button';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const UsersPage = () => {
  usePageMetadata({ title: 'Users' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
          <Button iconLeading={Plus} onClick={() => setIsCreateModalOpen(true)}>
            Add User
          </Button>
        </div>

        <QueryErrorBoundary>
          <UsersTable
            onEdit={(user) => setEditingUser(user)}
            onDelete={(user) => setDeletingUser(user)}
          />
        </QueryErrorBoundary>

        <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

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

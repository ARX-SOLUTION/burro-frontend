import { useState } from 'react';
import { Plus } from '@untitledui/icons';

import type { {{PascalSingular}} } from '@/modules/{{plural}}';
import {
  Create{{PascalSingular}}Modal,
  Delete{{PascalSingular}}Dialog,
  Edit{{PascalSingular}}Modal,
  {{PascalPlural}}Table,
} from '@/modules/{{plural}}';

import { QueryErrorBoundary } from '@/components/application/error-boundary/query-error-boundary';
import { Breadcrumb } from '@/components/base/breadcrumb/breadcrumb';
import { Button } from '@/components/base/buttons/button';
import { PageContent, PageHeader, PageWrapper } from '@/layouts/DashboardLayout';
import { usePageMetadata } from '@/libs/usePageMetadata';

export const {{PascalPlural}}Page = () => {
  usePageMetadata({ title: '{{PascalPlural}}' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editing{{PascalSingular}}, setEditing{{PascalSingular}}] = useState<{{PascalSingular}} | null>(null);
  const [deleting{{PascalSingular}}, setDeleting{{PascalSingular}}] = useState<{{PascalSingular}} | null>(null);

  return (
    <PageWrapper>
      <PageHeader className="justify-between">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: '{{PascalPlural}}' }]} />
      </PageHeader>

      <PageContent>
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5 lg:gap-1">
            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">{{PascalPlural}}</h1>
          </div>
          <Button iconLeading={Plus} onClick={() => setIsCreateModalOpen(true)}>
            Add {{PascalSingular}}
          </Button>
        </div>

        <QueryErrorBoundary>
          <{{PascalPlural}}Table
            onEdit={({{camelSingular}}) => setEditing{{PascalSingular}}({{camelSingular}})}
            onDelete={({{camelSingular}}) => setDeleting{{PascalSingular}}({{camelSingular}})}
          />
        </QueryErrorBoundary>

        <Create{{PascalSingular}}Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        <Edit{{PascalSingular}}Modal
          {{camelSingular}}={editing{{PascalSingular}}}
          isOpen={!!editing{{PascalSingular}}}
          onClose={() => setEditing{{PascalSingular}}(null)}
        />

        <Delete{{PascalSingular}}Dialog
          {{camelSingular}}={deleting{{PascalSingular}}}
          isOpen={!!deleting{{PascalSingular}}}
          onClose={() => setDeleting{{PascalSingular}}(null)}
        />
      </PageContent>
    </PageWrapper>
  );
};

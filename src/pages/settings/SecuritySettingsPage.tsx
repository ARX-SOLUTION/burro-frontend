import { ChangePasswordForm } from '@/modules/users';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const SecuritySettingsPage = () => {
  usePageMetadata({ title: 'Security Settings' });

  return (
    <div className="max-w-lg">
      <div className="mb-6 flex flex-col gap-5 border-b border-secondary pb-5">
        <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
          <h1 className="text-lg font-semibold text-primary">Security Settings</h1>
          <p className="text-sm text-tertiary">Update your password.</p>
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

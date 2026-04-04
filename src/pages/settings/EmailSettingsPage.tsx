import { ChangeEmailForm } from '@/modules/users';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const EmailSettingsPage = () => {
  usePageMetadata({ title: 'Email Settings' });

  return (
    <div className="max-w-lg">
      <div className="mb-6 flex flex-col gap-5 border-b border-secondary pb-5">
        <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
          <h1 className="text-lg font-semibold text-primary">Email Settings</h1>
          <p className="text-sm text-tertiary">Change your email address.</p>
        </div>
      </div>
      <ChangeEmailForm />
    </div>
  );
};

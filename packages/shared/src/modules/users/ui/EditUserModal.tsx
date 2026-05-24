import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Role, useRole } from '@burro/shared/modules/auth';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@burro/shared/components/application/modals/modal';
import { RHFInput } from '@burro/shared/components/base/_rhf';
import { Button } from '@burro/shared/components/base/buttons/button';
import { Select } from '@burro/shared/components/base/select/select';

import { useAdminUpdateUser } from '../services';
import type { AppLanguage, User } from '../types';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.nativeEnum(Role),
  phone: z.string().optional(),
  language: z.enum(['uz', 'en', 'ru', 'ar']).optional(),
  notificationsEnabled: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const ROLE_OPTIONS = [
  { id: Role.Admin, label: 'Admin' },
  { id: Role.Parent, label: 'Parent' },
  { id: Role.Student, label: 'Student' },
];

const LANGUAGE_OPTIONS: { id: AppLanguage; label: string }[] = [
  { id: 'uz', label: "O'zbek" },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
  { id: 'ar', label: 'العربية' },
];

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditUserModal = ({ user, isOpen, onClose }: EditUserModalProps) => {
  const { isAtLeast } = useRole();
  const { mutate: updateUser, isPending } = useAdminUpdateUser();

  const canChangeRole = isAtLeast(Role.Superadmin);
  const isEditingSuperadmin = user?.role === Role.Superadmin;

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      role: Role.Student,
      phone: '',
      language: 'uz',
      notificationsEnabled: true,
      isActive: true,
    },
  });

  const selectedRole = watch('role');
  const selectedLanguage = watch('language');
  const notificationsEnabled = watch('notificationsEnabled');
  const isActive = watch('isActive');

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        role: user.role,
        phone: user.phone ?? '',
        language: user.language,
        notificationsEnabled: user.notificationsEnabled,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    if (!user) return;

    updateUser(
      {
        id: user.id,
        data: {
          fullName: data.fullName,
          ...(canChangeRole && { role: data.role }),
          ...(data.phone ? { phone: data.phone } : {}),
          ...(data.language ? { language: data.language } : {}),
          ...(data.notificationsEnabled !== undefined
            ? { notificationsEnabled: data.notificationsEnabled }
            : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
      <ModalOverlay isDismissable>
        <Modal className="max-w-md">
          <Dialog>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">Edit User</h2>
                <p className="mt-1 text-sm text-tertiary">
                  Update user information{canChangeRole && ' and role'}.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <RHFInput
                  name="fullName"
                  control={control}
                  label="Full Name"
                  placeholder="Enter full name"
                  isRequired
                />

                {canChangeRole && (
                  <Select
                    label="Role"
                    selectedKey={selectedRole}
                    onSelectionChange={(key) => setValue('role', key as Role)}
                    items={ROLE_OPTIONS}
                    isDisabled={!canChangeRole || (isEditingSuperadmin && !canChangeRole)}
                  >
                    {(item) => <Select.Item id={item.id} label={item.label} />}
                  </Select>
                )}

                <RHFInput
                  name="phone"
                  control={control}
                  label="Phone"
                  placeholder="Enter phone number"
                />

                <Select
                  label="Language"
                  selectedKey={selectedLanguage}
                  onSelectionChange={(key) => setValue('language', key as AppLanguage)}
                  items={LANGUAGE_OPTIONS}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} />}
                </Select>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setValue('notificationsEnabled', e.target.checked)}
                      className="rounded border-gray-300 text-teal-600"
                    />
                    Notifications
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setValue('isActive', e.target.checked)}
                      className="rounded border-gray-300 text-teal-600"
                    />
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" color="secondary" onClick={onClose} isDisabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

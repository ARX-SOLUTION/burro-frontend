import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Role, useRole } from '@/modules/auth';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal';
import { RHFInput } from '@/components/base/_rhf';
import { Button } from '@/components/base/buttons/button';
import { Select } from '@/components/base/select/select';

import { useAdminUpdateUser } from '../services';
import type { User } from '../types';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.nativeEnum(Role),
});

type FormData = z.infer<typeof schema>;

const ROLE_OPTIONS = [
  { id: Role.Admin, label: 'Admin' },
  { id: Role.User, label: 'User' },
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
      role: Role.User,
    },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        role: user.role,
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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Role } from '@/modules/auth';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal';
import { RHFInput, RHFPasswordInput } from '@/components/base/_rhf';
import { Button } from '@/components/base/buttons/button';
import { Select } from '@/components/base/select/select';

import { useCreateUser } from '../services';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.nativeEnum(Role),
});

type FormData = z.infer<typeof schema>;

const ROLE_OPTIONS = [
  { id: Role.Admin, label: 'Admin' },
  { id: Role.User, label: 'User' },
];

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const { mutate: createUser, isPending } = useCreateUser();

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      role: Role.User,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = (data: FormData) => {
    createUser(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
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
                <h2 className="text-lg font-semibold text-primary">Create User</h2>
                <p className="mt-1 text-sm text-tertiary">Add a new user to the system.</p>
              </div>

              <div className="flex flex-col gap-4">
                <RHFInput
                  name="fullName"
                  control={control}
                  label="Full Name"
                  placeholder="Enter full name"
                  isRequired
                />

                <RHFInput
                  name="email"
                  control={control}
                  label="Email"
                  placeholder="Enter email address"
                  type="email"
                  isRequired
                />

                <RHFPasswordInput
                  name="password"
                  control={control}
                  label="Password"
                  placeholder="Enter password"
                  isRequired
                />

                <Select
                  label="Role"
                  selectedKey={selectedRole}
                  onSelectionChange={(key) => setValue('role', key as Role)}
                  items={ROLE_OPTIONS}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} />}
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" color="secondary" onClick={onClose} isDisabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isPending}>
                  Create User
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

import { AlertCircle } from '@untitledui/icons';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal';
import { Button } from '@/components/base/buttons/button';

import { useDeleteUser } from '../services';
import type { User } from '../types';

interface DeleteUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteUserDialog = ({ user, isOpen, onClose }: DeleteUserDialogProps) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = () => {
    if (!user) return;

    deleteUser(user.id, {
      onSuccess: () => {
        onClose();
      },
    });
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
            <div className="flex flex-col gap-6 p-6">
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-error-secondary">
                  <AlertCircle className="size-6 text-error-primary" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-primary">Delete User</h2>
                  <p className="mt-1 text-sm text-tertiary">
                    Are you sure you want to delete{' '}
                    <span className="font-medium text-secondary">{user?.fullName}</span>? This
                    action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" color="secondary" onClick={onClose} isDisabled={isPending}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="primary-destructive"
                  onClick={handleDelete}
                  isLoading={isPending}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

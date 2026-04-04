import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal';
import { RHFInput } from '@/components/base/_rhf';
import { Button } from '@/components/base/buttons/button';

import { useCreate{{PascalSingular}} } from '../services';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type FormData = z.infer<typeof schema>;

interface Create{{PascalSingular}}ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Create{{PascalSingular}}Modal = ({ isOpen, onClose }: Create{{PascalSingular}}ModalProps) => {
  const { mutate: create{{PascalSingular}}, isPending } = useCreate{{PascalSingular}}();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: FormData) => {
    create{{PascalSingular}}(data, {
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
                <h2 className="text-lg font-semibold text-primary">Create {{PascalSingular}}</h2>
                <p className="mt-1 text-sm text-tertiary">Add a new {{singular}}.</p>
              </div>

              <div className="flex flex-col gap-4">
                <RHFInput
                  name="title"
                  control={control}
                  label="Title"
                  placeholder="Enter title"
                  isRequired
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" color="secondary" onClick={onClose} isDisabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isPending}>
                  Create
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

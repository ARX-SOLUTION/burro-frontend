import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Dialog, DialogTrigger, Modal, ModalOverlay } from '@/components/application/modals/modal';
import { RHFInput } from '@/components/base/_rhf';
import { Button } from '@/components/base/buttons/button';

import { useUpdate{{PascalSingular}} } from '../services';
import type { {{PascalSingular}} } from '../types';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type FormData = z.infer<typeof schema>;

interface Edit{{PascalSingular}}ModalProps {
  {{camelSingular}}: {{PascalSingular}} | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Edit{{PascalSingular}}Modal = ({ {{camelSingular}}, isOpen, onClose }: Edit{{PascalSingular}}ModalProps) => {
  const { mutate: update{{PascalSingular}}, isPending } = useUpdate{{PascalSingular}}();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => {
    if ({{camelSingular}}) {
      reset({
        title: {{camelSingular}}.title,
      });
    }
  }, [{{camelSingular}}, reset]);

  const onSubmit = (data: FormData) => {
    if (!{{camelSingular}}) return;

    update{{PascalSingular}}(
      { id: {{camelSingular}}.id, data },
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
                <h2 className="text-lg font-semibold text-primary">Edit {{PascalSingular}}</h2>
                <p className="mt-1 text-sm text-tertiary">Update {{singular}} information.</p>
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
